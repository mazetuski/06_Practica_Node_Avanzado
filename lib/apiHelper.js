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
    Object.entries(paths).forEach(([key, value]) => {
            // check if key is defined in params, if not then continue next loop
            if (!req.query[key]) {
                return;
            }
            // if is array, split by comma and search all
            if (value.instance === "Array") {
                filter[key] = getFilterFromArray(req.query[key]);
                return;
            }
            // if name then create regexp
            if (key === 'name') {
                filter[key] = getFilterStartWith(req.query[key]);
                return;
            }
            // if price, then create filter ranges
            if (key === 'price') {
                filter[key] = getFilterForRange(req.query[key]);
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

/**
 * Function for get filter from array
 * @param value
 * @returns {{$all: (*|string[])}}
 */
function getFilterFromArray(value) {
    // Get objects that have all values of the array
    const arr = value.split(',');
    return {$all: arr};
}

/**
 * Function for get filter start by value
 * @param value
 * @returns {{name: RegExp}}
 */
function getFilterStartWith(value) {
    return new RegExp('^' + value, "i");
}

/**
 * Function for get filter for range values
 * @param value
 * @returns {*}
 */
function getFilterForRange(value) {
    const arr = value.split('-');
    let filter = {};
    // if not array return
    if (!arr || arr.length <= 0) {
        return;
    // if the value is unique then filter explicit value
    } else if (arr.length === 1) {
        return value;
    }
    // loop al values for create filter
    arr.forEach((elem, keyElem) => {
        console.log(keyElem);
        // check elem
        if (!elem) {
            return;
        }
        // if its the first value then greater than
        if (keyElem === 0) {
            filter = {$gte: elem};
            // if it is the second value then lower than
        } else if (keyElem === 1) {
            filter = {...filter, $lte: elem};
        }
    });
    return filter;
}