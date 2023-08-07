import { Client, Collection, GatewayIntentBits } from 'discord.js';
const { Guilds, GuildMessages, MessageContent, GuildMembers, DirectMessages } = GatewayIntentBits;
const client = new Client({
    intents: [Guilds, GuildMessages, MessageContent, GuildMembers, DirectMessages],
});
import { config } from 'dotenv';
import Enmap from 'enmap';
import { readdirSync } from 'node:fs';
import path, { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { Command, SlashCommand } from './types/types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config();

client.slashCommands = new Collection<string, SlashCommand>();
client.commands = new Collection<string, Command>();
client.cooldowns = new Collection<string, number>();
client.server = new Collection<string, any>();
client.enmap = new Collection<string, Enmap<string, any>>();

const handlersDir = join(__dirname, './handlers');
await Promise.all(
    readdirSync(handlersDir).map(async handler => {
        const handlerModule = (await import(`${handlersDir}/${handler}`)) as {
            default: (cLient: Client) => Promise<void>;
        };
        await handlerModule.default(client);
    }),
);

await client.login(process.env.TOKEN);
