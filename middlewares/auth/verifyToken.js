const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    const authToken = req.headers.authorization;
    console.log(req.headers);
    if (authToken) {
        // * verify token
        const tokenVerified = jwt.verify(
            authToken,
            process.env.AUTH_KEY,
            (err, data) => {
                if (err) {
                    res.status(400).json({ msg: "invalid token" });
                } else {
                    // console.log(data);
                    next();
                }
            }
        );
    } else {
        res.status(400).json({ msg: "token not found" });
    }
}

module.exports = verifyToken;
