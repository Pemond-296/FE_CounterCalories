import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../utils/Color';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {storage, userData} from '../../utils/Storage';
import {viewProfile} from '../../services/User';
import {color} from '@rneui/base';

const UserPersonal = () => {
  const [user, setUser] = useState<any>();
  const [currentUserData, setCurrentUserData] = useState<any>();
  const navigation = useNavigation();

  const handleEdit = () => {
    //@ts-ignore
    navigation.navigate('Setting');
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem(storage);
    //@ts-ignore
    navigation.navigate('Login');
  };

  const handleFollow = (action: string) => {
    //@ts-ignore
    navigation.navigate('Follow', {data: action});
  };

  const handlePost = () => {
    //@ts-ignore
    navigation.navigate('DetailPost');
  };

  useEffect(() => {
    const fetchData = async () => {
      const response: any = await userData();
      setUser(response);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response: any = await viewProfile(user?.id);
      if (!response?.data) {
        response.data = {
          data: {
            dailyGoal: {bmi: 19.9, water: 2000},
            profile: {height: 190, weight: 70, username: 'hogan'},
          },
        };
      }
      setCurrentUserData(response?.data?.data);
    };
    fetchData();
  }, [user]);

  return (
    <View style={{position: 'relative'}}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'light-content'}
      />

      <View style={styles.header1}>
        <TouchableOpacity style={styles.icon2} onPress={handleEdit}>
          <Icon name="settings-outline" size={25} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.text}>Thông tin cá nhân</Text>
      </View>
      <ScrollView
        style={{marginBottom: 70, backgroundColor: Colors.white}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <View style={styles.leftCol}>
            <View style={styles.fieldTopLeft}>
              <Text style={styles.infoLabel}>BMI</Text>
              <Text style={styles.infoText}>
                {currentUserData?.dailyGoal?.bmi}
              </Text>
            </View>

            <View
              style={{
                width: '90%',
                backgroundColor: Colors.light_gray,
                height: 5,
              }}></View>

            <View style={styles.fieldBottomLeft}>
              <Text style={styles.infoLabel}>Lượng nước</Text>
              <Text style={styles.infoText}>
                {currentUserData?.dailyGoal?.water} ml
              </Text>
            </View>
          </View>

          <View style={styles.midCol}>
            <Image
              source={require('../../assets/Pemond.jpg')}
              style={styles.img}
            />
            <View style={styles.userNameContainer}>
              <Text style={styles.usernameText}>
                {currentUserData?.profile?.username}
              </Text>
              <Text style={styles.userTitleText}>Người dùng lâu năm</Text>
            </View>
          </View>

          <View style={styles.rightCol}>
            <View style={styles.fieldTopRight}>
              <Text style={styles.infoLabel}>Chiều cao</Text>
              <Text style={styles.infoText}>
                {currentUserData?.profile?.height} cm
              </Text>
            </View>

            <View
              style={{
                width: '90%',
                backgroundColor: Colors.light_gray,
                height: 5,
              }}></View>

            <View style={styles.fieldBottomRight}>
              <Text style={styles.infoLabel}>Cân nặng</Text>
              <Text style={styles.infoText}>
                {currentUserData?.profile?.weight} kg
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.othersInfoContainer}>
          <View style={styles.textarea}>
            <Text style={styles.numberText}>1</Text>
            <Text style={styles.othersInfoText}>Bài viết</Text>
          </View>
          <TouchableOpacity
            style={styles.textarea}
            onPress={() => handleFollow('Follower')}>
            <Text style={styles.numberText}>0</Text>
            <Text style={styles.othersInfoText}>Follower</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.textarea}
            onPress={() => handleFollow('Following')}>
            <Text style={styles.numberText}>0</Text>
            <Text style={styles.othersInfoText}>Following</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.postContainer}>
          {Array(1)
            .fill(null)
            .map((_, index) => (
              <TouchableOpacity
                key={index}
                style={styles.touch}
                onPress={handlePost}>
                <Image
                  source={require('../../assets/Splash.jpg')}
                  style={styles.postImg}
                />
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
    </View>
  );
};

// Responsive for Posts
const {width} = Dimensions.get('window');

const numberOfColumns = 3;
const imageMargin = 5;
const imageWidth =
  (width - imageMargin * (numberOfColumns + 1)) / numberOfColumns;

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

  midCol: {
    flex: 2,
    padding: 7,
    alignItems: 'center',
    zIndex: 999,
    elevation: 3,
    flexDirection: 'column'
  },
  img: {
    width: 175,
    height: 175,
    borderRadius: 175 / 2,
    borderWidth: 3,
    borderColor: Colors.light_gray,
  },
  usernameText: {
    color: Colors.black,
    fontSize: 18,
    fontWeight: '700',
    marginTop: -10,
    textAlign: 'center'
  },
  userTitleText: {
    color: Colors.info,
    fontSize: 13,
    fontWeight: '700',
  },
  othersInfoContainer: {
    paddingBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderTopColor: Colors.line,
    borderTopWidth: 1,
  },
  textarea: {
    alignItems: 'center',
    paddingHorizontal: '10%',
    paddingTop: 10,
  },
  numberText: {
    fontSize: 20,
    color: Colors.real_black,
    fontWeight: '500',
  },
  othersInfoText: {
    fontSize: 14,
    color: Colors.real_black,
    fontWeight: '700',
  },
  postContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginLeft: -imageMargin,
    backgroundColor: Colors.white,
    minHeight: 450,
  },
  postImg: {
    width: imageWidth,
    height: imageWidth,
    marginBottom: imageMargin,
    marginLeft: imageMargin,
  },
  touch: {
    marginRight: 3,
    marginBottom: 3,
  },

  infoLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
  },
  infoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.info,
    marginBottom: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingBottom: 35,
  },
  rightCol: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'flex-end',
    top: '12%',
  },

  leftCol: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'flex-start',
    top: '12%',
  },
  field: {},
  fieldTopLeft: {
    backgroundColor: Colors.white,
    width: '125%',
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 10,
    borderTopLeftRadius: 50,
    elevation: 2,
  },
  fieldBottomLeft: {
    backgroundColor: Colors.white,
    width: '200%',
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 10,
    borderBottomLeftRadius: 50,
    elevation: 2,
  },
  fieldTopRight: {
    backgroundColor: Colors.white,
    width: '125%',
    paddingTop: 20,
    paddingLeft: '45%',
    borderTopRightRadius: 50,
    elevation: 2,
  },
  fieldBottomRight: {
    backgroundColor: Colors.white,
    width: '125%',
    paddingTop: 20,
    paddingLeft: '45%',
    borderBottomRightRadius: 50,
    elevation: 2,
  },
  userNameContainer: {
    backgroundColor: Colors.white,
    flex: 2,
  }
});

export default UserPersonal;
