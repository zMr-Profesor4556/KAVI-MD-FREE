const mongoose = require('mongoose');
const config = require('../config');
const EnvVar = require('./mongodbenv');

const defaultEnvVariables = [
    { key: 'ALIVE_IMG', value: 'https://files.catbox.moe/2d7onp.jpg' },
    { key: 'PREFIX', value: ',' },
    { key: 'MODE', value: 'private' },
    { key: 'AUTO_READ_STATUS', value: 'true' },
    { key: 'AUTO_REACT_STATUS', value: 'true' },
    { key: 'LANGUAGE', value: 'english' },
    { key: 'AUTO_REACT', value: 'false' }, 
    { key: 'FAKE_RECORDING', value: 'false' },
    { key: 'AUTO_TYPING', value: 'false' },
    { key: 'ANTI_LINK', value: 'false' },
    { key: 'AUTO_VOICE', value: 'false' },
    { key: 'AUTO_REPLY', value: 'true' },
    { key: 'ANTI_BAD', value: 'false' },
    { key: 'READ_MESSAGE', value: 'false' },
    { key: 'ALWAYS_ONLINE', value: 'false' },
    { key: 'ANTI_DELETE', value: 'true' },
    { key: 'DELETEMSGSENDTO', value: 'none' },
    { key: 'INBOX_BLOCK', value: 'false' },
    { key: 'ANTI_BOT', value: 'false' },
    { key: 'AUTO_TIKTOK', value: 'false' },
    { key: 'AUTO_NEWS_ENABLED', value: 'false' },
    { key: 'SEND_START_NEWS', value: 'false' },
    { key: 'AUTO_NEWS_GROUP_JID', value: '120363414537985@g.us' },
    { key: 'AUTO_TIKTOK_JID', value: '1203634745398875@g.us' },
    { key: 'MOVIE_FOOTER', value: '> ī.am ~𝐌𝖗 𝐍-𝐓𝖊𝖈𝖍 𝐎𝖋𝖈👨‍💻ᴹᴴᵀ~' },
    { key: 'BOT_NAME', value: 'N-TECH' },
    { key: 'MENU_IMG', value: 'https://files.catbox.moe/2d7onp.jpg' },
    { key: 'OWNER_REACT', value: 'true' },
    { key: 'FOOTER', value: '> ī.am ~𝐌𝖗 𝐍𝖎𝖕𝖚𝖓 𝐎𝖋𝖈👨‍💻ᴹᴴᵀ~' },
    { key: 'ALIVE_MSG', value: '> ī.am ~𝐌𝖗 𝐍𝖎𝖕𝖚𝖓 𝐎𝖋𝖈👨‍💻ᴹᴴᵀ~' },
    { key: 'OWNER_NAME', value: '𝐌𝖗 𝐍𝖎𝖕𝖚𝖓 𝐎𝖋𝖈ᴹᴴᵀ' },
    { key: 'OWNER_EMOJI', value: '👑' },
    { key: 'HEART_REACT', value: 'true' },
    { key: 'OWNER_NUMBER', value: '94729007640' }
];

const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGODB);
        console.log('〽️ongoDB Connected ✅');

        // Create default values if missing
        for (const envVar of defaultEnvVariables) {
            const existingVar = await EnvVar.findOne({ key: envVar.key });
            if (!existingVar) {
                await EnvVar.create(envVar);
                console.log(`🔰 Created default env var: ${envVar.key}`);
            }
        }

        // Override config.js values from database
        const allVars = await EnvVar.find({});
        allVars.forEach(env => {
            config[env.key] = env.value;
        });

        console.log('🔄 Config synced from database ✅');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
