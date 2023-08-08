import mongoose from 'mongoose';
import { createRequire } from 'node:module';

import { Config } from '../types/config.js';
import { color } from '../utils/functions.js';

const require = createRequire(import.meta.url);
const config: Config = require('../../config/config.json');

export default (): void => {
    const enabled = config.mongo.enabled ?? false;
    if (!enabled) {
        return console.log(
            color('background', `🍃 ${color('primary', 'Mongo')} disabled, skipping`),
        );
    }

    const MONGO_URI = process.env.MONGO_URI;
    if (!MONGO_URI) {
        return console.log(
            color('background', `🍃 ${color('primary', 'Mongo')} URI not found, skipping`),
        );
    }
    mongoose
        .connect(`${MONGO_URI}/${process.env.MONGO_DATABASE_NAME}`)
        .then(() =>
            console.log(color('success', `🍃 ${color('primary', 'Mongo')} connection established`)),
        )
        .catch(() =>
            console.log(color('error', `🍃 ${color('primary', 'Mongo')} connection failed`)),
        );
};
