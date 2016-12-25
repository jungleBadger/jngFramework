/**
 * Created by danielabrao on 12/25/16.
 */
(function () {
    "use strict";

    module.exports = {
        "cssInjector": function (cssFiles) {
            var headAnchor = document.querySelector("head");

            if (cssFiles && Array.isArray(cssFiles)) {
                cssFiles.forEach(function (filePath) {
                    var linksEls = document.querySelectorAll("link"),
                        link = document.createElement("link");
                    link.href = filePath;
                    link.rel = "stylesheet";

                    for (var i = 0; i < linksEls.length; i += 1) {
                        if (linksEls[i].href === link.href) {
                            return false;
                        }
                    }
                    headAnchor.appendChild(link);
                });
            } else {
                //IMPROVE
                console.warn("value is not CSS Array");
                return false;
            }
            return false;
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

}());