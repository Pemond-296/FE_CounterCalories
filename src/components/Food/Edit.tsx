import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Platform,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Colors} from '../../utils/Color';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  launchImageLibrary,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import {LargeLoading} from '../Loading';

const EditFood: React.FC<any> = ({onClose}) => {
  const handleExit = () => {
    onClose();
  };

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const pickImage = async () => {
    const options: ImageLibraryOptions = {mediaType: 'photo'};
    setLoading(true);
    await launchImageLibrary(options, (response: any) => {
      if (!response.didCancel && !response.error) {
        console.log(response);
        setSelectedImage(response.assets[0].uri);
      }
      setLoading(false)
    });
  };

  const handleImg = () => {
    pickImage();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cập nhật thực phẩm</Text>
      <Icon
        name="closecircleo"
        size={20}
        color={Colors.black}
        style={styles.icon}
        onPress={handleExit}
      />
      <View style={styles.view}>
        <View style={styles.field}>
          <Text style={styles.text1}>Tên thực phẩm</Text>
          <TextInput style={styles.input} value="Takoyaki" />
        </View>
        <View>
          <Text style={styles.text1}>
            Giá trị dinh dưỡng có trong 100g thực phẩm
          </Text>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.field1}>
              <TextInput
                style={styles.input4}
                value="230"
                keyboardType="numeric"
              />
              <Text style={styles.text2}>Kcal</Text>
            </View>
            <View>
              <View style={styles.field1}>
                <TextInput
                  style={styles.input1}
                  value="77.3"
                  keyboardType="numeric"
                />
                <Text style={styles.text2}>Carbs (g)</Text>
              </View>
              <View style={styles.field1}>
                <TextInput
                  style={styles.input2}
                  value="77.3"
                  keyboardType="numeric"
                />
                <Text style={styles.text2}>Chất béo (g)</Text>
              </View>
              <View style={styles.field1}>
                <TextInput
                  style={styles.input3}
                  value="77.3"
                  keyboardType="numeric"
                />
                <Text style={styles.text2}>Chất đạm (g)</Text>
              </View>
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.text1}>Hình ảnh thực phẩm</Text>
          {!loading ? (
            <Image
              source={
                !selectedImage
                  ? require('../../assets/takoyaki.jpg')
                  : {uri: selectedImage}
              }
              style={styles.image}
            />
          ) : (
            <View style={styles.image}><LargeLoading/></View>
          )}
          <TouchableOpacity style={styles.button} onPress={handleImg}>
            <Text style={styles.text3}>Chọn ảnh</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.update}>
        <Text style={{color: Colors.white, fontWeight: 'bold', fontSize: 18}}>
          Cập nhật
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 350,
    height: 430,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.white,
    backgroundColor: Colors.white,
    padding: 10,
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
    textAlign: 'center',
    fontSize: 18,
    color: Colors.black,
    fontWeight: '900',
  },
  icon: {
    position: 'absolute',
    right: 15,
    top: 12,
  },
  view: {
    padding: 10,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  text1: {
    fontSize: 15,
    color: Colors.black,
    fontWeight: '700',
    marginRight: 5,
  },
  input: {
    borderWidth: 1,
    width: 200,
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderColor: Colors.box_background,
    backgroundColor: Colors.box_background,
    borderRadius: 16,
    color: Colors.black,
    fontWeight: 'bold',
  },
  field1: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  input1: {
    borderWidth: 1,
    width: 50,
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderColor: Colors.carbs,
    backgroundColor: Colors.carbs,
    borderRadius: 16,
    color: Colors.white,
    fontWeight: 'bold',
    marginRight: 5,
  },
  input2: {
    borderWidth: 1,
    width: 50,
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderColor: Colors.fat,
    backgroundColor: Colors.fat,
    borderRadius: 16,
    color: Colors.white,
    fontWeight: 'bold',
    marginRight: 5,
  },
  input3: {
    borderWidth: 1,
    width: 50,
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderColor: Colors.protein,
    backgroundColor: Colors.protein,
    borderRadius: 16,
    color: Colors.white,
    fontWeight: 'bold',
    marginRight: 5,
  },
  input4: {
    borderWidth: 1,
    width: 50,
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderColor: Colors.kcal,
    backgroundColor: Colors.kcal,
    borderRadius: 16,
    color: Colors.white,
    fontWeight: 'bold',
    marginRight: 5,
  },

  text2: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.black,
  },
  image: {
    marginTop: 10,
    marginLeft: 30,
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  button: {
    borderWidth: 1,
    width: 100,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 50,
    position: 'absolute',
    right: 50,
    top: 40,
    borderColor: Colors.gray,
    backgroundColor: Colors.gray,
    zIndex: 999,
  },
  text3: {
    fontSize: 16,
    color: Colors.white,
    fontWeight: 'bold',
  },
  update: {
    borderWidth: 1,
    paddingHorizontal: 5,
    paddingVertical: 7,
    width: 150,
    alignItems: 'center',
    borderRadius: 16,
    borderColor: Colors.light_green,
    backgroundColor: Colors.light_green,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

export default EditFood;
