/**
 * Created by danielabrao on 12/23/16.
 */

(function () {
    "use strict";

    var features = require("./feature.dictionary"),
        global;

    try {
        global = window || "";
    } catch (e) {
        console.log("Node JS environment");
    }

    //EXPOSES JNG FRAMEWORK TO BE REQUIRED AS COMMON JS
    module.exports = function (windowObj) {
        var window = global || windowObj;
        if (!window) {
            throw new Error("Window object is not present");
        } else {
            var instance = features({
                "document": window.document
            });

            instance.domHandler.cssInjector(["./jng_framework/css/jng.style.css", "./jng_framework/css/modal.style.css"]);
            return instance;
        }
    };

}());