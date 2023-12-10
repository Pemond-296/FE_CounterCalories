import React, {useState} from 'react'
import {View, 
        Text, 
        Button, 
        StyleSheet,
        StatusBar,
        TextInput,
        Platform
} from 'react-native'

import Slider from '@react-native-community/slider';

import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/Feather'

import { Colors } from '../../utils/Color';

import {z, ZodType} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form";
import { timeActivity } from '../../utils/TypeData';
import { ScreenProps } from "../../utils/TypeData";

const SetInformation: React.FC<ScreenProps | any> = ({route}) => {
    // const {user_data} = route.params
    // console.log(user_data)
    const navigation = useNavigation();

    const [isFocused, setIsFocused] = useState(0)
    const [isMale, setIsMale] = useState(true)
    const [height, setHeight] = useState(175)
    const [weight, setWeight] = useState(60)
    const [age, setAge] = useState(21)

    const schema: ZodType<timeActivity> = z
    .object({
      minute: z.number()
                  .min(1, "Trường này là bắt buộc")
                  .max(14440, 'Thông tin không hợp lệ'),
      day: z.number()
                  .min(1, "Trường này là bắt buộc")
                  .max(7, 'Thông tin không hợp lệ'),
    })
    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors},
      } = useForm<timeActivity>({
        resolver: zodResolver(schema)
        })
    
    const handleRegister = (data: any) =>{
        const gender = isMale ? 'Male' : 'Female'
        data = {...data, height, weight, age, gender}
        //@ts-ignore
        navigation.navigate("setGoal", {data: data})
    }   

    return (
      <>
        <StatusBar translucent backgroundColor="transparent" barStyle={"light-content"}/>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.BMR}>
                        Chỉ số trao đổi chất (BMR)
                    </Text>
                    <View style={styles.action}>
                        <Text style={styles.text6}>
                            Bạn vận động như thế nào?
                        </Text>
                        <View style={styles.field}>
                            <TextInput 
                                placeholder='Số phút/ngày'
                                placeholderTextColor={Colors.black}
                                style={[styles.input, isFocused == 1 && styles.focusedInput]}
                                inputMode='numeric'
                                {...register('minute')}
                                onChangeText={(value) => {
                                    setValue('minute', parseInt(value))
                                }}                    
                                onFocus={() => setIsFocused(1)}     
                                onBlur={() => setIsFocused(0)}     
                                /> 
                            <Text style={styles.text5}>
                                Phút
                            </Text>
                        </View>
                        {errors.minute && <Text style={styles.error}>{errors.minute.message}</Text>}
                        <View style={styles.field}>
                            <TextInput 
                                placeholder='Số ngày/tuần'
                                placeholderTextColor={Colors.black}
                                style={[styles.input, isFocused == 2 && styles.focusedInput]}
                                inputMode='numeric'
                                {...register('day')}
                                onChangeText={(value) => {
                                    setValue('day', parseInt(value))
                                }}                    
                                onFocus={() => setIsFocused(2)}   
                                onBlur={() => setIsFocused(0)}       
                                />  
                            <Text style={styles.text5}>
                                Ngày
                            </Text>
                        </View>
                        {errors.day && <Text style={styles.error}>{errors.day.message}</Text>}
                    </View>
                </View>

                <View style={styles.in4}>

                    <View style={styles.gender}>
                        <View 
                            style={[styles.box, isMale && styles.isMale]}
                            onTouchEndCapture = {() => {
                                setIsMale(true)
                            }}
                            >
                            <Icon
                                name='male'
                                color={isMale ? Colors.white : Colors.black}
                                size={100}
                            />
                            <Text style={[styles.box.text, isMale && styles.text4]}>
                                Nam
                            </Text>
                        </View>
                        <View 
                            style={[styles.box, !isMale && styles.isMale]}
                            onTouchEndCapture = {() => {
                                setIsMale(false)
                            }}
                            >
                            <Icon
                                name='female'
                                color={!isMale ? Colors.white : Colors.black}
                                size={100}
                            />
                            <Text style={[styles.box.text, !isMale && styles.text4]}>
                                Nữ
                            </Text>
                        </View>
                    </View>

                    <View style= {styles.height}>
                        <Text style={styles.text1}>
                            Chiều cao (cm)
                        </Text>
                        <Text style={styles.text3}>
                            {height}
                        </Text>
                        <View style={styles.slide}>
                            <Icon1
                                style={styles.icon}
                                name='minus'
                                size={25}
                                onPress={() => setHeight(height-1)}
                            />
                            <Slider
                                style={styles.slider}
                                minimumValue={100}
                                maximumValue={250}
                                value={height}
                                minimumTrackTintColor={Colors.error}
                                maximumTrackTintColor={Colors.pink}
                                onValueChange={(value) => {setHeight(value)}}
                                step={1}
                                thumbTintColor={Colors.error}
                            />
                            <Icon1
                                style={styles.icon}
                                size={25}
                                name='plus'
                                onPress={() => setHeight(height+1)}
                            />
                        </View>
              
                    </View> 

                    <View style= {styles.weight}>

                        <View style={styles.age}>
                            <Text style={styles.head}>
                                Cân nặng (kg)
                            </Text>
                            <Text style={styles.age.body}>
                                {weight}
                            </Text>
                            <View style={styles.act}>
                                <Icon1
                                    style={styles.icon2}
                                    size={25}
                                    name='minus'
                                    onPress={() => setWeight(weight-1)}
                                />
                                <Icon1
                                    style={styles.icon2}
                                    size={25}
                                    name='plus'
                                    onPress={() => setWeight(weight+1)}
                                />
                            </View>
                        </View>

                        <View style={styles.age}>
                            <Text style={styles.head}>
                                Tuổi
                            </Text>
                            <Text style={styles.age.body}>
                                {age}
                            </Text>
                            <View style={styles.act}>
                                <Icon1
                                    style={styles.icon2}
                                    size={25}
                                    name='minus'
                                    onPress={() => setAge(age-1)}
                                />
                                <Icon1
                                    style={styles.icon2}
                                    size={25}
                                    name='plus'
                                    onPress={() => setAge(age+1)}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.button}>
                    <Button
                            title='Tiếp tục'
                            color={Colors.gender}
                            onPress={handleSubmit(handleRegister)}
                    />
                </View>
            </View>
      </>
      )
}

const styles = StyleSheet.create(
  {
    container: {
        flex: 1,
        alignItems: `center`,
        width: '100%',
        height: '100%',
    },
    header: {
        width: '100%',
        padding: 50,
        height: 200,
        backgroundColor: Colors.background_header,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        alignItems: 'center',
    },
    BMR: {
        color: Colors.white,
        fontWeight: '500',
        fontSize: 20,
        marginBottom: 10,
    },
    text6: {
        color: Colors.black,
        fontWeight: '600',
        fontSize: 22,
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
              shadowColor: Colors.black,
              shadowOffset: { width: 0, height: 2 },
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
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        height: 50,
    },

    focusedInput: {
        borderBottomWidth: 2,
        borderBottomColor: Colors.link
    },

    input: {    
        flex: 0.5,
        borderBottomWidth: 1,
        borderBottomColor: Colors.black,
        padding: 10,
        fontWeight: 'bold',
        opacity: 0.5,
        alignItems: 'center',
        paddingBottom: 0,
    },

    text5: {
        color: Colors.black,
        fontWeight: '700',
        fontSize: 15,
        marginTop: 10,
    },

    in4: {
        borderWidth: 1,
        borderColor: Colors.white,
        marginTop: 120,
        height: 430,
        borderRadius: 16,
        width: 370,
        backgroundColor: Colors.white,
    },
    gender:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent : "space-around",
        marginTop: 10,
    },
    box:{
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        borderWidth: 1,
        borderColor: Colors.gray,
        padding: 15,
        paddingBottom: 10,
        borderRadius: 16,
        backgroundColor: Colors.gray,
        opacity: 0.2,
        text: {
            fontSize: 20,
        },
    },

    isMale:{
        backgroundColor: Colors.gender,
        opacity: 1,
        borderColor: Colors.gender,
    },
    text4: {
        color: Colors.white,
        opacity: 1,
        fontWeight: 'bold',
    },

    height: {
        padding: 10,
    },
    text3: {
        color: Colors.error,
        fontSize: 24,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    text1: {
        fontSize: 20,
        fontWeight: '800',
    },
    slider: {
        width: 300,
    },
    slide: {
        flexDirection:"row",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        paddingTop: 0,
    },
    icon: {
        opacity: 1.2,
    },

    weight: {
        flexDirection: 'row',
        height: 200,
        justifyContent:'space-around',
    },

    age: {
        borderWidth: 1,
        borderColor: Colors.box_background,
        backgroundColor: Colors.box_background,
        borderRadius: 16,
        height: 120,
        width: 170,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        body: {
            color: Colors.error,
            fontSize: 20,
        },
    },
    head: {
        fontWeight: '700',
        fontSize: 17,
    },
    act: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    icon2: {
        padding: 5,
        marginLeft: 5,
        marginRight: 5,
        borderWidth: 1,
        borderRadius: 50,
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderColor: Colors.white,
    },
    button: {
        marginTop: 'auto',
        width: 150,
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 30,
    },
    error:{
        color: Colors.error,
        textAlign: 'center',
    }
  }
)

export default SetInformation