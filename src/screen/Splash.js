import {Image, StyleSheet, Text, View} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';
import React, {Component} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import AsyncStorage from '@react-native-community/async-storage';
import Images from '../Image/Images';

export default class Splash extends Component {
  componentDidMount() {
    setTimeout(() => {
      AsyncStorage.getItem('USER').then((res) => {
        console.log('user id asy', res);
        let screenName = '';
        if (res !== null) {
          screenName = 'UserCategory';
        } else {
          screenName = 'Login';
        }
        const navigateAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({routeName: `${screenName}`})],
        });
        this.props.navigation.dispatch(navigateAction);
      });
    }, 1000);
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <Image
          resizeMode="contain"
          style={styles.imageStyle}
          source={Images.logo}
        />
        <Text style={styles.descriptionTextStyle}>
          Bienvenido a Ayudapp una aplicación de gente ayudando a los más
          necesitados
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    height: hp(100),
    width: wp(100),
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  imageStyle: {width: wp(100), height: hp(35), marginTop: hp(15)},
  descriptionTextStyle: {
    fontWeight: 'bold',
    fontSize: wp(6),
    marginTop: hp(10),
    textAlign: 'center',
  },
});
