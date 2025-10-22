import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { routes } from "../constants/routes";
import TabNavigator from "./TabNavigator";

const Stack = createNativeStackNavigator();

// root navigation file
const RootNavigation = () => {
    return (    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        {/* screens with tabs */}
        <Stack.Screen name="MainTabs" component={TabNavigator} />

        {/* other screens (isTab: false) */}
        {routes
          .filter(route => !route.isTab)
          .map(route => (
            <Stack.Screen
              key={route.name}
              name={route.name}
              component={route.component}
            />
          ))}

      </Stack.Navigator>
    </NavigationContainer>

    )
}

export default RootNavigation;