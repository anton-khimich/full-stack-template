declare namespace NodeJS {
  export interface ProcessEnv {
    readonly TURSO_DATABASE_URL: string;
    readonly TURSO_AUTH_TOKEN: string;
    readonly GITHUB_CLIENT_ID: string;
    readonly GITHUB_CLIENT_SECRET: string;
  }
}
