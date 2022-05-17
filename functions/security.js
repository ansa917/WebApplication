const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
dotenv.config();

const users = {
    admin: process.env.ADMIN_PASS,
    user: process.env.USER_PASS
}


/**
 * Generate access token
 *
 * @param {String} username
 * @return {String} access token
 */
function generateAccessToken(username) {
    const signature = [
        { username },
        process.env.TOKEN_SECRET,
        { expiresIn: "5h" }
    ]
    return jwt.sign(...signature);
}

function verifyAccessToken(token) {
    return jwt.verify(token, process.env.TOKEN_SECRET);
}

function checkPass(user="", pass="") {
    try {
        const encPass = users[user];
        if (encPass && bcrypt.compareSync(pass, encPass)) {
            return true;
        } else {
            return false;
        }
    }
    catch (err) {
        return false;
    }
}


module.exports = {
    generateAccessToken,
    checkPass,
    verifyAccessToken
};
