import React, {useEffect, useState} from 'react';
import {
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
import DetailActivityCalories from '../Activity/ActivityCalories';
import {imageAPI} from '../../services/Image';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import {LargeLoading} from '../Loading';
import { createPost } from '../../services/Post';

export const CreatePost: React.FC<any> = ({route}) => {
  const navigation = useNavigation();
  const user = route.params.data.user;
  const listFoods = route.params.data.listFoods;
  const listActivities = route.params.data.listActivities;
  const real = route.params.data.real;
  const today = getToday();

  const [totalEnergy, setTotalEnergy] = useState<any>({
    calories: real.realTdee,
    carbs: real.realCarbs,
    protein: real.realProtein,
    fat: real.realFat,
  });

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
    setImgUrl(response.data.objectUrl)
  };
  const [imgUrl, setImgUrl] = useState<string>('');

  const convertDate = (date: string) => {
    return date.split('/').reverse().join('/');
  };
  const handleBack = () => {
    navigation.goBack();
  };

  const [content, setContent] = useState<string>('')

  const handleCreate = async () => {
    const payload = {image: imgUrl, content: content, diaryId: real.diaryId}
    const respone = await createPost(payload)
    if(respone.status.code === 200){
      //@ts-ignore
      handleBack();
    }
  }

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
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <Image
            source={require('../../assets/Pemond.jpg')}
            style={styles.avatar}></Image>
          <View style={styles.headerContent}>
            <Text style={styles.usernameText}>{user.username}</Text>
            <Text>Ngày: {convertDate(today)}</Text>
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
          <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
            <Text style={styles.createText}>Tạo</Text>
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.postDescription,
            selectedImage ? {height: 'auto'} : {},
          ]}>
          <TextInput
            placeholder="Bạn muốn chia sẻ điểu gì?..."
            style={styles.descriptionText}
            placeholderTextColor="#C1C3BD"
            onChangeText={(e) => {
              setContent(e)
            }}
            />
          {selectedImage ? (
            loading ? (
              <View style={styles.img}>
                <LargeLoading />
              </View>
            ) : (
              <Image source={{uri: selectedImage}} style={styles.img}></Image>
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
            fat={totalEnergy.fat}
            quantity={1}
            />
          <View style={styles.foodContainer}>
            <View style={styles.diaryHeader}>
              <Text style={styles.diaryHeaderText}>Thực phẩm</Text>
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
                  fat={item.fat}
                  quantity={item.amount/100}
                />
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
                  calories={item.caloriesConsume}
                  quantity={item.minutes/30}
                  />
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
    zIndex: 999,
    position: 'absolute',
    left: 10,
    bottom: 12,
  },
  createButton: {
    zIndex: 999,
    borderColor: Colors.gender,
    backgroundColor: Colors.gender,
    borderWidth: 2,
    paddingVertical: 2,
    paddingHorizontal: 30,
    borderRadius: 20,
    position: 'absolute',
    right: 0,
    top: 10,
  },
  createText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  mainContainer: {
    backgroundColor: Colors.white,
    position: 'relative',
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
    height: 300,
  },
});
