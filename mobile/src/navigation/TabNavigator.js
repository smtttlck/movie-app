import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons as Icon } from '@expo/vector-icons';
import { routes } from "../constants/routes";
import { colors } from '../constants';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: colors.black, borderTopColor: colors.opacityBlack },
        tabBarActiveTintColor: colors.pink,
        tabBarIcon: ({ color, size }) => {
          return <Icon name={route.name.toLowerCase()} size={size} color={color} />;
        },
      })}
    >
      {routes.filter(route => route.isTab).map((route) => (
        <Tab.Screen
          key={route.name}
          name={route.name}
          component={route.component}
        />
      ))}
    </Tab.Navigator>
  );
}