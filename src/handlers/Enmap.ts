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
        return console.log(color('text', `📜 Enmap disabled, ${color('error', 'skipping.')}`));
    }

    client.enmap.set('example', new Enmap());

    // const example = client.enmap.get('example') as Enmap;
    // example.set('example', 'Optimus Prime');

    // console.log(example.get('example'));
};
