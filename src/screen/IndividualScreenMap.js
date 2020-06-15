import {Image, StyleSheet, View} from 'react-native';
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
import {TouchableOpacity} from 'react-native-gesture-handler';

export default class IndividualScreenMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: [],
      poliline: false,
      polLat: 0,
      polLong: 0,
      userLocationAll: [],
      loading: true,
      region: {
        latitude: 10,
        longitude: 10,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      },
      isMapReady: false,
      marginTop: 1,
      userLocation: '',
      regionChangeProgress: false,
      lat: 0,
      long: 0,
      polCoords: [],
    };
  }

  async componentDidMount() {
    console.log('requests:', this.props.navigation.state.params.requests);
    this.setState({requests: this.props.navigation.state.params.requests});
    await Geolocation.getCurrentPosition(
      (position) => {
        console.log('positinon', position);
        const region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        };
        this.setState({
          lat: position.coords.latitude,
          long: position.coords.longitude,
          region: region,
          loading: false,
          error: null,
        });
      },
      (error) => {
        alert(error);
        this.setState({
          error: error.message,
          loading: false,
        });
      },
      {enableHighAccuracy: false, timeout: 200000, maximumAge: 5000},
    );
  }

  onMarkerPress = (marker) => {
    console.log('marker-------------------', marker);
    let coords = [];
    let markerLocation = {
      latitude: marker.latitude,
      longitude: marker.polLong,
    };
    let currentLocation = {
      latitude: this.state.lat,
      longitude: this.state.long,
    };
    coords.push(currentLocation, markerLocation);
    this.setState({
      polCoords: coords,
      poliline: true,
      polLat: marker.latitude,
      polLong: marker.polLong,
    });
  };

  render() {
    let requests = this.props.navigation.state.params.requests;
    let latitude = this.state.lat;
    let longitude = this.state.long;
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
        <MapView
          style={{
            height: heightPercentageToDP(94),
            width: widthPercentageToDP(100),
          }}
          initialRegion={{
            latitude: requests[0].requests.latitude,
            longitude: requests[0].requests.longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
          }}
          showsUserLocation={true}>
          {requests.map((i) => {
            return (
              <MapView.Marker
                onPress={() =>
                  this.props.navigation.navigate('UserRequestDetail', {
                    request: i.requests,
                  })
                }
                coordinate={{
                  latitude: i.requests.latitude,
                  longitude: i.requests.longitude,
                  latitudeDelta: 0.001,
                  longitudeDelta: 0.001,
                }}
                title={'Needy People'}
              />
            );
          })}
        </MapView>
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
