const { ENDPOINT } = require("./_config");
const request = require('request');

/**
 * Calls the endpoint and filter all objects to retrieve
 * all different skills inside the lists
 */
module.exports = () => {
    return new Promise((resolve, reject) => {
        // call the endpoint
        request(ENDPOINT, { json: true, timeout: 2500 }, (err, _res, body) => {
            if (err) {
                reject(err);

            } else {
                // resolve the promise with
                // parsed data
                resolve(parseSkills(body))
            }
        });
    });
};

/**
 * Filter all objects inside the array
 * getting the "skills" array content
 * and then selecting only a unique ocurrence
 * @param {object} body 
 */
const parseSkills = body => {
    // this function first map into an array of array of skills
    // then after acumulate each item inside a obj
    // then finally sort it
    return body.map(row => row.skills).reduce((obj, elem) => {
        elem.forEach(skill => {
            // only push if it isn't null and doesn't exist
            if (skill != '' && !obj.includes(skill)) {
                obj.push(skill)
            }
        })

        return obj;
    }, []).sort();
}