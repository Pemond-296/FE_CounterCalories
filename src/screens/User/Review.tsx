import React from "react";
import {View, 
    Text, 
    StyleSheet,
    StatusBar,

} from 'react-native'
import { useNavigation} from '@react-navigation/native';
import { Colors } from "../../utils/Color";
import Icon from "react-native-vector-icons/Ionicons"
import { ScreenProps } from "../../utils/TypeData";

const Review: React.FC<ScreenProps | any> = ({route}) => {
    const {data} = route.params
    return( 
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle={"light-content"}/>
            <View>
                <Text>
                    This is review
                </Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    
})

export default Review