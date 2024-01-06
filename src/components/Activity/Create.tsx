import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Platform,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Colors} from '../../utils/Color';
import {Dropdown} from 'react-native-element-dropdown';
import {z, ZodType} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {creatActivity} from '../../utils/TypeData';
import { createActivity } from '../../services/Activity';
import { userData } from '../../utils/Storage';

const data = [
  {label: '30 phút', value: '30 phút'},
  {label: '50 cái', value: '50 cái'},
];

const CreateActivity: React.FC<any> = ({onClose, reloadActivity}) => {
  const schema: ZodType<creatActivity> = z.object({
    name: z.string(),
    kcal: z.number(),
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm<creatActivity>({
    resolver: zodResolver(schema),
  });

  const handleExit = () => {
    onClose();
  };

  const [value, setValue1] = useState<any>('30 Phút');
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const [user, setUser] = useState<any>({});
  useEffect(() => {
    const fetchData = async () => {
      const response: any = await userData();
      setUser(response);
    };
    fetchData();
  },[]);


  const handleCreate = async (data: any) => {
    const payload = {caloriesConsume: data.kcal, unit: value, name: data.name};
    console.log(payload);
    const response = await createActivity(user.id, payload);
    console.log(response.data);
    handleExit()
    reloadActivity();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tạo mới hoạt động</Text>
      <Icon
        name="closecircleo"
        size={20}
        color={Colors.black}
        style={styles.icon}
        onPress={handleExit}
      />
      <View style={styles.view}>
        <View style={styles.field}>
          <Text style={styles.text1}>Tên hoạt động</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập tên hoạt động ..."
            {...register('name')}
            onChangeText={(value: string) => {
              setValue('name', value);
            }}
          />
        </View>
        {errors.name && (
          <Text style={styles.error}>Tên sản phẩm là bắt buộc</Text>
        )}
        <View style={[styles.field, {marginTop: 5, marginBottom: 5}]}>
          <Text style={styles.text1}>Chọn đơn vị luyện tập</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            containerStyle={styles.selectedStyle}
            data={data}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? '30 phút' : '...'}
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue1(item.value);
              setIsFocus(false);
            }}
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.text1}>Năng lượng tiêu thụ trong 1 đơn vị(kcal)</Text>
          <TextInput
            style={styles.input1}
            placeholder="kcal ..."
            placeholderTextColor={Colors.white}
            {...register('kcal')}
            onChangeText={(value: string) => {
              setValue('kcal', Number(value));
            }}
            keyboardType='numeric'
          />
        </View>
        {errors.kcal && (
          <Text style={styles.error}>Năng lượng tiêu thụ là bắt buộc</Text>
        )}
      </View>
      <TouchableOpacity style={styles.update} onPress={handleSubmit(handleCreate)}>
        <Text style={{color: Colors.white, fontWeight: 'bold', fontSize: 18}}>
          Tạo mới
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 390,
    height: 'auto',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.white,
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    paddingVertical: 15,
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
  header: {
    textAlign: 'center',
    fontSize: 18,
    color: Colors.black,
    fontWeight: '900',
  },
  icon: {
    position: 'absolute',
    right: 15,
    top: 12,
  },
  view: {
    padding: 10,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  text1: {
    fontSize: 15,
    color: Colors.black,
    fontWeight: '700',
    marginRight: 5,
  },
  input: {
    borderWidth: 1,
    width: 250,
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderColor: Colors.box_background,
    backgroundColor: Colors.box_background,
    borderRadius: 16,
    color: Colors.black,
    fontWeight: 'bold',
  },
  error: {
    color: Colors.error,
    marginLeft: 'auto',
    marginRight: 'auto',
    fontWeight: '700',
  },
  placeholderStyle: {
    fontSize: 15,
    color: Colors.black,
    fontWeight: 'bold',
    opacity: 0.7,
  },
  selectedTextStyle: {
    fontSize: 15,
    color: Colors.black,
    fontWeight: 'bold',
    opacity: 0.7,
    zIndex: 999,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  selectedStyle: {
    marginTop: 15,
  },
  dropdown: {
    height: 30,
    borderColor: Colors.box_background,
    backgroundColor: Colors.box_background,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: 150,
  },
  input1: {
    borderWidth: 1,
    width: 80,
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderColor: Colors.kcal,
    backgroundColor: Colors.kcal,
    borderRadius: 16,
    color: Colors.white,
    fontWeight: 'bold',
  },
  update: {
    borderWidth: 1,
    paddingHorizontal: 5,
    paddingVertical: 7,
    width: 150,
    alignItems: 'center',
    borderRadius: 16,
    borderColor: Colors.light_green,
    backgroundColor: Colors.light_green,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

export default CreateActivity;
