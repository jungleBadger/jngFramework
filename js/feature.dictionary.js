/**
 * Created by danielabrao on 12/23/16.
 */
(function () {
    "use strict";

    //DECLARE ALL FEATURES INTO JNG FRAMEWORK
    var modalBox = require("./modal_box/index.script"),
        socialBox = require("./social_box/index.script"),
        domHandler = require("./dom_handler/dom_handler.script");

    module.exports = function (appDependencies) {
        //LOAD FEATURES PASSING ANY DEPENDENCIES
        return {
            "domHandler": domHandler({
                "document": appDependencies.document
            }),
            "modalBox": modalBox({
                "document": appDependencies.document,
                "domHandler": domHandler(appDependencies)
            }),
            "socialBox": socialBox({
                "document": appDependencies.document,
                "domHandler": domHandler(appDependencies)
            })

        };
    };

}());