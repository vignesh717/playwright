// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  timeout: 30*1000,
  expect:{
    timeout: 5000,
  },
  reporter: 'html',
  use: {
    browserName: 'chromium',
    headless: false,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',//on,off
    // launchOptions: {
    // args: ['--incognito'],
    // },
    // screenshot: 'on',
    // trace: 'on',
    //All the actions other than expect will be performed within 10 seconds. Fails if not completed in 10 seconds.
    // actionTimeout: 10 * 1000,
    //after navigation, wait for network to be idle for 10 seconds before performing any action.
    // navigationTimeout: 10 * 1000,
  },
});
module.exports = config;

