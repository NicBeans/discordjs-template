import {
    AutocompleteInteraction,
    ChatInputCommandInteraction,
    Collection,
    Message,
    PermissionResolvable,
    SlashCommandBuilder,
} from 'discord.js';
import { FastifyInstance } from 'fastify';
import mongoose from 'mongoose';

export interface BotModule {
    default: BotEvent;
}

export interface SlashCommandModule {
    default: SlashCommand;
}

export interface SlashCommand {
    command: SlashCommandBuilder;
    execute: (interaction: ChatInputCommandInteraction) => void;
    autocomplete?: (interaction: AutocompleteInteraction) => void;
    cooldown?: number;
}

export interface CommandModule {
    default: Command;
}

export interface Command {
    name: string;
    execute: (message: Message, args: Array<string>) => void;
    permissions: Array<PermissionResolvable>;
    aliases: Array<string>;
    cooldown?: number;
}

interface GuildOptions {
    prefix: string;
}

export interface IGuild extends mongoose.Document {
    guildID: string;
    options: GuildOptions;
    joinedAt: Date;
}

export type GuildOption = keyof GuildOptions;
export interface BotEvent {
    name: string;
    once?: boolean;
    execute: (...args) => void;
}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            TOKEN: string;
            CLIENT_ID: string;
            PREFIX: string;
            MONGO_URI: string;
            MONGO_DATABASE_NAME: string;
        }
    }
}

declare module 'discord.js' {
    export interface Client {
        slashCommands: Collection<string, SlashCommand>;
        commands: Collection<string, Command>;
        cooldowns: Collection<string, number>;
        server: Collection<string, FastifyInstance>;
        enmap: Collection<string, object>;
    }
}

export type colorType = 'text' | 'variable' | 'error';
