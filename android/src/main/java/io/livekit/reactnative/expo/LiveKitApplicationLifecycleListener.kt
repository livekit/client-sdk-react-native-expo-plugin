package io.livekit.reactnative.expo

import android.app.Application
import android.util.Log
import com.livekit.reactnative.LiveKitReactNative
import expo.modules.core.interfaces.ApplicationLifecycleListener

class LiveKitApplicationLifecycleListener : ApplicationLifecycleListener {
  override fun onCreate(application: Application) {
    LiveKitReactNative.setup(application)
    Log.e("LOL", "oncreate lk called!")
  }
}