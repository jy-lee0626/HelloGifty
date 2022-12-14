/* eslint-disable react-native/no-inline-styles */
import React, {useLayoutEffect, useState} from 'react';
import {Text, View} from 'react-native';
// navigator
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

import 'react-native-gesture-handler';

// Screen
import {
  TestScreen,
  ChattingRoomScreen,
  ChattingScreen,
  DetailScreen,
  LoadingScreen,
  LoginScreen2,
  MyCouponScreen,
  MyTicketScreen,
  ProfileScreen,
  SearchScreen,
  SellingItemDetailScreen,
  ShoppingScreen,
  SignupScreen,
} from './src/screens';
import {Button, IconButton} from 'react-native-paper';
// Toast Message
const toastConfig = {
  success: props => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: '#9ED5C5',
        backgroundColor: '#cef2e7',
        width: '100%',
      }}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: 18,
        fontWeight: '400',
        color: 'black',
      }}
    />
  ),
  error: props => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: '#ff686b',
        backgroundColor: '#ffa69e',
        width: '100%',
      }}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: 18,
        fontWeight: '400',
        color: 'black',
      }}
    />
  ),
  tomatoToast: ({text1, props}) => (
    <View style={{height: 60, width: '100%', backgroundColor: 'tomato'}}>
      <Text>{text1}</Text>
      <Text>{props.uuid}</Text>
    </View>
  ),
};
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const MyCoupon = () => {
  return (
    <>
      <Stack.Navigator
        initialRouteName="MyCouponScreen"
        screenOptions={{headerShown: true}}>
        <Stack.Screen
          name="MyCouponScreen"
          component={MyCouponScreen}
          options={{title: '??? ??????'}}
        />
        <Stack.Screen
          name="DetailScreen"
          component={DetailScreen}
          options={{title: '?????? ?????????'}}
        />
      </Stack.Navigator>
      <Toast config={toastConfig} />
    </>
  );
};
const Shopping = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Shoppings"
        component={ShoppingScreen}
        options={{title: '??????'}}
      />
      <Stack.Screen
        name="ShoppingDetail"
        component={SellingItemDetailScreen}
        options={{title: '????????????'}}
      />
    </Stack.Navigator>
  );
};

const Chat = () => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          initialRouteName: 'ChattingRoomScreen',
        }}>
        <Stack.Screen
          name="ChattingRoomScreen"
          component={ChattingRoomScreen}
          options={{title: '????????????', unmountOnBlur: true}}
        />
        <Stack.Screen
          name="Chatting"
          component={ChattingScreen}
          options={({navigation}) => ({
            title: '?????????',
            headerLeft: () => (
              <IconButton
                icon="arrow-left-thick"
                onPress={() => navigation.navigate('ChattingRoomScreen')}
              />
            ),
          })}
        />
      </Stack.Navigator>
      <Toast config={toastConfig} />
    </>
  );
};

const Profile = () => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          initialRouteName: 'ProfileScreen',
        }}>
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={({navigation}) => ({
            title: '?????????',
            unmountOnBlur: true,

            headerLeft: () => (
              <IconButton
                icon="arrow-left-thick"
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        />
      </Stack.Navigator>
    </>
  );
};

const MainTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="MyCoupon"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'MyCoupon') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Shopping') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Chat') {
            iconName = focused ? 'chatbubble-sharp' : 'chatbubble-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'black',
      })}>
      <Tab.Screen
        name="MyCoupon"
        component={MyCoupon}
        options={{headerShown: false, title: '??? ??????', unmountOnBlur: false}}
      />

      <Tab.Screen
        name="Shopping"
        component={Shopping}
        options={{
          title: '??????',
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          title: '??????',
          unmountOnBlur: true,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={({navigation}) => ({
          title: '?????????',
          headerShown: false,
          unmountOnBlur: true,
        })}
      />
    </Tab.Navigator>
  );
};
const Auth = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen2} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useLayoutEffect(() => {
    // setIsLoading(true);
    (async () => {
      const tmp = await AsyncStorage.getItem('accessToken');
      if (tmp) {
        setIsLoggedIn(true);
      }
    })();
    // setIsLoading(false);
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          initialRouteName: isLoggedIn ? 'MainTab' : 'Auth',
        }}>
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="MainTab" component={MainTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
