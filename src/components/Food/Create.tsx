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
import { Dropdown } from 'react-native-element-dropdown';

import {z, ZodType} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form";
import { creatFood } from '../../utils/TypeData';
import { imageAPI } from '../../services/Image';
import { createFood } from '../../services/Food';
import { userData } from '../../utils/Storage';

const data = [
  {label : '100g', value: '100g'},
  {label : '100ml', value: '100ml'}
]

const CreateFood: React.FC<any> = ({onClose, reloadFood}) => {

  const [user, setUser] = useState<any>({});
  useEffect(() => {
    const fetchData = async () => {
      const response: any = await userData();
      setUser(response);
    };
    fetchData();
  },[]);

  const handleExit = () => {
    onClose();
  };

  const schema: ZodType<creatFood> = z
  .object({
    name: z.string(),
    kcal: z.number(),
    carbs: z.number(),
    fat: z.number(),
    protein: z.number(),
  })
  .refine((data) => data.carbs <= 100  , {
    message: "Không hợp lệ",
    path: ['carbs'],
  })
  .refine((data) => data.fat <= 100  , {
    message: "Không hợp lệ",
    path: ['fat'],
  })
  .refine((data) => data.protein <= 100  , {
    message: "Không hợp lệ",
    path: ['protein'],
  })
  .refine((data) => data.carbs + data.fat + data.protein < 100  , {
    message: "Không hợp lệ",
    path: ['carbs'],
  })

  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm<creatFood>({
    resolver: zodResolver(schema)
  })

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const pickImage = async () => {
    const options: ImageLibraryOptions = {mediaType: 'photo'};
    const formData = new FormData()
    setLoading(true);
    await launchImageLibrary(options, (response: any) => {
      if (!response.didCancel && !response.error) {
        setSelectedImage(response.assets[0].uri);
        formData.append('multipartFile', 
          {
            uri: response.assets[0].uri,
            type: response.assets[0].type,
            name: response.assets[0].fileName,
            data: response.assets[0].data
          }
        )
      }
      setLoading(false)
    });
    const response: any = await imageAPI(formData)
    setImgUrl(response.data.objectUrl)
  };
  const [imgurl, setImgUrl] = useState<string>('')

  const handleImg = () => {
    pickImage();
  };

  const [value, setValue1] = useState<any>("100g");
  const [isFocus, setIsFocus] = useState<boolean>(false);

  // Xử lý API tạo ở đây
  const handleCreate = async (data: any) => {
    const payload = {
        foodName: data.name, 
        calories: data.kcal, 
        unitType: value, 
        image: imgurl, 
        userId: user.id,
        carbs: data.carbs,
        fat: data.fat,
        protein:data.protein,
      }
    const response = await createFood(payload)

    handleExit()
    reloadFood()
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tạo mới thực phẩm</Text>
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
          <TextInput 
            style={styles.input} 
            placeholder='Nhập tên thực phẩm ...' 
            {...register('name')}
            onChangeText={(value: string) => {
              setValue('name', value)
            }}  
          />
        </View>  
        {errors.name && <Text style={styles.error}>Tên sản phẩm là bắt buộc</Text>}      
        <View style={[styles.field, {marginTop: 5, marginBottom: 5}]}>
          <Text style={styles.text1}>Chọn đơn vị thực phẩm</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            containerStyle={styles.selectedStyle}
            data={data}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? '100g' : '...'}
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue1(item.value);
              setIsFocus(false);
            }}
          />
        </View>
        <View>
          <Text style={styles.text1}>
            Giá trị dinh dưỡng có trong 1 đơn vị thực phẩm
          </Text>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.field1}>
              <TextInput
                style={styles.input4}
                placeholder='...'
                placeholderTextColor={Colors.white}
                keyboardType="numeric"
                {...register('kcal')}
                onChangeText={(value: string) => {
                  setValue('kcal', Number(value));
                }}
              />
              <Text style={styles.text2}>Kcal</Text>
              {errors.kcal && <Text style={[styles.error, {position: 'absolute', bottom: 25, left: 25}]}>Bắt buộc</Text>}
            </View>
            <View>
              <View style={styles.field1}>
                <TextInput
                  style={styles.input1}
                  placeholder='...'
                  placeholderTextColor={Colors.white}
                  keyboardType="numeric"
                  {...register('carbs')}
                  onChangeText={(value: string) => {
                    setValue('carbs', Number(value));
                  }}
                />
                <Text style={styles.text2}>Carbs (g)</Text>
                {errors.carbs && <Text style={styles.error1}>Bắt buộc</Text>}
              </View>
              <View style={styles.field1}>
                <TextInput
                  style={styles.input2}
                  placeholder='...'
                  placeholderTextColor={Colors.white}
                  keyboardType="numeric"
                  {...register('fat')}
                  onChangeText={(value: string) => {
                    setValue('fat', Number(value));
                  }}
                />
                <Text style={styles.text2}>Chất béo (g)</Text>
                {errors.fat && <Text style={styles.error1}>Bắt buộc</Text>}
              </View>
              <View style={styles.field1}>
                <TextInput
                  style={styles.input3}
                  placeholder='...'
                  placeholderTextColor={Colors.white}
                  keyboardType="numeric"
                  {...register('protein')}
                  onChangeText={(value: string) => {
                    setValue('protein', Number(value));
                  }}
                />
                <Text style={styles.text2}>Chất đạm (g)</Text>
                {errors.protein && <Text style={styles.error1}>Bắt buộc</Text>}
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
      <TouchableOpacity style={styles.update} onPress={handleSubmit(handleCreate)}>
        <Text style={{color: Colors.white, fontWeight: 'bold', fontSize: 18}}>
          Tạo mới
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 390,
    height: 'auto',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.white,
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    paddingVertical: 15,
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
    width: 250,
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
    position: 'relative',
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
  dropdown: {
    height: 30,
    borderColor: Colors.box_background,
    backgroundColor: Colors.box_background,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: 150,
  },
  placeholderStyle: {
    fontSize: 15,
    color: Colors.black,
    fontWeight: 'bold',
    opacity: 0.7,
  },
  selectedTextStyle: {
    fontSize: 15,
    color: Colors.black,
    fontWeight: 'bold',
    opacity: 0.7,
    zIndex: 999,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  selectedStyle: {
    marginTop: 15,
  },
  error:{
    color: Colors.error,
    marginLeft: "auto",
    marginRight: "auto",
    fontWeight: "700",
  },
  error1: {
    color: Colors.error,
    position: "absolute",
    right: -50,
    fontWeight: '700',
  },
});

export default CreateFood;
