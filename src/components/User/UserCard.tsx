import React, { useState } from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from '../../utils/Color';
import { useNavigation } from '@react-navigation/native';

const Card: React.FC<any> = ({idUser, img, name, aliaes, follow}) => {

  const navigation = useNavigation()
  const [isFollow, setFollow] = useState<boolean>(false);
  const handleFollow = () => {
    setFollow(!isFollow);
  };

  const handleUser = () => {
    //@ts-ignore
    navigation.navigate("DetailUser")
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handleUser}>
      <Image source={require('../../assets/Pemond.jpg')} style={styles.img} />
      <View style={styles.textfield}>
        <View style={styles.text}>
          <Text style={styles.text1}>Pemond</Text>
          <Text style={styles.text2}>Người dùng lâu năm</Text>
        </View>

        <TouchableOpacity style={[styles.follow1, isFollow && styles.isfollow]} onPress={() => handleFollow()}>
          <Text style={[styles.text6, isFollow && styles.text7]}>
            {isFollow ? 'Đang theo dõi' : 'Theo dõi'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  img: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
  },
  text: {
    justifyContent: 'center',
    
  },
  textfield: {
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
    paddingBottom: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text1: {
    color: Colors.black,
    fontSize: 14,
    fontWeight: '800',
  },
  text2: {
    color: Colors.error,
    fontSize: 14,
    fontWeight: '600',
  },

  follow1: {
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
    borderColor: Colors.black,
  },
  isfollow: {
    borderColor: Colors.gender,
  },
  text6: {
    color: Colors.black,
    fontWeight: '500',
  },
  text7: {
    color: Colors.gender,
  },
});

export default Card;
