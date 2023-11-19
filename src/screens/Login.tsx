import * as React from 'react'
import {View, 
        Text, 
        Button, 
        ImageBackground, 
        StyleSheet,
        StatusBar,
        TextInput,
  } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Colors } from '../utils/Color';

const Login = () => {

  const navigation = useNavigation();
    return (
      <>
        <StatusBar translucent backgroundColor="transparent" barStyle={"dark-content"}/>
        <ImageBackground source={require('../assets/background_login.jpg')} resizeMode='cover' style={styles.background}>
          <View style={styles.inputField}>
            <Text style={styles.text}>
              Login to Counter Calories
            </Text>
            <View style={styles.Field}>
              <Icon
              name='user'
              color='black'
              size={30}
              style={styles.icon}
              />
              <TextInput
                placeholder='Username'
                placeholderTextColor="black"
                style= {styles.textInput}
              />
            </View>
            <View style={styles.Field}>
              <Icon
                name='lock'
                color='black'
                style={styles.icon}
                size={30}
              />
              <TextInput
                placeholder='Password'
                placeholderTextColor="black"
                secureTextEntry={true}
                style={styles.textInput}
              />
            </View>
            <View style={styles.button}>
              <Button 
                    color={Colors.button}
                    title='Login'
              />
            </View>
            <Text 
              style={styles.link}
              onPress={() => {
                // @ts-ignore
                navigation.navigate("Register")
              }} 
            >
              Don't have an Account? Register Now
            </Text>
          </View>
        </ImageBackground>
      </>
      )
}

const styles = StyleSheet.create(
  {
    background: {
      height: 900,
    },
    inputField: {
      marginTop: 200,
      flex: 0.4,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.background,
      padding: 30,
      borderRadius: 16,
    },
    Field:{
      flexDirection: "row",
    },
    icon:{
      marginTop: 20,
      marginLeft: 20,
      opacity: 0.6,
    },
    textInput: {
      height: 40,
      width: 350,
      margin: 12,
      paddingRight: 10,
      paddingLeft: 10,
      paddingBottom: 10,
      borderBottomWidth: 1,
      borderColor: Colors.black,
      borderRadius: 10,
      fontWeight: '600',
    },
    text:{
      color: Colors.title,
      fontWeight: "bold",
      fontSize: 20,
      textTransform: "uppercase",
      marginBottom: 20,
    },

    link:{
      color: Colors.link,
      textDecorationLine: 'underline',
      marginTop: 15,
      textTransform: 'uppercase',
      opacity: 0.6,
    },
    button: {
      width: '100%',
      borderRadius: 16,
      overflow: 'hidden',
      marginTop: 10,
    }
  }
)

export default Login