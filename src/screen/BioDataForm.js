import {
  CheckBox,
  Image,
  KeyboardAvoidingView,
  Picker,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component} from 'react';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import AsyncStorage from '@react-native-community/async-storage';
import CommmonButton from './CommonButton';
import Images from '../Image/Images';
import Loader from '../screen/Loader';
import Services from '../FireServices/FireServices';
import auth from '@react-native-firebase/auth';
import colors from '../theme/colors';

let userType = '';
export default class BioDataForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValueCountry: '',
      selectedValueState: '',
      isSelected: false,
      fname: '',
      lname: '',
      phone: '',
      otherPhone: '',
      country: '',
      province: '',
      district: '',
      city: '',
      town: '',
      building: '',
      time: '',
      image: '',
      countries: [],
      states: [],
      citiesList: [],
      loading: false,
      accessToken: '',
      userId: this.props.navigation.state.params.id,
      confirmation: false,
      needyUser: false,
      indevidualHelperUser: false,
      bankUser: false,
      companyUser: false,
    };
  }

  onSubmitButtonPress = () => {
    if (this.state.needyUser) {
      userType = 'Needy';
    } else if (this.state.indevidualHelperUser) {
      userType = 'IndevidualHelper';
    } else if (this.state.companyUser) {
      userType = 'CompanyHelper';
    } else if (this.state.bankUser) {
      userType = 'BankPoint';
    }
    this.setState({loading: true});
    const {
      fname,
      lname,
      phone,
      otherPhone,
      country,
      province,
      district,
      city,
      town,
      building,
      time,
      image,
      selectedValueCountry,
      selectedValueState,
    } = this.state;

    Services.updateUserBiodata(
      fname,
      lname,
      phone,
      otherPhone,
      selectedValueCountry,
      selectedValueState,
      district,
      city,
      town,
      building,
      time,
      userType,
      (response) => {
        console.log('biodata', response);
        if (response.isSuccess) {
          this.setState({loading: false});
          AsyncStorage.setItem('USER', this.state.userId);
          this.props.navigation.navigate('UserCategory');
        }
      },
    );
  };

  componentDidMount() {
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

  onItemValuePick = (value) => {
    console.log('value', value);
    this.setState({selectedValueCountry: value});
    // Services.getStatesAgainstCountry((states) => {
    //   console.log('states', states);
    // });
  };

  render() {
    return (
      <View>
        <View style={styles.headerStyle}>
          <Loader loading={this.state.loading} />
          <Text style={styles.headerStyleText}>COMPLETE SUS DATOS</Text>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView style={{height: hp(90)}}>
            <Text style={{marginLeft: 10, color: 'black', fontSize: 17}}>
              Cual es tu identidad
            </Text>
            <View style={styles.boxContainerBorderStyle}>
              <View style={{flexDirection: 'row', padding: wp(2)}}>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      needyUser: true,
                      indevidualHelperUser: false,
                      bankUser: false,
                      companyUser: false,
                    })
                  }>
                  <Image
                    source={
                      this.state.needyUser ? Images.check : Images.uncheck
                    }
                    style={{height: hp(4), width: wp(5), resizeMode: 'contain'}}
                  />
                </TouchableOpacity>
                <Text style={{marginLeft: wp(4), marginRight: wp(2)}}>
                  Necesito ayuda (I need help)
                </Text>
              </View>
              <View style={{flexDirection: 'row', padding: wp(2)}}>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      needyUser: false,
                      indevidualHelperUser: true,
                      bankUser: false,
                      companyUser: false,
                    })
                  }>
                  <Image
                    source={
                      this.state.indevidualHelperUser
                        ? Images.check
                        : Images.uncheck
                    }
                    style={{height: hp(4), width: wp(5), resizeMode: 'contain'}}
                  />
                </TouchableOpacity>
                <Text style={{marginLeft: wp(4), marginRight: wp(2)}}>
                  Quiero ayudar (I want to help) soy un individuo (I am an
                  individual)
                </Text>
              </View>
              <View style={{flexDirection: 'row', padding: wp(2)}}>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      needyUser: false,
                      indevidualHelperUser: false,
                      bankUser: false,
                      companyUser: true,
                    })
                  }>
                  <Image
                    source={
                      this.state.companyUser ? Images.check : Images.uncheck
                    }
                    style={{height: hp(4), width: wp(5), resizeMode: 'contain'}}
                  />
                </TouchableOpacity>
                <Text style={{marginLeft: wp(4)}}>
                  Quiero ayudar (I want to help) Soy una empresa (I am a
                  company)
                </Text>
              </View>
            </View>
            <TextInput
              value={this.state.fname}
              onChangeText={(fname) => this.setState({fname})}
              placeholder={'Primer nombre'}
              style={styles.placeholderStyle}
            />
            <TextInput
              value={this.state.lname}
              onChangeText={(lname) => this.setState({lname})}
              placeholder={'Apellido'}
              style={styles.placeholderStyle}
            />
            <TextInput
              value={this.state.phone}
              onChangeText={(phone) => this.setState({phone})}
              placeholder={'Numero celular'}
              keyboardType="phone-pad"
              style={styles.placeholderStyle}
            />
            <TextInput
              value={this.state.otherPhone}
              onChangeText={(otherPhone) => this.setState({otherPhone})}
              placeholder={'Teléfono secundario'}
              keyboardType="phone-pad"
              style={styles.placeholderStyle}
            />
            <Text style={{marginLeft: 10}}>País</Text>

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
            <Text style={{marginLeft: 10}}>Provincia</Text>

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
            <Text style={{marginLeft: 10}}>Corregimiento</Text>
            <View style={styles.borderStyle}>
              <Picker
                selectedValue={this.state.city}
                style={styles.pickerStyle}
                onValueChange={(itemValue, itemIndex) => {
                  this.setState({city: itemValue});
                  Services.getUserProfile();
                }}>
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
              value={this.state.building}
              onChangeText={(building) => this.setState({building})}
              placeholder={'Casa o Ediﬁcio (# House or Building)'}
              style={styles.placeholderStyle}
            />
            <TextInput
              value={this.state.time}
              onChangeText={(time) => this.setState({time})}
              placeholder={'Horario para localizarlo(a) (Hours to locate you)'}
              style={styles.placeholderStyle}
            />

            <View style={{marginStart: 10}}>
              <Text
                style={{
                  color: 'blue',
                  fontWeight: 'bold',
                  fontSize: wp(4),
                  marginTop: hp(1),
                }}>
                TERMINOS DE USO
              </Text>
              <Text
                style={{
                  width: wp(90),
                }}>
                La información proporcionada es real Acepto que Ayudapp pueda
                revisar, aprobar y garantizar que la información que estoy
                suministrando no afecte a terceras personas.
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <CheckBox
                  value={this.state.confirmation}
                  onValueChange={() =>
                    this.setState({confirmation: !this.state.confirmation})
                  }
                  style={styles.checkbox}
                />
                <Text
                  style={{width: wp(80), fontSize: wp(4), marginTop: hp(2)}}>
                  Acepto las condiciones y términos de uso de Ayudapp
                </Text>
              </View>

              <TouchableOpacity
                disabled={!this.state.confirmation}
                onPress={this.onSubmitButtonPress}>
                <View style={styles.ButtonContainer}>
                  <Text style={[styles.buttonTxt]}>Submit</Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }

  setSelectedValue = () => {};
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: colors.purple,
    width: wp(100),
    height: hp(6),
  },
  headerStyleText: {
    color: '#fff',
    fontSize: wp(8),
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  placeholderStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 0.5,
    paddingStart: 15,
    borderColor: colors.grey,
    height: 58,
    borderRadius: 8,
    margin: 10,
  },
  boxContainerBorderStyle: {
    backgroundColor: colors.white,
    borderWidth: 0.5,
    borderColor: colors.grey,
    padding: wp(2),
    borderRadius: 8,
    margin: 10,
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
  checkbox: {
    marginLeft: wp(5),
    marginTop: hp(1),
  },
  ButtonContainer: {
    backgroundColor: colors.purple,
    justifyContent: 'center',
    borderWidth: 0.5,
    width: wp(50),
    borderRadius: 20,
    paddingRight: 22,
    alignItems: 'center',
    alignSelf: 'center',
    margin: 14,
    height: 58,
    borderColor: colors.black,
  },
  ButtonContainerInactive: {
    flexDirection: 'row',
    backgroundColor: '#8763ba',
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
    alignSelf: 'center',
    margin: 16,
    color: colors.white,
    paddingLeft: 11,
  },
});
