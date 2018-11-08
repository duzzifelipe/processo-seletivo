/**
 * This module action will invoke the correct ejs template 
 * to be rendered to the frontend with 
 */
module.exports.index = (req, res) => {
    res.render('index', { host: req.headers.host })
};