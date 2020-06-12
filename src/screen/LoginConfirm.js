import {StyleSheet, Text, View,} from 'react-native';
import React, {Component} from 'react';
import {heightPercentageToDP, widthPercentageToDP,} from 'react-native-responsive-screen';
import {NavigationActions, StackActions} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import CodeInput from 'react-native-confirmation-code-input';
import Services from '../FireServices/FireServices';
import colors from '../theme/colors';
import Loader from "./Loader";

class LoginConfirm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valid: '',
            type: '',
            value: '',
            isValid: '',
            isConfirmation: false,
            confirmResult: this.props.navigation.state.params.code,
            loading: false
        };
    }

    componentDidMount() {
        console.log('hererere', this.props);
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

                    <Loader loading={this.state.loading}/>

                    <Text style={{fontSize: 15}}>We have sent you a verification code on your phone, please enter
                        verification code</Text>
                    <CodeInput
                        style={{
                            height: 58,
                            borderWidth: 0.5,
                            backgroundColor: colors.white,
                            borderColor: colors.blue,
                            margin: 10,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            width: widthPercentageToDP(10),
                            borderRadius: widthPercentageToDP(2),
                        }}
                        ref="codeInputRef2"
                        secureTextEntry
                        codeLength={6}
                        compareWithCode="AsDW25"
                        activeColor="#3440eb"
                        inactiveColor="#3440eb"
                        autoFocus={true}
                        ignoreCase={true}
                        inputPosition="center"
                        size={90}
                        onFulfill={(isValid, code) => {
                            // console.log('isvalid,', isValid);
                            // console.log('isvalid,', code);
                            this.setState({loading: true})
                            Services.confirmVerificationCode(
                                this.state.confirmResult,
                                code,
                                (res) => {
                                    this.setState({loading: false})
                                    console.log('user-----', res);
                                    if (res.isSuccess) {
                                        this.onUserisSuccess(res);
                                    } else {
                                        alert(res.error.message);
                                    }
                                }
                            );
                        }}
                        containerStyle={{marginTop: 30}}
                        codeInputStyle={{borderWidth: 1.5}}
                    />
                </View>
            </View>
        );
    }

    onUserisSuccess = (response) => {
        console.log('onUserisSuccess response', response);

        Services.getUserProfile((userProfile) => {
            console.log('userProfile', userProfile);
            if (userProfile.user._data === undefined) {
                Services.serUserProfile(response.response._user.uid, (profile) => {
                    console.log('profile', profile);
                    if (profile.isSuccess) {
                        console.log('this', this);
                        this.props.navigation.navigate('BioDataForm', {
                            id: response.response._user.uid,
                        });

                    }
                });
            } else {
                AsyncStorage.setItem('USER', response.response._user.uid);
                console.log('this', this);
                this.props.navigation.navigate('UserCategory', {
                    id: response.response._user.uid,
                });
            }
        });
    };
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

export default LoginConfirm;
