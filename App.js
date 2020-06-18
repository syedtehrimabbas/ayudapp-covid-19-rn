import {Image} from 'react-native';
import React, {Component} from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {heightPercentageToDP, widthPercentageToDP,} from 'react-native-responsive-screen';

import BankPoint from './src/screen/BankPoint';
import BioDataForm from './src/screen/BioDataForm';
import COVIDprecautions from './src/screen/COVIDprecautions';
import ConfirmationCode from './src/screen/ConfirmationCode';
import FoodPoints from './src/screen/FoodPoints';
import Home from './src/screen/Home';
import Images from './src/Image/Images';
import IndividualHelperForm from './src/screen/IndividualHelperForm';
import IndividualScreenMap from './src/screen/IndividualScreenMap';
import Login from './src/screen/Login';
import LoginConfirm from './src/screen/LoginConfirm';
import PhoneAuth from './src/screen/PhoneAuth';
import Requests from './src/screen/Requests';
import Statics from './src/screen/Statics';
import UserCategory from './src/screen/UserCategory';
import UserRequestDetail from './src/screen/UserRequestDetail';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import mapForBank from './src/screen/mapForBank';
import Splash from "./src/screen/Splash";

console.disableYellowBox = true;

export default class App extends Component {
    render() {
        return <AppContainer/>;
    }
}
const HomeStackNavigator = createBottomTabNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={Images.home}
                    style={{
                        height: heightPercentageToDP(4),
                        width: widthPercentageToDP(7),
                        resizeMode: 'contain',
                        tintColor: tintColor,
                    }}
                />
            ),
        },
    },
    Requests: {
        screen: Requests,
        navigationOptions: {
            tabBarLabel: 'Requests',
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={Images.request}
                    style={{
                        height: heightPercentageToDP(4),
                        width: widthPercentageToDP(7),
                        resizeMode: 'contain',
                        tintColor: tintColor,
                    }}
                />
            ),
        },
    },
});
const LoginStackNavigator = createStackNavigator(
    {
        // UserCategory: {
        //   screen: UserCategory,
        // },
        Splash: {
            screen: Splash,
        },
        Login: {
            screen: Login,
        },
        Statics: {
            screen: Statics,
        },

        LoginConfirm: {
            screen: LoginConfirm,
        },
        PhoneAuth: {
            screen: PhoneAuth,
        },
        ConfirmationCode: {
            screen: ConfirmationCode,
        },
        BioDataForm: {
            screen: BioDataForm,
        },
        mapForBank: {
            screen: mapForBank,
        },
        HomeStack: {
            screen: HomeStackNavigator,
        },
        UserCategory: {
            screen: UserCategory,
        },
        IndividualHelperForm: {
            screen: IndividualHelperForm,
        },
        BankPoint: {
            screen: BankPoint,
        },
        Requests: {
            screen: Requests,
        },
        IndividualScreenMap: {
            screen: IndividualScreenMap,
        },
        FoodPoints: {
            screen: FoodPoints,
        },
        UserRequestDetail: {
            screen: UserRequestDetail,
        },
        COVIDprecautions: {
            screen: COVIDprecautions,
        },
    },
    {
        headerMode: 'none',
    },
);
const mainStackNavigator = createSwitchNavigator({
    LoginStackNavigator
});
const AppContainer = createAppContainer(LoginStackNavigator);
