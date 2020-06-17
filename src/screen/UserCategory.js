import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';
import React, {Component} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import AsyncStorage from '@react-native-community/async-storage';
import CommmonButton from './CommonButton';
import {FlatList} from 'react-native-gesture-handler';
import Images from '../Image/Images';
import Loader from './Loader';
import Services from '../FireServices/FireServices';
import {SliderBox} from 'react-native-image-slider-box';
import auth from '@react-native-firebase/auth';
import colors from '../theme/colors';

let list = [];
let userMenu = [];
let button = [
  {
    id: 1,
    text: 'Necesito ayuda',
    color: 'white',
    icon: Images.need_help,
  },
  {
    id: 2,
    text: 'Quiero ayudar by un individuo',
    color: '#231f20',
    icon: Images.individual,
  },
  {
    id: 3,
    text: 'Quiero ayudar Soy una empresa',
    color: '#a6ce39',
    icon: Images.company,
  },
  {
    id: 4,
    text: 'Crear banco de alimenio distribuido',
    color: '#0095da',
    icon: Images.foodbank,
  },
  {
    id: 5,
    text: 'Ver estadisticas y resumen',
    color: '#da0101',
    icon: Images.statistics,
  },
  {
    id: 6,
    text: 'Logout',
    color: '#da0101',
    icon: Images.logout,
  },
];
let userStatus = '';
let userTy = '';
export default class UserCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      renderButton: [],
      title: '',
    };
  }
  componentDidMount() {
    Services.getUserProfile((res) => {
      if (res.user._data.biodata.userType === 'Needy') {
        userTy = 'Needy';
        this.setState({title: 'Necesitada'});
        list = [
          {
            id: 1,
            text: ' (Spanish ) Solicitar donación (English) Request Donation',
            color: 'white',
            icon: Images.need_help,
          },
          {
            id: 2,
            text: '(Spanish) Modificar solicitud (English) Modify Request ',
            color: 'white',
            icon: Images.modify,
          },
          {
            id: 3,
            text: '(Spanish) Precauciones COVID (English) COVID precautions ',
            color: 'white',
            icon: Images.precautions,
          },
          {
            id: 4,
            text: '(Spanish) Cerrar session (English) Logout ',
            color: 'white',
            icon: Images.logout,
          },
        ];
        userMenu.push({
          userType: res.user._data.biodata.userType,
          itemList: list,
        });
        this.setState({
          renderButton: userMenu,
          userType: res.user._data.biodata.userType,
        });

        this.setState({renderButton: userMenu});
      } else if (res.user._data.biodata.userType === 'IndevidualHelper') {
        this.setState({title: 'Ayudar a otras'});

        list = [
          {
            id: 1,
            text: 'Done a los necesitados',
            color: 'white',
            icon: Images.need_help,
          },
          {
            id: 2,
            text: ' Puntos de comida',
            color: 'white',
            icon: Images.bank,
          },
          {
            id: 3,
            text: 'Precauciones COVID',
            color: 'white',
            icon: Images.precautions,
          },
          {
            id: 4,
            text: 'Estadísticas',
            color: 'white',
            icon: Images.statistics,
          },
          {
            id: 5,
            text: 'Cerrar session',
            color: 'white',
            icon: Images.logout,
          },
        ];
        userMenu.push({
          userType: res.user._data.biodata.userType,
          itemList: list,
        });
        userTy = 'IndevidualHelper';
        this.setState({
          renderButton: userMenu,
          userType: res.user._data.biodata.userType,
        });
      } else if (res.user._data.biodata.userType === 'CompanyHelper') {
        this.setState({title: 'empresa'});
        list = [
          {
            id: 1,
            text: '(English) Add Food point (Spanish ) Añadir punto de comida',
            color: 'white',
            icon: Images.need_help,
          },
          {
            id: 2,
            text: '(English) Statistics (Spanish) Estadísticas',
            color: 'white',
            icon: Images.statistics,
          },
          {
            id: 3,
            text: '(English) COVID precautions (Spanish) Precauciones COVID',
            color: 'white',
            icon: Images.precautions,
          },
          {
            id: 4,
            text: '(Spanish) Cerrar session (English) Logout ',
            color: 'white',
            icon: Images.logout,
          },
        ];
        userMenu.push({
          userType: res.user._data.biodata.userType,
          itemList: list,
        });
        userTy = 'CompanyHelper';
        this.setState({
          renderButton: userMenu,
          userType: res.user._data.biodata.userType,
        });
        this.setState({renderButton: userMenu});
      } else if (res.user._data.biodata.userType === 'BankPoint') {
      }
    });
  }
  render() {
    return (
      <View>
        <View style={styles.headerStyle}>
          <Text style={styles.headerStyleText}>{this.state.title}</Text>
        </View>
        <View>
          <SliderBox
            dotColor={colors.purple}
            resizeMode={'cover'}
            inactiveDotColor={colors.gold}
            autoplay
            circleLoop
            images={[
              Images.slider_1,
              Images.slider_2,
              Images.slider_3,
              Images.slider_4,
              Images.slider_5,
              Images.slider_6,
              Images.slider_7,
              Images.slider_8s,
              Images.slider_9,
              Images.slider_10,
              Images.slider11,
            ]}
          />
          {/*{this.renderDashboard(Images.need_help)}*/}

          {this.state.renderButton.map((i) => {
            console.log(i);
            return (
              <FlatList
                style={{alignSelf: 'center'}}
                data={i.itemList}
                renderItem={({item}) => (
                  <TouchableOpacity onPress={() => this.onButtonPress(item.id)}>
                    <View
                      style={{
                        width: wp(40),
                        flexDirection: 'column',
                        alignItems: 'center',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        margin: 10,
                        backgroundColor: 'white',
                        padding: 10,
                        borderRadius: 10,
                      }}>
                      <Image
                        source={item.icon}
                        resizeMode="contain"
                        style={{
                          height: hp(10),
                          width: wp(18),
                        }}
                      />
                      <Text style={styles.headerStyleTextSub}>{item.text}</Text>
                    </View>
                  </TouchableOpacity>
                )}
                numColumns={2}
              />
            );
          })}
        </View>
      </View>
    );
  }

  renderButton = ({item}) => {
    return (
      <View
        style={{
          width: wp(90),
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'center',
          justifyContent: 'center',
          marginTop: hp(5),
        }}>
        <Image
          source={item.icon}
          resizeMode="contain"
          style={{
            height: hp(8),
            width: wp(15),
            marginTop: hp(2),
          }}
        />
        <Loader loading={this.state.loading} />
        <CommmonButton
          onPress={() => this.onButtonPress(item.id)}
          buttonTextStyle={{
            fontWeight: 'bold',
            fontSize: wp(4),
            alignSelf: 'center',
            width: wp(70),
          }}
          TextStyle={{fontSize: 12}}
          style={{
            paddingTop: hp(2),
            backgroundColor: item.color,
            alignSelf: 'center',
            justifyContant: 'center',
            alignItems: 'center',
            paddingBottom: hp(2),
            width: wp(75),
            //   paddingLeft: wp(7),
            //   paddingRight: wp(7),
            marginTop: hp(2),
            borderRadius: wp(1),
          }}
          Text={item.text}
        />
      </View>
    );
  };
  renderDashboard = ({item}) => {
    console.log(item);
    return (
      <TouchableOpacity onPress={() => this.onButtonPress(item.id)}>
        <View
          style={{
            width: wp(40),
            flexDirection: 'column',
            alignItems: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
            margin: 10,
            backgroundColor: 'white',
            padding: 10,
            borderRadius: 10,
          }}>
          <Image
            source={item.icon}
            resizeMode="contain"
            style={{
              height: hp(10),
              width: wp(18),
            }}
          />
          <Text style={styles.headerStyleTextSub}>{item.text}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  onButtonPress = (i) => {
    console.log('i------', i);
    console.log(userTy);
    this.setState({loading: true});
    if (userTy === 'IndevidualHelper') {
      if (i == 1) {
        this.props.navigation.navigate('IndividualHelperForm');
      } else if (i == 2) {
        this.props.navigation.navigate('FoodPoints');
      } else if (i == 3) {
        this.props.navigation.navigate('COVIDprecautions');
      } else if (i == 4) {
        this.props.navigation.navigate('Statics');
      } else if (i == 5) {
        console.log(i);
        auth().signOut();
        AsyncStorage.removeItem('USER').then(() => {
          this.props.navigation.navigate('Login');
        });
      }
    } else if (userTy === 'Needy') {
      if (userTy === 'Needy' && i == 1) {
        this.props.navigation.navigate('HomeStack', {userType: 'Needy'});
      } else if (i == 2) {
        this.props.navigation.navigate('Home', {userType: 'Needy'});
      } else if (i == 3) {
        this.props.navigation.navigate('COVIDprecautions');
      } else if (i == 5) {
        console.log(i.id);
        auth().signOut();
        AsyncStorage.removeItem('USER').then(() => {
          this.props.navigation.navigate('Login');
        });
      }
    } else if (userTy === 'CompanyHelper') {
      if (i == 1) {
        this.props.navigation.navigate('BankPoint', {userType: 'BankPoint'});
      } else if (i == 2) {
        this.props.navigation.navigate('Statics');
      } else if (i == 3) {
        this.props.navigation.navigate('COVIDprecautions');
      } else if (i == 4) {
        console.log(i.id);
        auth().signOut();
        AsyncStorage.removeItem('USER').then(() => {
          this.props.navigation.navigate('Login');
        });
      }
    }
    // if (id === 1) {
    //   userStatus = 'Needy';
    //   Services.updateUserStatus(userStatus, (res) => {
    //     this.setState({loading: false});
    //     if (res.isSuccess) {
    //       this.props.navigation.navigate('Home', {type: userStatus});
    //     } else {
    //       alert(res.error.message);
    //     }
    //   });
    // } else if (id === 2) {
    //   userStatus = 'IndevidualHelper';
    //   Services.updateUserStatus(userStatus, (res) => {
    //     this.setState({loading: false});
    //     if (res.isSuccess) {
    //       this.props.navigation.navigate('IndividualHelperForm');
    //     } else {
    //       alert(res.error.message);
    //     }
    //   });
    // } else if (id === 3) {
    //   userStatus = 'CompanyHelper';
    //   Services.updateUserStatus(userStatus, (res) => {
    //     this.setState({loading: false});
    //     if (res.isSuccess) {
    //       this.props.navigation.navigate('IndividualHelperForm');
    //     } else {
    //       alert(res.error.message);
    //     }
    //   });
    // } else if (id === 4) {
    //   userStatus = 'BankPoint';
    //   Services.updateUserStatus(userStatus, (res) => {
    //     this.setState({loading: false});
    //     if (res.isSuccess) {
    //       this.props.navigation.navigate('BankPoint', {type: userStatus});
    //     } else {
    //       alert(res.error.message);
    //     }
    //   });
    // } else if (id === 5) {
    //   this.setState({loading: false});
    //   this.props.navigation.navigate('Statics', {type: userStatus});
    // } else if (id === 6) {
    //   this.setState({loading: false});
    //   this.logout();
    // }
  };
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: colors.purple,
    width: wp(100),
    height: hp(5),
  },
  headerStyleText: {
    color: '#fff',
    fontSize: wp(6),
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  headerStyleTextSub: {
    color: 'black',
    fontSize: wp(4),
    alignSelf: 'center',
    textAlign: 'center',
  },
});
