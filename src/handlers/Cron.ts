import { Client } from 'discord.js';
import { readdirSync } from 'node:fs';
import path, { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { CronMan } from '../cron/cron-man.js';
import { Job } from '../cron/job.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async (client: Client): Promise<void> => {
    const jobs: Job[] = [];

    const cronDir = join(__dirname, '../cron/jobs');

    await Promise.all(
        readdirSync(cronDir).map(async file => {
            if (!file.endsWith('.js')) return;
            const jobClass = (await import(`${cronDir}/${file}`)).default;
            jobs.push(new jobClass(client));
        }),
    );

    new CronMan(client, jobs).start();
};
