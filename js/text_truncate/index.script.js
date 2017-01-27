/**
 * Created by danielabrao on 1/13/17.
 */
(function () {
    "use strict";

    var newSocialBoxInstance = require("./partials/text_truncate.script");

    module.exports = function (featureDependencies) {
        return newSocialBoxInstance(featureDependencies);
    };

}());