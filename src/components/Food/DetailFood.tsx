import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Platform,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import {Colors} from '../../utils/Color';
import {useNavigation} from '@react-navigation/native';
//@ts-ignore
import Pie from 'react-native-pie';

import Slider from '@react-native-community/slider';
import EditFood from './Edit';

const DetailFood = () => {
  const navigation = useNavigation();

  const handleBack = () => {
    console.log('back');
    navigation.goBack();
  };

  const [kcal, setKcal] = useState<number>(230);
  const [carbs, setCarbs] = useState<number>(77.2);
  const [fat, setFat] = useState<number>(12.3);
  const [protein, setProtein] = useState<number>(20.5);

  const [num, setNum] = useState<number>(0);

  useEffect(() => {
    if (!num) {
      setKcal(230);
      setCarbs(77.2);
      setFat(12.3);
      setProtein(20.5);
      return;
    }
    const x = num / 100;
    setKcal(Number((230 * x).toFixed(1)));
    setCarbs(Number((77.2 * x).toFixed(2)));
    setFat(Number((12.3 * x).toFixed(2)));
    setProtein(Number((20.5 * x).toFixed(2)));
  }, [num]);

  const [edit, setEdit] = useState<boolean>(false)
  const handleEdit = () => {
    setEdit(true)
  }
  const onClose = () => {
    setEdit(false)
  }

  return (
    <View style={{position:'relative', paddingBottom: 100}}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'light-content'}
      />
      {edit && 
        <View style={styles.edit1}>
            <EditFood
              onClose = {onClose}
            />
        </View>
      }
      <View style={styles.header1}>
        <TouchableOpacity style={styles.icon1} onPress={handleBack}>
          <Icon name="arrow-back" size={25} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.text}>Takoyaki</Text>
        <TouchableOpacity style={styles.icon2} onPress={handleEdit}>
          <Icon1 name="edit" size={25} color={Colors.white} />
        </TouchableOpacity>
      </View>
      <ScrollView 
        style={edit && styles.edit}
        showsVerticalScrollIndicator={false}
        >
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
              onChangeText={value => setNum(Number(value))}
            />
            <Text style={styles.text3}>gam</Text>
          </View>
        </View>
        <View style={styles.chart}>
          <Pie
            radius={85}
            innerRadius={50}
            sections={[
              //fat
              {
                percentage: 10,
                color: Colors.fat,
              },

              //protein
              {
                percentage: 20,
                color: Colors.protein,
              },
              //carbs
              {
                percentage: 70,
                color: Colors.carbs,
              },
            ]}
            strokeCap={'butt'}
          />
          <Text style={styles.text6}>{kcal}</Text>
          <Text style={styles.text7}>Kcal</Text>
          <View>
            <View style={styles.field1}>
              <Icon2
                name="circle"
                size={20}
                color={Colors.carbs}
                style={{marginRight: 5}}
              />
              <View>
                <Text style={styles.text4}>Carbs</Text>
                <Text style={styles.text5}>{carbs}g</Text>
              </View>
            </View>
            <View style={styles.field1}>
              <Icon2
                name="circle"
                size={20}
                color={Colors.fat}
                style={{marginRight: 5}}
              />
              <View>
                <Text style={styles.text4}>Chất béo</Text>
                <Text style={styles.text5}>{fat}g</Text>
              </View>
            </View>

            <View style={styles.field1}>
              <Icon2
                name="circle"
                size={20}
                color={Colors.protein}
                style={{marginRight: 5}}
              />
              <View>
                <Text style={styles.text4}>Chất đạm</Text>
                <Text style={styles.text5}>{protein}g</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.goal}>
          <Text style={styles.text8}>Mục tiêu hàng ngày</Text>
          <View style={styles.chart1}>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.unit}>
                <Slider
                  minimumValue={0}
                  maximumValue={100}
                  minimumTrackTintColor={Colors.kcal}
                  maximumTrackTintColor={Colors.kcal}
                  thumbTintColor="transparent"
                  style={{width: 150}}
                  value={50}
                />
                <Text style={styles.text9}>
                  {Number((kcal / 23).toFixed(0))}% Kcal
                </Text>
              </View>
              <View style={styles.unit}>
                <Slider
                  minimumValue={0}
                  maximumValue={100}
                  minimumTrackTintColor={Colors.protein}
                  maximumTrackTintColor={Colors.protein}
                  thumbTintColor="transparent"
                  style={{width: 150}}
                  value={protein}
                />
                <Text style={styles.text9}>
                  {Number((protein / 23).toFixed(0))}% Chất đạm
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.unit}>
                <Slider
                  minimumValue={0}
                  maximumValue={100}
                  minimumTrackTintColor={Colors.carbs}
                  maximumTrackTintColor={Colors.carbs}
                  thumbTintColor="transparent"
                  style={{width: 150}}
                  value={carbs}
                />
                <Text style={styles.text9}>
                  {Number((carbs / 23).toFixed(0))}% Carbs
                </Text>
              </View>
              <View style={styles.unit}>
                <Slider
                  minimumValue={0}
                  maximumValue={100}
                  minimumTrackTintColor={Colors.fat}
                  maximumTrackTintColor={Colors.fat}
                  thumbTintColor="transparent"
                  style={{width: 150}}
                  value={fat}
                />
                <Text style={styles.text9}>
                  {Number((fat / 23).toFixed(0))}% Chất béo
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.goal1}>
          <Text style={styles.text8}>Làm thế nào để tiêu hao {kcal} Kcal</Text>
          <View style={styles.how}>

            <View style={styles.container1}>
              <Pie
                radius={40}
                innerRadius={35}
                sections={[
                  {
                    percentage: 50,
                    color: Colors.percent,
                  },
                ]}
                backgroundColor="#ddd"
              />
              <View style={styles.gauge}>
                <Text style={styles.gaugeText}>290</Text>
                <Text style={styles.gaugeText1}>phút</Text>
              </View>
              <Text style={styles.text10}>Chạy bộ</Text>
            </View>

            <View style={styles.container1}>
              <Pie
                radius={40}
                innerRadius={35}
                sections={[
                  {
                    percentage: 80,
                    color: Colors.percent,
                  },
                ]}
                backgroundColor="#ddd"
              />
              <View style={styles.gauge}>
                <Text style={styles.gaugeText}>360</Text>
                <Text style={styles.gaugeText1}>phút</Text>
              </View>
              <Text style={styles.text10}>Đi bộ</Text>
            </View>

            <View style={styles.container1}>
              <Pie
                radius={40}
                innerRadius={35}
                sections={[
                  {
                    percentage: 20,
                    color: Colors.percent,
                  },
                ]}
                backgroundColor="#ddd"
              />
              <View style={styles.gauge}>
                <Text style={styles.gaugeText}>60</Text>
                <Text style={styles.gaugeText1}>phút</Text>
              </View>
              <Text style={styles.text10}>Chống đẩy</Text>
            </View>

            <View style={styles.container1}>
              <Pie
                radius={40}
                innerRadius={35}
                sections={[
                  {
                    percentage: 60,
                    color: Colors.percent,
                  },
                ]}
                backgroundColor="#ddd"
              />
              <View style={styles.gauge}>
                <Text style={styles.gaugeText}>100</Text>
                <Text style={styles.gaugeText1}>phút</Text>
              </View>
              <Text style={styles.text10}>Đạp xe</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
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
    height: 200,
    backgroundColor: Colors.white,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    position: 'relative',
  },
  field1: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  text4: {
    fontSize: 16,
    color: Colors.black,
    fontWeight: 'bold',
  },
  text5: {
    fontSize: 15,
    color: Colors.black,
  },
  round: {
    position: 'relative',
  },
  text6: {
    position: 'absolute',
    zIndex: 999,
    left: 107,
    top: 75,
    fontSize: 16,
    color: Colors.error,
    fontWeight: 'bold',
  },
  text7: {
    position: 'absolute',
    zIndex: 999,
    left: 105,
    top: 95,
    fontSize: 16,
    color: Colors.error,
    fontWeight: 'bold',
  },
  goal: {
    paddingTop: 10,
  },
  text8: {
    color: Colors.black,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 5,
  },
  chart1: {
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 10,
    padding: 10,
    width: 390,
    height: 200,
    backgroundColor: Colors.white,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'column',
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
  unit: {
    justifyContent: 'center',
  },
  text9: {
    fontSize: 16,
    color: Colors.black,
    marginLeft: 20,
    opacity: 0.7,
  },

  how: {
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 10,
    padding: 10,
    width: 390,
    height: 150,
    backgroundColor: Colors.white,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
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
  goal1: {
    paddingTop: 10,
    paddingBottom: 20,
  },

  container1: {
    width: 175, 
    alignItems: 'center',
    position: 'relative',
  },

  gauge: {
    position: 'absolute',
    width: 100,
    height: 160,
    top: -40,
    left: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gaugeText: {
    backgroundColor: 'transparent',
    color: Colors.error,
    fontWeight: 'bold',
    fontSize: 20,
  },
  gaugeText1: {
    backgroundColor: 'transparent',
    color: Colors.error,
    fontSize: 16,
    opacity: 0.8,
  },
  text10: {
    fontSize: 18,
    color: Colors.black,
    fontWeight: '500',
  },

  edit: {
    opacity: 0.3,
  },
  edit1: {
    position: 'absolute',
    top: 150,
    left: 30,
    zIndex: 999,
  }
});

export default DetailFood;
