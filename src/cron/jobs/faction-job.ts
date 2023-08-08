import dayjs from 'dayjs';
import { Client } from 'discord.js';

import { Job } from '../job.js';

export default class FactionJob extends Job {
    public name = 'Faction Job';
    public schedule = '*/1 * * * *';
    public log = false;
    public runOnce = false;
    public initialDelaySecs = 10;

    constructor(public client: Client) {
        super();
    }

    public async execute(): Promise<void> {
        console.log(dayjs().format('HH:mm:ss:SSS'), 'Hello Faction');
    }
}
