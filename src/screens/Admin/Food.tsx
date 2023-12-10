import React, {useState} from 'react';
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
import Icon1 from 'react-native-vector-icons/Ionicons'

const AdminFood = () => {
  const [active, setActive] = useState<boolean>(false);
  return (
    <>
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
                <Icon name="search" color="black" size={30} style={{marginBottom: 6}}/>
                <TextInput
                    placeholder="Tìm kiếm ..."
                    placeholderTextColor="black"
                    style={styles.textInput}
                />
            </View>
            <View style={styles.icon}>
                <Icon1
                    name='add'
                    size={25}
                    color={Colors.white}
                />
            </View>
        </View>
      </View>
      <View style={styles.choose}>
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
        style={styles.component}
        contentContainerStyle={{flexGrow: 1}}
        >
        {Array(10)
          .fill(null)
          .map((_, index) =>
            !active ? <Food key={index} /> : <Activity key={index} />,
          )}
        <View style={styles.component1} />
      </ScrollView>
    </>
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
  }
});

export default AdminFood;
