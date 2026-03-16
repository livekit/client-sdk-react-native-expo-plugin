package io.livekit.reactnative.expo

import android.app.Application
import android.content.pm.PackageManager
import android.util.Log
import com.livekit.reactnative.LiveKitReactNative
import com.livekit.reactnative.audio.AudioType
import expo.modules.core.interfaces.ApplicationLifecycleListener

class LiveKitApplicationLifecycleListener : ApplicationLifecycleListener {
  override fun onCreate(application: Application) {
    val audioTypeString = try {
      val applicationInfo = application.packageManager?.getApplicationInfo(application.packageName, PackageManager.GET_META_DATA)
      applicationInfo?.metaData?.getString("io.livekit.reactnative.expo.ANDROID_AUDIO_TYPE")
    } catch (e: PackageManager.NameNotFoundException) {
      Log.w("LiveKitExpoPlugin", "Could not read application info, defaulting to communication audio type.", e)
      null
    }

    val audioType = when (audioTypeString) {
      "media" -> AudioType.MediaAudioType()
      "communication", null -> AudioType.CommunicationAudioType()
      else -> {
        Log.w("LiveKitExpoPlugin", "Unrecognized audio type \"$audioTypeString\". Defaulting to communication audio type.")
        AudioType.CommunicationAudioType()
      }
    }
    LiveKitReactNative.setup(application, audioType)
  }
}