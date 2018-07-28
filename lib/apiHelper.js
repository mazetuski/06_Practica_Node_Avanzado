'use strict';

/**
 * Function that gets a filter for schema from request query params
 * @param paths Paths value of a schema
 * @param req Request
 */
module.exports.getFilterForSchema = (paths, req) => {
    const filter = {};
    // check params
    if (!paths || !req) {
        return filter;
    }
    // loop all schema properties for add in filter if exists on params request
    Object.entries(paths).forEach(([key]) => {
            // check if key is defined in params, if not then continue next loop
            if (!req.query[key]) {
                return;
            }
            // Add filter
            filter[key] = req.query[key];
        }
    );
    // return filter with all values
    return filter;
};

/**
 * Function for know if request is from an api
 * @param req
 * @returns {boolean}
 */
module.exports.isApi = (req) => {
    return req.originalUrl.indexOf('/apiv') === 0;
};