const path = require("path");
const nconf = require("nconf");

const filename = path.join(__dirname, "../", "config.json");
nconf.file({ file: filename });

module.exports = nconf;
