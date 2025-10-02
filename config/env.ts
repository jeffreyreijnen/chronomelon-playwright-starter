import dotenv from 'dotenv';

dotenv.config();

export type AppEnv = {
  BASE_URL_SAUCE: string;
  BASE_URL_INTERNET: string;
  BASE_URL_REQRES: string;
  ENABLE_ALLURE: boolean;
  CI: boolean;
};

function getBoolean(name: string, defaultValue: boolean): boolean {
  const raw = process.env[name];
  if (raw === undefined) return defaultValue;
  return /^(1|true|yes)$/i.test(raw);
}

export const env: AppEnv = {
  BASE_URL_SAUCE: process.env.BASE_URL_SAUCE ?? 'https://www.saucedemo.com',
  BASE_URL_INTERNET:
    process.env.BASE_URL_INTERNET ?? 'https://the-internet.herokuapp.com',
  BASE_URL_REQRES: process.env.BASE_URL_REQRES ?? 'https://reqres.in',
  ENABLE_ALLURE: getBoolean('ENABLE_ALLURE', false),
  CI: getBoolean('CI', false),
};

export default env;


