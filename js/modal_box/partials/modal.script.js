/**
 * Created by danielabrao on 12/18/16.
 */
(function () {
    "use strict";

    //MODAL BOX FEATURE THAT CAN RECEIVE DEPENDENCIES SUCH AS JQUERY
    module.exports = function (dependencies) {

        var document = document || dependencies.document,
            modalCounter = 0,
            bodyElement = document.querySelector("body");

        dependencies.domHandler.cssInjector(["./jng_framework/css/modal.style.css"]);

        //MODAL BOX CONSTRUCTOR - CREATING AN UNIQUE MODAL
        return function instantiateNewModal () {
            var self = {
                "props": {},
                "methods": {}
            };

            self.props = {
                "modalEl": "",
                "contentWrapper": "",
                "closeEl": ""
            };

            self.methods = {
                "openModal": function (modalConfigs) {
                    modalConfigs = modalConfigs || {};
                    if (!modalConfigs.template && !modalConfigs.reference) {
                        throw new Error("Can not populate Modal Box without info");
                    }

                    return function () {
                        if (self.props.modalEl.classList.contains("modal-open")) {
                            self.methods.closeModal({
                                "shouldCleanContent": true
                            });
                        } else {
                            if (modalConfigs.template) {
                                dependencies.domHandler.appendChild(self.props.contentWrapper, modalConfigs.template);
                            } else if (modalConfigs.reference) {
                                dependencies.domHandler.appendChild(self.props.contentWrapper, document.getElementById(modalConfigs.reference));
                            }
                            self.props.modalEl.classList.add("modal-open");
                            bodyElement.classList.add("scrolless");
                        }

                        return true;
                    }
                },
                "closeModal": function (closeOptions) {
                    closeOptions = closeOptions || {};

                    self.props.modalEl.classList.remove("modal-open");

                    bodyElement.classList.remove("scrolless");


                    if (closeOptions.shouldCleanContent) {
                        self.methods.cleanModal(self.props.contentWrapper);
                    }

                    return true;
                },
                "cleanModal": function (element) {
                    element.removeChild(element.firstChild);

                },
                "modalElement": (function buildModalEl() {
                    self.props.modalEl = document.createElement("aside");
                    self.props.contentWrapper = document.createElement("div");
                    self.props.closeEl = document.createElement("button");

                    self.props.contentWrapper.classList.add("content-wrapper");
                    self.props.modalEl.classList.add("jng-modal");
                    self.props.closeEl.classList.add("modal-close");

                    self.props.modalEl.setAttribute("data-index", modalCounter);


                    self.props.closeEl.addEventListener("click", function () {
                        self.methods.closeModal({
                            "shouldCleanContent": true
                        });
                    });

                    self.props.closeEl.appendChild(document.createTextNode("Close"));
                    self.props.modalEl.appendChild(self.props.closeEl);
                    self.props.modalEl.appendChild(self.props.contentWrapper);
                    bodyElement.appendChild(self.props.modalEl);

                    modalCounter += 1;

                    return self.props.modalEl;
                }())
            };

            return self.methods;
        };
    }
}());