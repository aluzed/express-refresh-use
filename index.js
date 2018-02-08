/**
 * @module RefreshUse
 * @resource Express
 *
 * Remove an existing entry in express stack then add the router to prevent duplication and update old routes
 *
 * Author: Alexandre PENOMBRE <aluzed_AT_gmail.com>
 * Copyright (c) 2018
*/


/**
 * @entry RefreshUse
 * @type Method
 *
 * Update app routes stack.
 *
 * @param {Object} app express instance
 * @param {Object} router express.Router()
 * @param {String} newPath app.use(newPath, router);
 */
module.exports = (app, router, newPath) => {
    function purgeRoute(layers, newReg) {
        let found = [];
        layers.map((layer, i) => {
            let currentStack = layers[i];
            if(currentStack.regexp.source === newReg) {
                layers.splice(i, 1);
                found.push(i);
            }
        });

        return found.length > 0 ? found : null;
    }

    // For each path in router, purge app stack first
    router.stack.map(layer => {
        if(layer.name === "bound dispatch" && typeof layer.route.path !== "undefined") {
            purgeRoute(app._router.stack, layer.regexp.source);
        }
    })

    app.use(newPath, router);
}
