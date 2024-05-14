import dotenv from 'dotenv';
import { join } from 'path';

// set node env to develop by default
const env = dotenv.config({ path: join(__dirname, '..', 'environment', `.env.${process.env.NODE_ENV || 'develop'}`) });

if (env.error) {
    throw new Error("missing .env file. Create 'environment' directory inside 'src' and make a file titled '.env.develop' containing all configurations. See read mee for more details.");
}

export const DefaultConfig = {
    port: parseInt(process.env.PORT as string, 10),
    mongoConnectionString: process.env.MONGO_CONNECTION_STRING as string,
}