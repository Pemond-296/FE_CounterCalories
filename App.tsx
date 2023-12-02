import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import SetInformation from './src/screens/User/SetInformation';
import SetGoal from './src/screens/User/SetGoal';
import Review from './src/screens/User/CreateFood';
import CreateFood from './src/screens/User/CreateFood';
const Stack = createNativeStackNavigator();

const AppChild = () => {
  const user: any | null = useState(true);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {user ? (
          <>
            <Stack.Screen name="setInformation" component={SetInformation} />
            <Stack.Screen name="setGoal" component={SetGoal} />
            <Stack.Screen name="reviewIndex" component={Review} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="CreateFood" component={CreateFood} />
            <Stack.Screen name="Register" component={Register} />
          </>
        ) : (
          <View>Nothing here</View>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return <AppChild />;
};

export default App;
