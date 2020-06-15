import {Image, StyleSheet, Text, View} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';
import React, {Component} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import AsyncStorage from '@react-native-community/async-storage';
import FireServices from '../FireServices/FireServices';
import Images from '../Image/Images';

export default class Splash extends Component {
  componentDidMount() {
    setTimeout(() => {
      AsyncStorage.getItem('USER').then((res) => {
        console.log('user id asy', res);
        let screenName = '';
        if (res !== null) {
          screenName = 'UserCategory';

          FireServices.getUserProfile((user) => {
            if (user.user._data.userType !== undefined) {
              console.log('herhehrhehrehrhe');
              if (user.user._data.userType === 'Needy') {
                console.log('Needy');
                const navigateAction = StackActions.reset({
                  index: 0,
                  actions: [
                    NavigationActions.navigate({routeName: `${'Home'}`}),
                  ],
                });
                this.props.navigation.dispatch(navigateAction);
                // screenName = 'Home';
              } else if (user.user._data.userType === 'IndevidualHelper') {
                console.log('IndevidualHelper');

                // screenName = 'IndividualHelperForm';
                const navigateAction = StackActions.reset({
                  index: 0,
                  actions: [
                    NavigationActions.navigate({
                      routeName: `${'IndividualHelperForm'}`,
                    }),
                  ],
                });
                this.props.navigation.dispatch(navigateAction);
              } else if (user.user._data.userType === 'CompanyHelper') {
                console.log('CompanyHelper');

                // screenName = 'IndividualHelperForm';
                const navigateAction = StackActions.reset({
                  index: 0,
                  actions: [
                    NavigationActions.navigate({
                      routeName: `${'IndividualHelperForm'}`,
                    }),
                  ],
                });
                this.props.navigation.dispatch(navigateAction);
              } else if (user.user._data.userType === 'BankPoint') {
                // screenName = 'BankPoint';
                const navigateAction = StackActions.reset({
                  index: 0,
                  actions: [
                    NavigationActions.navigate({routeName: `${'BankPoint'}`}),
                  ],
                });
                this.props.navigation.dispatch(navigateAction);
              }
            } else {
              const navigateAction = StackActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({routeName: `${'UserCategory'}`}),
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
    color: 'white',
  },
});
