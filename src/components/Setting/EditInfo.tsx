import React, {useCallback, useEffect} from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  Platform,
  Alert,
} from 'react-native';
import {Colors} from '../../utils/Color';
import {useNavigation} from '@react-navigation/native';
import {userSignup} from '../../utils/TypeData';
import {z, ZodType} from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import { updateInfor } from '../../services/User';

const EditInfo: React.FC<any> = ({onClose, user}) => {
  const navigation = useNavigation();

  const handleChangeGoal = () => {
    //@ts-ignore
    navigation.navigate('setGoal', {
      data: {
        weight: user.weight,
        height: user.height,
        age: user.age,
        gender: user.gender,
        user_data: user,
      },
    });
  };

  const schema: ZodType<userSignup> = z.object({
    age: z.number().min(0),
    height: z.number().min(0),
    weight: z.number().min(0),
    gender: z.enum(['Nam', 'Nữ']),
  });

  const handleUpdateProfile = async(data: userSignup) => {
    data.gender = (data?.gender === 'Nam' ? 'Male' : 'Female');
    const response = await updateInfor(data, user.id);

    if (response.status === 200) {
      Alert.alert('Update complete!');
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm<userSignup>({resolver: zodResolver(schema)});

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.changeGoalButton}
        onPress={handleChangeGoal}>
        <Text style={styles.changeGoalText}>Thay đổi mục tiêu</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.input}>
        <Text style={styles.text1}>Tuổi</Text>
        <TextInput
          placeholder={`${user.age}`}
          style={styles.text2}
          {...register('age')}
          onChangeText={value => {
            setValue('age', Number(value));
          }}></TextInput>
      </TouchableOpacity>

      <TouchableOpacity style={styles.input}>
        <Text style={styles.text1}>Chiều cao</Text>
        <TextInput
          placeholder={`${user.height} cm`}
          style={styles.text2}
          {...register('height')}
          onChangeText={value => {
            setValue('height', Number(value));
          }}></TextInput>
      </TouchableOpacity>

      <TouchableOpacity style={styles.input}>
        <Text style={styles.text1}>Cân nặng</Text>
        <TextInput
          placeholder={`${user.weight} kg`}
          style={styles.text2}
          {...register('weight')}
          onChangeText={value => {
            setValue('weight', Number(value));
          }}></TextInput>
      </TouchableOpacity>

      <TouchableOpacity style={styles.input}>
        <Text style={styles.text1}>Giới tính</Text>
        <TextInput
          placeholder={user.gender === 'Male' ? 'Nam' : 'Nữ'}
          style={styles.text2} {...register('gender')} onChangeText={(value) => {
            setValue('gender', value)
          }}></TextInput>
      </TouchableOpacity>

      <View style={styles.actionfield}>
        <TouchableOpacity style={styles.action} onPress={onClose}>
          <Text style={{color: Colors.white, fontSize: 15, fontWeight: '800'}}>
            Hủy bỏ
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.action1} onPress={handleSubmit(handleUpdateProfile)}>
          <Text style={{color: Colors.white, fontSize: 15, fontWeight: '800'}}>
            Cập nhật
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    height: 40,
    width: 300,
    borderRadius: 20,
    paddingHorizontal: 20,
    borderColor: Colors.line,
    marginBottom: 10,
    fontSize: 16,
    boxSizing: 'border-box',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  text1: {
    fontWeight: 'bold',
    color: Colors.black,
    fontSize: 16,
  },
  text2: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: 'bold',
    opacity: 0.5,
  },

  container: {
    paddingTop: 20,
  },

  actionfield: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  action: {
    borderWidth: 1,
    width: 120,
    padding: 10,
    alignItems: 'center',
    borderColor: Colors.error,
    backgroundColor: Colors.error,
    borderRadius: 20,
  },
  action1: {
    borderWidth: 1,
    width: 120,
    padding: 10,
    alignItems: 'center',
    borderColor: Colors.gender,
    backgroundColor: Colors.gender,
    borderRadius: 20,
  },
  changeGoalButton: {
    backgroundColor: Colors.background_header,
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  changeGoalText: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: '700',
  },
});

export default EditInfo;
