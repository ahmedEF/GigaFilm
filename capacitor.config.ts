import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'FirstApp',
  webDir: 'www',
  android: {
    allowMixedContent: true,
  },
};

export default config;
