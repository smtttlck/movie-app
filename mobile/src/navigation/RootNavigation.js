import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { routes } from "../constants/routes";

const Stack = createNativeStackNavigator();

// root navigation file
const RootNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator 
                initialRouteName={routes[0].name}
                screenOptions={{ headerShown: false }}
            >

                {routes.map((route) => ( // all routes mapping
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