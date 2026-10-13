import type { ExportedConfig } from 'expo/config-plugins';

import withLiveKit from '../index';
import { addPodSources } from '../podSources';

const LIVEKIT = "source 'https://github.com/livekit/podspecs.git'";
const TRUNK = "source 'https://cdn.cocoapods.org/'";

const PODFILE = `require 'json'

platform :ios, '15.1'

target 'App' do
  use_expo_modules!
end
`;

function sourceLines(contents: string): string[] {
  return contents.split('\n').filter((line) => /^\s*source\s/.test(line));
}

describe('addPodSources', () => {
  it('adds livekit/podspecs and trunk, in that order, to a Podfile without sources', () => {
    const result = addPodSources(PODFILE);
    expect(sourceLines(result)).toEqual([LIVEKIT, TRUNK]);
    expect(result.endsWith(PODFILE)).toBe(true);
  });

  it('adds only livekit/podspecs, ahead of trunk, when trunk is already listed', () => {
    const result = addPodSources(`${TRUNK}\n${PODFILE}`);
    expect(sourceLines(result)).toEqual([LIVEKIT, TRUNK]);
  });

  it('does not add trunk when the Podfile already lists its own sources', () => {
    const custom = "source 'https://example.com/specs.git'";
    const result = addPodSources(`${custom}\n${PODFILE}`);
    expect(sourceLines(result)).toEqual([LIVEKIT, custom]);
  });

  it('leaves a Podfile that already lists livekit/podspecs unchanged', () => {
    const podfile = `source "https://github.com/livekit/podspecs"\n${TRUNK}\n${PODFILE}`;
    expect(addPodSources(podfile)).toBe(podfile);
  });

  it('ignores commented-out source lines', () => {
    const result = addPodSources(`# ${TRUNK}\n${PODFILE}`);
    expect(sourceLines(result)).toEqual([LIVEKIT, TRUNK]);
  });

  it('is idempotent', () => {
    const once = addPodSources(PODFILE);
    expect(addPodSources(once)).toBe(once);
  });
});

describe('withLiveKit', () => {
  // withMod mutates the config it's given, so each test needs its own.
  const baseConfig = () => ({ name: 'test', slug: 'test' });

  // ModConfig doesn't declare `ios.podfile`, though withPodfile registers it.
  const iosMods = (config: ExportedConfig) => Object.keys(config.mods?.ios ?? {});

  it('adds the Podfile change when the plugin has no options', () => {
    const config = withLiveKit(baseConfig(), undefined);
    expect(iosMods(config)).toContain('podfile');
  });

  it('skips the Podfile change when ios.addPodSources is false', () => {
    const config = withLiveKit(baseConfig(), { ios: { addPodSources: false } });
    expect(iosMods(config)).not.toContain('podfile');
  });
});
