export interface Config {
    developers: string[];
    enmap: Enmap;
    server: Server;
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

export interface Jobs {
    schedule: string;
    log: boolean;
    runOnce: boolean;
    initialDelaySecs: number;
}

export interface ThemeColors {
    text: string;
    variable: string;
    error: string;
}
