import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons  as Icon } from '@expo/vector-icons';
import { routes } from "../constants/routes";
import colors from '../constants/colors';
import { iconNameConverter } from '../utils/helpers';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: colors.black, borderTopColor: colors.opacityBlack },
        tabBarActiveTintColor: colors.pink,
        tabBarIcon: ({ color, size }) => {
          return <Icon name={iconNameConverter(route.name)} size={size * 1.3} color={color} />;
        },
      })}
    >
      {routes.filter(route => route.isTab).map((route) => (
        <Tab.Screen
          key={route.name}
          name={route.name}
          component={route.component}
          initialParams={{ ...(route.tabProps ?? {}) }} // Pass any tab-specific props as initialParams
        />
      ))}
    </Tab.Navigator>
  );
}