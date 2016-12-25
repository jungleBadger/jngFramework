/**
 * Created by danielabrao on 12/23/16.
 */
(function (document) {
    "use strict";

    var features = require("./feature.dictionary")();

    features.domHandler.cssInjector(["./jng_framework/css/jng.style.css", "./jng_framework/css/modal.style.css"]);

    //EXPOSES JNG FRAMEWORK TO BE REQUIRED AS COMMON JS
    module.exports = features;

}(window.document));