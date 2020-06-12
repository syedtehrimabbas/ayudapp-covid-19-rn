import {
  ActivityIndicator,
  Button,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Geolocation from '@react-native-community/geolocation';
import MapView from 'react-native-maps';
import styles from '../Image/styles';

// Disable yellow box warning messages
console.disableYellowBox = true;

export default class mapForBank extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    };
  }

  componentDidMount() {
    Geolocation.getCurrentPosition(
      (position) => {
        const region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        };
        this.setState({
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

  onMapReady = () => {
    this.setState({isMapReady: true, marginTop: 0});
  };

  // Fetch location details as a JOSN from google map API
  fetchAddress = () => {
    fetch(
      'https://maps.googleapis.com/maps/api/geocode/json?address=' +
        this.state.region.latitude +
        ',' +
        this.state.region.longitude +
        '&key=' +
        'AIzaSyBFX4u8subqUhgrNj_4tcFegN32GmA16Y4',
    )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('responseJson', responseJson);
        const userLocation = responseJson.results[0].formatted_address;
        this.setState({
          userLocation: userLocation,
          regionChangeProgress: false,
        });
      });
  };

  // Update state on region change
  onRegionChange = (region) => {
    this.setState(
      {
        region,
        regionChangeProgress: true,
      },
      () => this.fetchAddress(),
    );
  };

  // Action to be taken after select location button click
  onLocationSelect = () => alert(this.state.userLocation);

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.spinnerView}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          {/* <View headerStyle}>
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
          </View> */}
          <View style={{flex: 2}}>
            {!!this.state.region.latitude && !!this.state.region.longitude && (
              <MapView
                style={{...styles.map, marginTop: this.state.marginTop}}
                initialRegion={this.state.region}
                showsUserLocation={true}
                onMapReady={this.onMapReady}
                onRegionChangeComplete={this.onRegionChange}>
                <MapView.Marker
                  coordinate={{
                    latitude: this.state.region.latitude,
                    longitude: this.state.region.longitude,
                  }}
                  title={'Your Location'}
                  draggable
                />
              </MapView>
            )}

            <View style={styles.mapMarkerContainer}>
              <Text
                style={{
                  fontFamily: 'fontawesome',
                  fontSize: 42,
                  color: '#ad1f1f',
                }}>
                &#xf041;
              </Text>
            </View>
          </View>
          <View style={styles.deatilSection}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                fontFamily: 'roboto',
                marginBottom: 20,
              }}>
              Move map for location
            </Text>
            <Text style={{fontSize: 10, color: '#999'}}>LOCATION</Text>
            <Text
              numberOfLines={2}
              style={{
                fontSize: 14,
                paddingVertical: 10,
                borderBottomColor: 'silver',
                borderBottomWidth: 0.5,
              }}>
              {!this.state.regionChangeProgress
                ? this.state.userLocation
                : 'Identifying Location...'}
            </Text>
            <View style={styles.btnContainer}>
              <Button
                title="PICK THIS LOCATION"
                onPress={() =>
                  this.props.navigation.navigate('BankPoint', {
                    latitude: this.state.region.latitude,
                    longitude: this.state.region.longitude,
                  })
                }></Button>
            </View>
          </View>
        </View>
      );
    }
  }
}
