package io.livekit.reactnative.expo

import android.app.Application
import android.content.pm.PackageManager
import android.util.Log
import com.livekit.reactnative.LiveKitReactNative
import com.livekit.reactnative.audio.AudioType
import com.oney.WebRTCModule.WebRTCModuleOptions
import expo.modules.core.interfaces.ApplicationLifecycleListener

class LiveKitApplicationLifecycleListener : ApplicationLifecycleListener {
  override fun onCreate(application: Application) {
    val metaData = try {
      application.packageManager?.getApplicationInfo(application.packageName, PackageManager.GET_META_DATA)?.metaData
    } catch (e: PackageManager.NameNotFoundException) {
      Log.w("LiveKitExpoPlugin", "Could not read application info, defaulting to communication audio type.", e)
      null
    }

    val audioTypeString = metaData?.getString("io.livekit.reactnative.expo.ANDROID_AUDIO_TYPE")
    val audioType = when (audioTypeString) {
      "media" -> AudioType.MediaAudioType()
      "communication", null -> AudioType.CommunicationAudioType()
      else -> {
        Log.w("LiveKitExpoPlugin", "Unrecognized audio type \"$audioTypeString\". Defaulting to communication audio type.")
        AudioType.CommunicationAudioType()
      }
    }

    LiveKitReactNative.setup(application, audioType)

    val enableScreenShareService = metaData?.getBoolean("io.livekit.reactnative.expo.ENABLE_SCREEN_SHARE_SERVICE", false)
    if (enableScreenShareService == true) {
      WebRTCModuleOptions.getInstance().enableMediaProjectionService = true
    }
  }
}