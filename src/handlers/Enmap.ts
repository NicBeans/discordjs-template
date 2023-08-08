import { Client } from 'discord.js';
import Enmap from 'enmap';
import { createRequire } from 'node:module';

import { Config } from '../types/config.js';
import { color } from '../utils/functions.js';

const require = createRequire(import.meta.url);
const config: Config = require('../../config/config.json');

export default async (client: Client): Promise<void> => {
    const enabled = config.enmap.enabled ?? false;
    if (!enabled) {
        return console.log(
            color('background', `🍃 ${color('primary', 'Enmap')} disabled, skipping`),
        );
    }
    /**
     * @description
     * This is an example of how to use Enmap.
     */
    client.enmap.set(
        'members',
        new Enmap({
            name: 'members',
            fetchAll: true,
            autoFetch: true,
        }),
    );
};
