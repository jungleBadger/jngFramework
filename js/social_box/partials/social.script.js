/**
 * Created by danielabrao on 1/6/17.
 */
(function () {
    "use strict";

    module.exports = function (dependencies) {

        dependencies.domHandler.cssInjector(["./jng_framework/dist/css/socialbox.style.min.css"]);

        var document = document || dependencies.document,
            self = {
            "props": {},
            "methods": {},
            "socialMediaDataset": require("./social.dataset")
        };

        self.methods = {
            "createInitialStructure": function () {
                var aside = document.createElement("aside");
                aside.classList.add("social-box-wrapper");
                return aside;
            },
            "associateBoxSide": function (socialBox, side) {
                if (side !== "left" && side !== "right") {
                    side = "left";
                }

                socialBox.classList.add(side);
                return this;
            },
            "appendBoxToParent": function (parent, box) {
                dependencies.domHandler.appendChild(parent, box);
            },
            "createAdditionalBox": function (media, socialBox) {
                var anchor = document.createElement("a"),
                    div = document.createElement("div");

                anchor.target = "_blank";

                try {
                    anchor.href = media.profileLink || self.socialMediaDataset[media.type.toLowerCase()].link;
                    div.classList.add(self.socialMediaDataset[media.type.toLowerCase()].cssClass || "default");
                } catch (e) {
                    anchor.href = "#";
                    div.classList.add(self.socialMediaDataset.default.cssClass);
                }

                dependencies.domHandler.appendChild(anchor, div).appendChild(socialBox, anchor);
                return anchor;

            }
        };

        return function instantiateNewSocialBox () {
            var boxInstance = self.methods.createInitialStructure();
            return {
                "renderSocialBox": function (socialObj, parentEl, elSide) {
                    self.methods.associateBoxSide(boxInstance, elSide);

                    if (socialObj && socialObj.length) {
                        for (var i = 0; i < socialObj.length; i += 1) {
                            self.methods.createAdditionalBox(socialObj[i], boxInstance);
                        }

                        self.methods.appendBoxToParent(parentEl, boxInstance);

                        return boxInstance;
                    } else {
                        throw new Error("Invalid Dataset");
                    }

                }
            }
        }


    };

}());