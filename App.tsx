import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'react-native';
import {Colors} from './src/utils/Color';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// User chưa login
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import SetInformation from './src/screens/User/SetInformation';
import SetGoal from './src/screens/User/SetGoal';
import Review from './src/screens/User/Review';

// User

//Admin
import AdminHome from './src/screens/Admin/Home';
import AdminFood from './src/screens/Admin/Food';
import AdminPerson from './src/screens/Admin/User';
import UserHome from './src/screens/User/Home';
import UserFood from './src/screens/User/Food';
import UserPost from './src/screens/User/Post';
import UserPersonal from './src/screens/User/Personal';
import DetailPost from './src/components/Post/DetailPost';
import DetailFood from './src/components/Food/DetailFood';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const UserScreen = () => {
  return (
    <Tab.Navigator
          initialRouteName="Home"
          //@ts-ignore
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName: string;
              let rn: string = route.name;

              if (rn === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (rn === 'Food') {
                iconName = focused ? 'fast-food' : 'fast-food-outline';
              } else if (rn === 'Post') {
                iconName = focused ? 'share-social' : 'share-social-outline';
              } else if (rn === 'Person') {
                iconName = focused ? 'person' : 'person-outline';
              }
              return (
                <Ionicons
                  // @ts-ignore
                  name={iconName}
                  size={size}
                  color={color}
                />
              );
            },
            tabBarShowLabel: false,
            tabBarActiveTintColor: Colors.gender,
            tabBarInactiveTintColor: Colors.gray,
            tabBarStyle: {
              height: 50,
            },
            headerShown: false,
          })}>
          <Tab.Screen name="Home" component={UserHome} />
          <Tab.Screen name="Food" component={UserFood} />
          <Tab.Screen name="Post" component={UserPost} />
          <Tab.Screen name="Person" component={UserPersonal} />
        </Tab.Navigator>
  )
}

const AdminScreen = () => {
  return(
    <Tab.Navigator
            initialRouteName="Home"
            //@ts-ignore
            screenOptions={({route}) => ({
              tabBarIcon: ({focused, color, size}) => {
                let iconName: string;
                let rn: string = route.name;

                if (rn === 'Home') {
                  iconName = focused ? 'home' : 'home-outline';
                } else if (rn === 'Food') {
                  iconName = focused ? 'fast-food' : 'fast-food-outline';
                } else if (rn === 'Person') {
                  iconName = focused ? 'person' : 'person-outline';
                }
                return (
                  <Ionicons
                    // @ts-ignore
                    name={iconName}
                    size={size}
                    color={color}
                  />
                );
              },
              tabBarShowLabel: false,
              tabBarActiveTintColor: Colors.gender,
              tabBarInactiveTintColor: Colors.gray,
              tabBarStyle: {
                height: 50,
              },
              headerShown: false,
              tabBarHideOnKeyboard: true,
            })}>
            <Tab.Screen name="Home" component={AdminHome} />
            <Tab.Screen name="Food" component={AdminFood} />
            <Tab.Screen name="Person" component={AdminPerson} />
          </Tab.Navigator>
      )
}

const AppChild = () => {
  const user: any | null = useState(true);
  user.role = 1;
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={Colors.white} barStyle={'light-content'} />
      {user !== false ? (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="setInformation" component={SetInformation} />
            <Stack.Screen name="setGoal" component={SetGoal} />
            <Stack.Screen name="reviewIndex" component={Review} />
          </>
        </Stack.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {user.role === 2 ?
            <Stack.Screen name="UserScreen" component={UserScreen} /> :
            <Stack.Screen name="AdminScreen" component={AdminScreen}/>  
          }
            <Stack.Screen name="DetailPost" component={DetailPost} />
            <Stack.Screen name="DetailFood" component={DetailFood} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

const App = () => {
  return <AppChild />;
};

export default App;
