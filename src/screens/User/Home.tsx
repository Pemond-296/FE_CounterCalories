import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Animated,
} from 'react-native';
import {Colors} from '../../utils/Color';

import Icon from 'react-native-vector-icons/AntDesign';
import Pie from 'react-native-pie';
import * as Progress from 'react-native-progress';
const UserHome = () => {
  const Col = ({numCol, children}: {numCol: any; children: any}) => {
    return <View style={styles[`${numCol}col`]}>{children}</View>;
  };

  const Row = ({children}: {children: any}) => (
    <View style={styles.row}>{children}</View>
  );

  const dummyData = [
    'Item1',
    'Item2',
    'Item3',
    'Item4',
    'Item5',
    'Item6',
    'Item7',
    'Item8',
    'Item9',
    'Item9',
    'Item9',
    'Item9',
    'Item9',
    'Item9',
    'Item9',
    'Item9',
    'Item9',
    'Item9',
    'Item9',
    'Item9',
    'Item9',
    'Item9',
    'Item9',
    'Item9',
    'Item9',
    'Item9',
    'Item9',
    'Item9',
  ];
  let AnimatedHeaderValue = new Animated.Value(0);
  const AnimatedHeaderHeight = AnimatedHeaderValue.interpolate({
    inputRange: [0, 400],
    outputRange: [400, 0],
    extrapolate: 'clamp',
  });
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'light-content'}
      />
      <SafeAreaView style={{flex: 1}}>
        <Animated.View style={[styles.header, {height: AnimatedHeaderHeight}]}>
          <View style={styles.headerContentDate}>
            <View style={styles.day}>
              <Text style={styles.dayText}>Today</Text>
            </View>
            <View style={styles.calendarContainer}>
              <Col numCol={3}>
                <Icon name="left" style={styles.iconArrow}></Icon>
              </Col>
              <Col numCol={3}>
                <Icon name="calendar" style={styles.iconCalendar}></Icon>
              </Col>
              <Col numCol={2}>
                <Text style={styles.date}>11 Dec</Text>
              </Col>
              <Col numCol={3}>
                <Icon name="right" style={styles.iconArrow}></Icon>
              </Col>
            </View>
          </View>

          <View style={styles.headerContent}>
            <Row>
              <Col numCol={2}>
                <Row>
                  <Text style={styles.text1}>0</Text>
                </Row>
                <Row>
                  <Text style={styles.text1}>EATEN</Text>
                </Row>
              </Col>
              <Col numCol={2}>
                <View style={styles.center}>
                  <Row>
                    <Text style={styles.text3}>1894</Text>
                  </Row>
                  <Row>
                    <Text style={styles.text2}>remaining</Text>
                  </Row>
                </View>
                <Pie
                  radius={70}
                  innerRadius={65}
                  sections={[
                    {
                      percentage: 5,
                      color: Colors.white,
                    },
                    {
                      percentage: 95,
                      color: Colors.gray_green,
                    },
                  ]}
                  strokeCap={'butt'}>
                  {' '}
                </Pie>
              </Col>
              <Col numCol={2}>
                <Row>
                  <Text style={styles.text1}>0</Text>
                </Row>
                <Row>
                  <Text style={styles.text1}>BURNED</Text>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col numCol={2}>
                <Row>
                  <Text style={styles.text2}>Carbs</Text>
                </Row>
                <Row>
                  <Progress.Bar
                    progress={0}
                    width={100}
                    color={Colors.gray_green}
                  />
                </Row>
                <Row>
                  <Text style={styles.text2}>0/166</Text>
                </Row>
              </Col>
              <Col numCol={2}>
                <Row>
                  <Text style={styles.text2}>Protein</Text>
                </Row>
                <Row>
                  <Progress.Bar
                    progress={0}
                    width={100}
                    color={Colors.gray_green}
                  />
                </Row>
                <Row>
                  <Text style={styles.text2}>0/166</Text>
                </Row>
              </Col>
              <Col numCol={2}>
                <Row>
                  <Text style={styles.text2}>Fats</Text>
                </Row>
                <Row>
                  <Progress.Bar
                    progress={0}
                    width={100}
                    color={Colors.gray_green}
                  />
                </Row>
                <Row>
                  <Text style={styles.text2}>0/63</Text>
                </Row>
              </Col>
            </Row>
          </View>
        </Animated.View>
        <ScrollView
          scrollEventThrottle={10}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: AnimatedHeaderValue}}}],
            {useNativeDriver: false},
          )}>
          <View style={{width:800, backgroundColor: Colors.background_header , height: 800, borderRadius: 9999, position: "absolute", top: -750, left: -200}}></View>
          <View style={styles.waterContainer}>
            <Row>
              <Col numCol={1}>
                <Text>Water</Text>
              </Col>
              <Col numCol={1}>
                <Text>750/1950ml</Text>
              </Col>
              <Col numCol={1}>
              </Col>
            </Row>
          </View>
          {dummyData.map((item, index) => (
            <Text
              style={{
                textAlign: 'center',
                fontSize: 15,
                padding: 20,
              }}
              key={index}>
              {item}
            </Text>
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.background_header,
    position: 'relative',
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
    // alignItems: "center",
    overflow: 'hidden',
  },
  headerContentDate: {
    paddingTop: 30,
    paddingBottom: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    zIndex: 1,
  },
  day: {
    flex: 2,
  },
  dayText: {
    color: Colors.white,
    fontSize: 35,
    maxWidth: 120,
    paddingTop: 15,
    fontWeight: 'bold',
  },
  date: {
    color: Colors.white,
    fontSize: 25,
    paddingTop: 15,
    fontWeight: 'bold',
  },
  iconArrow: {
    color: Colors.white,
    fontSize: 25,
    maxWidth: 50,
    paddingTop: 15,
  },
  iconCalendar: {
    color: Colors.white,
    fontSize: 30,
    maxWidth: 50,
    paddingTop: 15,
  },
  calendarContainer: {
    flex: 4,
    paddingTop: 0,
    flexDirection: 'row',
    // backgroundColor: Colors.error,
    width: 250,
    height: 70,
    alignItems: 'center',
  },
  headerContent: {
    // flexDirection: 'row',
    // alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    color: Colors.white,
    // justifyContent: 'space-evenly'
    justifyContent: 'center',
    marginBottom: 10,
  },
  '1col': {
    flex: 3,
    alignItems: 'center',
  },
  '2col': {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  '3col': {
    flex: 1,
    alignItems: 'center',
  },
  text1: {
    color: Colors.white,
    fontSize: 22,
    fontWeight: 'bold',
  },
  text2: {
    color: Colors.white,
    fontSize: 20,
  },
  text3: {
    color: Colors.white,
    fontSize: 30,
    fontWeight: 'bold',
  },
  pie: {
    height: 150,
    marginTop: 15,
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
  },
  center: {
    position: 'absolute',
    alignSelf: 'center',
    marginTop: 30,
    marginLeft: 40,
    alignItems: 'center',
  },
  waterContainer: {
    marginTop: 75,
    width: "100%"
  }
});

export default UserHome;
