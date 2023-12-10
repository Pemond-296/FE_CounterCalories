import React from 'react';

import {StyleSheet, View, Text, Image, TextInput} from 'react-native';
import {Colors} from '../../utils/Color';

import Icon from 'react-native-vector-icons/AntDesign';
import Send from "react-native-vector-icons/Feather"

const Comment = () => {
  return (
    <View style={styles.container}>
      {Array(3)
        .fill(null)
        .map((_, index) => (
          <View style={styles.comment}>
            <View style={styles.header}>
              <Image
                source={require('../../assets/Pemond.jpg')}
                style={styles.img}
              />
              <View style={styles.textfield}>
                <Text style={styles.name}>Dương Vũ</Text>
                <Text style={styles.time}>10/12/2023 9:58</Text>
              </View>
              <Icon
                name="edit"
                size={20}
                color={Colors.black}
                style={styles.icon}
              />
              <Icon
                name="delete"
                size={20}
                color={Colors.black}
                style={styles.icon1}
              />
            </View>
            <TextInput
              multiline
              style={styles.textInput}
              editable={false}
              value="Sao các chú Pepe lại trông như thế này, trông có giống mấy thằng nghiện không"
            />
          </View>
        ))}
        <View style={styles.commentfield}>
            <Image
                source={require('../../assets/Pemond.jpg')}
                style={styles.img}
            />
            <TextInput
                style={styles.text}
                placeholder='Bình luận tại đây ...'
            />
            <Send
                name='send'
                size={20}
                color={Colors.black}
                style={styles.icon2}
            />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  comment: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  textfield: {
    justifyContent: 'space-around',
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    color: Colors.black,
  },
  time: {
    color: Colors.black,
    fontSize: 13,
    opacity: 0.5,
  },
  icon: {
    marginLeft: 'auto',
    marginRight: 0,
    padding: 10,
  },
  icon1: {
    padding: 10,
    marginRight: 10,
  },
  textInput: {
    color: Colors.black,
    paddingLeft: 20,
    paddingRight: 20,
    opacity: 0.7,
  },
  commentfield: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    borderWidth: 1,
    borderColor: Colors.line,
    width: 280,
    paddingBottom: 2,
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 16,
    borderRadius: 50,
    marginRight: 10,
  }, 
  icon2: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: Colors.box_background,
    backgroundColor: Colors.box_background,
  },
});

export default Comment;
