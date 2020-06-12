import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {Component} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Services from '../FireServices/FireServices';
import auth from '@react-native-firebase/auth';
import colors from '../theme/colors';

export default class Requests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: [],
    };
  }
  componentDidMount() {
    console.log('herererererer');
    Services.getRequestedOrderByUser((userRequests) => {
      console.log('userRequests', userRequests);
      let userReq = userRequests.requests.filter((i) => {
        return i.requests.userId === auth().currentUser.uid;
      });
      console.log('userReq', userReq);
      this.setState({requests: userReq});
    });
  }
  render() {
    return (
      <View>
        <View style={styles.headerStyle}>
          <Text style={styles.headerStyleText}>User Requests</Text>
        </View>
        <FlatList
          data={this.state.requests}
          renderItem={this.renderRequest}
          style={{height: hp(86)}}
        />
      </View>
    );
  }
  renderRequest = ({item}) => {
    console.log('item', item);

    return (
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
            {item.requests.userInformation.firstName}
            {item.requests.userInformation.lastName}
          </Text>
        </View>
        <View style={styles.borderStyle}>
          <Text style={styles.textStyle}>
            Country: {item.requests.userInformation.country}
          </Text>
        </View>
        <View style={styles.borderStyle}>
          <Text style={styles.textStyle}>
            Province: {item.requests.userInformation.district}
          </Text>
        </View>
        <View style={styles.borderStyle}>
          <Text style={styles.textStyle}>
            City: {item.requests.userInformation.city}
          </Text>
        </View>
        <View style={styles.borderStyle}>
          <Text style={styles.textStyle}>
            Phone: {item.requests.userInformation.phone}
          </Text>
        </View>
        <View style={styles.borderStyle}>
          <Text style={styles.textStyle}>
            Request time: {item.requests.orderTime}
          </Text>
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
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
