import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  ScrollView,
} from 'react-native';
import {Colors} from '../../utils/Color';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Entypo';
//@ts-ignore
import DatePicker from 'react-native-modern-datepicker';
//@ts-ignore
import {getToday} from 'react-native-modern-datepicker';
import moment from 'moment';
import { useIsFocused } from '@react-navigation/native';

//@ts-ignore
import Pie from 'react-native-pie';
import * as Progress from 'react-native-progress';
import {viewGoalAPI} from '../../services/Goal';
import {userData} from '../../utils/Storage';
import {updateDiary, viewDiary} from '../../services/Diary';
import Activity from '../../components/Activity/Activity';
import Food from '../../components/Food/Food';
import {useNavigation} from '@react-navigation/native';

const UserHome = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  // Process Date
  const today = getToday();
  const [date, setDate] = useState<string>(today);
  // Open DatePicker
  const [open, setOpen] = useState<boolean>(false);

  const handleDatePicker = () => {
    setOpen(!open);
  };

  const handleChange = (propDate: any) => {
    setDate(propDate);
    setOpen(!open);
  };

  const convertDate = (date: string) => {
    return date.split('/').reverse().join('/');
  };

  const decreaseDate = () => {
    const newDate = moment(date, 'YYYY/MM/DD')
      .subtract(1, 'days')
      .format('YYYY/MM/DD');
    setDate(newDate);
  };

  const increaseDate = () => {
    const newDate = moment(date, 'YYYY/MM/DD')
      .add(1, 'days')
      .format('YYYY/MM/DD');
    setDate(newDate);
  };

  const getDateString = (dateString: string) => {
    const today = moment().startOf('day');
    const inputDate = moment(dateString, 'YYYY/MM/DD').startOf('day');
    const daysDifference = inputDate.diff(today, 'days');
    if (inputDate.isSame(today, 'day')) {
      return 'Hôm nay';
    } else if (inputDate.isSame(today.clone().add(1, 'day'), 'day')) {
      return 'Ngày mai';
    } else if (inputDate.isSame(today.clone().subtract(1, 'day'), 'day')) {
      return 'Hôm qua';
    } else if (inputDate.isSame(today.clone().add(2, 'day'), 'day')) {
      return 'Ngày kia';
    } else if (inputDate.isSame(today.clone().subtract(2, 'day'), 'day')) {
      return 'Hôm kia';
    } else if (daysDifference > 2) {
      return 'Thời gian tới';
    }
    return 'Thời gian trước';
  };

  // Process Water
  const [indexWater, setIndexWater] = useState<number>(0);
  const [water, setWater] = useState<number>(0);
  const handleWater = async (index: number) => {
    if (index == indexWater) {
      setIndexWater(index + 1);
      setWater(250 * (index + 1));
    }
    if (index < indexWater) {
      setIndexWater(indexWater - 1);
      setWater(250 * (indexWater - 1));
    }
    const payload = {date: date, water: indexWater + 1};
    const response = await updateDiary(user.id, payload);
  };

  // Process food and activities
  const [active, setActive] = useState<boolean>(false);

  const [listActivities, setListActivities] = useState<any>();
  const [listFoods, setListFoods] = useState<any>();

  const Col = ({numCol, children}: {numCol: any; children: any}) => {
    //@ts-ignore
    return <View style={styles[`${numCol}col`]}>{children}</View>;
  };

  const Row = ({children}: {children: any}) => (
    <View style={styles.row}>{children}</View>
  );

  const [user, setUser] = useState<any>({});
  useEffect(() => {
    const fetchData = async () => {
      const response: any = await userData();
      setUser(response);
    };
    fetchData();
  }, []);

  // get data
  const [goals, setGoal] = useState<any>({});
  useEffect(() => {
    const fetchData = async () => {
      const response = await viewGoalAPI(user.id);
      setGoal(response.data.data);
    };
    fetchData();
  }, [user]);

  const [daily, setDaily] = useState<any>({});
  const getDaily = async () => {
    const response = await viewDiary(user.id, date);
    console.log(response);
    setDaily(response.data);
    setIndexWater(response?.data?.statistics?.realWater || 0);
    setWater(Number(response?.data?.statistics?.realWater * 250) || 0);
    setListActivities(response?.data?.activityList);
    setListFoods(response?.data?.foodList);
    setActive(true);
  };
  useEffect(() => {
    getDaily();
  }, [date, user, isFocused]);

  const [isDetail, setIsDetail] = useState<boolean>(false);

  const handleDetailActivity = () => {
    setIsDetail(true);
  };
  const handleClose = () => {
    setIsDetail(false);
  };

  const handleCreatePost = () => {
    //@ts-ignore
    navigation.navigate("CreatePost", {data:{user: user, listFoods: listFoods, listActivities: listActivities}});
  };
  return (
    <ScrollView>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'light-content'}
      />
      <View style={styles.header}>
        <View style={styles.field}>
          <Text style={styles.text1}>{getDateString(date)}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity onPress={decreaseDate}>
              <Icon name="left" size={18} color={Colors.white} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.icon1} onPress={handleDatePicker}>
              <Icon name="calendar" size={18} color={Colors.white} />
            </TouchableOpacity>

            <Text style={styles.text2}> {convertDate(date)}</Text>

            <TouchableOpacity onPress={increaseDate}>
              <Icon name="right" size={18} color={Colors.white} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.headerContent}>
          <Row>
            <Col numCol={2}>
              <Row>
                <Text style={styles.text1}>
                  {daily?.statistics?.realTdee || 0}
                </Text>
              </Row>
              <Row>
                <Text style={styles.text1}>ĐÃ NẠP</Text>
              </Row>
            </Col>
            <Col numCol={2}>
              <View style={styles.center}>
                <Row>
                  <Text style={styles.text4}>
                    {goals?.tdee -
                      daily?.statistics?.realTdee +
                      daily?.totalConsumes || goals?.tdee}
                  </Text>
                </Row>
                <Row>
                  <Text style={styles.text2}>cần nạp</Text>
                </Row>
              </View>
              <Pie
                radius={70}
                innerRadius={65}
                sections={[
                  {
                    percentage:
                      100 -
                        100 *
                          ((goals?.tdee -
                            daily?.statistics?.realTdee +
                            daily?.totalConsumes) /
                            goals?.tdee) || 0,
                    color: Colors.white,
                  },
                  {
                    percentage:
                      100 *
                        ((goals?.tdee -
                          daily?.statistics?.realTdee +
                          daily?.totalConsumes) /
                          goals?.tdee) || 100,
                    color: Colors.gray_green,
                  },
                ]}
                strokeCap={'butt'}>
                {' '}
              </Pie>
            </Col>
            <Col numCol={2}>
              <Row>
                <Text style={styles.text1}>{daily?.totalConsumes || 0}</Text>
              </Row>
              <Row>
                <Text style={styles.text1}>TIÊU HAO</Text>
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
                  progress={
                    Number(daily?.statistics?.realCarbs / goals?.carbs) || 0
                  }
                  width={100}
                  color={Colors.white}
                />
              </Row>
              <Row>
                <Text style={styles.text2}>
                  {daily?.statistics?.realCarbs || 0}/{goals?.carbs}
                </Text>
              </Row>
            </Col>
            <Col numCol={2}>
              <Row>
                <Text style={styles.text2}>Protein</Text>
              </Row>
              <Row>
                <Progress.Bar
                  progress={
                    Number(daily?.statistics?.realProtein / goals?.protein) || 0
                  }
                  width={100}
                  color={Colors.white}
                />
              </Row>
              <Row>
                <Text style={styles.text2}>
                  {daily?.statistics?.realProtein || 0}/{goals?.protein}
                </Text>
              </Row>
            </Col>
            <Col numCol={2}>
              <Row>
                <Text style={styles.text2}>Fats</Text>
              </Row>
              <Row>
                <Progress.Bar
                  progress={
                    Number(daily?.statistics?.realFat / goals?.fat) || 0
                  }
                  width={100}
                  color={Colors.white}
                />
              </Row>
              <Row>
                <Text style={styles.text2}>
                  {daily?.statistics?.realFat || 0}/{goals?.fat}
                </Text>
              </Row>
            </Col>
          </Row>
        </View>
        <View
          style={{
            width: 800,
            backgroundColor: Colors.background_header,
            height: 800,
            borderRadius: 9999,
            position: 'absolute',
            top: -345,
            alignSelf: 'center',
            zIndex: -1,
          }}></View>
      </View>
      <Modal animationType="slide" transparent visible={open}>
        <View style={styles.centerViews}>
          <View style={styles.modalView}>
            <DatePicker
              mode="calendar"
              selectedDate={date}
              onDateChange={(value: any) => handleChange(value)}
            />
            <TouchableOpacity style={styles.close} onPress={handleDatePicker}>
              <Text style={styles.text3}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.container}>
        <View>
          <View style={styles.fieldwater}>
            <Text style={styles.text8}>Bạn đã uống bao nhiêu nước</Text>
            <Text style={styles.text9}>
              {' '}
              {water}/{goals?.water}ml
            </Text>
          </View>

          <View style={styles.container1}>
            {Array(16)
              .fill(null)
              .map((_, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.watericon}
                  onPress={() => handleWater(index)}>
                  <Icon1
                    name="cup"
                    size={40}
                    color={index < indexWater ? Colors.gender : Colors.gray}
                  />
                  {indexWater === index && (
                    <View style={styles.addicon}>
                      <Icon name="plus" color={Colors.white} size={20} />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
          </View>
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.fieldwater}>
          <Text style={styles.text8}>Chi tiết dinh dưỡng</Text>
          <TouchableOpacity style={styles.share} onPress={handleCreatePost}>
            <Text style={styles.text5}>Chia sẻ</Text>
          </TouchableOpacity>
        </View>
        {!active ? (
          <View style={styles.container2}>
            <Icon1 name="light-up" size={60} color={Colors.fat} />
            <Text style={styles.text10}>Có thể bạn chưa biết? </Text>
            <Text style={styles.text11}>
              Lượng calo hiển thị trên bao bì có thể không chính xác
            </Text>
            <Text style={styles.text12}>
              Vấn đề ở đây là hệ thống đo calo đã lỗi thời. Ví dụ, nó không tính
              đến việc mỗi cá nhân sẽ có khả năng hấp thụ mức độ calo khác nhau.
              Gần đây, các nhà khoa học đã phát hiện ra rằng hạnh nhân có lượng
              calo ít hơn 20% và hạt dẻ cười ít hơn 5% so với nghiên cứu ban
              đầu.
            </Text>
          </View>
        ) : (
          <View>
            <View style={styles.activitiesContainer}>
              <Text style={styles.text13}>Hoạt động</Text>
              {listActivities &&
                listActivities?.map((item: any, index: any) => (
                  <View key={index} style={styles.activityItem}>
                    <Activity
                      id={item.id}
                      name={item.name}
                      unit={'30 phút'}
                      kcal={item.caloriesConsume}
                      onDetail={handleDetailActivity}
                      onClose={handleClose}
                      status={item.status}
                      type={'USER'}
                      userId={user.id}
                      viewType="HOME"
                    />
                  </View>
                ))}
            </View>

            <View style={styles.foodsContainer}>
              <Text style={styles.text13}>Thức ăn</Text>
              {listFoods &&
                listFoods?.map((item: any, index: any) => (
                  <View key={index} style={styles.foodItem}>
                    <Food
                      name={item.foodName}
                      unit={item.unitType}
                      kcal={item.calories}
                      img={item.image}
                      id={item.id}
                      type={'USER'}
                      status={item.status}
                      carbs={item.carbs}
                      protein={item.protein}
                      fat={item.fat}
                      userId={user.id}
                      viewType="HOME"
                    />
                  </View>
                ))}
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.background_header,
    height: 400,
    paddingTop: 35,
    paddingBottom: 10,
    marginBottom: 50,
  },
  field: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  text1: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white,
  },

  icon1: {
    marginLeft: 20,
    marginRight: 5,
  },

  text2: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },

  centerViews: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalView: {
    margin: 20,
    backgroundColor: Colors.white,
    borderRadius: 20,
    width: '90%',
    padding: 35,
    alignItems: 'center',
    shadowColor: Colors.gender,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  close: {
    borderWidth: 1,
    padding: 10,
    borderColor: Colors.gender,
    width: 100,
    borderRadius: 20,
    backgroundColor: Colors.gender,
  },

  text3: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  field1: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  text4: {
    color: Colors.white,
    fontSize: 30,
    fontWeight: 'bold',
  },

  text5: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: '700',
  },

  field2: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 47,
    left: 38,
  },

  field0: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 20,
  },

  text6: {
    color: Colors.white,
    fontSize: 15,
    marginBottom: 5,
  },

  text7: {
    color: Colors.white,
    fontSize: 15,
    marginTop: 5,
  },

  fieldwater: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },

  text8: {
    color: Colors.black,
    fontSize: 18,
    fontWeight: 'bold',
  },
  text9: {
    color: Colors.blue,
    fontWeight: '400',
    fontSize: 18,
    textDecorationLine: 'underline',
  },

  container1: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: Colors.white,
    backgroundColor: Colors.white,
    borderRadius: 16,
    height: 'auto',
    padding: 15,
    width: 'auto',
    shadowColor: Colors.gender,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  watericon: {
    position: 'relative',
    marginBottom: 5,
  },
  addicon: {
    position: 'absolute',
    top: 12,
    left: 10,
  },

  container2: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: Colors.white,
    backgroundColor: Colors.white,
    borderRadius: 16,
    height: 'auto',
    padding: 15,
    width: 'auto',
    shadowColor: Colors.gender,
    shadowOffset: {
      width: 2,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text10: {
    fontSize: 16,
    color: Colors.black,
    opacity: 0.4,
  },

  text11: {
    fontSize: 18,
    color: Colors.black,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 5,
  },

  text12: {
    fontSize: 16,
    color: Colors.black,
  },
  share: {
    borderWidth: 1,
    borderColor: Colors.gender,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: Colors.gender,
  },
  text13: {
    fontSize: 16,
    color: Colors.black,
    fontWeight: '700',
    marginBottom: 20,
  },
  headerContent: {
    marginTop: 40,
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
  center: {
    position: 'absolute',
    alignSelf: 'center',
    marginTop: 30,
    marginLeft: 40,
    alignItems: 'center',
  },
  activitiesContainer: {
    width: '100%',
    backgroundColor: Colors.white,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 16,
    shadowColor: '#000000',
    shadowOffset: {
      width: 2,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: 'column',
    marginTop: 15,
  },
  activityItem: {
    borderWidth: 2,
    borderColor: Colors.light_gray,
    borderBottomWidth: 3,
    borderRadius: 16,
    marginBottom: 7,
    shadowOpacity: 0.25,
  },
  foodsContainer: {
    width: '100%',
    backgroundColor: Colors.white,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 16,
    shadowColor: '#000000',
    shadowOffset: {
      width: 2,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: 'column',
    marginTop: 15,
  },
  foodItem: {
    borderWidth: 2,
    borderColor: Colors.light_gray,
    borderBottomWidth: 3,
    borderRadius: 16,
    marginBottom: 7,
    shadowOpacity: 0.25,
  },
});

export default UserHome;
