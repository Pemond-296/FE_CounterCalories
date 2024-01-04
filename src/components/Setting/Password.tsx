import React from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View, Text} from 'react-native';
import {Colors} from '../../utils/Color';

const Password:React.FC<any> = ({onClose}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu cũ"
        placeholderTextColor={Colors.gray}
      />

      <TextInput
        style={styles.input}
        placeholder="Mật khẩu mới"
        placeholderTextColor={Colors.gray}
      />

      <TextInput
        style={styles.input}
        placeholder="Nhập lại mật khẩu mới"
        placeholderTextColor={Colors.gray}
      />

      <View style={styles.actionfield}>
        <TouchableOpacity style={styles.action} onPress={onClose}>
            <Text style={{color: Colors.white, fontSize: 15, fontWeight: '800'}}>Hủy bỏ</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.action1}>
            <Text style={{color: Colors.white, fontSize: 15, fontWeight: '800'}}>Cập nhật</Text>
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
    borderColor: Colors.black,
    marginBottom: 10,
    fontSize: 16,
  },
  container: {
    paddingTop: 20,
  },

  actionfield: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',

  },

  action : {
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
  }
});

export default Password;
