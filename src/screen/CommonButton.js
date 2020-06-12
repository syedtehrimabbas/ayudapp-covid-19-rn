import {Image, Text, TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import React from 'react';

class CommmonButton extends React.Component {
  constructor(props) {
    super(props);
  }
  RenderView() {
    if (this.props.ImageSource) {
      return (
        <Image
          source={this.props.ImageSource}
          resizeMode="contain"
          style={styles.ImageStyle}
        />
      );
    } else {
      return (
        <Text style={[styles.TextStyle, this.props.buttonTextStyle]}>
          {this.props.Text}{' '}
        </Text>
      );
    }
  }
  render() {
    const {ImageStyle, TextStyle} = styles;
    return (
      <TouchableOpacity onPress={this.props.onPress} style={this.props.style}>
        {/* {this.props.ImageSource !== "" ? (
          <Image source={this.props.ImageSource} style={ImageStyle} />
        ) : (
          this.props.ImageSource ==
          ""(<Text style={TextStyle}>{this.props.Text} </Text>)
        )} */}
        {this.RenderView()}
      </TouchableOpacity>
    );
  }
}
const styles = {
  ImageStyle: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 0,
    borderRadius: 2,
  },
  TextStyle: {color: 'white', fontSize: wp('4%')},
};
export default CommmonButton;
// if (props === props.ImageSource) {
//   return <Image source={props.ImageSource} style={ImageStyle} />;
// } else {
//   <Text style={TextStyle}>{props.Text} </Text>;
// }
