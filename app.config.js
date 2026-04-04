const baseConfig = require("./app.json");

export default {
  ...baseConfig.expo,
  plugins: [...(baseConfig.expo?.plugins ?? []), "expo-localization"],
  extra: {
    ...baseConfig.expo?.extra,
    posthogProjectToken: process.env.POSTHOG_PROJECT_TOKEN,
    posthogHost: process.env.POSTHOG_HOST,
  },
};
