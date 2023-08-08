import { Client } from 'discord.js';
import fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify';
import { createRequire } from 'node:module';

import { Config } from '../types/config.js';
import { color } from '../utils/functions.js';

const require = createRequire(import.meta.url);
const config: Config = require('../../config/config.json');

export default async (client: Client): Promise<void> => {
    const enabled = config.server.enabled ?? false;
    if (!enabled) {
        return console.log(
            color('background', `🦁 ${color('primary', 'Fastify')} disabled, skipping`),
        );
    }

    const server: FastifyInstance = fastify({ logger: config.server.logging });

    const opts: RouteShorthandOptions = {
        schema: {
            response: {
                200: {
                    type: 'object',
                    properties: {
                        pong: {
                            type: 'string',
                        },
                    },
                },
            },
        },
    };

    server.get('/ping', opts, async (_request, _reply) => {
        return { pong: 'it worked!' };
    });

    try {
        await server.listen({ port: config.server.port });
        client.server.set('server', server);
        console.log(color('success', `🦁 ${color('primary', 'Fastify')} started successfully`));
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};
