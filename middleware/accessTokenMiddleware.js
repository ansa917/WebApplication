const { verifyAccessToken } = require('../functions/security.js');
/**
 * Check the access token and redirect to login if it is invalid
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
const accessTokenMiddleware = (req, res, next) => {
    if (req.headers.cookie) {
        const token = req.headers.cookie.split('=')[1];
        if (token) {
            try {
                const decoded = verifyAccessToken(token);
                res.locals.username = decoded.username;
                next();
            } catch (err) {
                res.redirect('/login');
            }
        } else {
            res.redirect('/login');
        }
    } else {
        res.redirect('/login');
    }
};

module.exports = accessTokenMiddleware;