import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors} from '../../utils/Color';

const DetailActivityCalories: React.FC<any> = ({name, calories, quantity}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.foodOverView}>
        <Text style={styles.foodName}>{name}</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text1}>Calories</Text>
          <Text style={styles.text1}>Thời gian</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.text2}>{calories*quantity} kcal</Text>
          <Text style={styles.text2}>{30*quantity} phút</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {},
  foodOverView: {
    flexDirection: 'column',
  },
  foodName: {
    paddingTop: 10,
    fontSize: 18,
    fontWeight: '700',
    color: Colors.black,
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
    marginLeft: 25,
    marginRight: 25,
    paddingBottom: 5,
  },
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

export default DetailActivityCalories;
