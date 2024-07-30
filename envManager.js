const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const path = require('path');

class EnvManager {
    constructor(envPath = '.env' || '.env.local') {
        this.envPath = path.resolve(process.cwd(), envPath);
    }

    read() {
        try {
            const data = fs.readFileSync(this.envPath, 'utf8');
            return this.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                return {};
            }
            throw error;
        }
    }

    write(envObject) {
        const content = Object.entries(envObject)
            .map(([key, value]) => `${key}=${value}`)
            .join('\n');
        fs.writeFileSync(this.envPath, content);
    }

    update(updateObject) {
        const currentEnv = this.read();
        const updatedEnv = { ...currentEnv };
        for (const [key, value] of Object.entries(updateObject)) {
            updatedEnv[key] = `"${value}"`;
        }
        this.write(updatedEnv);
        console.log('Updated .env file with:', updateObject);
    }

    parse(content) {
        const result = {};
        const lines = content.split('\n');
        for (const line of lines) {
            const trimmedLine = line.trim();
            if (trimmedLine && !trimmedLine.startsWith('#')) {
                const [key, ...valueParts] = trimmedLine.split('=');
                result[key.trim()] = valueParts.join('=').trim();
            }
        }
        return result;
    }

    get(key) {
        const env = this.read();
        return env[key];
    }

    set(key, value) {
        const env = this.read();
        env[key] = value;
        this.write(env);
    }
}

class ApiKeyManager {
    constructor() {
        this.prisma = new PrismaClient();
        this.envManager = new EnvManager();
    }
    checkSecurefyApiKey() {
        const envContent = this.envManager.read();
        const securefyApiKey = envContent['SECUREFY_API_KEY'];

        if (securefyApiKey) {
            console.log('SECUREFY_API_KEY found in .env file', securefyApiKey);
            return securefyApiKey;
        } else {
            console.log('SECUREFY_API_KEY not found in .env file');
            return null;
        }
    }
    async checkAndUpdateSecurefyKeys() {
        try {
            let envSecurefyApiKey = this.checkSecurefyApiKey();
            if (envSecurefyApiKey && envSecurefyApiKey.startsWith('"') && envSecurefyApiKey.endsWith('"')) {
                envSecurefyApiKey = envSecurefyApiKey.slice(1, -1);
            }
            console.log(envSecurefyApiKey);
            if (!envSecurefyApiKey) {
                console.log('No SECUREFY_API_KEY found in .env file');
                return;
            }

            console.log('Querying database for matching API key...');
            const apiKey = await this.prisma.apiKey.findFirst({
                where: {
                    securefyApiKey: envSecurefyApiKey
                },
                select: {
                    apiKeyName: true,
                    generatedKey: true,
                    securefyApiKey: true,
                },
            });
            console.log('found', apiKey);

            if (!apiKey) {
                console.log('No matching API key found in the database');
                return;
            }

            console.log('Matching API key found:', apiKey);

            // Update .env file if the key name is different
            if (apiKey.apiKeyName !== 'SECUREFY_API_KEY') {
                this.envManager.update({
                    [apiKey.apiKeyName]: apiKey.generatedKey,
                    SECUREFY_API_KEY: apiKey.securefyApiKey
                });
                console.log('Updated .env file with the correct key name');
            }
        } catch (error) {
            console.error('Error checking and updating Securefy key:', error);
        } finally {
            await this.prisma.$disconnect();
        }
    }
}
// Usage
async function main() {
    const apiKeyManager = new ApiKeyManager();
    await apiKeyManager.checkAndUpdateSecurefyKeys();
}

main();