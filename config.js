const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "eVlGGIKb#JJYayGf0kgQAvMci5jPh7GzNIa8Ic0JHYkaVXEc2v2w", // ඔයාගෙ session id එක
MONGODB: process.env.MONGODB || "mongodb+srv://dbuser002:nipun123n@cluster0.otnwzii.mongodb.net/ ",  //ඔයාගෙ mongoDb url එක
};
