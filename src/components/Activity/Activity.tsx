import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Modal} from 'react-native';

import {Colors} from '../../utils/Color';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {SmallLoading} from '../Loading';

const Activity: React.FC<any> = ({name, kcal, unit, id, onDetail, onClose}) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(false);
  const handleDelete = () => {
    console.log('delete r cu');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleDetailActivity = () => {
    console.log('Detail activity');
    onDetail()
    setModal(true)
  };

  const handleClose = () => {
    onClose()
    setModal(false)
  }

  const [modal, setModal] = useState<boolean>(false)
 
  return (
    <TouchableOpacity style={styles.container} onPress={handleDetailActivity}>
      <View style={styles.textarea}>
        <Text style={styles.text1}>{name}</Text>
        <Text style={styles.text2}>
          {kcal}kcal - {unit}
        </Text>
      </View>
      <View style={styles.action}>
        <TouchableOpacity style={{width: 40}} onPress={handleDelete}>
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
      </View>
      <Modal
        animationType='slide'
        transparent = {true}
        visible={modal}
        onRequestClose={() => {
          console.log('Request has been close')
          setModal(false)
        }}
      >
        <View style={styles.modal}>
          <View style={styles.container1}>
            <View style={styles.container2}>
              <View>
                <Text style={styles.text3}>
                  Võ thuật, judo, karate, jujitsu
                </Text>
                <Text style={styles.text4}>
                  30 phút - 372 kcal
                </Text>
              </View>
              <Icon
                name='close'
                color={Colors.black}
                size={20}
                onPress={handleClose}
              />
            </View>
          </View>
        </View>
      </Modal>
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
    width: 390,
    marginBottom: 10,
    position: 'relative',
  },
  img: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  textarea: {
    width: 300,
    justifyContent: 'space-around',
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
  modal: {
    width: 410,
    height: 300,
    borderWidth: 1,
    borderColor: Colors.white,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 2,
      height: 12,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 25,
    position: 'absolute',
    bottom: 0,
  },
  container1:{
    opacity: 1,
    zIndex: 999,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 16,

  },
  text3:{
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.black,
  },
  container2:{
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
    paddingBottom: 10,
  },
  text4: {
    
  },
});

export default Activity;
