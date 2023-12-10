import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors} from '../../utils/Color';

const DetailCalory = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text1}>Calories</Text>
        <Text style={styles.text1}>Carbs</Text>
        <Text style={styles.text1}>Chất đạm</Text>
        <Text style={styles.text1}>Chất béo</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.text2}>330kcal</Text>
        <Text style={styles.text2}>36g</Text>
        <Text style={styles.text2}>10g</Text>
        <Text style={styles.text2}>7g</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingLeft: 20,
  },
  header: {
    flexDirection: 'row',
  },
  text1: {
    color: Colors.black,
    width: 80,
    textAlign: 'center',
  },
  body: {
    flexDirection: 'row',
  },
  text2: {
    color: Colors.black,
    width: 80,
    textAlign: 'center',
    fontWeight: '800',
  },
});

export default DetailCalory;
