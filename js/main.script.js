/**
 * Created by danielabrao on 12/23/16.
 */

(function () {
    "use strict";

    var features = require("./feature.dictionary");

    //EXPOSES JNG FRAMEWORK TO BE REQUIRED AS COMMON JS
    module.exports = function (windowObj) {

        var window = windowObj || window;

        if (!windowObj || !window) {
            throw new Error("Window object is not present");
        } else {
            var instance = features({
                "document": windowObj.document || window.document
            });

            instance.domHandler.cssInjector(["./jng_framework/css/jng.style.css", "./jng_framework/css/modal.style.css"]);
            return instance;
        }
    };


}());