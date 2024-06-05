import dotenv from 'dotenv';
import { join } from 'path';
import { InternalError } from '../models/api-error';

export enum EnvironmentType {
    DEVELOP = 'develop',
    PRODUCTION = 'production'
}

// set node env to develop by default
const env = dotenv.config({ path: join(__dirname, '..', 'environment', `.env.${process.env.NODE_ENV || EnvironmentType.DEVELOP}`) });

if (env.error) {
    throw new InternalError("missing .env file. Create 'environment' directory inside 'src' and make a file titled '.env.develop' containing all configurations. See read mee for more details.");
}

export const DefaultConfig = {
    port: parseInt(process.env.PORT as string, 10),
    mongoConnectionString: process.env.MONGO_CONNECTION_STRING as string,
    accessTokenExpiresSeconds: parseInt(process.env.ACCESS_TOKEN_EXPIRES_SECONDS as string, 10),
    refreshTokenExpiresSeconds: parseInt(process.env.REFRESH_TOKEN_EXPIRES_SECONDS as string, 10),
    jwtKey: process.env.JWT_KEY as string,
    environment: process.env.NODE_ENV || EnvironmentType.DEVELOP,
    vid: process.env.VID as string,
    scope: process.env.SCOPE as string,
    primo_api_key: process.env.PRIMO_API_KEY as string,
}