import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';

import {Colors} from '../../utils/Color';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {SmallLoading} from '../Loading';
import Icon1 from 'react-native-vector-icons/MaterialIcons';

const Activity: React.FC<any> = ({
  name,
  kcal,
  unit,
  id,
  onDetail,
  onClose,
  type,
  status,
}) => {
  const [modal, setModal] = useState<boolean>(false);
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(false);
  const handleDelete = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleDetailActivity = () => {
    onDetail();
    setModal(true);
  };

  const handleClose = () => {
    onClose();
    setModal(false);
  };

  const handleAdd = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handlePublic = () => {};

  type Unit = {
    [propKey: string]: number;
  };
  const activityUnits: Unit = {
    '1 phút': 1,
    '5 phút': 5,
    '10 phút': 10,
    '15 phút': 15,
    '30 phút': 30,
    '1 giờ': 1,
  };

  const [currentTimeUnitStep, setCurrentTimeUnitStep] = useState<string>('1 phút');
  const [currentActivityTime, setCurrentActivityTime] = useState<number>(30);
  const [currentTimeUnit, setCurrentTimeUnit] = useState<string>('phút');
  const [currentActivityKcal, setCurrentActivityKcal] = useState<number>(kcal)

  const handleChooseUnit = (text: string) => {
    setCurrentTimeUnitStep(text);
  };

  useEffect(() => {
    if (currentTimeUnitStep !== '1 giờ') {
      setCurrentActivityTime(30);
      setCurrentTimeUnit('phút')
    } else {
      setCurrentActivityTime(1);
      setCurrentTimeUnit('giờ')
    }
  }, [currentTimeUnitStep]);

  const calculateCurrentKcal = useCallback(() => {
    if (currentTimeUnit !== 'giờ') {
      setCurrentActivityKcal(Number((kcal/30 * currentActivityTime).toFixed(2)))
    } else {
      setCurrentActivityKcal(Number((kcal/30 * currentActivityTime * 60).toFixed(2)))

    }
  }, [currentTimeUnitStep, currentActivityTime, currentTimeUnit]);

  useEffect(() => {
    calculateCurrentKcal();
  }, [currentActivityTime])

  const handleAddTime = useCallback(() => {
    setCurrentActivityTime(currentActivityTime + activityUnits[currentTimeUnitStep]);
  }, [currentTimeUnitStep, currentActivityTime, currentTimeUnit]);
  const handleSubtractTime =useCallback(() => {
    setCurrentActivityTime(currentActivityTime - activityUnits[currentTimeUnitStep]);
  }, [currentTimeUnitStep, currentActivityTime, currentTimeUnit]);

  return (
    <TouchableOpacity style={styles.container} onPress={handleDetailActivity}>
      <View style={styles.textarea}>
        <Text style={styles.text1}>{name}</Text>
        <Text style={styles.text2}>
          {kcal}kcal - {unit}
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          console.log('Request has been close');
          setModal(false);
        }}>
          setModal(false)
        }}
      >
        <View style={styles.modal}>
          <View style={styles.activityContainer}>
            <View style={styles.activityContainerHeader}>
              <View style={styles.activityTextContainer}>
                <Text style={styles.activityName}>{name}</Text>
                <View style={styles.activityInfo}>
                  <Text style={styles.activityInfoText}>{currentActivityTime} {currentTimeUnit}</Text>
                  <Text style={styles.activityInfoText}> - </Text>
                  <Text style={styles.activityInfoText}>{currentActivityKcal} kcal</Text>
                </View>
              </View>
              <Icon
                name="close"
                color={Colors.black}
                size={25}
                onPress={handleClose}
              />
            </View>
            <View style={styles.activityContainerDivider}></View>
            <ScrollView
              style={styles.activityUnit}
              contentContainerStyle={{flex: 0}}
              horizontal
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}>
              {activityUnits &&
                Object.keys(activityUnits).map((text: any, index: any) => (
                  <TouchableOpacity
                    key={index}
                    style={
                      currentTimeUnitStep === text
                        ? styles.activityUnitButtonChoosen
                        : styles.activityUnitButton
                    }
                    onPress={() => handleChooseUnit(text)}>
                    <Text
                      style={
                        currentTimeUnitStep === text
                          ? styles.activityUnitTextChoosen
                          : styles.activityUnitText
                      }>
                      {text}
                    </Text>
                  </TouchableOpacity>
                ))}
            </ScrollView>
          </View>
          <View style={styles.activityTimeContainer}>
            <View style={styles.activityTimeAdjustButtonContainerLeft}>
              <TouchableOpacity
                style={styles.activityTimeAdjustButton}
                onPress={handleSubtractTime}
                disabled={currentActivityTime===0}>
                <Icon name="minus" size={25} color={Colors.black}></Icon>
              </TouchableOpacity>
            </View>
            <View style={styles.activityTime}>
              <Text style={styles.activityTimeText}>{currentActivityTime}</Text>
            </View>
            <View style={styles.activityTimeAdjustButtonContainerRight}>
              <TouchableOpacity
                style={styles.activityTimeAdjustButton}
                onPress={handleAddTime}>
                <Icon name="plus" size={25} color={Colors.black}></Icon>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.addActivityButton}>
            <Text style={styles.addActivityButtonText}>Thêm hoạt động</Text>
          </TouchableOpacity>
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
    padding: 12,
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
    width: 300,
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
    alignItems: 'flex-end',
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
    width: '100%',
    height: '50%',
    backgroundColor: '#F1F1ED',
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
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 10,
  },
  activityContainer: {
    width: '100%',
    height: '50%',
    backgroundColor: Colors.white,
    borderRadius: 20,
    marginBottom: 10,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 2,
      height: 7,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 3,
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  activityContainerHeader: {
    flexDirection: 'row',
  },
  activityName: {
    fontSize: 25,
    fontWeight: '600',
    color: '#000000',
  },
  activityInfo: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  activityTextContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  activityInfoText: {
    fontSize: 20,
  },
  activityContainerDivider: {
    height: 2,
    width: '100%',
    backgroundColor: Colors.black,
    opacity: 0.15,
  },
  activityUnit: {
    marginTop: 15,
  },
  activityUnitButton: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    height: 40,
    backgroundColor: Colors.light_gray,
    marginTop: 10,
    marginHorizontal: 5,
    borderRadius: 20,
  },
  activityUnitButtonChoosen: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    height: 40,
    backgroundColor: Colors.background_header,
    marginTop: 10,
    marginHorizontal: 5,
    borderRadius: 20,
  },
  activityUnitText: {
    color: Colors.black,
    fontSize: 15,
    fontWeight: '600',
  },
  activityUnitTextChoosen: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '600',
  },
  activityTimeContainer: {
    width: '100%',
    height: '25%',
    backgroundColor: Colors.white,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 2,
      height: 7,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  activityTime: {
    flex: 1,
    alignItems: 'center',
    borderBottomColor: Colors.black,
    borderBottomWidth: 2,
  },
  activityTimeText: {
    fontSize: 35,
    fontWeight: '600',
    color: Colors.black,
  },
  activityTimeAdjustButtonContainerLeft: {
    flex: 1,
    alignItems: 'flex-start',
  },
  activityTimeAdjustButtonContainerRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  activityTimeAdjustButton: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    backgroundColor: Colors.light_gray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addActivityButton: {
    width: 'auto',
    height: 'auto',
    backgroundColor: Colors.background_header,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 2,
      height: 7,
    },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 5,
  },
  addActivityButtonText: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: '700',
  },
  text3: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.black,
  },
  text4: {},
  delete: {
    width: 40,
  },
  icon1: {
    flexDirection: 'row',
    width: 80,
    justifyContent: 'flex-end',
  },
});

export default Activity;
