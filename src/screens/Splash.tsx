import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  ImageBackground,
} from 'react-native';
import {Colors} from '../utils/Color';
import {useNavigation} from '@react-navigation/native';
import {userData} from '../utils/Storage';

const Splash = () => {
  const navigation = useNavigation()
  const fetchData = async () => {
    const data: any = await userData();
    if (data?.role === "USER") {
      setTimeout(() => {
        //@ts-ignore
        navigation.navigate('ScreenUser');
      }, 1500);
    } 
    else if(data?.role === "ADMIN") {
      setTimeout(() => {
        //@ts-ignore
        navigation.navigate('ScreenAdmin');
      }, 1500);
    }
    else {
      setTimeout(() => {
        //@ts-ignore
        navigation.navigate('Login');
      }, 1500);
    }
  };

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'light-content'}
      />
      <ImageBackground
        source={require('../assets/Splash.jpg')}
        resizeMode="cover"
        style={styles.img}>
        <ActivityIndicator size={50} color={Colors.green} />
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  img: {
    height: 867,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Splash;
