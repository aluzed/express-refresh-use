/**
 * @module PurgeUse
 * @resource Express
 * 
 * Remove an existing entry in express stack then add the router to prevent duplication and update old routes
 * 
 * Author: Alexandre PENOMBRE <aluzed_AT_gmail.com>
 * Copyright (c) 2018
*/


/**
 * @entry PurgeUse
 * @type Method
 * 
 * Update app routes stack.
 * 
 * @param {Object} app express instance 
 * @param {Object} router express.Router()
 * @param {String} newPath app.use(newPath, router);
 */
module.exports = (app, router, newPath) => {
    function purgeRoute(layers, searchPath) {
        layers.map((layer, i) => {
            let currentStack = layers[i];
    
            switch(currentStack.name) {
                case "bound dispatch":
                    if(currentStack.route.path === searchPath) {
                        layers.splice(i, 1);
                        return i;
                    }
                break;
    
                case "router":
                    let index = purgeRoute(currentStack.handle.stack, path);
                    // If index not null
                    if(!!index)
                        return index;
                break;
            }
        })

        return null;
    }
    
    // For each path in router, purge app stack first
    router.stack.map(layer => {
        if(layer.name === "bound dispatch" && typeof layer.route.path !== "undefined") {
            let i = purgeRoute(app._router.stack, layer.route.path);
            console.log(i);
        }
    })

    app.use(newPath, router);
}