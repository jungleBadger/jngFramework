/**
 * Created by danielabrao on 12/18/16.
 */
(function () {
    "use strict";

    //MODAL BOX FEATURE THAT CAN RECEIVE DEPENDENCIES SUCH AS JQUERY
    module.exports = function (dependencies) {
        //MODAL BOX CONSTRUCTOR - CREATING AN UNIQUE MODAL
        return function instantiateNewModal (msg) {
            return {
                "openModal": function (modalConfigs) {
                    return function () {
                        console.log(modalConfigs);
                        console.log(this);
                        console.log(msg);
                        return this;
                    }
                },
                "closeModal": function () {
                    console.log("close");
                    return this;
                }
            }
        };
    }
}());