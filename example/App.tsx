import { StyleSheet, Text, View } from 'react-native';

import * as LiveKitExpoModule from 'react-native-expo-plugin';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{LiveKitExpoModule.hello()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
