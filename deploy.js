var FtpDeploy = require("ftp-deploy");
var ftpDeploy = new FtpDeploy();

var config = {
    user: "u383248996",
    // Password optional, prompted if none given
    password: "",
    host: "tamilfire.com",
    port: 21,
    localRoot: __dirname + "/build",
    remoteRoot: "/domains/tamilfire.com/public_html/gallery/",
    include: ["*", "**/*", ".*"],      // this would upload everything except dot files
    // include: ["*.php", "dist/*", ".*"],
    // e.g. exclude sourcemaps, and ALL files in node_modules (including dot files)
    exclude: ["dist/**/*.map", "node_modules/**", "node_modules/**/.*", ".git/**"],
    // delete ALL existing files at destination before uploading, if true
    deleteRemote: false,
    // Passive mode is forced (EPSV command is not sent)
    forcePasv: true
};

ftpDeploy
    .deploy(config)
    .then(res => console.log("finished:", res))
    .catch(err => console.log(err));