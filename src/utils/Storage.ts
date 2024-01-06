import AsyncStorage from '@react-native-async-storage/async-storage';
export const storage = 'nutrition_app'

export const userData = async () => {
    const data: any = await AsyncStorage.getItem(storage)
    return JSON.parse(data)
}