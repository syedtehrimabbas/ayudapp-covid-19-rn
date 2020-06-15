import {Image, StyleSheet, Text, View,ImageBackground} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';
import React, {Component} from 'react';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

import {heightPercentageToDP as hp, widthPercentageToDP as wp,} from 'react-native-responsive-screen';

import AsyncStorage from '@react-native-community/async-storage';
import FireServices from '../FireServices/FireServices';
import Images from '../Image/Images';

export default class Splash extends Component {
    componentDidMount() {
        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({interval: 10000, fastInterval: 5000})
            .then(data => {
                // The user has accepted to enable the location services
                // data can be :
                //  - "already-enabled" if the location services has been already enabled
                //  - "enabled" if user has clicked on OK button in the popup
            }).catch(err => {
            // The user has not accepted to enable the location services or something went wrong during the process
            // "err" : { "code" : "ERR00|ERR01|ERR02", "message" : "message"}
            // codes :
            //  - ERR00 : The user has clicked on Cancel button in the popup
            //  - ERR01 : If the Settings change are unavailable
            //  - ERR02 : If the popup has failed to open
        });

        setTimeout(() => {
            AsyncStorage.getItem('USER').then((res) => {
                console.log('user id asy', res);
                let screenName = '';
                if (res !== null) {
                    screenName = 'UserCategory';

                    FireServices.getUserProfile((user) => {
                        if (user.user._data !== undefined) {
                            const navigateAction = StackActions.reset({
                                index: 0,
                                actions: [
                                    NavigationActions.navigate({
                                        routeName: `${'UserCategory'}`, params: {
                                            type: user.user._data.userType   // this second parameter is for sending the params
                                        }
                                    }),
                                ],
                            });
                            this.props.navigation.dispatch(navigateAction);
                        }
                    });
                } else {
                    const navigateAction = StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({routeName: `${'Login'}`})],
                    });
                    this.props.navigation.dispatch(navigateAction);
                }
            });
        }, 1000);
    }

    render() {
        return (
            <ImageBackground style={styles.containerStyle} source={Images.splash_img}/>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        height: hp(100),
        width: wp(100),
        alignItems: 'center'
    },
    imageStyle: {width: wp(100), height: hp(35), marginTop: hp(15)},
    descriptionTextStyle: {
        fontWeight: 'bold',
        fontSize: wp(6),
        marginTop: hp(10),
        textAlign: 'center',
        color: 'white',
    },
});
