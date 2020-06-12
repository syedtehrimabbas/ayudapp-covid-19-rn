import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {Component} from 'react';
import {heightPercentageToDP, widthPercentageToDP,} from 'react-native-responsive-screen';
import PhoneInput from 'react-native-phone-input';
import Services from '../FireServices/FireServices';
import colors from '../theme/colors';
import Loader from './Loader';

class PhoneAuth extends Component {
    constructor(props) {
        super(props);

        this.state = {
            valid: '',
            type: '',
            value: '',
            isValid: '',
            isConfirmation: false,
            confirmResult: null,
            loading: false
        };

        // this.updateInfo = this.updateInfo.bind(this);
        // this.renderInfo = this.renderInfo.bind(this);
    }

    componentDidMount() {
        console.log('this.phone.getPickerData()', this.phone.getPickerData());
    }

    onSuccessCase = (code) => {
        console.log('code', code);
        this.props.navigation.navigate('LoginConfirm', {
            code: 'some',
        });
    };
    updateInfo = () => {
        this.setState({
            valid: this.phone.isValidNumber(),
            type: this.phone.getNumberType(),
            value: this.phone.getValue(),
            isConfirmation: true,
            loading: true
        });
        console.log('--------------', this.phone.getValue());
        console.log('--------------', this.phone.getNumberType());
        console.log('--------------', this.phone.getValue());
        if (this.phone.getNumberType() === 'UNKNOWN') {
            alert('Please enter a valid number');
            this.setState({loading: false})
        } else {
            let value = this.phone.getValue();
            Services.verifyPhoneNumber(value, (res) => {
                console.log('res', res);
                this.setState({loading: false})
                if (res.isSuccess) {
                    this.props.navigation.navigate('LoginConfirm', {code: res.response});
                } else {
                    alert(res.error.message);
                }
            });
        }
        // this.setStateValue(setValue => {
        //   if (setValue.isSuccess) {
        //     Services.verifyPhoneNumber(this.state.value, res => {
        //       console.log('phone response-------', res);
        //     });
        //   }
        // });
    };
    setStateValue = (callback) => {
        this.setState({
            valid: this.phone.isValidNumber(),
            type: this.phone.getNumberType(),
            value: this.phone.getValue(),
            isConfirmation: true,
            code: '',
        });
        callback({isSuccess: true});
    };

    renderInfo() {
        if (this.state.value) {
            return (
                <View style={styles.info}>
                    <Text>
                        Is Valid:{' '}
                        <Text style={{fontWeight: 'bold'}}>
                            {this.state.valid.toString()}
                        </Text>
                    </Text>
                    <Text>
                        Type: <Text style={{fontWeight: 'bold'}}>{this.state.type}</Text>
                    </Text>
                    <Text>
                        Value--------:{' '}
                        <Text style={{fontWeight: 'bold'}}>{this.state.value}</Text>
                    </Text>
                </View>
            );
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View
                    style={{
                        flex: 1,

                        height: heightPercentageToDP(7),
                        width: widthPercentageToDP(80),
                        alignSelf: 'center',
                        alignItems: 'center',
                    }}>
                    <Loader loading={this.state.loading}/>
                    <Text>Enter Phone Number to get verification code</Text>
                    <PhoneInput
                        style={{
                            height: 58,
                            borderWidth: 0.5,
                            backgroundColor: colors.white,
                            borderColor: colors.blue,
                            margin: 10,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            width: widthPercentageToDP(80),
                            borderRadius: widthPercentageToDP(2),
                            paddingLeft: widthPercentageToDP(2),
                        }}
                        initialCountry="pa"
                        ref={(ref) => {
                            this.phone = ref;
                        }}
                    />

                    <TouchableOpacity style={[styles.ButtonContainer, {width: 200}]} onPress={this.updateInfo}>
                        <Text style={[styles.buttonTxt]}>Proceed</Text>
                        <Image
                            resizeMode="contain"
                            source={require('../Image/botton-Arrow.png')}
                            style={{marginRight: 3}}
                        />
                    </TouchableOpacity>

                </View>
                {/* {this.renderInfo()} */}
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

export default PhoneAuth;
