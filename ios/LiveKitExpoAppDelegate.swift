import ExpoModulesCore
import livekit_react_native
import livekit_react_native_webrtc

public class LiveKitExpoAppDelegate: ExpoAppDelegateSubscriber {
  public func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil) -> Bool {
    LivekitReactNative.setup()
    if let enableMultitasking = Bundle.main.object(forInfoDictionaryKey: "io.livekit.reactnative.expo.ENABLE_MULTITASKING_CAMERA_ACCESS") as? Bool, enableMultitasking {
      WebRTCModuleOptions.sharedInstance().enableMultitaskingCameraAccess = true
    }

    return true
  }
}
