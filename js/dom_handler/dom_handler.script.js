/**
 * Created by danielabrao on 12/25/16.
 */
(function () {
    "use strict";

    module.exports = function (handlerDependencies) {
        return {
            "cssInjector": function (cssFiles) {
                var headAnchor = handlerDependencies.document.querySelector("head"),
                    self = this;

                if (cssFiles && Array.isArray(cssFiles)) {
                    cssFiles.forEach(function (filePath) {
                        var linksEls = handlerDependencies.document.querySelectorAll("link"),
                            link = handlerDependencies.document.createElement("link");
                        link.href = filePath;
                        link.rel = "stylesheet";

                        for (var i = 0; i < linksEls.length; i += 1) {
                            if (linksEls[i].href.indexOf(link.href) > -1) {
                                return false;
                            }
                        }
                        self.appendChild(headAnchor, link);
                    });
                } else {
                    //IMPROVE
                    throw new Error("Value is not CSS Array");
                }
                return true;
            },
            "appendChild": function (parentEl, childEl) {
                try {
                    parentEl.appendChild(childEl);
                } catch (e) {
                    console.log(e);
                }

                return this;
            }
        };
    };

}());