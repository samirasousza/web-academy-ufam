function toUpper(str) {
    return str.toUpperCase(); 
}

function toLower(str) {
    return str.toLowerCase(); 
}

function createLink(filename) {
    return `<a href="/${filename}">${filename}</a><br>\n`;
}

module.exports = {
    toUpper,
    toLower,
    createLink
}