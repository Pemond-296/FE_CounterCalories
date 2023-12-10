import React from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
  } from 'react-native';
import {Colors} from '../../utils/Color';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/FontAwesome';

const Action:React.FC<any> = ({onClose}) => {
    
    const banUser = () => {
        console.log('user have been banned')
        onClose()
    }

    const deletePost = () => {
        console.log('Post have been deleted')
        onClose()
    }

    const deleteUser = () => {
        console.log('User have been deleted')
        onClose()
    }

    return (
        <View style={styles.onAction}>
            <View style={styles.container1}>
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
            </View>
          </View>
    )
}

const styles = StyleSheet.create({
    onAction: {

    },
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
})

export default Action