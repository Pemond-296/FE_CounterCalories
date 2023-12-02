import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../../utils/Color';
import Icon from 'react-native-vector-icons/Ionicons';
import {ScreenProps} from '../../utils/TypeData';

const SetGoal: React.FC<ScreenProps | any> = ({route}) => {
  const navigation = useNavigation();
  const {data} = route.params;
  const BMI: number = data.weight / ((data.height / 100) * (data.height / 100));
  const [choose, setChoose] = useState(1);

  useEffect(() => {
    BMI < 25 ? (BMI > 18.5 ? setChoose(2) : setChoose(3)) : null;
  }, []);

  const handleNext = () => {
    //@ts-ignore
    navigation.navigate('CreateFood', {
      data: {...data, bmi: BMI, choose: choose},
    });
  };

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'light-content'}
      />
      <View style={styles.header}>
        <Icon
          name="arrow-back"
          size={25}
          color={Colors.white}
          style={styles.icon}
          onPress={() => {
            //@ts-ignore
            navigation.goBack();
          }}
        />
        <Text style={styles.text1}>Mục tiêu</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.text2}>Mục tiêu của bạn là gì?</Text>
        <TouchableOpacity onPress={() => handleNext()}>
          <View style={[styles.choose, choose == 1 && styles.focused]}>
            <Text style={[styles.text3, choose == 1 && styles.textFocused]}>
              Giảm cân
            </Text>
            <Text style={styles.text4}>
              Quản lý cân nặng của bạn bằng cách ăn uống thông minh hơn
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNext()}>
          <View style={[styles.choose, choose == 2 && styles.focused]}>
            <Text style={[styles.text3, choose == 2 && styles.textFocused]}>
              Giữ nguyên cân nặng
            </Text>
            <Text style={styles.text4}>Tối ưu cho sức khỏe của bạn</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNext()}>
          <View style={[styles.choose, choose == 3 && styles.focused]}>
            <Text style={[styles.text3, choose == 3 && styles.textFocused]}>
              Tăng cân
            </Text>
            <Text style={styles.text4}>Tăng cân với eat clean</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingTop: 30,
    paddingLeft: 10,
    width: '100%',
    height: 90,
    backgroundColor: Colors.background_header,
    alignItems: 'center',
  },
  icon: {
    width: 50,
    fontWeight: '700',
  },
  text1: {
    color: Colors.white,
    fontSize: 25,
    fontWeight: '700',
  },
  body: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.box_background,
  },
  text2: {
    fontSize: 18,
    color: Colors.green,
    fontWeight: '500',
    marginBottom: 5,
  },
  choose: {
    marginTop: 10,
    padding: 10,
    paddingTop: 5,
    height: 'auto',
    borderWidth: 1,
    width: 300,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderColor: Colors.white,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
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
  text3: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.black,
    marginBottom: 10,
  },
  text4: {
    fontSize: 16,
    color: Colors.black,
    textAlign: 'center',
    opacity: 0.5,
  },
  focused: {
    borderColor: Colors.light_green,
  },
  textFocused: {
    color: Colors.light_green,
  },
});

export default SetGoal;
