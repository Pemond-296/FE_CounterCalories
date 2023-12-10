import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Platform,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/AntDesign';
import {Colors} from '../../utils/Color';
import {useNavigation} from '@react-navigation/native';

//@ts-ignore
import Pie from 'react-native-pie'

const DetailFood = () => {
  const navigation = useNavigation();

  const handleBack = () => {
    console.log('back');
    navigation.goBack();
  };

  const handleEdit = () => {
    console.log('edit');
  };

  const data: any = [
    { value: 30, svg: { fill: Colors.gender, x: 0, y: 0 } },
    { value: 30, svg: { fill: Colors.ban, x: 0, y: 0 } },
    { value: 40, svg: { fill: Colors.pink, x: 0, y: 0 } },
  ];

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'light-content'}
      />
      <View style={styles.header1}>
        <TouchableOpacity style={styles.icon1} onPress={handleBack}>
          <Icon name="arrow-back" size={25} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.text}>Takoyaki</Text>
        <TouchableOpacity style={styles.icon2} onPress={handleEdit}>
          <Icon1 name="edit" size={25} color={Colors.white} />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Image
          source={require('../../assets/takoyaki.jpg')}
          style={styles.image}
        />
        <Text style={styles.text1}>Thành phần dinh dưỡng</Text>
        <View style={styles.field}>
          <TextInput
            placeholder="100"
            placeholderTextColor={Colors.black}
            style={styles.text2}
            keyboardType="numeric"
          />
          <Text style={styles.text3}>gam</Text>
        </View>
      </View>
      <View style={styles.chart}>
      <Pie
              radius={80}
              innerRadius={50}
              sections={[
                {
                  percentage: 30,
                  color: '#44CD40',
                },
                {
                  percentage: 30,
                  color: '#404FCD',
                },
                {
                  percentage: 40,
                  color: '#EBD22F',
                },
              ]}
              strokeCap={'butt'}
            />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header1: {
    flexDirection: 'row',
    paddingTop: 30,
    width: '100%',
    height: 70,
    backgroundColor: Colors.background_header,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  text: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
  },
  icon1: {
    position: 'absolute',
    left: 0,
    top: 28,
    padding: 10,
    zIndex: 999,
  },
  icon2: {
    position: 'absolute',
    right: 5,
    top: 28,
    padding: 10,
    zIndex: 999,
  },
  container: {
    padding: 10,
    paddingLeft: 20,
  },
  text1: {
    color: Colors.black,
    fontSize: 18,
    fontWeight: 'bold',
  },
  field: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text2: {
    borderWidth: 1,
    width: 100,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 15,
    paddingRight: 15,
    borderColor: Colors.white,
    backgroundColor: Colors.white,
    borderRadius: 16,
    fontSize: 16,
    color: Colors.black,
    textAlign: 'center',
    marginRight: 20,
    ...Platform.select({
      ios: {
        shadowColor: Colors.black,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 15,
        shadowColor: Colors.box_shadow,
      },
    }),
  },
  text3: {
    borderWidth: 1,
    borderColor: Colors.white,
    width: 250,
    color: Colors.black,
    backgroundColor: Colors.white,
    padding: 5,
    borderRadius: 16,
    textAlign: 'center',
    fontSize: 16,
    opacity: 0.7,
    ...Platform.select({
      ios: {
        shadowColor: Colors.black,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 15,
        shadowColor: Colors.box_shadow,
      },
    }),
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: 10,
  },
  chart: {
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 10,
    padding: 10,
    width: 390,
    height: 300,
    backgroundColor: Colors.white,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default DetailFood;
