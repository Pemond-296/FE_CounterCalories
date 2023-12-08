import * as React from 'react'
import {View, 
        Text, 
        Button, 
        ImageBackground, 
        StyleSheet,
        StatusBar,
        TextInput,
        Alert,
  } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {z, ZodType} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form";

import { Colors } from '../utils/Color';
import { userRegister } from '../utils/TypeData';

const Register = () => {

  const navigation = useNavigation();
  
  const schema: ZodType<userRegister> = z
    .object({
      username: z.string()
                  .min(1, "Username is required")
                  .min(6, 'Username should be at least 6 characters'),
      password: z.string()
                  .min(1, "Password is required")
                  .min(6, 'Password should be at least 6 characters'),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password is not matching",
      path: ['confirmPassword'],
    })

  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm<userRegister>({
    resolver: zodResolver(schema)
  })


  const handleNext = (data: any) => {
    // @ts-ignore
    navigation.navigate("setInformation")
  }


    return (
      <>
        <StatusBar translucent backgroundColor="transparent" barStyle={"dark-content"}/>
        <ImageBackground source={require('../assets/background_login.jpg')} resizeMode='cover' style={styles.background}>
          <View style={styles.inputField}>
            <Text style={styles.text}>
              Register account
            </Text>
            <View style={styles.Field}>
              <Icon
              name='user'
              color={Colors.black}
              size={30}
              style={styles.icon}
              />
              <TextInput
                required
                placeholder='Username'
                placeholderTextColor="black"
                style= {styles.textInput}
                {...register('username')}
                onChangeText={(value) => {
                  setValue('username', value)
                }}
              />
            </View>
            {errors.username && <Text style={styles.error}>{errors.username.message}</Text>}
            <View style={styles.Field}>
              <Icon
                name='lock'
                color='black'
                style={styles.icon}
                size={30}
              />
              <TextInput
                required
                placeholder='Password'
                placeholderTextColor="black"
                secureTextEntry={true}
                style={styles.textInput}
                {...register('password')}
                onChangeText={(value) => {
                  setValue('password', value)
                }}
              />
            </View>
            {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
            <View style={styles.Field}>
              <Icon
                name='lock'
                color='black'
                style={styles.icon}
                size={30}
              />
              <TextInput
                placeholder='Confirm Password'
                placeholderTextColor="black"
                secureTextEntry={true}
                style={styles.textInput}
                {...register('confirmPassword')}
                onChangeText={(value) => {
                  setValue('confirmPassword', value)
                }}
              />
            </View>
            {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword.message}</Text>}
            <View style={styles.button}>
              <Button 
                    color={Colors.button}
                    title='Register'
                    onPress={handleSubmit(handleNext)}
              />
            </View>
            <Text 
              style={styles.link}
              onPress={() => {
                // @ts-ignore
                navigation.navigate("Login")
              }} 
            >
              Already have an account? Login now
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
      marginTop: 150,
      flex: 0.5,
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
    },
    error:{
      color: Colors.error,
    }
  }
)

export default Register