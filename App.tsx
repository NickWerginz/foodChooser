import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

import HomeScreen from './HomeScreen';
import RecipeScreen from './RecipeScreen';
import RecipeDetailScreen from './RecipeDetailScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const RecipeStack = createStackNavigator();

function HomeStackScreen() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <HomeStack.Screen name="RecipeDetail" component={RecipeDetailScreen} options={{ title: 'Rezeptdetails' }} />
        </HomeStack.Navigator>
    );
}

function RecipeStackScreen() {
    return (
        <RecipeStack.Navigator>
            <RecipeStack.Screen name="Favorites" component={RecipeScreen} options={{ headerShown: false }} />
            <RecipeStack.Screen name="RecipeDetail" component={RecipeDetailScreen} options={{ title: 'Rezeptdetails' }} />
        </RecipeStack.Navigator>
    );
}

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ color, size }) => {
                            let iconName;
                            if (route.name === 'Home') {
                                iconName = 'home';
                            } else if (route.name === 'Favorites') {
                                iconName = 'star';
                            }
                            return <FontAwesome name={iconName} size={size} color={color} />;
                        },
                    })}
                    tabBarOptions={{
                        activeTintColor: 'tomato',
                        inactiveTintColor: 'gray',
                    }}
                >
                    <Tab.Screen name="Home" component={HomeStackScreen} />
                    <Tab.Screen name="Favorites" component={RecipeStackScreen} />
                </Tab.Navigator>
            </NavigationContainer>
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </GestureHandlerRootView>
    );
}
