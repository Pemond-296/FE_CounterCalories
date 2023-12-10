import React, { useState } from 'react';
import {View, 
    Text, 
    StyleSheet,
    StatusBar,
    Platform,
    Button,
    Image,
    TouchableOpacity,
} from 'react-native'
import { Colors } from '../../utils/Color';
import Icon from 'react-native-vector-icons/AntDesign'
import { SmallLoading } from '../Loading';
import { useNavigation } from '@react-navigation/native';

const Food = () => {
    const navigation = useNavigation()
    const [loading, setLoading] = useState<boolean>(false)
    const handleDelete = () => {
        console.log("delete r cu")
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }

    const handleDetailFood = () => {
        console.log("Detail Here")
        //@ts-ignore
        navigation.navigate("DetailFood")
    }

    return (
        <TouchableOpacity 
            style={styles.container}
            onPress={handleDetailFood}
            >
            <Image
                source={require('../../assets/takoyaki.jpg')}
                style={styles.img}
            />
            <View style={styles.textarea}>
                <Text style={styles.text1}>
                    Takoyaki và những người bạn
                </Text>
                <Text style={styles.text2}>
                    100g - 230 calo
                </Text>
            </View>
            <View style={styles.action}>
                <TouchableOpacity onPress={handleDelete} style={styles.delete}>
                    {!loading ? (                    
                    <Icon
                        name='delete'
                        size={20}
                        style={styles.icon}
                        color={Colors.black}
                    />) : 
                    (<SmallLoading/>)
                    }
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.white,
        backgroundColor: Colors.white,
        padding: 10,
        paddingLeft: 15,
        borderRadius: 16,
        flexDirection:"row",
        width: 390,
        marginBottom: 10,
    },
    img: {
        height: 50,
        width: 50,
        borderRadius: 50,
    },
    textarea: {
        width: 270,
        justifyContent: 'space-around',
        paddingLeft: 10,
    },
    text1: {
        fontWeight: 'bold',
        color: Colors.black,
        fontSize: 18,
    },
    text2: {
        color: Colors.black,
        fontWeight: '600',
        opacity: 0.6,
        fontSize: 16,
    },
    action:{
        flexDirection: 'row',
        paddingRight: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        padding: 7,
        borderWidth: 1,
        borderRadius: 50,
        borderColor: Colors.box_background,
        backgroundColor: Colors.box_background,
        marginLeft: 5,
    },
    delete: {
        width: 40,
    },
})

export default Food
