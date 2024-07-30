const EnvManager = require('./envManager');

const envManager = new EnvManager();

// Read all environment variables
console.log('All environment variables:');
console.log(envManager.read());

// Update specific variables
console.log('\nUpdating API_KEY and DEBUG...');
envManager.update({
    API_KEY: 'new_api_key',
    DEBUG: 'true'
});

// Get a specific variable
console.log('\nGetting API_KEY:');
console.log(envManager.get('API_KEY'));

// Set a specific variable
console.log('\nSetting NEW_VAR...');
envManager.set('NEW_VAR', 'some_value');

// Read all variables again to show changes
console.log('\nAll environment variables after changes:');
console.log(envManager.read());