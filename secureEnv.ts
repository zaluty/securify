import path from 'path';

class SecureEnv {
    private env: { [key: string]: string } = {};

    constructor() {
        if (typeof window === 'undefined') {
            this.loadEnv();
        }
    }

    private loadEnv() {
        if (typeof window === 'undefined') {
            const fs = require('fs');
            const envPath = path.resolve(process.cwd(), 'secure.env');
            try {
                const envContent = fs.readFileSync(envPath, 'utf8');
                const lines = envContent.split('\n');

                for (const line of lines) {
                    const [key, value] = line.split('=').map(part => part.trim());
                    if (key && value) {
                        this.env[key] = value;
                    }
                }
            } catch (error) {
                console.error('Error loading secure.env file:', error);
            }
        }
    }

    get(key: string): string | undefined {
        return this.env[key];
    }
}

export const secure = {
    env: new SecureEnv()
};