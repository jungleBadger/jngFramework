/**
 * Created by danielabrao on 12/23/16.
 */
(function () {
    "use strict";


    //DECLARE ALL FEATURES INTO JNG FRAMEWORK
    var modalBox = require("./modal_box/index.script");

    module.exports = function (appDependencies) {
        //LOAD FEATURES PASSING ANY DEPENDENCIES
        return {
            "modalBox": modalBox()
        };
    };

}());