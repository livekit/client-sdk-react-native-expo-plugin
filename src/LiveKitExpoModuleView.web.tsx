import * as React from 'react';

import { LiveKitExpoModuleViewProps } from './LiveKitExpoModule.types';

export default function LiveKitExpoModuleView(props: LiveKitExpoModuleViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
