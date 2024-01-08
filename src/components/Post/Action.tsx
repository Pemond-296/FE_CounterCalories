import React, { useState } from 'react';
import {StyleSheet, View, Text, TouchableOpacity, TextInput} from 'react-native';
import {Colors} from '../../utils/Color';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/FontAwesome';

const Action: React.FC<any> = ({onClose, user}) => {
  const banUser = () => {
    
    onClose();
  };

  const deletePost = () => {
    
    onClose();
  };

  const deleteUser = () => {
    
    onClose();
  };


  const [reason, setReason] = useState<string>("")
  const handleReport = (rs: string) => {
    onClose();
  }

  return (
    <View style={styles.onAction}>
      <View style={styles.container1}>
        {user && user.role === 'ADMIN' ? (
          <>
            <TouchableOpacity onPress={deletePost}>
              <View style={styles.ban}>
                <AntDesign
                  name="delete"
                  size={35}
                  color={Colors.black}
                  style={styles.icondelete}
                />
                <View style={styles.textarea}>
                  <Text style={styles.text12}>Xóa bài viết</Text>
                  <Text style={styles.text21}>
                    Bài viết này sẽ bị xóa vĩnh viễn khỏi hệ thống
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={banUser}>
              <View style={styles.ban}>
                <Icon1
                  name="ban"
                  size={35}
                  color={Colors.black}
                  style={styles.icondelete}
                />
                <View style={styles.textarea}>
                  <Text style={styles.text12}>Chặn người dùng</Text>
                  <Text style={styles.text21}>
                    Người dùng này sẽ không thể sử dụng hệ thống trong 1 tuần
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={deleteUser}>
              <View style={styles.ban}>
                <AntDesign
                  name="deleteuser"
                  size={35}
                  color={Colors.black}
                  style={styles.icondelete}
                />
                <View style={styles.textarea}>
                  <Text style={styles.text12}>Xóa người dùng</Text>
                  <Text style={styles.text21}>
                    Người dùng này sẽ bị xóa vĩnh viễn khỏi hệ thống
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={{fontSize: 24, color: Colors.error, fontWeight: '800'}}>Báo cáo bài viết</Text>
            <TouchableOpacity onPress={() => {
              handleReport("Hình ảnh không phù hợp")
            }}>
              <View style={styles.ban}>
                <Icon1
                  name="image"
                  size={35}
                  color={Colors.black}
                  style={styles.icondelete}
                />
                <View style={styles.textarea}>
                  <Text style={styles.text12}>Hình ảnh không phù hợp</Text>
                  <Text style={styles.text21}>
                    Bài viết này có hình ảnh không phù hợp với bài viết hoặc hình ảnh phản cảm
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
              handleReport("Nội dung không phù hợp")
            }}>
              <View style={styles.ban}>
                <AntDesign
                  name="file1"
                  size={35}
                  color={Colors.black}
                  style={styles.icondelete}
                />
                <View style={styles.textarea}>
                  <Text style={styles.text12}>Nội dung không phù hợp</Text>
                  <Text style={styles.text21}>
                    Bài viết này có nội dung không phù hợp
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleReport("")}>
              <View style={styles.ban}>
                <Icon1
                  name="hashtag"
                  size={35}
                  color={Colors.black}
                  style={styles.icondelete}
                />
                <View style={styles.textarea}>
                  <Text style={styles.text12}>Lý do khác</Text>
                  <TextInput
                    style={styles.text22}
                    placeholder='Nhập lý do tại đây ...'
                    placeholderTextColor={Colors.black}
                    onChangeText={(e) => {
                      setReason(e)
                    }}
                  />
                </View>
              </View>
            </TouchableOpacity>
          
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  onAction: {},
  container1: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
    widht: 400,
    height: 'auto',
    padding: 10,
    backgroundColor: Colors.white,
    borderRadius: 10,
  },
  ban: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginBottom: 5,
    width: 350,
    borderColor: Colors.white,
    borderWidth: 1,
  },
  icondelete: {
    paddingLeft: 5,
  },
  textarea: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  text12: {
    color: Colors.black,
    fontSize: 20,
    fontWeight: 'bold',
  },
  text21: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: '600',
    opacity: 0.5,
    width: 250,
  },
  text22: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: '600',
    opacity: 0.5,
    width: 250,
    borderColor: Colors.black,
    borderRadius: 20,
  },
});

export default Action;
