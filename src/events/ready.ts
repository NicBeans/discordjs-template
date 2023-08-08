import { Client } from 'discord.js';

import { BotEvent } from '../types/types.js';
import { color } from '../utils/functions.js';

const event: BotEvent = {
    name: 'ready',
    once: true,
    execute: (client: Client) => {
        console.log(color('success', `💪 Logged in as ${color('primary', client.user?.tag)}`));
    },
};

export default event;
