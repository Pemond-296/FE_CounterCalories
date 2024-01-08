import React, {useEffect, useState} from 'react';
import {
  View,
  StatusBar,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../utils/Color';
import {useNavigation} from '@react-navigation/native';
import Password from '../../components/Setting/Password';
import EditInfo from '../../components/Setting/EditInfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {storage, userData} from '../../utils/Storage';
import {viewProfile} from '../../services/User';

const Setting = () => {
  const [user, setUser] = useState<any>();
  const [currentUserData, setCurrentUserData] = useState<any>();
  const navigation = useNavigation();
  const handleBack = () => {
    navigation.goBack();
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
      setCurrentUserData(response?.data?.data);
    };
    fetchData();
  }, [user]);

  const [action, setAction] = useState<number>(0);

  // action == 2
  const handleInfor = () => {
    setAction(2);
  };

  // action == 3
  const handlePassword = () => {
    setAction(3);
  };

  const onClose = () => {
    setAction(0);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem(storage)
    navigation.reset({
      index: 0,
      //@ts-ignore
      routes: [{ name: 'Splash' }],
  });
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
        <Text style={styles.text}>Cài đặt</Text>
      </View>

      <View style={styles.container}>
        <TouchableOpacity style={styles.field} onPress={handleInfor}>
          <View style={{flexDirection: 'row'}}>
            <Icon name="person" size={22} color={Colors.black} />
            <Text style={styles.text1}> Cập nhật thông tin cá nhân</Text>
            <Icon
              name={action === 2 ? 'chevron-down' : 'chevron-forward'}
              size={22}
              color={Colors.black}
            />
          </View>
          {action === 2 && <EditInfo onClose={onClose} user={currentUserData?.profile} />}
        </TouchableOpacity>

        <TouchableOpacity style={styles.field} onPress={handlePassword}>
          <View style={{flexDirection: 'row'}}>
            <Icon name="key" size={22} color={Colors.black} />
            <Text style={styles.text1}> Đổi mật khẩu</Text>
            <Icon
              name={action === 3 ? 'chevron-down' : 'chevron-forward'}
              size={22}
              color={Colors.black}
            />
          </View>
          {action === 3 && <Password onClose={onClose} />}
        </TouchableOpacity>

        <TouchableOpacity style={styles.field} onPress={handleLogout}>
          <View style={{flexDirection: 'row'}}>
            <Icon name="exit-outline" size={22} color={Colors.error} />
            <Text style={styles.text1}> Đăng xuất</Text>
          </View>
        </TouchableOpacity>

        <Text style={{fontSize: 18, color: Colors.black}}>V1.1.0</Text>
      </View>
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

  container: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },

  field: {
    borderWidth: 1,
    borderColor: Colors.white,
    padding: 10,
    backgroundColor: Colors.white,
    minHeight: 50,
    height: 'auto',
    borderRadius: 20,
    width: 370,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: 10,
    ...Platform.select({
      ios: {
        shadowColor: Colors.black,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 15,
        shadowColor: Colors.box_shadow,
      },
    }),
  },
  text1: {
    fontSize: 17,
    color: Colors.black,
    opacity: 0.4,
    marginLeft: 20,
    width: 285,
  },
});

export default Setting;
