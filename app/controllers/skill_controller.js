const SkillService = require('../helpers/skill_service');

/**
 * This function will be invoked by an express route
 * that wants to get list all available skills
 */
module.exports.index = (req, res) => {
    // Get data from skill list and return a json response
    SkillService()
        .then(skills => res.json({ error: false, data: skills }))
        .catch(error => res.json({ error: true, message: 'Failed to retrieve skills list' }))
};
