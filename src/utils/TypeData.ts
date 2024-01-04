import { RouteProp } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
    ScreenName: { data: any }; 
};

type ScreenNameScreenRouteProp = RouteProp<RootStackParamList, 'ScreenName'>;
type ScreenNameScreenNavigationProp = NavigationProp<RootStackParamList, 'ScreenName'>;

export type ScreenProps = {
  route: ScreenNameScreenRouteProp;
  navigation: ScreenNameScreenNavigationProp;
}

export type userLogin = {
    username: string;
    password: string;
}

// Màn đăng kí đầu
export type userRegister = userLogin & {
    confirmPassword: string
}

// Đăng kí đầy đủ thông tin
export type userSignup = {
    age: number,
    height: number,
    weight: number,
    gender: string,
}

export type updatePassword = {
    password: string,
}

export type timeActivity = {
    minute: number,
    day: number,
}

export type goal = {
    bmi: number,
    tdee: number,
    water: number,
    carb: number,
    fat: number,
    protein: number,
}


// Food

export type creatFood = {
    name: string,
    kcal: number,
    carbs: number,
    fat: number,
    protein: number,
}

export type creatActivity = {
    name: string,
    kcal: number,
}