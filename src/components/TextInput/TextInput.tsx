import {ErrorMessage} from 'formik';
import {useTheme} from '../../hooks';
import React from 'react';
import {
  TextInput,
  StyleSheet,
  TextInputProps,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import {responsiveWidth} from 'react-native-responsive-dimensions';

interface RoundedTextInputProps extends TextInputProps {
  style?: object;
  placeholder?: string;
  textFieldName?: string;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  backgroundColor?: string;
  width?: any;
  handleIcon?: () => void;
  errorMessage?: string;
}

const RoundedTextInput: React.FC<RoundedTextInputProps> = ({
  style,
  placeholder,
  rightIcon,
  textFieldName,
  handleIcon,
  leftIcon,
  width,
  backgroundColor,
  errorMessage,
  ...props
}) => {
  const {Layout, Colors, Fonts, Gutters} = useTheme();
  return (
    <View style={[Gutters.tinyVMargin]}>
      <View
        style={{
          flexDirection: 'row',
          borderColor: 'rgba(0,0,0,0.1)',
          borderWidth: 1,
          borderRadius: 5,
          backgroundColor: backgroundColor
            ? backgroundColor
            : Colors.placrholderColor,
          // backgroundColor:'white',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: responsiveWidth(3),
          width: width ? width : '100%',
        }}>
        {/* {leftIcon && (
          <TouchableOpacity onPress={handleIcon} style={styles.leftIcon}>
            {leftIcon}
          </TouchableOpacity>
        )} */}
        <TextInput
          style={[styles.input, style, {color: Colors.black}]}
          placeholder={placeholder}
          placeholderTextColor="#ccc"
          {...props}
        />
        {rightIcon && (
          <TouchableOpacity onPress={handleIcon} style={styles.rightIcon}>
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
      {errorMessage && (
        <Text
          style={{
            fontSize: 12,
            color: 'red',
          }}>
          {errorMessage}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    fontFamily: 'Poppins-Regular',
    padding: 10,
    width: '90%',
  },
  rightIcon: {
    position: 'absolute',
    right: 15,
    bottom: 10,
  },
  leftIcon: {
    // position: "absolute",
    // bottom: 8,
    // right: 10,
  },
});

export default RoundedTextInput;
