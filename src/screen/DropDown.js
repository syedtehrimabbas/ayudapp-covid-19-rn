import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

import React from 'react';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal
        onPress={this.props.onCancel}
        transparent={true}
        animationType={'none'}
        visible={this.props.dropdown}
        onRequestClose={() => {}}>
        <View style={styles.modalBackground}>
          <View style={styles.DropdownViewStyle}>
            <View>
              <TouchableOpacity
                onPress={this.props.onSignout}
                style={{
                  borderBottomColor: '#f3f3f3',
                  borderBottomWidth: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: widthPercentageToDP(4),
                }}>
                <Text>Signout</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.props.onCancel}
                style={{
                  borderBottomColor: '#f3f3f3',
                  borderBottomWidth: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: widthPercentageToDP(4),
                }}>
                <Text>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'column',
    justifyContent: 'flex-start',

    backgroundColor: '#00000040',
  },
  DropdownViewStyle: {
    backgroundColor: '#FFFFFF',
    width: widthPercentageToDP(50),
    padding: 0,
    borderRadius: 10,
    borderTopRightRadius: 0,
    display: 'flex',

    // alignItems: 'center',
    // justifyContent: 'space-around',
    marginTop: heightPercentageToDP(13),
    marginRight: widthPercentageToDP(8),
  },
});

export default Dropdown;
