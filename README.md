# Expo Plugin for LiveKit React Native SDK

This plugin handles the setup required for Expo projects to use the [LiveKit React Native SDK](https://github.com/livekit/client-sdk-react-native).

## Installation for managed Expo projects

```sh
npx expo install @livekit/react-native @livekit/react-native-expo-plugin
```

[@config-plugins/react-native-webrtc](https://www.npmjs.com/package/@config-plugins/react-native-webrtc) is also highly suggested to be installed alongside this plugin.

### Configure app.json

After installing this npm package, add the config plugin to the plugins array of your app.json or app.config.js:

```
{
  "expo": {
    "plugins": ["@livekit/react-native-expo-plugin"]
  }
}
```

This plugin optionally takes in an [object to customize the configuration](
https://github.com/livekit/client-sdk-react-native-expo-plugin/blob/main/plugin/src/index.ts):

```
{
  "expo": {
    "plugins": [
      [
        "@livekit/react-native-expo-plugin",
        {
          "android": {
            "audioType": <"media" or "communication"> (defaults to "communication")
          }
        }
      ]
    ]
  }
}
```

## Installation in React Native projects

Config plugins are not supported in React Native projects. Read the [installation guide on the React Native SDK](https://github.com/livekit/client-sdk-react-native?tab=readme-ov-file#installation) to see how to setup in a React Native project.
