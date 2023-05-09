const jwt = require('jsonwebtoken');

/**
 * @param {*} req request object
 * @param {*} res response object
 * @param {*} next next function to be executed after the middleware
 * @description this middleware function is responsible for api authentication.
 * it checks for the auth token sent along with the secure api request header.
 * if it matches the token at the token in the server, the control goes to the
 * corresponding api controller, else the request is blocked.
 */
function verifyToken(req, res, next) {
    const authToken = req.headers.authorization;
    if (authToken) {
        // * verify token
        const tokenVerified = jwt.verify(
            authToken,
            process.env.AUTH_KEY,
            (err, data) => {
                if (err) {
                    res.status(403).json({
                        status: 'failure',
                        message: 'Unauthorized! invalid token',
                    });
                } else {
                    next();
                }
            }
        );
    } else {
        res.status(401).json({
            status: 'failure',
            message: 'Unauthorized! token not found',
        });
    }
}

module.exports = verifyToken;
