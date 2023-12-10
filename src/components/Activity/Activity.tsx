import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Platform,
  Button,
  TouchableOpacity,
} from 'react-native';

import {Colors} from '../../utils/Color';
import Icon from 'react-native-vector-icons/AntDesign';

const Activity = () => {
  const handleDelete = () => {
    console.log('delete r cu');
  };

  const handleDetailActivity = () => {
    console.log('Detail activity')
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handleDetailActivity}>
      <View style={styles.textarea}>
        <Text style={styles.text1}>Võ thuật: judo, karate, kickbox</Text>
        <Text style={styles.text2}>732kcal - 30 phút</Text>
      </View>
      <View style={styles.action}>
        <TouchableOpacity style={styles.icon}>
          <Icon
            name="delete"
            size={20}
            color={Colors.black}
            onPress={handleDelete}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.white,
    backgroundColor: Colors.white,
    padding: 10,
    paddingLeft: 15,
    borderRadius: 16,
    flexDirection: 'row',
    width: 390,
    marginBottom: 10,
  },
  img: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  textarea: {
    width: 300,
    justifyContent: 'space-around',
  },
  text1: {
    fontWeight: 'bold',
    color: Colors.black,
    fontSize: 18,
  },
  text2: {
    color: Colors.black,
    fontWeight: '600',
    opacity: 0.6,
    fontSize: 16,
  },
  action: {
    flexDirection: 'row',
    paddingRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    padding: 7,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: Colors.box_background,
    backgroundColor: Colors.box_background,
    marginLeft: 5,
  },
});

export default Activity;
