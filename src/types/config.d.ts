export interface Config {
    developers: string[];
    enmap: Enmap;
    server: Server;
    mongo: Mongo;
    jobs: (string | Jobs)[];
    themeColors: ThemeColors;
}

export interface Enmap {
    enabled: boolean;
}

export interface Server {
    enabled: boolean;
    logging: boolean;
    port: number;
    secret: string;
}

export interface Mongo {
    enabled: boolean;
}

export interface Jobs {
    schedule: string;
    log: boolean;
    runOnce: boolean;
    initialDelaySecs: number;
}

export type ColorType =
    | 'error'
    | 'success'
    | 'primary'
    | 'accent'
    | 'background'
    | 'errorBackground'
    | 'successBackground'
    | 'primaryBackground';

export interface ThemeColors {
    error: string;
    success: string;
    primary: string;
    accent: string;
    background: string;
    errorBackground: string;
    successBackground: string;
    primaryBackground: string;
}
