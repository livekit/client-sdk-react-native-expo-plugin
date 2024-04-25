import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to LiveKitExpoModule.web.ts
// and on native platforms to LiveKitExpoModule.ts
import LiveKitExpoModule from './LiveKitExpoModule';
import LiveKitExpoModuleView from './LiveKitExpoModuleView';
import { ChangeEventPayload, LiveKitExpoModuleViewProps } from './LiveKitExpoModule.types';

// Get the native constant value.
export const PI = LiveKitExpoModule.PI;

export function hello(): string {
  return LiveKitExpoModule.hello();
}

export async function setValueAsync(value: string) {
  return await LiveKitExpoModule.setValueAsync(value);
}

const emitter = new EventEmitter(LiveKitExpoModule ?? NativeModulesProxy.LiveKitExpoModule);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { LiveKitExpoModuleView, LiveKitExpoModuleViewProps, ChangeEventPayload };
