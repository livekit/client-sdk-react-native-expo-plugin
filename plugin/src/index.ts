import {
  withAndroidManifest,
  withInfoPlist,
  AndroidConfig,
  ConfigPlugin,
} from '@expo/config-plugins';

type LKConfigOptions = {
  "android"? : {
    "audioType"?: "media"|"communication"
  };
  "ios"?: {
    "enableMultitaskingCameraAccess"?: boolean;
  };
}

const ANDROID_AUDIO_TYPE_KEY = 'io.livekit.reactnative.expo.ANDROID_AUDIO_TYPE';
const IOS_MULTITASKING_CAMERA_KEY = 'io.livekit.reactnative.expo.ENABLE_MULTITASKING_CAMERA_ACCESS';

const withLiveKit: ConfigPlugin<LKConfigOptions | undefined> = (config, options) => {
  if(options) {
    let androidOptions = options.android
    if(androidOptions) {
      let audioType = androidOptions.audioType
      if (audioType) {
        config = withAndroidManifest(config, (config) => {
          const mainApplication = AndroidConfig.Manifest.getMainApplicationOrThrow(config.modResults);

          // Remove existing entry so the plugin is idempotent (no duplicate meta-data on re-run)
          if (mainApplication['meta-data']) {
            mainApplication['meta-data'] = mainApplication['meta-data'].filter(
              (item: { $?: { 'android:name'?: string } }) =>
                item?.$?.['android:name'] !== ANDROID_AUDIO_TYPE_KEY
            );
          }

          AndroidConfig.Manifest.addMetaDataItemToMainApplication(
            mainApplication,
            ANDROID_AUDIO_TYPE_KEY,
            audioType
          );
          return config;
        });
      }
    }

    const iosOptions = options.ios;
    if (iosOptions && typeof iosOptions.enableMultitaskingCameraAccess === 'boolean') {
      config = withInfoPlist(config, (config) => {
        const plist = config.modResults as Record<string, unknown>;
        if (iosOptions.enableMultitaskingCameraAccess) {
          plist[IOS_MULTITASKING_CAMERA_KEY] = true;
        } else {
          delete plist[IOS_MULTITASKING_CAMERA_KEY];
        }
        return config;
      });
    }
  }

  return config;
};

export default withLiveKit;
