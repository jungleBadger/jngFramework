/**
 * Created by danielabrao on 12/18/16.
 */
(function () {
    "use strict";

    //MODAL BOX FEATURE THAT CAN RECEIVE DEPENDENCIES SUCH AS JQUERY
    module.exports = function (dependencies) {

        var modalCounter = 0,
            bodyElement = dependencies.document.querySelector("body");

        //MODAL BOX CONSTRUCTOR - CREATING AN UNIQUE MODAL
        return function instantiateNewModal (msg) {

            var self = {
                "props": {},
                "methods": {}
            };

            self.props = {
                "modalEl": "",
                "closeEl": ""
            };

            self.methods = {
                "openModal": function (modalConfigs) {
                    return function () {
                        if (modalConfigs.template) {
                            self.methods.appendTemplate(modalConfigs.template);
                        }

                        console.log(this);
                        self.props.modalEl.classList.toggle("modal-open");
                        bodyElement.classList.toggle("scrolless");
                        return this;
                    }
                },
                "closeModal": function () {
                    self.props.modalEl.classList.remove("modal-open");
                    bodyElement.classList.remove("scrolless");
                    console.log("close");
                    return this;
                },
                "appendTemplate": function (template) {
                    self.props.modalEl.appendChild(template);
                },
                "modalElement": (function buildModalEl() {
                    self.props.modalEl = dependencies.document.createElement("aside");
                    self.props.modalEl.classList.add("jng-modal");
                    self.props.modalEl.setAttribute("data-index", modalCounter += 1);
                    self.props.closeEl = dependencies.document.createElement("button");
                    self.props.closeEl.appendChild(dependencies.document.createTextNode("Close"));
                    self.props.closeEl.classList.add("modal-close");
                    self.props.closeEl.addEventListener("click", function () {
                        self.methods.closeModal();
                    });
                    self.props.modalEl.appendChild(self.props.closeEl);
                    bodyElement.appendChild(self.props.modalEl);
                    return self.props.modalEl;
                }())
            };


            return self.methods;
        };
    }
}());