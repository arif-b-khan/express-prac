const fs = require('fs');
const path = require('path');

const pathToKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
const PUB_KEY =  fs.readFileSync(pathToKey, 'utf-8').toString();

module.exports = {
    secret: PUB_KEY
}