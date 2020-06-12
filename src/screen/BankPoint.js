import {Image, KeyboardAvoidingView, Picker, StyleSheet, Text, TextInput, TouchableOpacity, View,} from 'react-native';
import React, {Component} from 'react';
import {heightPercentageToDP as hp, widthPercentageToDP as wp,} from 'react-native-responsive-screen';
import Geolocation from '@react-native-community/geolocation';
import ImagePicker from 'react-native-image-picker';
import Loader from './Loader';
import {ScrollView} from 'react-native-gesture-handler';
import Services from '../FireServices/FireServices';
import colors from '../theme/colors';

export default class BankPoint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      individual: false,
      family: false,
      ong: false,
      country: '',
      province: '',
      district: '',
      city: '',
      town: '',
      buildingAddress: '',
      time: '',
      term: '',
      image: '',
      userType: this.props.navigation.state.params.type,
      selectedValue: '',
      countries: [],
      states: [],
      citiesList: [],
      selectedValueCountry: '',
      selectedValueState: '',
      loading: false,
      latitude: 0,
      longitude: 0,
      lat: 0,
      long: 0,
    };
  }

  onButtonPress = () => {
    this.setState({loading: true});
    const {
      name,
      selectedValueCountry,
      selectedValueState,
      district,
      city,
      town,
      buildingAddress,
      time,
      term,
      image,
      userType,
      lat,
      long,
    } = this.state;
    Services.addBankDetail(
      name,
      selectedValueCountry,
      selectedValueState,
      district,
      city,
      town,
      buildingAddress,
      time,
      term,
      image,
      userType,
      lat,
      long,
      (res) => {
        this.setState({loading: false});
        alert('successfully submitted');
        this.props.navigation.navigate('UserCategory');
      },
    );
  };

  async componentDidMount() {
    this.focusListner = this.props.navigation.addListener('didFocus', () => {
      console.log('pprops here -----', this.props);
      if (this.props.navigation.state.params.latitude !== undefined) {
        this.setState({
          lat: this.props.navigation.state.params.latitude,
          long: this.props.navigation.state.params.longitude,
        });
      }
    });
    Geolocation.getCurrentPosition((info) =>
      this.setState({
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
      }),
    );
    Services.getTockenForUniversalApi(async (result) => {
      console.log('userToken', result.token);
      this.setState({accessToken: result.token});
      if (result.isSuccess) {
        await Services.fetchCountries(result.token, async (countries) => {
          console.log('console', countries.data);
          this.setState({countries: countries.data});
          let countryToShow = countries.data.find((i) => {
            return i.country_name === 'Panama';
          });
          this.setState({selectedValueCountry: countryToShow.country_name});
          await Services.getStatesFromApi(
            this.state.accessToken,
            this.state.selectedValueCountry,
            async (state) => {
              this.setState({states: state.data});
              console.log(
                'state--------------------------------------------------------',
                this.state.states,
              );
              await Services.getCitiesFromApi(
                this.state.accessToken,
                this.state.states[0],
                (cities) => {
                  console.log(
                    'cities--------------------------------------------------------',
                    cities,
                  );
                  this.setState({citiesList: cities.data});
                },
              );
            },
          );
        });
      }
    });
  }

  setSelectedValue = () => {};

  render() {
    return (
      <View>
        <View style={styles.headerStyle}>
          <Text style={styles.headerStyleText}>
            Completa los datos y geolocalice el banco
          </Text>
          <Text style={styles.headerStyleText}>
            (Complete the data and geolocate the bank)
          </Text>
        </View>
        <Loader loading={this.state.loading} />
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
          <ScrollView
            style={{
              height: hp(91),
            }}>
            <View style={styles.subContainerStyle}>
              <Text style={styles.detailTextStyle}>Nambre (Name)</Text>
              <Text style={styles.detailTextStyle}>
                Nombre del responsable (Responsible name)
              </Text>
            </View>
            <TextInput
              value={this.state.name}
              onChangeText={(name) => this.setState({name})}
              placeholder={'George Woalock '}
              style={styles.placeholderStyle}
            />
            <Text style={{fontSize: wp(4), paddingLeft: wp(5)}}>
              Proporcione los datos de ubicación:
            </Text>
            <Text style={{fontSize: wp(4), paddingLeft: wp(5)}}>
              (Provide location data)
            </Text>
            <View style={styles.borderStyle}>
              <Picker
                selectedValue={this.state.selectedValueCountry}
                style={styles.pickerStyle}
                onValueChange={(itemValue, itemIndex) => {
                  this.setState({selectedValueCountry: itemValue});
                  Services.getStatesFromApi(
                    this.state.accessToken,
                    itemValue,
                    (state) => {
                      this.setState({states: state.data});
                    },
                  );
                }}>
                {this.state.countries.map((i) => {
                  return (
                    <Picker.Item
                      label={i.country_name}
                      value={i.country_name}
                    />
                  );
                })}
              </Picker>
            </View>
            <View style={styles.borderStyle}>
              <Picker
                selectedValue={this.state.selectedValueState}
                style={styles.pickerStyle}
                onValueChange={(state, itemIndex) => {
                  this.setState({selectedValueState: state});
                  Services.getCitiesFromApi(
                    this.state.accessToken,
                    state,
                    (cities) => {
                      this.setState({citiesList: cities.data});
                    },
                  );
                }}>
                {this.state.states.map((i) => {
                  return (
                    <Picker.Item label={i.state_name} value={i.state_name} />
                  );
                })}
              </Picker>
            </View>
            {/* <View style={styles.borderStyle}>
              <Picker
                selectedValue={this.state.selectedValue}
                style={styles.pickerStyle}
                onValueChange={(itemValue, itemIndex) =>
                  this.setSelectedValue(itemValue)
                }>
                <Picker.Item
                  label="Distrito (Distric)"
                  value="Distrito (Distric)"
                />
                <Picker.Item label="some" value="some" />
              </Picker>
            </View> */}
            <View style={styles.borderStyle}>
              <Picker
                selectedValue={this.state.city}
                style={styles.pickerStyle}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({city: itemValue})
                }>
                {this.state.citiesList.map((i) => {
                  return (
                    <Picker.Item label={i.city_name} value={i.city_name} />
                  );
                })}
              </Picker>
            </View>
            <TextInput
              value={this.state.town}
              onChangeText={(town) => this.setState({town})}
              placeholder={'Barrio / Poblado (Town)'}
              style={styles.placeholderStyle}
            />
            <TextInput
              value={this.state.buildingAddress}
              onChangeText={(buildingAddress) =>
                this.setState({buildingAddress})
              }
              placeholder={'Casa o Ediﬁcio (# House or Building)'}
              style={styles.placeholderStyle}
            />
            <TextInput
              value={this.state.time}
              onChangeText={(time) => this.setState({time})}
              placeholder={'Horario para localizarlo(a) (Hours to locate you)'}
              style={styles.placeholderStyle}
            />
            <TextInput
              value={this.state.term}
              onChangeText={(term) => this.setState({term})}
              placeholder={'Condiciones de uso (Terms of use) '}
              style={styles.placeholderStyle}
            />
            <Text
              style={{
                color: 'tomato',
                fontWeight: 'bold',
                alignSelf: 'center',
                marginTop: hp(3),
              }}
              onPress={() => this.props.navigation.navigate('mapForBank')}>
              go to google map
            </Text>

            <TouchableOpacity onPress={this.filePicker}>
              <View style={styles.ButtonContainer}>
                <Text style={[styles.buttonTxt]}>Select Image</Text>
                <Image
                  resizeMode="contain"
                  source={require('../Image/botton-Arrow.png')}
                  style={{marginRight: 3}}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.onButtonPress}>
              <View style={styles.ButtonContainer}>
                <Text style={[styles.buttonTxt]}>Submit</Text>
                <Image
                  resizeMode="contain"
                  source={require('../Image/botton-Arrow.png')}
                  style={{marginRight: 3}}
                />
              </View>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }

  filePicker = () => {
    //   FilePickerManager.showFilePicker(null, (response) => {
    //     console.log('Response = ', response);

    //     if (response.didCancel) {
    //       console.log('User cancelled file picker');
    //     } else if (response.error) {
    //       console.log('FilePickerManager Error: ', response.error);
    //     } else {
    //       Services.uploadImage(response.path, (imageUpload) => {
    //         console.log('image', imageUpload);
    //       });
    //       this.setState({
    //         file: response,
    //       });
    //     }
    //   });
    const options = {
      title: 'Select Avatar',
      customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker((response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        Services.uploadImage(response.uri, (imageUpload) => {
          console.log('image', imageUpload);
        });
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source,
        });
      }
    });
  };
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: colors.purple,
    width: wp(100),
    height: hp(9),
    justifyContent: 'center',
  },
  headerStyleText: {
    color: '#fff',
    fontSize: wp(4.5),
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  boxContainerSTyle: {
    borderWidth: 1,
    marginTop: hp(1),
    width: wp(90),
    alignSelf: 'center',
    height: hp(5),
    paddingLeft: wp(2),
    flexDirection: 'row',
    alignItems: 'center',
  },
  placeholderStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 0.5,
    borderColor: colors.grey,
    height: 58,
    borderRadius: 8,
    margin: 10,
    width: wp(95),
    alignSelf: 'center',
  },
  detailTextStyle: {width: wp(80), fontSize: wp(4), marginTop: hp(1)},
  subContainerStyle: {
    paddingLeft: wp(5),
    paddingBottom: hp(1),
  },
  borderStyle: {
    height: 58,
    borderWidth: 0.5,
    backgroundColor: colors.white,
    borderColor: colors.grey,
    margin: 10,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  pickerStyle: {
    alignItems: 'center',
    height: 58,
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
