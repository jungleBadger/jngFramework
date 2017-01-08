/**
 * Created by danielabrao on 1/6/17.
 */
(function () {
    "use strict";

    //MODAL BOX DECLARATION
    var newSocialBoxInstance = require("./partials/social.script");

    module.exports = function (socialBoxDependencies) {
        //INSTANTIATE MODAL FEATURE PASSING ANY DEPENDENCIES AS PARAMETER
        return newSocialBoxInstance(socialBoxDependencies);
    };

}());