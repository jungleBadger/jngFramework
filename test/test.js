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

        });

    });


}());