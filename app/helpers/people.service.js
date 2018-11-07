const ENDPOINT = "https://gist.githubusercontent.com/renatomenegasso/fb09abe8fb525bfa00f622cee6b5104f/raw/dcff5d9885e3178c38e12ba45f874268b04e53ae/subscribe.json";
const request = require('request');

/**
 * This module receives two arguments to filter or order the query.
 * If they are undefined, no filter or order will be applyied by default.
 * 
 * An example of filter (accepts an array for skills):
 * {
 *    name: "Felipe"
 *    .. or ..
 *    skill: ["ruby", "backend"]
 *    .. or ..
 *    skill: "ruby"
 * }
 * 
 * An example of ordering:
 * {
 *   name: -1 // descending
 *   .. or ..
 *   name: 1 // ascending
 * }
 */
module.exports = (filter, order) => {
    // must return a promise
    return new Promise((resolve, reject) => {
        // call the base request
        makeRequest((err, body) => {
            if (err) {
                reject('Failed to receive server data')

            } else {
                // elixir would help here xD
                //
                // filterBody(body)
                // |> applyFilters(filter)
                // |> applyOrder(order)
                // |> resolve()
                //
                resolve(applyOrder(applyFilters(filterBody(body), filter), order))
            }
        })
    })
};

/**
 * Calls the api endpoint
 * @param {function} cb Function to be called after the request
 */
const makeRequest = (cb) => {
    request(ENDPOINT, { json: true }, (err, _res, body) => {
        // return with error and the body
        cb(err, body);
    })
};

/**
 * Filters the body data to keep only needed fields
 * Calls a filter for each element from people's array
 * @param {object} body A json object containing people data
 */
const filterBody = body => body.map(row => filterEachRow(row));

/**
 * Receives a object to filter it's keys
 * @param {object} data A person object
 */
const filterEachRow = data => {
    // list of desired keys
    const keys = ["name", "age", "avatarUrl", "skills"];

    // this row first get all keys from this object into an array
    // then this array is filtered based on the list of needed keys
    // after it, a reduce function builds the object again from the 
    //  filtered list and the original data
    return Object.keys(data).filter(key => keys.includes(key))
        .reduce((obj, key) => {
            obj[key] = data[key];
            return obj;
        }, {})
};

/**
 * Receives a object containing a field => value association
 * and returns a filtered object
 *  * If the value is an array and the data field too, it must match any (not every)
 *  * If the value is anything else, must exactly match
 *  * If the key doesn't exist on the data object, will return null (will try to match undefined)
 * @param {object} filter 
 * @param {array} data 
 */
const applyFilters = (data, filter) => {
    // check if there is any filter
    if (filter == null) {
        return data;
    }

    Object.keys(filter).forEach(filter_key => {
        const filter_val = filter[filter_key];

        data = data.filter(row => {
            if (Array.isArray(row[filter_key]) && Array.isArray(filter_val)) {
                // verifies if a value from the row
                // matches with any value from the filter
                // * both need to be an array to match
                return row[filter_key].some(item => filter_val.includes(item))

            } else {
                // for a common field
                return row[filter_key] == filter_val;
            }
        })
    });

    return data;
};


/**
 * Receives a object containing a field => order association
 * and returns a ordered object
 * This function respects the key order of the object
 * 
 * @param {object} order An object containing a field and the direction
 * @param {array} data People list
 */
const applyOrder = (data, order) => {
    if (order == null) {
        return data;
    }
    Object.keys(order).forEach(order_key => {
        // assign and validate the direction (needs to be 1, -1)
        const direction = [1, -1].includes(order[order_key]) ? order[order_key] : 1;

        data.sort((a, b) => {
            if (a[order_key] < b[order_key]) {
                return -1 * direction;

            } else if (a[order_key] > b[order_key]) {
                return 1 * direction;

            } else {
                return 0;
            }
        });
    });

    return data;
}