import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors} from '../../utils/Color';

const DetailFoodCalories: React.FC<any> = ({
  foodName,
  unitType,
  calories,
  carbs,
  protein,
  fat,
  quantity
}) => {

  return (
    <View style={styles.mainContainer}>
      {foodName && unitType ? (
        <View style={styles.foodOverView}>
          <Text style={styles.foodName}>{foodName}</Text>
          <Text style={styles.foodUnit}>{100*quantity}g</Text>
        </View>
      ) : (
        <></>
      )}
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text1}>Calories</Text>
          <Text style={styles.text1}>Carbs</Text>
          <Text style={styles.text1}>Chất đạm</Text>
          <Text style={styles.text1}>Chất béo</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.text2}>{calories*quantity} kcal</Text>
          <Text style={styles.text2}>{carbs*quantity} g</Text>
          <Text style={styles.text2}>{protein*quantity} g</Text>
          <Text style={styles.text2}>{fat*quantity} g</Text>
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
  foodUnit: {
    marginLeft: 25,
    marginRight: 25,
    paddingBottom: 5,
    fontSize: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
  },
  foodName: {
    paddingLeft: 25,
    paddingTop: 10,
    fontSize: 18,
    fontWeight: '700',
    color: Colors.black,
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

export default DetailFoodCalories;
