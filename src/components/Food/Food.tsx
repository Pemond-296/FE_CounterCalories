import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Colors} from '../../utils/Color';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import {SmallLoading} from '../Loading';
import {useNavigation} from '@react-navigation/native';
import { updateDiary } from '../../services/Diary';
//@ts-ignore
import {getToday} from 'react-native-modern-datepicker';
const Food: React.FC<any> = ({name, unit, kcal, img, id, type, status, carbs, fat, protein, userId}) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(false);
  const handleDelete = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleDetailFood = () => {
    //@ts-ignore
    navigation.navigate('DetailFood', {data: {name, unit, kcal, img, id, type, status, carbs, fat, protein, userId}});
  };

  const handleAdd = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    const payload = {foodId: id , foodAmount: 100, date: getToday()}
    console.log(payload)
    const response = await updateDiary(userId, payload)
    console.log(response)
  };

  const handlePublic = () => {
    
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleDetailFood}>
      <Image
        source={{
          uri: 'http://' + img,
        }}
        style={styles.img}
      />
      <View style={styles.textarea}>
        <Text style={styles.text1}>{name}</Text>
        <Text style={styles.text2}>
          {unit} - {kcal}kcal
        </Text>
      </View>
      <View style={styles.action}>
        {type === 'ADMIN' ? (
          <TouchableOpacity onPress={handleDelete} style={styles.delete}>
            {!loading ? (
              <Icon
                name="delete"
                size={20}
                style={styles.icon}
                color={Colors.black}
              />
            ) : (
              <SmallLoading />
            )}
          </TouchableOpacity>
        ) : (
          <View style={styles.icon1}>
            {status === 'UNPUBLISHED' && (
              <TouchableOpacity onPress={handlePublic} style={styles.delete}>
                <Icon1
                  name="public"
                  size={20}
                  style={styles.icon}
                  color={Colors.black}
                />
              </TouchableOpacity>
            )}

            {status === 'PENDING' && (
              <TouchableOpacity onPress={handlePublic} style={styles.delete}>
                <Icon
                  name="hourglass"
                  size={20}
                  style={styles.icon}
                  color={Colors.black}
                />
              </TouchableOpacity>
            )}

            <TouchableOpacity onPress={handleAdd} style={styles.delete}>
              {!loading ? (
                <Icon
                  name="plus"
                  size={20}
                  style={styles.icon}
                  color={Colors.black}
                />
              ) : (
                <SmallLoading />
              )}
            </TouchableOpacity>
          </View>
        )}
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
    width: '100%',
    marginBottom: 10,
  },
  img: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  textarea: {
    width: 250,
    justifyContent: 'space-around',
    paddingLeft: 10,
    flex: 1
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
  delete: {
    width: 40,
  },
  icon1: {
    flexDirection: 'row',
    width: 80,
    justifyContent: 'flex-end',
  }
});

export default Food;
