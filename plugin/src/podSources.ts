import { ConfigPlugin, withPodfile } from 'expo/config-plugins';

const LIVEKIT_PODSPECS_SOURCE = "source 'https://github.com/livekit/podspecs.git'";
const TRUNK_SOURCE = "source 'https://cdn.cocoapods.org/'";

const LIVEKIT_PODSPECS_SOURCE_REGEX =
  /^\s*source\s+['"]https:\/\/github\.com\/livekit\/podspecs(\.git)?\/?['"]/m;
const ANY_SOURCE_REGEX = /^\s*source\s+['"]/m;

/**
 * Adds the livekit/podspecs source, which serves LiveKitWebRTC, to the top of a Podfile.
 *
 * A Podfile without any `source` lines uses CocoaPods trunk implicitly, and declaring
 * any source turns that off. So trunk is only added when the Podfile had no sources;
 * a Podfile that already lists its own sources keeps resolving everything else from them.
 */
export function addPodSources(contents: string): string {
  const lines: string[] = [];
  if (!LIVEKIT_PODSPECS_SOURCE_REGEX.test(contents)) {
    lines.push(LIVEKIT_PODSPECS_SOURCE);
  }
  if (!ANY_SOURCE_REGEX.test(contents)) {
    lines.push(TRUNK_SOURCE);
  }
  if (lines.length === 0) {
    return contents;
  }
  return [
    '# Added by @livekit/react-native-expo-plugin: LiveKitWebRTC is published to livekit/podspecs.',
    ...lines,
    contents,
  ].join('\n');
}

export const withPodSources: ConfigPlugin = (config) =>
  withPodfile(config, (config) => {
    config.modResults.contents = addPodSources(config.modResults.contents);
    return config;
  });
