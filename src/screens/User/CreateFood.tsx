import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
  TextInput,
  Button,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../../utils/Color';
import Icon from 'react-native-vector-icons/Ionicons';
import {ScreenProps} from '../../utils/TypeData';
import {z, ZodType} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {timeActivity} from '../../utils/TypeData';

const CreateFood: React.FC<ScreenProps | any> = ({route}) => {
  const navigation = useNavigation();
  const {data} = route.params;
  const BMI: number = data.weight / ((data.height / 100) * (data.height / 100));
  const [choose, setChoose] = useState(1);
  const [foodName, setFoodName] = useState('');

  const handleFoodNameChange = (text: string) => {
    setFoodName(text);
  };
  useEffect(() => {
    BMI < 25 ? (BMI > 18.5 ? setChoose(2) : setChoose(3)) : null;
  }, []);

  const handleNext = () => {
    //@ts-ignore
    navigation.navigate('reviewIndex', {
      data: {...data, bmi: BMI, choose: choose},
    });
  };
  const schema: ZodType<timeActivity> = z.object({
    namefood: z
      .string()
      .min(1, 'Trường này là bắt buộc')
      .max(0, 'Thông tin không hợp lệ'),
    numberkg: z
      .number()
      .min(1, 'Trường này là bắt buộc')
      .max(0, 'Thông tin không hợp lệ'),
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm<timeActivity>({
    resolver: zodResolver(schema),
  });
  const [isFocused, setIsFocused] = useState(0);

  const handleFindFood = (data: any) => {
    const gender = isMale ? 'Male' : 'Female';
    data = {...data, height, weight, age, gender};
    //@ts-ignore
    navigation.navigate('FindFood', {data: data});
  };
  const [unit, setUnit] = useState('g');

  const handleTabPress = (selectedUnit) => {
    setUnit(selectedUnit);
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
          name="close-outline"
          size={25}
          color={Colors.white}
          style={styles.icon}
          onPress={() => {
            //@ts-ignore
            navigation.goBack();
          }}
        />
        <Text style={styles.text1}>Tạo thực phẩm mới</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.text2}>Thông tin cơ bản</Text>
        <View style={[styles.choose, choose == 1 && styles.focused]}>
          <TextInput
          placeholder='Tên của thực phẩm'
          onChangeText={handleFoodNameChange}
          value={foodName}
          >
          </TextInput>
          <TextInput
          placeholder='Barcode (Mã sản phẩm)'
          >
          </TextInput>
        </View>
        <Text style={styles.text2}>Khẩu phần ăn</Text>
        <View style={[styles.choose, choose == 1 && styles.focused]}>
          <View style={styles.field}>
            <Text style={styles.text5}>Tên của khẩu phần ăn</Text>
            <TextInput
              placeholder="vd: hộp,lon ...(bắt buộc)"
              placeholderTextColor={Colors.black}
              style={[styles.input, isFocused == 1 && styles.focusedInput]}
              inputMode="numeric"
              {...register('namefood')}
              onChangeText={value => {
                setValue('namefood', parseInt(value));
              }}
              onFocus={() => setIsFocused(1)}
              onBlur={() => setIsFocused(0)}
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.text5}>1 Khẩu phần ăn =</Text>
            <TextInput
              placeholder="100"
              placeholderTextColor={Colors.black}
              style={[styles.input1, isFocused == 1 && styles.focusedInput]}
              inputMode="numeric"
              {...register('numberkg')}
              onChangeText={value => {
                setValue('numberkg', parseInt(value));
              }}
              onFocus={() => setIsFocused(1)}
              onBlur={() => setIsFocused(0)}
            />
            <TouchableOpacity
              style={[styles.tabItem, unit === 'g' && styles.activeTabItem]}
              onPress={() => handleTabPress('g')}
            >
              <Text style={[styles.tabText, unit === 'g' && styles.activeTabText]}>g</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabItem, unit === 'ml' && styles.activeTabItem]}
              onPress={() => handleTabPress('ml')}
            >
              <Text style={[styles.tabText, unit === 'ml' && styles.activeTabText]}>ml</Text>
            </TouchableOpacity>
          </View>
          
        </View>
        <View style={styles.button}>
          <Button
            title="Tiếp tục"
            color={Colors.green}
            onPress={handleSubmit(handleFindFood)}
          />
        </View>
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
  focusedInput: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.link,
  },
  text5: {
    color: Colors.black,
    fontWeight: '700',
    fontSize: 15,
    marginTop: 25,
    marginRight: 10,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: Colors.black,
    padding: 10,
    fontsize: 16,
    fontWeight: 'bold',
    opacity: 0.5,
    paddingBottom: 0,
  },
  tabItem: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    height: 34,
    borderColor: 'gray',
    marginRight: 10,
    borderRadius: 60,
    marginTop: 20,
  },
  activeTabItem: {
    backgroundColor: 'green',
  },
  tabText: {
    color: 'black',
  },
  activeTabText: {
    color: 'white',
  },
  input1: {
    flex: 0.2,
    borderBottomWidth: 1,
    borderBottomColor: Colors.black,
    padding: 10,
    fontsize: 16,
    fontWeight: 'bold',
    opacity: 0.5,
    paddingBottom: 0,
  },
  icon: {
    width: 50,
    fontWeight: '700',
  },
  text1: {
    color: Colors.white,
    fontSize: 23,
    fontWeight: '700',
    alignItems: 'center',
  },
  body: {
    flex: 0.8,
    backgroundColor: Colors.box_background,
  },
  text6: {
    color: Colors.black,
    fontWeight: '600',
    fontSize: 22,
  },
  error: {
    color: Colors.error,
    textAlign: 'center',
  },
  button: {
    marginTop: 300,
    width: 100,
    borderRadius: 16,
    overflow: 'hidden',
    marginLeft: 160,
  },
  action: {
    borderWidth: 5,
    borderColor: Colors.white,
    backgroundColor: Colors.white,
    width: 350,
    padding: 35,
    paddingTop: 20,
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 10,
        shadowColor: Colors.box_shadow,
      },
    }),
  },

  field: {
    flexDirection: 'row',
    height: 50,
  },
  text2: {
    fontSize: 21,
    color: Colors.black,
    fontWeight: '500',
    marginTop: 20,
    marginLeft: 10,
  },
  choose: {
    marginTop: 10,
    padding: 10,
    paddingTop: 5,
    height: 'auto',
    borderWidth: 1,
    width: '100%',
    borderRadius: 15,
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

export default CreateFood;
