import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import { Colors } from '../utils/Color';

const BanScreen = () => {
  return (
    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: Colors.white}}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'light-content'}
      />
      <Text style={{ textAlign: 'center', fontSize: 17, fontWeight: 'bold', color: Colors.black, marginBottom: 5}}>
        Tài khoản của bạn đã vi phạm chính sách nào đó dẫn đến việc bị khóa tạm thời 
      </Text>
      <Text style={{color: Colors.black}}>
        Vui lòng liên hệ với chúng tôi để biết thêm thông tin chi tiết
      </Text>
      <Text style={{color: Colors.error}}>Số điện thoại: 0123456789</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default BanScreen;
