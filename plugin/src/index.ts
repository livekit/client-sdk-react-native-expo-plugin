import {
  withAndroidManifest,
  AndroidConfig,
  ConfigPlugin,
} from '@expo/config-plugins';

type LKConfigOptions = {
  "android"? : {
    "audioType"?: "media"|"communication"
  }
}

const METADATA_KEY = 'io.livekit.reactnative.expo.ANDROID_AUDIO_TYPE';

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
                item?.$?.['android:name'] !== METADATA_KEY
            );
          }

          AndroidConfig.Manifest.addMetaDataItemToMainApplication(
            mainApplication,
            METADATA_KEY,
            audioType
          );
          return config;
        });
      }
    }
  }

  return config;
};

export default withLiveKit;
