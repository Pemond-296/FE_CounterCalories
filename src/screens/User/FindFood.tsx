import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
  TextInput,
  Button,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../../utils/Color';
import Icon from 'react-native-vector-icons/Ionicons';
import {ScreenProps} from '../../utils/TypeData';
import {z, ZodType} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {Food} from '../../utils/TypeData';

const FindFood: React.FC<ScreenProps | any> = ({route}) => {
  const navigation = useNavigation();
  const schema: ZodType<timeActivity> = z.object({
    namefood: z
      .string()
      .min(1, 'Trường này là bắt buộc')
      .max(0, 'Thông tin không hợp lệ'),
    numberkg: z
      .number()
      .min(1, 'Trường này là bắt buộc')
      .max(0, 'Thông tin không hợp lệ'),
  });
  const {
    formState: {errors},
  } = useForm<Food>({
    resolver: zodResolver(schema),
  });
  const [searchText, setSearchText] = useState('');
  const handleSearch = () => {
    console.log('Đã tìm kiếm:', searchText);
  };
  
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'light-content'}
      />
      <View style={styles.header}>
        <Text style={styles.text1}>Món ăn của riêng bạn</Text>
      </View>
      <View style={styles.container}>
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Icon name="search" type="material" size={25} color="gray" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Tìm kiếm ..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <Icon
          name="add-outline"
          size={25}
          color={Colors.white}
          style={styles.icon}
          onPress={() => {
            //@ts-ignore
            navigation.goBack();
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingTop: 30,
    paddingLeft: 10,
    width: '100%',
    height: 90,
    backgroundColor: Colors.background_header,
    alignItems: 'center',
  },
  focusedInput: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.link,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  searchButton: {
    marginLeft: 10,
  },
  text5: {
    color: Colors.black,
    fontWeight: '700',
    fontSize: 15,
    marginTop: 25,
    marginRight: 10,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: Colors.black,
    padding: 10,
    fontsize: 16,
    fontWeight: 'bold',
    opacity: 0.5,
    paddingBottom: 0,
  },
  tabItem: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    height: 34,
    borderColor: 'gray',
    marginRight: 10,
    borderRadius: 60,
    marginTop: 20,
  },
  activeTabItem: {
    backgroundColor: 'green',
  },
  tabText: {
    color: 'black',
  },
  activeTabText: {
    color: 'white',
  },
  input1: {
    flex: 0.2,
    borderBottomWidth: 1,
    borderBottomColor: Colors.black,
    padding: 10,
    fontsize: 16,
    fontWeight: 'bold',
    opacity: 0.5,
    paddingBottom: 0,
  },
  icon: {
    width: 50,
    fontWeight: '700',
    color: Colors.black,
  },
  text1: {
    color: Colors.white,
    fontSize: 23,
    fontWeight: '700',
    alignItems: 'center',
  },
  body: {
    flex: 0.8,
    backgroundColor: Colors.box_background,
  },
  text6: {
    color: Colors.black,
    fontWeight: '600',
    fontSize: 22,
  },
  error: {
    color: Colors.error,
    textAlign: 'center',
  },
  button: {
    marginTop: 300,
    width: 100,
    borderRadius: 16,
    overflow: 'hidden',
    marginLeft: 160,
  },
  action: {
    borderWidth: 5,
    borderColor: Colors.white,
    backgroundColor: Colors.white,
    width: 350,
    padding: 35,
    paddingTop: 20,
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 10,
        shadowColor: Colors.box_shadow,
      },
    }),
  },

  field: {
    flexDirection: 'row',
    height: 50,
  },
  text2: {
    fontSize: 21,
    color: Colors.black,
    fontWeight: '500',
    marginTop: 20,
    marginLeft: 10,
  },
  choose: {
    marginTop: 10,
    padding: 10,
    paddingTop: 5,
    height: 'auto',
    borderWidth: 1,
    width: '100%',
    borderRadius: 15,
    backgroundColor: Colors.white,
    borderColor: Colors.white,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
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
  text3: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.black,
    marginBottom: 10,
  },
  text4: {
    fontSize: 16,
    color: Colors.black,
    textAlign: 'center',
    opacity: 0.5,
  },
  focused: {
    borderColor: Colors.light_green,
  },
  textFocused: {
    color: Colors.light_green,
  },
});

export default FindFood;
