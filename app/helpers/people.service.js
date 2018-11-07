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
                resolve(filterBody(body))
            }
        })
    })
}

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
 * @param {object} body A json object containing people data
 */
const filterBody = body => {
    // call a filter for each element from people's array
    return body.map(row => filterEachRow(row))
}

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
}