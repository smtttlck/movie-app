  import { SafeAreaView } from "react-native-safe-area-context";
  import RootNavigation from "./src/navigation/RootNavigation";
  import { StyleSheet, View } from "react-native";
  import { SearchBarToggle } from "./src/components";
  import { colors } from "./src/constants";

  const App = () => {

    return (

      <SafeAreaView style={styles.container}>
        
        {/* Top area: round search toggle */}
        <View style={styles.header}>
          <SearchBarToggle />
          <SearchBarToggle />
        </View>

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
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      zIndex: 10,
    },
    content: {
      flex: 1,
    },
  });

  export default App;