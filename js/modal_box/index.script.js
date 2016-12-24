/**
 * Created by danielabrao on 12/23/16.
 */
(function () {
    "use strict";

    //MODAL BOX DECLARATION
    var newModalInstance = require("./partials/modal.script");

    module.exports = function (modalDependencies) {
        //INSTANTIATE MODAL FEATURE PASSING ANY DEPENDENCIES AS PARAMETER
        return newModalInstance(modalDependencies);
    };

}());