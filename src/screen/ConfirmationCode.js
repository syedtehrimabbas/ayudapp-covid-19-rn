import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {Component} from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

import CodeInput from 'react-native-confirmation-code-input';
import PhoneInput from 'react-native-phone-input';
import Services from '../FireServices/FireServices';

class ConfirmationCode extends Component {
  constructor() {
    super();

    this.state = {
      valid: '',
      type: '',
      value: '',
      isValid: '',
      isConfirmation: false,
      confirmResult: this.props.navigation.state.params.code,
    };

    // this.updateInfo = this.updateInfo.bind(this);
    // this.renderInfo = this.renderInfo.bind(this);
  }
  componentDidMount() {
    console.log('this.phone.getPickerData(99999999)');
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            height: heightPercentageToDP(7),

            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>Enter verification number</Text>
          <CodeInput
            style={{alignSelf: 'center'}}
            ref="codeInputRef2"
            secureTextEntry
            codeLength={6}
            compareWithCode="AsDW25"
            activeColor="#3440eb"
            inactiveColor="#3440eb"
            autoFocus={false}
            ignoreCase={true}
            inputPosition="center"
            size={50}
            onFulfill={(isValid, code) => {
              // console.log('isvalid,', isValid);
              // console.log('isvalid,', code);
              Services.confirmVerificationCode(
                this.state.confirmResult,
                code,
                (res) => {
                  console.log('user-----', res);
                  if (res.isSuccess) {
                  } else {
                    alert(res.error);
                  }
                },
              );
            }}
            containerStyle={{marginTop: 30}}
            codeInputStyle={{borderWidth: 1.5}}
          />

          <TouchableOpacity onPress={this.updateInfo} style={styles.button}>
            <Text>Next</Text>
          </TouchableOpacity>
        </View>
        )}
      </View>
    );
  }

  onFillComplete = (isValid, code) => {
    console.log(code);
  };
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  info: {
    // width: 200,
    borderRadius: 5,
    backgroundColor: 'red',
    padding: 10,
    marginTop: 20,
  },
  button: {
    marginTop: 20,
    padding: 10,
  },
});

export default ConfirmationCode;
