import React, { useEffect, useState } from "react";
import {View, 
    Text, 
    StyleSheet,
    StatusBar,
    Platform,
    Button,
} from 'react-native'
import { useNavigation} from '@react-navigation/native';
import { Colors } from "../../utils/Color";
import Icon from "react-native-vector-icons/Ionicons"
import { ScreenProps } from "../../utils/TypeData";
import { createGoalAPI } from "../../services/Goal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storage } from "../../utils/Storage";

const Review: React.FC<ScreenProps | any> = ({route}) => {
    const {data} = route.params

    const navigation = useNavigation()

    const [BMR, setBMR] = useState<number>(0)
    useEffect(() => {
        const BMR: number = 10 * data.weight + 6.25 * data.height - 5*data.age
        if(data.gender === 'Male'){
            setBMR(BMR + 5)
            return
        }
        setBMR(BMR-161)
    }, [])
    // Hệ số vận động
    const [mc, setMC] = useState<number>(0)
    useEffect(() => {
        if(data.minute < 20){
            setMC(1.2)
        }
        else if(data.minute <= 30){
            setMC(1.375)
        }
        else if(data.minute <= 60){
            setMC(1.55)
        }
        else if(data.minute <= 90){
            setMC(1.725)
        }
        else {
            setMC(1.9)
        }
    },[])

    const [TDEE, setTDEE] = useState<number>(0)
    useEffect(() => {
        const tdee = Number((BMR * mc).toFixed(0))
        if(data.choose === 1){
            setTDEE(tdee - 500)
            return 
        }
        else if(data.choose === 3){
            setTDEE(tdee + 500)
            return
        }
        setTDEE(tdee)
    },[BMR, mc])

    const [water, setWater] = useState<number>(0)
    useEffect(() => {
        setWater(Number(((data.weight + (60 / data.minute)*12) * 30).toFixed(0)))
    },[])

    const [protein, setProtein] = useState<number>(0)
    useEffect(() => {
        setProtein(Number((data.weight*2).toFixed(0)))
    },[])

    const [fat, setFat] = useState<number>(0)
    useEffect(() => {
        setFat(Number((TDEE*0.35/9).toFixed(0)))
    },[TDEE])

    const [carb, setCarb] = useState<number>(0)
    useEffect(() => {
        setCarb(Number(((TDEE - fat*9 - protein*4)/4).toFixed(0)))
    },[TDEE, protein, fat])

    const[BMI, setBMI] = useState<number>(Number(data.bmi.toFixed(2)))

    const payload = {
        bmi: BMI, 
        tdee: TDEE,
        water: water,
        protein: protein,
        fat: fat,
        carbs: carb,
    }



    const handleNext = async () =>{
        const response = await createGoalAPI(data.user_data.id, payload)
        if(response.status == '200') {
        await AsyncStorage.setItem(storage, JSON.stringify(response.data.data.user))
        //@ts-ignore
        navigation.navigate("Screen")
        }
    }

    return( 
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle={"light-content"}/>
            <View style={styles.header}>
                <Icon
                    name="arrow-back"
                    size={25}
                    color={Colors.white}
                    style={styles.icon}
                    onPress={() => {
                        //@ts-ignore
                        navigation.goBack();
                    }}
                />
                <Text style={styles.text1}>
                    Thống kê chỉ số
                </Text>
            </View>
            
            <View style={styles.calo}>
                <Text style= {styles.text2}>
                    Năng lượng nạp vào để 
                    {data.choose === 1 ? ' giảm cân (calo thâm hụt = TDEE - 500)' : data.choose === 2 ? ' giữ cân (TDEE)' : ' tăng cân (calo đã tăng = TDEE + 500)'} 
                </Text>
                <View style={styles.box}>
                    <View style={styles.tdee}>
                        <Text>
                            <Text style={styles.text8}>
                                {TDEE}
                            </Text>
                            <Text style={styles.text9}>
                                {' kcal'}
                            </Text>
                        </Text>
                        <Text style={styles.text10}>
                            Lượng calo bạn cần nạp hàng ngày
                        </Text>
                        <View style={styles.line}></View>
                    </View>
                    <View style={styles.tdee}>
                        <Text>
                            <Text style={styles.text8}>
                                {water}
                            </Text>
                            <Text style={styles.text9}>
                                {' ml'}
                            </Text>
                        </Text>
                        <Text style={styles.text11}>
                            Lượng nước bạn nên uống hàng ngày
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.calo}>
                <Text style= {styles.text2}>
                   Chỉ số khối cơ thể (BMI)
                </Text>
                <View style={styles.box}>
                    <View style={styles.bmi}>
                        <View>
                            <Text style={styles.text3}>
                                BMI
                            </Text>
                            <Text style={styles.text4}>
                                {BMI}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.text5}>
                                {BMI < 18.5 ? 'Thiếu cân' : (BMI < 25 ? 'Bình thường' : (BMI < 30 ? 'Thừa cân' : 'Béo phì')) }
                            </Text>
                        </View>
                    </View>
                    <View style={styles.line}></View>
                    <View style={styles.in4}>
                        <View>
                            <Text style={styles.text6}>
                                {data.height}
                            </Text>
                            <Text style={styles.text7}>
                                Chiều cao
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.text6}>
                                {data.weight}
                            </Text>
                            <Text style={styles.text7}>
                                Cân nặng
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.button}>
                    <Button
                            title='Tiếp tục'
                            color={Colors.light_green}
                            onPress={()=> {
                                handleNext()
                            }}
                    />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        paddingTop: 30,
        paddingLeft: 10,
        width: '100%',
        height: 90,
        backgroundColor: Colors.background_header,
        alignItems: 'center'
    },
    icon: {
        width: 50,
        fontWeight: '700',
    },
    text1: {
        color: Colors.white,
        fontSize: 25,
        fontWeight: '700',
    },
    calo: {
        width: '100%',
        padding: 15,
        paddingBottom: 0,
    },
    text2: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.black,
        marginBottom: 10,
    },
    box: {
        width: 350,
        height: 'auto',
        backgroundColor: Colors.white,
        borderWidth: 1,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 16,
        borderColor: Colors.white,
        marginRight: 'auto',
        marginLeft: 'auto',
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
    bmi: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        height: 100,
        paddingBottom: 0,
    },
    text3: {
        color: Colors.black,
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
    },
    text4: {
        color: Colors.error,
        fontSize: 20,
    },
    text5: {
        color: Colors.box_shadow,
        fontSize: 18,
        fontWeight: 'bold',
    },
    line: {
        width: 250,
        marginLeft: 'auto',
        marginRight: 'auto',
        borderWidth: 1,
        borderColor: Colors.black,
        opacity: 0.1,
    },
    in4: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    text6: {
        fontSize: 18,
        color: Colors.error,
        fontWeight: '500',
        textAlign: 'center',
    },
    text7: {
        color: Colors.black,
        fontSize: 16,
        opacity: 0.5,
    },
    tdee: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    text8: {
        color: Colors.error,
        fontSize: 20,
        fontWeight: 'bold'
    },
    text9: {
        color: Colors.error,
        fontSize: 16,
        fontWeight: '500'
    },
    text10: {
        color: Colors.black,
        fontSize: 16,
        opacity: 0.5,
        marginBottom: 20,
    },
    text11: {
        color: Colors.black,
        fontSize: 16,
        opacity: 0.5,
    },
    button: {
        marginTop: 'auto',
        width: 150,
        borderRadius: 16,
        overflow: 'hidden',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 30,
    },
})

export default Review