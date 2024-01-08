import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../../utils/Color';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {userData} from '../../utils/Storage';
import {updateReaction} from '../../services/Post';

const Post: React.FC<any> = ({
  onAction,
  onCloseAction,
  user,
  content,
  name,
  img,
  userId,
  diaryId,
  postId,
  onPost
}) => {
  const navigation = useNavigation();

  const [isLike, setIsLike] = useState<boolean>(false);
  const handleLike = async () => {
    const payload = {userId: userId, postId: postId};
    const response = await updateReaction(payload);
    setIsLike(!isLike);
  };

  const [isFollow, setFollow] = useState<boolean>(false);
  const handleFollow = () => {
    setFollow(!isFollow);
  };

  const handleAction = () => {
    onAction();
  };
  const handlePressOut = (e: any) => {
    onCloseAction();
  };

  const [user1, setUser] = useState<any>({});
  useEffect(() => {
    const fetchData = async () => {
      const response: any = await userData();
      setUser(response);
    };
    fetchData();
  }, []);

  const handleDetail = () => {
    //@ts-ignore
    navigation.navigate('DetailPost', {
      data: {userId: userId, diaryId: diaryId, postId: postId},
    });
  };

  const handleUser = () => {
    //@ts-ignore
    navigation.navigate('DetailUser');
  };

  return (
    <TouchableWithoutFeedback onPressOut={handlePressOut}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.name} onPress={handleUser}>
            <Image
              style={styles.avatar}
              source={require('../../assets/Pemond.jpg')}
            />
            <View style={styles.text}>
              <Text style={styles.text1}>{name}</Text>
              <Text style={styles.text2}>Người dùng</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.follow}
            onPress={() => handleFollow()}>
            {user1.id !== user.id && (
              <View style={[styles.follow1, isFollow && styles.isfollow]}>
                <Text style={[styles.text6, isFollow && styles.text7]}>
                  {isFollow ? 'Đang theo dõi' : 'Theo dõi'}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => handleDetail()}>
          <View style={styles.img}>
            <Image style={styles.img1} source={{uri: 'http://' + img}} />
          </View>
        </TouchableOpacity>

        <View style={styles.footer}>
          <View style={styles.kcal}>
            <Text style={styles.text3}>{content}</Text>
            {/* <Text style={styles.text4}>404kcal</Text> */}
          </View>
          <View style={styles.action}>
            <Octicons
              name={isLike ? 'heart-fill' : 'heart'}
              size={30}
              style={styles.icon}
              color={isLike ? Colors.error : Colors.black}
              onPress={() => handleLike()}
            />
            <Octicons
              name="comment"
              size={30}
              style={styles.icon}
              color={Colors.black}
            />

            {user && user.role === 'ADMIN' ? (
              <Icon
                name="dots-vertical"
                size={35}
                color={Colors.black}
                style={styles.delete}
                onPress={() => handleAction()}
              />
            ) : (
              <Ionicon
                name="warning-outline"
                size={36}
                style={styles.icon1}
                color={Colors.black}
                onPress={() => handleAction()}
              />
            )}
          </View>
          {/* <View style={styles.action}>
            <Text>0 lượt thích</Text>
            <Text style={styles.text5}>0 bình luận</Text>
          </View> */}
        </View>
      </View>
    </TouchableWithoutFeedback>
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
    marginBottom: 10,
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
});

export default Post;
