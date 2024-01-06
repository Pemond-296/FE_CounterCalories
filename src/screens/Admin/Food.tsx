import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import {Colors} from '../../utils/Color';
import Food from '../../components/Food/Food';
import Activity from '../../components/Activity/Activity';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icon1 from 'react-native-vector-icons/Ionicons';
import CreateFood from '../../components/Food/Create';
import CreateActivity from '../../components/Activity/Create';
import { viewListFood } from '../../services/Food';
import { listActivity } from '../../services/Activity';
import { userData } from '../../utils/Storage';

const AdminFood = () => {
  const [active, setActive] = useState<boolean>(false);
  const [create, setCreate] = useState<boolean>(false);
  const handleCreate = () => {
    setCreate(true);
  };
  const onClose = () => {
    setCreate(false);
  };

  const [user, setUser] = useState<any>({});
  useEffect(() => {
    const fetchData = async () => {
      const response: any = await userData();
      setUser(response);
    };
    fetchData();
  }, []);


  // api lấy danh sách food
  const [foodItem, setFoodItem] = useState<any>([]);
  const fetchDataFood = async () => {
    const {data} = await viewListFood(user.id);

    setFoodItem(data.data);
  };
  useEffect(() => {
    fetchDataFood();
  }, [user]);
  const createFood = () => {
    fetchDataFood();
  };
  // api lấy danh sách hoạt động
  const [activityItem, setActivityItem] = useState<any>([]);

  const fetchDataActivity = async () => {
    const {data} = await listActivity(user.id);
    setActivityItem(data);
  };

  useEffect(() => {
    fetchDataActivity();
  }, [user]);

  const createActivity = () => {
    fetchDataActivity;
  };

  const [isDetail, setIsDetail] = useState<boolean>(false);
  const handleDetailActivity = () => {
    setIsDetail(true);
  };
  const handleClose = () => {
    setIsDetail(false);
  };


  return (
    <View style={[{position: 'relative', paddingBottom: 170}, , isDetail && styles.blur]}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'light-content'}
      />
      <View style={styles.header}>
        <Text style={styles.text1}>
          {!active ? ' Quản lý thực phẩm' : 'Quản lý hoạt động'}
        </Text>
        <View style={styles.search}>
          <View style={styles.field}>
            <Icon
              name="search"
              color="black"
              size={30}
              style={{marginBottom: 6}}
            />
            <TextInput
              placeholder="Tìm kiếm ..."
              placeholderTextColor="black"
              style={styles.textInput}
            />
          </View>
          <TouchableOpacity style={styles.icon} onPress={handleCreate}>
            <Icon1 name="add" size={25} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.choose, create && styles.create]}>
        <Text
          style={[styles.text2, !active && styles.focus]}
          onPress={() => setActive(false)}>
          Thực phẩm
        </Text>
        <Text
          style={[styles.text2, active && styles.focus]}
          onPress={() => setActive(true)}>
          Hoạt động
        </Text>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        style={[styles.component, create && styles.create]}
        contentContainerStyle={{flexGrow: 1}}>
       {!active
          ? foodItem &&
            foodItem?.map((item: any, index: any) => (
              <Food
                key={index}
                name={item.foodName}
                unit={item.unitType}
                kcal={item.calories}
                img={item.image}
                id={1}
                type={'ADMIN'}
                status={item.status}
                carbs={item.carbs}
                protein={item.protein}
                fat={item.fat}
              />
            ))
          : activityItem &&
            activityItem?.map((item: any, index: any) => (
              <Activity
                key={index}
                id={item.id}
                name={item.name}
                unit={"30 phút"}
                kcal={item.caloriesConsume}
                onDetail={handleDetailActivity}
                onClose={handleClose}
                status={item.status}
                type={"ADMIN"}
              />
            ))}
        <View style={styles.component1} />
      </ScrollView>
      {create && (
        <View style={styles.create1}>
          {!active ? (
            <CreateFood onClose={onClose} />
          ) : (
            <CreateActivity onClose={onClose}/>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.background_header,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    marginBottom: 10,
  },
  text1: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  choose: {
    padding: 10,
    paddingTop: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  text2: {
    color: Colors.black,
    fontSize: 16,
    opacity: 0.4,
    borderBottomWidth: 1,
    borderColor: Colors.white,
    paddingRight: 50,
    paddingLeft: 70,
    paddingBottom: 10,
  },
  focus: {
    opacity: 1,
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderColor: Colors.gender,
  },
  component: {
    padding: 10,
  },
  component1: {
    padding: 15,
  },
  field: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.white,
    width: '80%',
    height: 40,
    backgroundColor: Colors.white,
    borderRadius: 50,
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 0,
    paddingBottom: 0,
    marginRight: 10,
  },
  textInput: {
    opacity: 0.7,
    color: Colors.black,
    width: '100%',
  },
  search: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  icon: {
    borderWidth: 1,
    borderColor: Colors.box_background,
    padding: 7,
    borderRadius: 50,
    backgroundColor: Colors.box_background,
  },
  create: {
    opacity: 0.3,
  },
  create1: {
    position: 'absolute',
    top: 130,
    left: 10,
    zIndex: 999,
  },
  blur: {
    opacity: 0.4,
    flex: 1,
    backgroundColor: Colors.box_background,
  }
});

export default AdminFood;
