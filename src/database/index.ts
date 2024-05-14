import mongoose from 'mongoose';
import { DefaultConfig } from './../config';

export async function initDB() {
    const connectionString: string = DefaultConfig.mongoConnectionString;
    await mongoose.connect(connectionString).then(() => {
        console.log('MongoDB connection successful');
    }).catch((e) => {
        console.log('MongoDB connection failed');
    });
}

export default initDB;
