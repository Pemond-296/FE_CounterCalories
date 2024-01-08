import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Colors} from '../../utils/Color';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import {SmallLoading} from '../Loading';
import {useNavigation} from '@react-navigation/native';
import {updateDiary} from '../../services/Diary';
//@ts-ignore
import {getToday} from 'react-native-modern-datepicker';
import {acceptFood, publicFood} from '../../services/Food';

const Food: React.FC<any> = ({
  name,
  unit,
  kcal,
  img,
  id,
  type,
  status,
  carbs,
  fat,
  protein,
  userId,
  viewType,
  reload,
  quantity,
}) => {
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
    navigation.navigate('DetailFood', {
      data: {
        name,
        unit,
        kcal,
        img,
        id,
        type,
        status,
        carbs,
        fat,
        protein,
        userId,
      },
    });
  };

  const handleAdd = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    const payload = {foodId: id, foodAmount: 100, date: getToday()};
    await updateDiary(userId, payload);
  };

  const [loading1, setLoading1] = useState<boolean>(false);

  const handlePublic = async () => {
    const payload = {status: 'PENDING'};
    setLoading1(true);
    setTimeout(() => {
      setLoading1(false);
    }, 1000);
    await publicFood(id, payload);
    reload();
  };

  const handleUnPublic = async () => {
    const payload = {status: 'UNPUBLISHED'};
    setLoading1(true);
    setTimeout(() => {
      setLoading1(false);
    }, 1000);
    await publicFood(id, payload);
    reload();
  };

  const handleAccept = async () => {
    const payload = {status: 'PUBLISHED'};
    const response = await acceptFood(id, payload);
    reload();
  };

  const handleReject = async () => {
    const payload = {status: 'UNPUBLISHED'};
    await acceptFood(id, payload);
    reload();
  };

  const handleDeleteItem = async () => {};

  return (
    <TouchableOpacity
      style={[
        styles.container,
        type === 'ADMIN' && status === 'PENDING' && styles.pending,
      ]}
      onPress={handleDetailFood}>
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
      <View>
        {viewType === 'HOME' ? (
          <>
            <View style={styles.action}>
              <TouchableOpacity
                onPress={handleDeleteItem}
                style={styles.delete}>
                {!loading ? (
                  <Icon
                    name="close"
                    size={20}
                    style={styles.icon}
                    color={Colors.black}
                  />
                ) : (
                  <SmallLoading />
                )}
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            {type === 'ADMIN' ? (
              <View style={styles.action}>
                {status === 'PENDING' ? (
                  <>
                    <TouchableOpacity
                      onPress={handleAccept}
                      style={styles.delete}>
                      <Icon
                        name="check"
                        size={20}
                        style={styles.icon}
                        color={Colors.black}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={handleReject}
                      style={styles.delete}>
                      <Icon
                        name="close"
                        size={20}
                        style={styles.icon}
                        color={Colors.black}
                      />
                    </TouchableOpacity>
                  </>
                ) : (
                  <TouchableOpacity
                    onPress={handleDelete}
                    style={styles.delete}>
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
                )}
              </View>
            ) : (
              <View style={styles.icon1}>
                {!loading1 ? (
                  <>
                    {status === 'UNPUBLISHED' && (
                      <TouchableOpacity
                        onPress={handlePublic}
                        style={styles.delete}>
                        <Icon1
                          name="public"
                          size={20}
                          style={styles.icon}
                          color={Colors.black}
                        />
                      </TouchableOpacity>
                    )}

                    {status === 'PENDING' && (
                      <TouchableOpacity
                        onPress={handleUnPublic}
                        style={styles.delete}>
                        <Icon
                          name="hourglass"
                          size={20}
                          style={styles.icon}
                          color={Colors.black}
                        />
                      </TouchableOpacity>
                    )}
                  </>
                ) : (
                  <SmallLoading />
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
          </>
        )}
      </View>
      {quantity > 1 && <Text style={styles.quantity}>x{quantity}</Text>}
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
    position: 'relative',
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
    flex: 1,
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
  },
  pending: {
    backgroundColor: Colors.gray_green,
    borderColor: Colors.gray_green,
  },
  quantity: {
    position: 'absolute',
    left: 2,
    top: 2,
    fontSize: 16,
    zIndex: 999,
    color: Colors.error,
    fontWeight: 'bold',
  },
});

export default Food;
