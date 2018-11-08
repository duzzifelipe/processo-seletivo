const PeopleService = require('../helpers/people.service');

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
        .catch(error => res.json({ error: true, message: error }))
}

const parseParameters = req => {
    return { filter: {}, order: {} }
}