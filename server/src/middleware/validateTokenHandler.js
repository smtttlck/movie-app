const jwt = require('jsonwebtoken');

const validateTokenHandler = async (req, res, next) => {
    let token;
    let autHeader = req.headers.Authorization || req.headers.authorization; // get auth in headers
    if (autHeader && autHeader.startsWith("Bearer")) { // check auth 
        token = autHeader.split(" ")[1]; // get token
        jwt.verify(token, process.env.SECRET_TOKEN, (err, decode) => { // verify token
            if (err) {
                res.status(401);
                throw new Error("Admin is not authorized");
            }
            req.admin = decode.admin;
            next();
        });
    }
    if (!token) {
        res.status(401);
        throw new Error("Admin is not authorized or token is missing");
    }
}

module.exports = validateTokenHandler;