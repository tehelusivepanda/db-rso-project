const { verify } = require("jsonwebtoken");

const validate = (req, res, next) => {
    const access = req.header("access");

    if (!access)
        return res.json({ error: "Please login to continue." });

    try {
        const validToken = verify(access, "swag");
        req.user = validToken;

        if (validToken)
            return next();
    } catch (err) {
        return res.json( { error: err });
    }
}

module.exports = { validate };