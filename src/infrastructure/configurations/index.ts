const { env } = process;
interface IENV {
  PORT: number;
  DATABASE_URL: string;
  VERSION: string;
}
const CONFIGURATIONS: IENV = {
  PORT: Number(env.PORT ?? 3000),
  DATABASE_URL: env.DATABASE_URL ?? "",
  VERSION: process.env.npm_package_version ?? "0.0.1",
};
export default CONFIGURATIONS;
