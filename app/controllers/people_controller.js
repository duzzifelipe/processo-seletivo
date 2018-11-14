const PeopleService = require('../helpers/people_service');

/**
 * This function will be invoked by an express route
 * that wants to get data about people from a github source
 */
module.exports.index = (req, res) => {
    // Parse filters and orders from the url query
    const { filter, order } = parseParameters(req);

    // Get result from people service and send as json response
    PeopleService(filter, order)
        .then(people => res.json({ error: false, data: people }))
        .catch(error => res.json({ error: true, message: 'Failed to retrieve people list' }))
}

/**
 * This function will extract filters and orders from the url
 * The format needs to be a url-encoded json object.
 * For example: "filter%5Bname%5D=Felipe" means { filter: { name: 'Felipe' } }
 * @param {object} req Express request object
 */
const parseParameters = req => {
    const filter = parseRequestObject(req, 'filter');
    const order = parseRequestObject(req, 'order');
    return { filter, order }
};

/**
 * This function receives a request object and a key name
 * and will check if the key provided is part of request
 * query and if it is a json object
 * @param {object} req Express request object
 * @param {object} key Object key to be validated and extracted
 */
const parseRequestObject = (req, key) => {
    const query = req.query;

    // check if the key is present
    // and if it is a not-empty json object
    if (Object.keys(query).includes(key) &&
        typeof (query[key]) === 'object' &&
        !Array.isArray(query[key]) &&
        query[key] != null &&
        Object.keys(query[key]).length > 0) {

        return query[key];
    }

    // return a empty object by default
    return {};
}
