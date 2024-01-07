import React, { useState } from 'react';
import {View, 
    Text, 
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native'
import { Colors } from '../../utils/Color';
import Icon from 'react-native-vector-icons/AntDesign'
import Icon1 from 'react-native-vector-icons/FontAwesome';
import { SmallLoading } from '../Loading';
import { useNavigation } from '@react-navigation/native';

const ViewUser:React.FC<any> = () => {

    const navigation = useNavigation()

    const [loading, setLoading] = useState<boolean>(false)
    const handleDelete = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }

    const handleEdit = () => {
    }

    const handleDetailFood = () => {
        // @ts-ignore
        navigation.navigate("DetailUser")
    }

    
  const [loadingBan, setLoadingBan] = useState<boolean>(false);
    const handleBan = () => {
        setLoadingBan(true);
        setTimeout(() => {
          setLoadingBan(false);
        }, 1000);
    }

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={handleDetailFood}
            >
            <Image
                source={require('../../assets/Pemond.jpg')}
                style={styles.img}
            />
            <View style={styles.textarea}>
                <Text style={styles.text1}>
                    Pemond
                </Text>
                <Text style={styles.text2}>
                    Nam - 50kg - 175cm 
                </Text>
            </View>
            <View style={styles.action}>
                <TouchableOpacity style={styles.delete} onPress={handleEdit}>
                    <Icon
                        name='edit'
                        size={20}
                        color={Colors.black}
                        style={styles.icon}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.delete} onPress={handleBan}>
                    {!loadingBan ? (                    <Icon1
                        name='ban'
                        size={20}
                        style={styles.icon}
                    />) : (<SmallLoading/>)}
                </TouchableOpacity>

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
        width: 200,
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
        marginLeft: 7,
    },
    delete: {
        width: 40,
    },
})

export default ViewUser
