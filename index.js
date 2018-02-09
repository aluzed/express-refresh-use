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

    function purgeRoute(layers, newPath, newSource) {
        let found = [];

        layers.map((layer, i) => {
            let currentStack = layers[i];

            console.log(newPath);
            console.log(newSource);

            switch(currentStack.name) {
                case "router":  
                    // Only if newPath is not null (1st level)
                    if(!!newPath) {
                        if(currentStack.regexp.source === newPath) {
                            purgeRoute(currentStack.handle.stack, null, newSource);
                        }
                    }
                break;

                case "bound dispatch":
                    // Only if we are already in a path
                    if(!newPath) {
                        if(currentStack.regexp.source === newSource) {
                            layers.splice(i, 1);
                            found.push(i);
                        }
                    }
                break;
            }
        });

        return found.length > 0 ? found : null;
    }

    function strToRegexpStr(str) {
        if(str.length === 0)
            return;

        if(str[0] === '/') {
            str = '^\\' + str;
        }

        if(str[str.length - 1] === '/') {
            str = str.substring(0, str.length - 1);
        }
        
        str += '\\/?(?=\\/|$)';
        
        return str;
    }

    // For each path in router, purge app stack first
    router.stack.map(layer => {
        if(layer.name === "bound dispatch" && typeof layer.route.path !== "undefined") {
            purgeRoute(app._router.stack, strToRegexpStr(newPath), layer.regexp.source);
        }
    })

    app.use(newPath, router);
}
