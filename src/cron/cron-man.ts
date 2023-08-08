import parser from 'cron-parser';
import dayjs from 'dayjs';
import { Client } from 'discord.js';
import schedule from 'node-schedule';

import { Job } from './job.js';
import { color } from '../utils/functions.js';

export class CronMan {
    constructor(
        public client: Client,
        public jobs: Job[],
    ) {
        if (!jobs.length) {
            console.log(
                color('accent', `🕒 No cron jobs found, ${color('errorBackground', 'skipping.')}`),
            );
        }
    }

    public start(): void {
        for (const job of this.jobs) {
            const jobParser = job.runOnce
                ? parser
                      .parseExpression(job.schedule, {
                          currentDate: dayjs().add(job.initialDelaySecs, 'second').toDate(),
                      })
                      .next()
                      .toDate()
                : {
                      start: dayjs().add(job.initialDelaySecs, 'second').toDate(),
                      rule: job.schedule,
                  };
            schedule.scheduleJob(jobParser, async () => {
                try {
                    if (job.log) {
                        console.log(
                            color('accent', `🕒 Cron Job ${color('primary', job.name)} Started`),
                        );
                    }

                    await job.execute();

                    if (job.log) {
                        console.log(
                            color('accent', `🏁 Cron Job ${color('primary', job.name)} Finished`),
                        );
                    }
                } catch (error) {
                    console.error(color('error', `Error running job ${job.name}: ${error}`));
                }
            });
        }
    }
}
