# @livekit/react-native-expo-plugin

## 1.0.3

### Patch Changes

- android: Fix build failure on Android Gradle Plugin 9+ for Expo 58+ - [#25](https://github.com/livekit/client-sdk-react-native-expo-plugin/pull/25) ([@gabrieldonadel](https://github.com/gabrieldonadel))

- Import from `expo/config-plugins` instead of the undeclared `@expo/config-plugins` package, fixing plugin resolution on Expo SDK 57+ - [#28](https://github.com/livekit/client-sdk-react-native-expo-plugin/pull/28) ([@davidliu](https://github.com/davidliu))

- Allow `@livekit/react-native` 3.x as a peer dependency. The 3.0.0 release only changes native WebRTC artifacts; the entry points this plugin calls (`LiveKitReactNative.setup` on Android and `LivekitReactNative.setup` on iOS) are unchanged. Without this, `npm install` fails with ERESOLVE in any Expo project using 3.x. - [#26](https://github.com/livekit/client-sdk-react-native-expo-plugin/pull/26) ([@MaxHeimbrock](https://github.com/MaxHeimbrock))

## 1.0.2

### Patch Changes

- android: Clean up deprecated lintOptions usage - [#18](https://github.com/livekit/client-sdk-react-native-expo-plugin/pull/18) ([@davidliu](https://github.com/davidliu))

- android: catch possible exception when grabbing metadata - [#18](https://github.com/livekit/client-sdk-react-native-expo-plugin/pull/18) ([@davidliu](https://github.com/davidliu))

- android: Make android manifest processor idempotent - [#18](https://github.com/livekit/client-sdk-react-native-expo-plugin/pull/18) ([@davidliu](https://github.com/davidliu))

- android: Add enableScreenShareService flag - [#22](https://github.com/livekit/client-sdk-react-native-expo-plugin/pull/22) ([@davidliu](https://github.com/davidliu))

- iOS: Add enableMultitaskingCameraAccess flag - [#21](https://github.com/livekit/client-sdk-react-native-expo-plugin/pull/21) ([@davidliu](https://github.com/davidliu))
