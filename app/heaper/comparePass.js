const bcrypt = require('bcrypt');

function createHash(text){
    return bcrypt.hashSync(text, 10);
}

function comparePass(text, hash){
    return bcrypt.compareSync(text, hash);
}

module.exports = {
    createHash,
    comparePass
}