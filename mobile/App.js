import { SafeAreaView } from "react-native-safe-area-context";
import RootNavigation from "./src/navigation/RootNavigation";
import { StyleSheet, View } from "react-native";
import { colors } from "./src/constants";

const App = () => {

  return (

    <SafeAreaView style={styles.container}>

      {/* App navigation / rest of the app */}
      <View style={styles.content}>
        <RootNavigation />
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  content: {
    flex: 1,
  },
});

export default App;