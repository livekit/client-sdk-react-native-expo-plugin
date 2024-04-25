package io.livekit.reactnative.expo

import android.content.Context
import expo.modules.core.interfaces.ApplicationLifecycleListener
import expo.modules.core.interfaces.Package


class LiveKitExpoPackage : Package {
  override fun createApplicationLifecycleListeners(context: Context): List<ApplicationLifecycleListener> {
    return listOf(LiveKitApplicationLifecycleListener())
  }
}