/**
 * Created by danielabrao on 12/25/16.
 */
(function () {
    "use strict";

    var assert = require("assert"),
        chai = require("chai"),
        expect = chai.expect,
        should = chai.should,
        jsdom = require("jsdom").jsdom,
        options = {},
        window = jsdom("<html><head></head><body></body></html>", options).defaultView,
        framework = require("../js/main.script");


    describe("Framework constructor", function () {
        it("should throw an error if window object is not present", function () {
            expect(framework).to.throw(Error);
        });

        it("should construct the framework object", function () {
            expect(framework(window)).to.be.an("object");
        });

        it("should inject minimum CSS to loaded DOM", function () {
            framework(window);
            var counter = 0,
                linkTags = window.document.querySelectorAll("link");
            for (var i = 0; i < linkTags.length; i += 1) {
                if (linkTags[i].href.indexOf("/jng.style") > -1) {
                    counter += 1;
                }
            }
            expect(counter).to.be.greaterThan(0);
        });

        it("should not duplicate previously imported CSS", function () {
            framework(window);
            var counter = 0,
                i,
                linkTags = window.document.querySelectorAll("link");
            for (i = 0; i < linkTags.length; i += 1) {
                if (linkTags[i].href.indexOf("/jng.style") > -1) {
                    counter += 1;
                }
            }
            expect(counter).to.not.be.greaterThan(1);
        });
    });

    describe("DOM Handler methods", function () {
        var frameworkInstance = framework(window);
        describe("DOM method constructor", function () {
            it("should be contained on framework object", function () {
                expect(frameworkInstance).to.haveOwnProperty("domHandler");
            });
        });

        describe("CSS Injector methods", function () {
            var frameworkInstance = framework(window);
            it("should be contained on DOM Handler methods", function () {
                expect(frameworkInstance.domHandler).to.haveOwnProperty("cssInjector");
            });

            it("should throw an error if argument is not an array", function () {
                expect(frameworkInstance.domHandler.cssInjector).to.throw(Error);
            });

            it("should append a link element to head tag for each index in argument array", function () {
                frameworkInstance.domHandler.cssInjector(["./jng_framework/css/test.style.css"]);
                var counter = 0,
                    linkTags = window.document.querySelectorAll("link");
                for (var i = 0; i < linkTags.length; i += 1) {
                    if (linkTags[i].href.indexOf("/test.style.css") > -1) {
                        counter += 1;
                    }
                }
                expect(counter).to.be.greaterThan(0);
            });
        });
    });

    describe("Modal Box Feature", function () {
        var frameworkInstance = framework(window),
            modalBoxInstance = frameworkInstance.modalBox(),
            modalDOMEl = window.document.querySelector("aside.jng-modal");
        it("should be contained on Framework object methods", function () {
            expect(frameworkInstance).to.haveOwnProperty("modalBox");
        });

        it("should be a constructor function", function () {
            expect(frameworkInstance.modalBox).to.a("function");
        });

        describe("Default Modal Box construction rules", function () {
            it("should construct a modal box object", function () {
                expect(modalBoxInstance).to.an("object");
            });

            it("should build an aside element into the DOM after being constructed", function () {
                expect(modalDOMEl).to.not.equal(null);
            });

            it("should have default modal box class associated with aside element", function () {
                expect(modalDOMEl.classList.contains("jng-modal")).to.be.equals(true);
            });

            it("should have a data index attribute on each modal box", function () {
                expect(modalDOMEl.attributes["data-index"]).to.not.equal(undefined);
            });

            it("should have an unique data index attribute for each modal box - 0 index based", function () {
                expect(modalDOMEl.attributes["data-index"].value).to.be.equals("0");
            });
        });

        describe("Opening Modal method", function () {
            it("should contain opening function inside modal instance", function () {
                expect(modalBoxInstance.openModal).to.be.a("function");
            });

            it("should load default properties in case omitted", function () {

            });
        });


    });


}());