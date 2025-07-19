const fs = require('fs');
const path = require('path');
const axios = require('axios');

async function checkForUpdate() {
  const configPath = path.join(__dirname, 'config', 'config.json');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  const currentVersion = config.version;

  try {
    const response = await axios.get('http://localhost:4000/version');
    const latestVersion = response.data.version;

    console.log('📦 Current Version:', currentVersion);
    console.log('🌐 Latest Version:', latestVersion);

    if (latestVersion !== currentVersion) {
      console.log('🔄 Update Available!');
      // You can later add logic here to download and apply the update
    } else {
      console.log('✅ You are up to date.');
    }
  } catch (error) {
    console.error('❌ Failed to check version:', error.message);
  }
}

checkForUpdate();