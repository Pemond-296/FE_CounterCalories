import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {Colors} from '../../utils/Color';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DetailPost:React.FC<any> = ({onAction, onCloseAction}) => {
  const [user, setUser] = useState<any>(false);
  const [isLike, setIsLike] = useState<boolean>(false);
  const handleLike = () => {
    setIsLike(!isLike);
  };

  const [isFollow, setFollow] = useState<boolean>(false);
  const handleFollow = () => {
    setFollow(!isFollow);
  };

  const [isAction, setIsAction] = useState<boolean>(false);
  const handleAction = () => {
    setIsAction(true);
    onAction()
  };
  const handlePressOut = (e: any) => {
    setIsAction(false);
    onCloseAction()
  };

  return (
    <TouchableWithoutFeedback onPressOut={handlePressOut}>

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
                onPress={() => handleLike()}
              />
              <Octicons
                name="comment"
                size={30}
                style={styles.icon}
                color={Colors.black}
              />

              {!user ? (
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
                />
              )}
            </View>
            <View style={styles.action}>
              <Text>3 lượt thích</Text>
              <Text style={styles.text5}>0 bình luận</Text>
            </View>
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

export default DetailPost;
