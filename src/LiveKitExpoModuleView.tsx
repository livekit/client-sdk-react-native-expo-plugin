import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { LiveKitExpoModuleViewProps } from './LiveKitExpoModule.types';

const NativeView: React.ComponentType<LiveKitExpoModuleViewProps> =
  requireNativeViewManager('LiveKitExpoModule');

export default function LiveKitExpoModuleView(props: LiveKitExpoModuleViewProps) {
  return <NativeView {...props} />;
}
