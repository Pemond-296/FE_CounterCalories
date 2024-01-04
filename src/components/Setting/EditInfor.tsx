import React from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View, Text, Platform} from 'react-native';
import {Colors} from '../../utils/Color';

const EditInfor:React.FC<any> = ({onClose}) => {
  return (
    <View style={styles.container}>
      
      <TouchableOpacity style={styles.input}>
        <Text style={styles.text1}>Tuổi</Text>
        <Text style={styles.text2}>21</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.input}>
        <Text style={styles.text1}>Chiều cao</Text>
        <Text style={styles.text2}>175 cm</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.input}>
        <Text style={styles.text1}>Cân nặng</Text>
        <Text style={styles.text2}>75kg</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.input}>
        <Text style={styles.text1}>Giới tính</Text>
        <Text style={styles.text2}>Nam</Text>
      </TouchableOpacity>

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

export default EditInfor;
