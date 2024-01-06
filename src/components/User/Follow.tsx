import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {ScreenProps} from '../../utils/TypeData';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../../utils/Color';
import Card from './UserCard';

const Follow: React.FC<any | ScreenProps> = ({route}) => {
  
  const {data} = route.params;

  const navigation = useNavigation();
  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={{marginBottom: 80}}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'light-content'}
      />

      <View style={styles.header1}>
        <TouchableOpacity style={styles.icon1} onPress={handleBack}>
          <Icon name="arrow-back" size={25} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.text}>
          {data === 'Follower' ? 'Người theo dõi' : data === "Following" ? 'Đang theo dõi' : "Người thích bài viết"}
        </Text>
      </View>

      <ScrollView style ={styles.view}>
      {Array(10)
            .fill(null)
            .map((_, index) => (
             <Card key={index}/>
            ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header1: {
    flexDirection: 'row',
    paddingTop: 30,
    width: '100%',
    height: 70,
    backgroundColor: Colors.background_header,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  text: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
  },
  icon1: {
    position: 'absolute',
    left: 0,
    top: 28,
    padding: 10,
    zIndex: 999,
  },
  view:{
    padding: 10,
  },
});

export default Follow;
