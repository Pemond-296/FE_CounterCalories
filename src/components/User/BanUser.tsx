import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Colors} from '../../utils/Color';
import Icon from 'react-native-vector-icons/AntDesign';
import {SmallLoading} from '../Loading';

const BanUser = () => {
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
  const handleDelete = () => {
    setLoadingDelete(true);
    setTimeout(() => {
      setLoadingDelete(false);
    }, 1000);
  };

  const [loadingUnban, setLoadingUnBan] = useState<boolean>(false);
  const handleUnBan = () => {
    setLoadingUnBan(true);
    setTimeout(() => {
      setLoadingUnBan(false);
    }, 1000);
  };

  const handleDetailFood = () => {
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleDetailFood}>
      <Image source={require('../../assets/Pemond.jpg')} style={styles.img} />
      <View style={styles.textarea}>
        <Text style={styles.text1}>Pemond</Text>
        <Text style={styles.text2}>Bị khóa ngày 17/12/2023</Text>
        <Text style={styles.text2}>Mở khóa ngày 24/12/2023</Text>
      </View>
      <View style={styles.action}>
        <TouchableOpacity style={styles.delete} onPress={handleUnBan}>
          {!loadingUnban ? (
            <Icon
              name="unlock"
              size={20}
              color={Colors.white}
              style={styles.icon}
            />
          ) : (
            <SmallLoading />
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={handleDelete} style={styles.delete}>
          {!loadingDelete ? (
            <Icon
              name="delete"
              size={20}
              style={styles.icon}
              color={Colors.white}
            />
          ) : (
            <SmallLoading />
          )}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.ban,
    backgroundColor: Colors.ban,
    padding: 10,
    paddingLeft: 20,
    borderRadius: 16,
    flexDirection: 'row',
    width: 390,
    marginBottom: 10,
  },
  img: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  textarea: {
    width: 240,
    justifyContent: 'space-around',
    paddingLeft: 10,
  },
  text1: {
    fontWeight: 'bold',
    color: Colors.white,
    fontSize: 18,
  },
  text2: {
    color: Colors.white,
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
});

export default BanUser;
