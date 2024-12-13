import {useTheme} from '../../hooks';
import {Colors} from '../../../src/theme/Variables';
import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

interface ButtonProps {
  title?: string;
  onPress?: () => void;
  style?: object;
  titleStyle?: object;
  disabled?: boolean;
  loading?: boolean;
  bcolor?: any;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  style,
  titleStyle,
  disabled,
  loading,
  bcolor,
}) => {
  const {Fonts} = useTheme();
  return (
    <TouchableOpacity
      style={[
        styles.button,
        style,
        {
          backgroundColor: disabled
            ? Colors.textGray400
            : bcolor
            ? bcolor
            : Colors.primary,
        },
      ]}
      onPress={onPress}
      disabled={disabled}>
      {loading ? (
        <ActivityIndicator color={'white'} size={'small'} />
      ) : (
        <Text style={[styles.buttonText, titleStyle, Fonts.textButton]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.gradientRed,
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    zIndex: 2,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default Button;
