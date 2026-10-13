---
"@livekit/react-native-expo-plugin": minor
---

ios: Add the livekit/podspecs source to the Podfile, since newer `LiveKitWebRTC` versions are only published there. CocoaPods trunk is also added when the Podfile had no sources of its own. Set `ios.addPodSources` to `false` to manage Podfile sources yourself.
