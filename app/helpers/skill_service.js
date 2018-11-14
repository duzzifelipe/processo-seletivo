const { ENDPOINT } = require('./_config');
const axios = require('axios');
const { cache, getCache } = require('./cache_service');

/**
 * Calls the endpoint and filter all objects to retrieve
 * all different skills inside the lists
 */
module.exports = () => {
    return new Promise((resolve, reject) => {
        // call the endpoint
        axios.get(ENDPOINT, { timeout: 1000 })
            .then(response => {
                try {
                    const skills = parseSkills(response.data);
                    cache('skills', skills); // store the skill list (not the raw http response)
                    resolve(skills)

                } catch (e) {
                    // if there is a error parsing the data, reject it
                    reject('Error parsing data')
                }
            })
            .catch(error => {
                // if there is a error (related to http request)
                // try to use the memory cache
                const skills = getCache('skills');

                if (skills) {
                    // if there is a skill list, send it
                    resolve(skills)

                } else {
                    // if there is no cache, throw the error
                    reject(error);
                }
            })
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