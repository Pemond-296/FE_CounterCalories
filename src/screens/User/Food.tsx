import React from 'react';
import {View, 
    Text, 
    StyleSheet,
    StatusBar,
    Platform,
    Button,
} from 'react-native'
import { Colors } from '../../utils/Color';

const UserFood = () => {
    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle={"light-content"}/>
            <View style={styles.header}>
                <Text style={styles.text1}>
                    This is UserFood
                </Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: Colors.background_header,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    text1: {
        color: Colors.white,
       
    }
})

export default UserFood
