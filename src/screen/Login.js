import {AccessToken, LoginManager} from 'react-native-fbsdk';
import {GoogleProvider, GoogleSignin} from 'react-native-google-signin';
import {Image, PermissionsAndroid, StyleSheet, Text, View} from 'react-native';
import React, {Component} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import AsyncStorage from '@react-native-community/async-storage';
import CommmonButton from './CommonButton';
import Images from '../Image/Images';
import Loader from '../screen/Loader';
import Services from '../FireServices/FireServices';
import {TouchableOpacity} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import colors from '../theme/colors';

export default class Login extends Component {
  componentDidMount() {
    async function requestLocationPermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message:
              'This App needs access to your location ' +
              'so we can know where you are.',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use locations ');
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }

    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      webClientId:
        '1063381046055-e55l58se6g6mbhvm3ibeifhh86e8esv2.apps.googleusercontent.com', // webClientId i told you to save somewhere,
      forceConsentPrompt: true, // if you want to show the authorization prompt at each login
    });
  }
  state = {loading: false};

  render() {
    return (
      <View style={{heigth: hp(100)}}>
        <View style={{heigth: hp(50), borderBottomWidth: 1}}>
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
        <View style={{heigth: hp(100)}}>
          <View
            style={{
              backgroundColor: '#36a7e3',
              width: wp(30),
              alignSelf: 'center',
              marginTop: hp(2),
              padding: wp(4),
              borderRadius: wp(50),
            }}>
            <Image
              resizeMode="contain"
              style={styles.lockimageStyle}
              source={Images.lock}
            />
          </View>

          <View
            style={{
              paddingTop: hp(2),
              backgroundColor: colors.purple,
              alignSelf: 'center',
              justifyContant: 'center',
              alignItems: 'center',
              paddingBottom: hp(2),
              paddingLeft: wp(15),
              paddingRight: wp(15),
              marginTop: hp(5),
              borderRadius: wp(1),
            }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              {' '}
              Soy nuevo en Ayudapp
            </Text>
          </View>
          {/* <TouchableOpacity
            onPress={() => this.props.navigation.navigate('PhoneAuth')}>
            <View style={styles.ButtonContainer}>
              <Text style={[styles.buttonTxt]}>Login with phone</Text>
              <Image
                resizeMode="contain"
                source={require('../Image/botton-Arrow.png')}
                style={{marginRight: 3}}
              />
            </View>
          </TouchableOpacity> */}
          <TouchableOpacity onPress={this.onGoogleSignIn}>
            <Image
              source={Images.google}
              style={{
                height: hp(15),
                width: wp(25),
                resizeMode: 'contain',
                alignSelf: 'center',
              }}
            />
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={this.onGoogleSignIn}>
            <View style={styles.ButtonContainer}>
              <Text style={[styles.buttonTxt]}>Login with google</Text>
              <Image
                resizeMode="contain"
                source={require('../Image/botton-Arrow.png')}
                style={{marginRight: 3}}
              />
            </View>
          </TouchableOpacity> */}
          <Loader loading={this.state.loading} />
        </View>
      </View>
    );
  }

  onLoginFacebook = async () => {
    LoginManager.logInWithPermissions(['public_profile', 'email'])
      .then((result) => {
        console.log('fb login ', result);
        if (result.isCancelled) {
        } else {
          return AccessToken.getCurrentAccessToken();
        }
      })
      .then((data) => {
        console.log('fb data ', data);
        const facebookCredential = auth.FacebookAuthProvider.credential(
          data.accessToken,
        );
        return auth().signInWithCredential(facebookCredential);
      })
      .then((res) => {
        console.log('user response ', res);

        Services.getUserProfile((userProfile) => {
          console.log('userProfile', userProfile);
          if (userProfile.user._data === undefined) {
            Services.serUserProfile(
              res.user._auth._user._user.uid,
              (profile) => {
                console.log('profile', profile);
                if (profile.isSuccess) {
                  console.log('this', this);

                  this.props.navigation.navigate('BioDataForm', {
                    id: res.user._auth._user._user.uid,
                  });
                }
              },
            );
          } else {
            AsyncStorage.setItem('USER', res.user._auth._user._user.uid);
            console.log('this', this);
            this.props.navigation.navigate('UserCategory', {
              id: res.user._auth._user._user.uid,
            });
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onGoogleSignIn = async () => {
    this.setState({loading: true});
    await GoogleSignin.signIn()
      .then((data) => {
        console.log('-------data-------', data);
        // Create a new Firebase credential with the token
        const credential = auth.GoogleAuthProvider.credential(data.idToken);
        console.log('Google Credential ==>', credential);
        // Login with the credential
        return auth().signInWithCredential(credential);
      })
      .then((user) => {
        this.setState({loading: false});
        console.log('-------User-------', user.user._user.uid);
        this.onUserisSuccess(user);
      })
      .catch((error) => {
        console.log('-------error-------');
        alert(error.message);
        this.setState({loading: false});

        console.log(error);
      });
  };

  onUserisSuccess = (response) => {
    console.log('onUserisSuccess response', response);

    Services.getUserProfile((userProfile) => {
      console.log('userProfile', userProfile);
      if (userProfile.user._data === undefined) {
        Services.serUserProfile(response.user._user.uid, (profile) => {
          console.log('profile', profile);
          if (profile.isSuccess) {
            console.log('this', this);
            this.props.navigation.navigate('BioDataForm', {
              id: response.user._user.uid,
            });
          }
        });
      } else {
        AsyncStorage.setItem('USER', response.user._user.uid);
        console.log('this', this);
        this.props.navigation.navigate('UserCategory', {
          id: response.user._user.uid,
        });
      }
    });
  };
}

const styles = StyleSheet.create({
  imageStyle: {
    width: wp(50),
    height: hp(25),
    marginTop: hp(5),
    alignSelf: 'center',
  },
  descriptionTextStyle: {
    fontWeight: 'bold',
    fontSize: wp(6),
    marginTop: hp(5),
    textAlign: 'center',
  },
  lockimageStyle: {
    width: wp(30),
    height: hp(12),
    alignSelf: 'center',
    tintColor: '#fff',
  },
  googleimageStyle: {
    width: wp(30),
    height: hp(12),
    marginTop: hp(5),
    alignSelf: 'center',
  },
  ButtonContainer: {
    flexDirection: 'row',
    backgroundColor: colors.purple,
    justifyContent: 'center',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingRight: 22,
    alignItems: 'center',
    margin: 14,
    height: 58,
    borderColor: colors.black,
  },
  buttonTxt: {
    fontSize: Platform.OS === 'ios' ? 20 : 18,
    flex: 1,
    margin: 16,
    color: colors.white,
    paddingLeft: 11,
  },
});
