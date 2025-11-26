import { SafeAreaView } from "react-native-safe-area-context";
import RootNavigation from "./src/navigation/RootNavigation";
import { StyleSheet, View } from "react-native";
import colors from "./src/constants/colors";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync(); // splash screen prevent auto hide

const App = () => {

  useEffect(() => {

    const prepare = async () => { // async prepare function for splash screen
      await new Promise(resolve => setTimeout(resolve, 2000)); // wait 2 seconds
      await SplashScreen.hideAsync(); // splash screen hide
    };

    prepare();
  }, []);

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