/**
 * Created by danielabrao on 1/13/17.
 */
(function () {
    "use strict";

    module.exports = function (dependencies) {
        var document = document || dependencies.document,
            self = {
                "props": {},
                "methods": {}
            };

        self.methods = {
            "test": function (options) {

                if (!options.textElement) {
                    throw new Error("Can not proceed without an HTML text element");
                } else {
                    try {
                        self.props.expandText = options.expandText || "See more";
                        self.props.contractText = options.contractText || "See less";
                        options.textElement.classList.add("multiLineEllipsis");
                        options.textElement.style.maxHeight = ["calc(1.2em * ", options.limit || 5, ")"].join("");

                        if (options.autoHandleExpansion) {
                            options.textElement.appendChild(this.createSeeMoreButton(options.textElement));
                        }

                    } catch (e) {
                        throw new Error("Can not proceed without a valid HTML text element");
                    }

                }
            },
            "changeButtonText": function (buttonElement, text) {
                buttonElement.innerHTML = text;
            },
            "toggleExpansion": function (textElement, buttonElement) {
                if (textElement.classList.contains("expanded")) {
                    textElement.classList.remove("expanded");
                    self.methods.changeButtonText(buttonElement, self.props.expandText);
                } else {
                    self.methods.changeButtonText(buttonElement, self.props.contractText);
                    textElement.classList.add("expanded");
                }
            },
            "countTextLines": function (target) {
                var style = window.getComputedStyle(target, null);
                var height = parseInt(style.getPropertyValue("height")),
                    font_size = parseInt(style.getPropertyValue("font-size")),
                    line_height = parseInt(style.getPropertyValue("line-height")),
                    box_sizing = style.getPropertyValue("box-sizing");

                if (isNaN(line_height)) {
                    line_height = font_size * 1.2;
                }

                if (box_sizing === "border-box") {
                    var padding_top = parseInt(style.getPropertyValue("padding-top")),
                        padding_bottom = parseInt(style.getPropertyValue("padding-bottom")),
                        border_top = parseInt(style.getPropertyValue("border-top-width")),
                        border_bottom = parseInt(style.getPropertyValue("border-bottom-width"));
                    height = (height - padding_top - padding_bottom - border_top - border_bottom);
                }

                return Math.ceil(height / line_height);
            },
            "createSeeMoreButton": function (textElement) {
                var button = document.createElement("button");
                self.methods.changeButtonText(button, self.props.expandText);
                button.addEventListener("click", function () {
                    self.methods.toggleExpansion(textElement, button);
                });

                return button;
            }
        };

        return self.methods;

    };

}());