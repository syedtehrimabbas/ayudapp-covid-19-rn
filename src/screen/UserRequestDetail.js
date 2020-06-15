import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component} from 'react';
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Geolocation from '@react-native-community/geolocation';
import Images from '../Image/Images';
import colors from '../theme/colors';

let params = [];

export default class UserRequestDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      request: this.props.navigation.state.params.request,
    };
    console.log('request', this.state.request);
  }
  componentDidMount() {
    Geolocation.getCurrentPosition((location) => {
      console.log('location', location);
      params.push(
        {
          key: 'destination',
          value: `${this.state.request.latitude},${this.state.request.longitude}`,
        },
        {
          key: 'origin',
          value: `${location.coords.latitude},${location.coords.longitude}`,
        },
      );
    });
  }
  render() {
    return (
      <View>
        <View style={styles.headerStyle}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image
              source={Images.arrowBack}
              resizeMode="contain"
              style={{
                height: hp(6),
                width: wp(9),
                tintColor: 'white',
                marginLeft: wp(3),
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: wp(95),
            justifyContent: 'center',
            alignSelf: 'center',
            paddingBottom: wp(1),
            marginTop: wp(2),
            borderWidth: 0.5,
            backgroundColor: colors.white,
            borderColor: colors.grey,
          }}>
          <View style={styles.borderStyle}>
            <Text style={styles.textStyle}>
              Name:
              {this.state.request.userInformation.firstName}
              {this.state.request.userInformation.lastName}
            </Text>
          </View>
          <View style={styles.borderStyle}>
            <Text style={styles.textStyle}>
              Country: {this.state.request.userInformation.country}
            </Text>
          </View>
          <View style={styles.borderStyle}>
            <Text style={styles.textStyle}>
              Province: {this.state.request.userInformation.district}
            </Text>
          </View>
          <View style={styles.borderStyle}>
            <Text style={styles.textStyle}>
              City: {this.state.request.userInformation.city}
            </Text>
          </View>
          <View style={styles.borderStyle}>
            <Text style={styles.textStyle}>
              Phone: {this.state.request.userInformation.phone}
            </Text>
          </View>
          <View style={styles.borderStyle}>
            <Text style={styles.textStyle}>
              Request time: {this.state.request.orderTime}
            </Text>
          </View>
          <View style={styles.borderStyle}>
            <Text
              style={{color: 'blue', textDecorationLine: 'underline'}}
              onPress={this.onMapsButtonPress}>
              {' '}
              GO TO GOOGLE MAP{' '}
            </Text>
          </View>
        </View>
      </View>
    );
  }
  onMapsButtonPress = () => {
    const getParams = (params = []) => {
      return params
        .map(({key, value}) => {
          const encodedKey = encodeURIComponent(key);
          const encodedValue = encodeURIComponent(value);
          return `${encodedKey}=${encodedValue}`;
        })
        .join('&');
    };
    const url = `https://www.google.com/maps/dir/?api=1&${getParams(params)}`;
    return Linking.canOpenURL(url).then((supported) => {
      if (!supported) {
      } else {
        return Linking.openURL(url);
      }
    });
  };
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: 'black',
    width: wp(100),
    height: hp(6),
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerStyleText: {
    color: '#fff',
    fontSize: wp(6),
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  placeholderStyle: {
    borderWidth: 1,
    width: wp(90),
    alignSelf: 'center',
    paddingTop: wp(0.5),
    paddingBottom: wp(0.5),
    alignSelf: 'center',
    paddingLeft: wp(3),
    marginTop: wp(1),
  },
  textStyle: {color: 'black'},
  headerStyle: {
    backgroundColor: colors.purple,
    width: wp(100),
    height: hp(6),
    justifyContent: 'center',
  },
  headerStyleText: {
    color: '#fff',
    fontSize: wp(6),
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  borderStyle: {
    height: 58,
    borderWidth: 0.5,
    backgroundColor: colors.white,
    borderColor: colors.grey,
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: wp(5),
  },
});
