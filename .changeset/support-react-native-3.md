---
"@livekit/react-native-expo-plugin": patch
---

Allow `@livekit/react-native` 3.x as a peer dependency. The 3.0.0 release only changes native WebRTC artifacts; the entry points this plugin calls (`LiveKitReactNative.setup` on Android and `LivekitReactNative.setup` on iOS) are unchanged. Without this, `npm install` fails with ERESOLVE in any Expo project using 3.x.
