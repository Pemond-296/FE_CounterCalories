import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from '../../utils/Color';
import {Image, Text} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Foundation from 'react-native-vector-icons/Foundation';
import {useNavigation} from '@react-navigation/native';
//@ts-ignore
import {getToday} from 'react-native-modern-datepicker';
import DetailFoodCalories from '../Food/FoodCalories';
import {SafeAreaView} from 'react-native-safe-area-context';
import DetailActivityCalories from '../Activity/ActivityCalories';
import {imageAPI} from '../../services/Image';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import {LargeLoading} from '../Loading';

export const CreatePost: React.FC<any> = ({route}) => {
  const navigation = useNavigation();
  const user = route.params.data.user;
  const listFoods = route.params.data.listFoods;
  const listActivities = route.params.data.listActivities;
  const today = getToday();
  const [totalEnergy, setTotalEnergy] = useState<any>({
    calories: 0,
    carbs: 0,
    protein: 0,
    fat: 0,
  });
  const [imgUrl, setImgUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const pickImage = async () => {
    const options: ImageLibraryOptions = {mediaType: 'photo'};
    const formData = new FormData();
    setLoading(true);
    await launchImageLibrary(options, (response: any) => {
      if (!response.didCancel && !response.error) {
        setSelectedImage(response.assets[0].uri);
        formData.append('multipartFile', {
          uri: response.assets[0].uri,
          type: response.assets[0].type,
          name: response.assets[0].fileName,
          data: response.assets[0].data,
        });
      }
      setLoading(false);
    });
    const response: any = await imageAPI(formData);
    setImgUrl(response.data.objectUrl);
  };

  console.log(listFoods);
  console.log(today);

  const handleBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    if (listFoods && listFoods.length > 0) {
      const energy = listFoods.reduce(
        (res: any, item: any) => {
          res.calories = (res.calories || 0) + item.calories;
          res.carbs = (res.carbs || 0) + item.carbs;
          res.protein = (res.protein || 0) + item.protein;
          res.fat = (res.fat || 0) + item.fat;
          return res;
        },
        {calories: 0, carbs: 0, protein: 0, fat: 0},
      );

      setTotalEnergy(energy);
    }
  }, [listFoods]);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'light-content'}
      />
      <View style={styles.appHeader}>
        <TouchableOpacity style={styles.headerBackIcon} onPress={handleBack}>
          <Ionicons name="arrow-back" size={25} color={Colors.white}></Ionicons>
        </TouchableOpacity>
        <Text style={styles.appHeaderText}>Tạo bài viết</Text>
        <TouchableOpacity style={styles.createButton}>
          <Text style={styles.createText}>Tạo</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <Image
            source={require('../../assets/Pemond.jpg')}
            style={styles.avatar}></Image>
          <View style={styles.headerContent}>
            <Text style={styles.usernameText}>{user.username}</Text>
            <Text>Ngày: {today}</Text>
            <View style={styles.headerActions}>
              <TouchableOpacity onPress={pickImage}>
                <MaterialIcons
                  name="add-photo-alternate"
                  size={35}
                  color="#45bd62"></MaterialIcons>
              </TouchableOpacity>
              <TouchableOpacity>
                <FontAwesome6
                  name="user-tag"
                  size={25}
                  style={{paddingTop: 5}}
                  color="#1877f2"></FontAwesome6>
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialIcons
                  name="emoji-emotions"
                  size={35}
                  color="#f7b928"></MaterialIcons>
              </TouchableOpacity>
              <TouchableOpacity>
                <Foundation name="music" size={35} color="#f02849"></Foundation>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={[
            styles.postDescription,
            selectedImage ? {height: 'auto'} : {},
          ]}>
          <TextInput
            placeholder="Bạn muốn chia sẻ điểu gì?..."
            style={styles.descriptionText}
            placeholderTextColor="#C1C3BD"></TextInput>
          {selectedImage ? (
            loading ? (
              <View style={styles.image}>
                <LargeLoading />
              </View>
            ) : (
              <Image source={{uri: imgUrl}} style={styles.image}></Image>
            )
          ) : (
            <></>
          )}
        </View>
        <View style={styles.diaryContainer}>
          <View style={styles.diaryHeader}>
            <Text style={styles.diaryHeaderText}>Chi tiết dinh dưỡng</Text>
          </View>
          <DetailFoodCalories
            calories={totalEnergy.calories}
            carbs={totalEnergy.carbs}
            protein={totalEnergy.protein}
            fat={totalEnergy.fat}></DetailFoodCalories>
          <View style={styles.foodContainer}>
            <View style={styles.diaryHeader}>
              <Text style={styles.diaryHeaderText}>Thức ăn</Text>
            </View>
            {listFoods &&
              listFoods?.map((item: any, index: any) => (
                <DetailFoodCalories
                  key={index}
                  foodName={item.foodName}
                  unitType={item.unitType}
                  calories={item.calories}
                  carbs={item.carbs}
                  protein={item.protein}
                  fat={item.fat}></DetailFoodCalories>
              ))}
          </View>

          <View style={styles.activityContainer}>
            <View style={styles.diaryHeader}>
              <Text style={styles.diaryHeaderText}>Hoạt động</Text>
            </View>
            {listActivities &&
              listActivities?.map((item: any, index: any) => (
                <DetailActivityCalories
                  key={index}
                  name={item.name}
                  calories={item.caloriesConsume}></DetailActivityCalories>
              ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  appHeader: {
    flexDirection: 'row',
    paddingTop: 30,
    width: '100%',
    height: 80,
    backgroundColor: Colors.background_header,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  appHeaderText: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  headerBackIcon: {
    paddingLeft: 10,
    zIndex: 999,
    flex: 1,
  },
  createButton: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 10,
    marginTop: 3,
    zIndex: 999,
  },
  createText: {
    color: Colors.white,
    borderColor: Colors.white,
    borderWidth: 2,
    paddingVertical: 1,
    paddingHorizontal: 10,
    borderRadius: 20,
    fontSize: 18,
    textAlign: 'center',
  },
  mainContainer: {
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
    margin: 20,
    marginBottom: 0,
    paddingBottom: 10,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 90 / 2,
    borderWidth: 2,
    borderColor: Colors.line,
  },
  usernameText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  headerContent: {
    flexDirection: 'column',
    marginLeft: 7,
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '75%',
    paddingTop: 5,
  },
  postDetail: {},
  postDescription: {
    height: 200,
    borderBottomWidth: 1,
    borderColor: Colors.line,
    paddingHorizontal: 20,
  },
  descriptionText: {
    fontSize: 24,
  },
  diaryContainer: {
    flex: 1,
  },
  diaryHeader: {
    backgroundColor: Colors.background_header,
    padding: 5,
    justifyContent: 'center',
  },
  diaryHeaderText: {
    fontSize: 18,
    color: Colors.white,
    textAlign: 'left',
    fontWeight: '600',
  },
  foodContainer: {},
  activityContainer: {},
  img: {
    width: '100%',
    height: 300
  }
});
