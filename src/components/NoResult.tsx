import React from "react";
import {View, Text, StyleSheet} from "react-native"
import { Colors } from "../utils/Color";

export const NoResult = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text1}>
                This is Noresult
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    text1: {
        fontSize: 20,
        color: Colors.black,
    },
})
