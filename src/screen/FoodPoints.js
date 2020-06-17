import {Image, StyleSheet, Text, View} from 'react-native';
import React, {Component} from 'react';
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Geolocation from '@react-native-community/geolocation';
import Images from '../Image/Images';
import MapView from 'react-native-maps';
import Services from '../FireServices/FireServices';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default class FoodPoints extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foodpoints: [],
      initLat: 0,
      initLong: 0,
    };
  }
  componentDidMount() {
    Services.getRequestedOrderByUser((response) => {
      let BankPoints = response.requests.filter((i) => {
        console.log('i ', i);

        return i.requests.userType === 'BankPoint';
      });
      console.log('BankPoints ', BankPoints);

      this.setState({
        foodpoints: BankPoints,
      });
      console.log('this.state.foodpoints', this.state.foodpoint);
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
          <Text style={styles.headerStyleText}>Food Points</Text>
        </View>
        {this.state.foodpoints.map((i) => {
          return (
            <MapView
              style={{
                height: heightPercentageToDP(94),
                width: widthPercentageToDP(100),
              }}
              initialRegion={{
                latitude: i.requests.latitude,
                longitude: i.requests.longitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001,
              }}
              showsUserLocation={true}>
              <MapView.Marker
                // onPress={() =>
                //   this.props.navigation.navigate('UserRequestDetail', {
                //     request: i.requests,
                //   })
                // }
                coordinate={{
                  latitude: i.requests.latitude,
                  longitude: i.requests.longitude,
                  latitudeDelta: 0.001,
                  longitudeDelta: 0.001,
                }}
                title={'Needy People'}
              />
            </MapView>
          );
        })}
      </View>
    );
  }
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
});
