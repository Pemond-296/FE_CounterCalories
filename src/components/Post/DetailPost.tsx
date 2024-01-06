import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  Image,
  TouchableOpacity,
  StatusBar,
  FlatList,
  ScrollView,
} from 'react-native';
import {Colors} from '../../utils/Color';
import Octicons from 'react-native-vector-icons/Octicons';
import Icon1 from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import DetailCalory from '../Food/Calories';
import Comment from './Comment';
import {userData} from '../../utils/Storage';

const DetailPost: React.FC<any> = () => {
  const navigation = useNavigation();

  const [user, setUser] = useState<any>({});
  useEffect(() => {
    const fetchData = async () => {
      const response: any = await userData();
      setUser(response);
    };
    fetchData();
  }, []);
  const [isLike, setIsLike] = useState<boolean>(false);
  const handleLike = () => {
    setIsLike(!isLike);
  };

  const [isFollow, setFollow] = useState<boolean>(false);
  const handleFollow = () => {
    setFollow(!isFollow);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleUserLike = (action: string) => {
    //@ts-ignore
    navigation.navigate("Follow",{data: action})
  }

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'light-content'}
      />
      <View style={styles.header1}>
        <TouchableOpacity style={styles.icon2} onPress={handleBack}>
          <Icon1 name="arrow-back" size={25} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.text8}>Bài viết của Pemond</Text>
      </View>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.name}>
              <Image
                style={styles.avatar}
                source={require('../../assets/Pemond.jpg')}
              />
              <View style={styles.text}>
                <Text style={styles.text1}>Pemond</Text>
                <Text style={styles.text2}>Người dùng</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.follow}
              onPress={() => handleFollow()}>
              <View style={[styles.follow1, isFollow && styles.isfollow]}>
                <Text style={[styles.text6, isFollow && styles.text7]}>
                  {isFollow ? 'Đang theo dõi' : 'Theo dõi'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.img}>
            <Image
              style={styles.img1}
              source={require('../../assets/pepe.jpg')}
            />
          </View>
          <View style={styles.footer}>
            <View style={styles.kcal}>
              <Text style={styles.text3}>
                Một bữa ăn hoàn hảo cùng những chú Pepe
              </Text>
              <Text style={styles.text4}>404kcal</Text>
            </View>
            <View style={styles.action}>
              <Octicons
                name={isLike ? 'heart-fill' : 'heart'}
                size={30}
                style={styles.icon}
                color={isLike ? Colors.error : Colors.black}
                onPress={handleLike}
              />
              <Octicons
                name="comment"
                size={30}
                style={styles.icon}
                color={Colors.black}
              />
            </View>
            <View style={styles.action}>
              <TouchableOpacity onPress={() => handleUserLike("Like")}>
                <Text>3 lượt thích</Text>
              </TouchableOpacity>
              <Text style={styles.text5}>0 bình luận</Text>
            </View>
          </View>
        </View>

        {/* Calo Consume just user can see */}
        {user.role === 'USER' && (
          <View style={styles.calory}>
            <View>
              <Text style={styles.text9}>Tổng năng lượng</Text>
              <DetailCalory />
            </View>
            <View>
              <Text style={styles.text9}>Chi tiết dinh dưỡng</Text>
              {Array(10)
                .fill(null)
                .map((_, index) => (
                  <View key={index} style={styles.detail}>
                    <Text style={styles.text10}>Socola</Text>
                    <Text style={styles.text11}>2 cái (200g)</Text>
                    <DetailCalory />
                  </View>
                ))}
            </View>
          </View>
        )}
        <View style={styles.calory}>
          <Text style={styles.text9}>Bình luận</Text>
          <Comment />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
    minHeight: 300,
    borderWidth: 1,
    borderColor: Colors.white,
    backgroundColor: Colors.white,
    marginBottom: 5,
    paddingBottom: 10,
    ...Platform.select({
      ios: {
        shadowColor: Colors.black,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 15,
        shadowColor: Colors.box_shadow,
      },
    }),
  },
  header: {
    width: 'auto',
    padding: 10,
    flexDirection: 'row',
    height: 70,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  text: {
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'space-between',
    marginLeft: 6,
  },
  name: {
    flexDirection: 'row',
  },
  text1: {
    fontWeight: 'bold',
    color: Colors.black,
    fontSize: 18,
  },
  text2: {
    color: Colors.pink,
    fontWeight: '800',
  },
  follow: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 0,
    marginLeft: 'auto',
  },
  img: {
    width: 'auto',
    height: 'auto',
  },
  img1: {
    width: 'auto',
    height: 380,
  },
  footer: {
    paddingRight: 20,
    paddingLeft: 20,
  },
  kcal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text3: {
    color: Colors.black,
    opacity: 0.5,
    fontWeight: '400',
    fontSize: 15,
    width: 250,
  },
  text4: {
    color: Colors.black,
    fontWeight: '800',
    fontSize: 15,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    padding: 5,
  },
  icon1: {
    marginLeft: 'auto',
    marginRight: 10,
    opacity: 0.5,
  },
  text5: {
    marginLeft: 20,
  },
  like: {
    backgroundColor: Colors.error,
  },
  follow1: {
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 16,
    borderColor: Colors.black,
  },
  isfollow: {
    borderColor: Colors.gender,
  },
  text6: {
    color: Colors.black,
    fontWeight: '500',
  },
  text7: {
    color: Colors.gender,
  },
  delete: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
  },
  header1: {
    flexDirection: 'row',
    paddingTop: 30,
    width: '100%',
    height: 70,
    backgroundColor: Colors.background_header,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  text8: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
  },
  icon2: {
    position: 'absolute',
    left: 0,
    top: 28,
    padding: 10,
    zIndex: 999,
  },

  calory: {
    width: '100%',
    height: 'auto',
    minHeight: 300,
    borderWidth: 1,
    borderColor: Colors.white,
    backgroundColor: Colors.white,
    marginBottom: 10,
    paddingBottom: 10,
  },
  text9: {
    borderWidth: 1,
    padding: 5,
    paddingLeft: 20,
    borderColor: Colors.light_green,
    backgroundColor: Colors.light_green,
    color: Colors.black,
    fontSize: 18,
    opacity: 0.8,
  },
  detail: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
  },
  text10: {
    paddingLeft: 25,
    paddingTop: 10,
    fontSize: 18,
    fontWeight: '700',
    color: Colors.black,
  },
  text11: {
    marginLeft: 25,
    marginRight: 25,
    paddingBottom: 5,
    fontSize: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
  },
});

export default DetailPost;
