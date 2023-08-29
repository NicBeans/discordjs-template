import { GuildMember } from 'discord.js';

import { BotEvent } from '../types/types.js';
const ALDROid = '191110608610000896 ';

const event: BotEvent = {
    name: 'guildMemberUpdate',
    once: false,
    execute: (oldName: GuildMember, newName: GuildMember) => {
        (async () => {
            if (oldName.user.id !== ALDROid) return;
            if (oldName.nickname === newName.nickname) return;
            await newName.guild.members.edit(ALDROid, { nick: 'ALDRO' });
        })().catch(console.error);
    },
};

export default event;
