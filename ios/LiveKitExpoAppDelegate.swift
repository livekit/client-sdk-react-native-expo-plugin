import ExpoModulesCore
import livekit_react_native

public class LiveKitExpoAppDelegate: ExpoAppDelegateSubscriber {
  public func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil) -> Bool {
      LivekitReactNative.setup()
      print("LK setup\n")
      return false
  }
}
