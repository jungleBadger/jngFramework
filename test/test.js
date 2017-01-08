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
        window = jsdom("<html><head></head><body><div id='modalReference'></div></body></html>", options).defaultView,
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
            it("should be contained within framework object", function () {
                expect(frameworkInstance).to.haveOwnProperty("domHandler");
            });
        });

        describe("CSS Injector methods", function () {
            var frameworkInstance = framework(window);
            it("should be contained within DOM Handler methods", function () {
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
        it("should be contained within Framework object methods", function () {
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
            it("should contain the opening function inside modal instance", function () {
                expect(modalBoxInstance.openModal).to.be.a("function");
            });

            it("should throw an error if no template or references was passed to open function", function () {
                expect(modalBoxInstance.openModal).to.throw(Error);
            });

            describe("opening with HTML template", function () {
                it("should thrown an error if the template passed is not an HTML element", function () {
                    expect(modalBoxInstance.openModal({
                        "template": "any string"
                    })).to.throw(Error);
                });

                it("should append the passed template into Modal Box", function () {
                    var testElement = window.document.createElement("div");
                    testElement.setAttribute("id", "testAppend");

                    expect(modalBoxInstance.openModal({
                        "template": testElement
                    })).to.not.throw(Error);

                    expect(window.document.querySelector("aside.jng-modal > .content-wrapper > #testAppend")).to.not.equal(null);
                    modalBoxInstance.closeModal();
                });
            });

            describe("opening with HTML ID reference", function () {
                it("should thrown an error if the reference passed is invalid", function () {
                    expect(modalBoxInstance.openModal({
                        "reference": "invalid_reference"
                    })).to.throw(Error);
                });

                it("should query and append the element referenced by ID", function () {
                    expect(modalBoxInstance.openModal({
                        "reference": "modalReference"
                    })).to.not.throw(Error);

                    expect(window.document.querySelector("aside.jng-modal > .content-wrapper > #modalReference")).to.not.equal(null);
                    modalBoxInstance.closeModal();
                });
            });

            describe("Modal Box CSS Classes addition", function () {
                it("should add the modal-open class to the modal box", function () {
                    expect(modalBoxInstance.openModal({
                        "reference": "modalReference"
                    })).to.not.throw(Error);

                    expect(window.document.querySelector("aside.jng-modal.modal-open")).to.not.equal(null);
                    modalBoxInstance.closeModal();
                });

                it("should add the scrolless class to the body element", function () {
                    expect(modalBoxInstance.openModal({
                        "reference": "modalReference"
                    })).to.not.throw(Error);

                    expect(window.document.querySelector("body.scrolless")).to.not.equal(null);
                    modalBoxInstance.closeModal();
                });
            });

        });

        describe("Closing Modal method", function () {
            it("should contain the closing function inside modal instance", function () {
                expect(modalBoxInstance.closeModal).to.be.a("function");
            });

            it("should remove the modal-open class from the modal box element", function () {
                expect(modalBoxInstance.openModal({
                    "reference": "modalReference"
                })).to.not.throw(Error);

                modalBoxInstance.closeModal();
                expect(window.document.querySelector("aside.jng-modal.modal-open")).to.be.equals(null);
            });

            it("should remove the scrolless class from the body element", function () {
                expect(modalBoxInstance.openModal({
                    "reference": "modalReference"
                })).to.not.throw(Error);

                modalBoxInstance.closeModal();
                expect(window.document.querySelector("body.scrolless")).to.be.equals(null);
            });
        });


    });

    describe("Social Box Feature", function () {
        var frameworkInstance = framework(window),
            socialBoxInstance = frameworkInstance.socialBox();

        it("should be contained within Framework object methods", function () {
            expect(frameworkInstance).to.haveOwnProperty("socialBox");
        });

        describe("Render SocialBox method", function () {
            it("should contain the rendering function inside social box instance", function () {
                expect(socialBoxInstance.renderSocialBox).to.be.a("function");
            });

            it("should throw an error if the socialObj [JSON array] param is different from an array of JSONs", function () {
                expect(socialBoxInstance.renderSocialBox).to.throw(Error);
            });
        });


    });


}());