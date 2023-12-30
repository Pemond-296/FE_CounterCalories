import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../utils/Color';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storage } from '../../utils/Storage';

const DetailUser = () => {

  const navigation = useNavigation();
  const handleBack = () => {
    console.log('back');
    navigation.goBack();
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem(storage);
    //@ts-ignore
    navigation.navigate("Login")
  }

  const handleFollow = (action: string) => {
    //@ts-ignore
    navigation.navigate("Follow", {data: action})
  }

  const handlePost = () => {
    //@ts-ignore
    navigation.navigate("DetailPost")
  }

  return (
    <View style={{position: 'relative', height: 'auto'}}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'light-content'}
      />
      <View style={styles.header1}>
        <TouchableOpacity style={styles.icon1} onPress={handleBack}>
          <Icon name="arrow-back" size={25} color={Colors.white} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon2} onPress={handleLogout}>
          <Icon name="log-out-outline" size={25} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.text}>Pemond</Text>
      </View>
      <ScrollView style ={{ marginBottom: 70}}>
        <View style={styles.header2}>
          <Image
            source={require('../../assets/Pemond.jpg')}
            style={styles.img}
          />
          <Text style={styles.text1}> Pemond </Text>
          <Text style={styles.text2}>Người dùng lâu năm</Text>
        </View>
        <View style={styles.user}>
          <View style={styles.textarea}>
            <Text style={styles.text3}>52</Text>
            <Text style={styles.text4}>Bài viết</Text>
          </View>
          <TouchableOpacity 
            style={styles.textarea}
            onPress={() => handleFollow("Follower")}
          >
            <Text style={styles.text3}>100</Text>
            <Text style={styles.text4}>Follower</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.textarea}
            onPress={() => handleFollow("Following")}
          >
            <Text style={styles.text3}>100</Text>
            <Text style={styles.text4}>Following</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.imgarea}>
          {Array(50)
            .fill(null)
            .map((_, index) => (
              <TouchableOpacity style={styles.touch} onPress={handlePost}>
                <Image
                  source={require('../../assets/Splash.jpg')}
                  style={styles.img2}
                />
              </TouchableOpacity>
            ))}
        </View>
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

  icon2: {
    position: 'absolute',
    right: 5,
    top: 28,
    padding: 10,
    zIndex: 999,
  },

  header2: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 150,
    height: 150,
    borderRadius: 150,
  },
  text1: {
    color: Colors.black,
    fontSize: 20,
    fontWeight: '700',
  },
  text2: {
    color: Colors.error,
    fontSize: 12,
  },
  user: {
    paddingVertical: 10,
    borderWidth: 0.5,
    borderColor: Colors.line,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  textarea: {
    alignItems: 'center',
  },
  text3: {
    fontSize: 16,
    color: Colors.black,
    opacity: 0.3,
  },
  text4: {
    fontSize: 15,
    color: Colors.black,
    opacity: 0.3,
  },
  imgarea: {
    width: '100%',
    maxWidth: '100%',
    overflow: 'hidden',
    height: 'auto',
    wordWrap: 'break-word',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: 3,
  },
  img2: {
    width: 133.1,
    height: 133,
    borderColor: Colors.white,
  },
  touch: {
    marginRight: 3,
    marginBottom: 3,
  },
});

export default DetailUser;
