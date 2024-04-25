package io.livekit.reactnative.expo

import android.app.Application
import android.util.Log
import com.livekit.reactnative.LiveKitReactNative
import com.livekit.reactnative.audio.AudioType
import expo.modules.core.interfaces.ApplicationLifecycleListener

class LiveKitApplicationLifecycleListener : ApplicationLifecycleListener {
  override fun onCreate(application: Application) {
    val applicationInfo = application.packageManager?.getApplicationInfo(application.packageName.toString(), PackageManager.GET_META_DATA)

    val audioTypeString = applicationInfo?.metaData?.getString("LK_ANDROID_AUDIO_TYPE")

    val audioType = when(audioTypeString) {
      "media" -> AudioType.MediaAudioType()
      "communication", null -> AudioType.CommunicationAudioType()
      else -> {
        Log.w("LiveKitExpoPlugin", "Unrecognized audio type \"$audioTypeString\". Defaulting to communication audio type.")
      }
    }
    LiveKitReactNative.setup(application)
  }
}