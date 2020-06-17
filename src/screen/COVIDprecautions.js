import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {Component} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Images from '../Image/Images';
import {WebView} from 'react-native-webview';
import colors from '../theme/colors';

export default class COVIDprecautions extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.headerStyle}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image
              source={Images.arrowBack}
              style={{
                height: hp(7),
                width: wp(10),
                resizeMode: 'contain',
                tintColor: 'white',
                marginLeft: wp(2),
                marginRight: wp(1),
              }}
            />
          </TouchableOpacity>
          <Text style={styles.headerStyleText}>
            Precauciones COVID (COVID precautions)
          </Text>
        </View>
        <WebView
          source={{
            uri:
              'https://www.who.int/emergencies/diseases/novel-coronavirus-2019?gclid=CjwKCAjw26H3BRB2EiwAy32zhcSqrrWnqNsXPfpmOLJsEKDXGVppUkKTTU9v-M42x3yNL5kRp1S_NRoCoQEQAvD_BwE',
          }}
          style={{
            marginTop: 20,
            height: hp(90),
            width: wp(100),
          }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: colors.purple,
    width: wp(100),
    height: hp(6),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerStyleText: {
    color: '#fff',
    fontSize: wp(4.5),
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerStyleTextSub: {
    color: 'black',
    fontSize: wp(4),
    alignSelf: 'center',
    textAlign: 'center',
  },
});
