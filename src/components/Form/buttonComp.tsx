import { useFormikContext } from "formik";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../../../src/hooks";

interface SubmitButtonProps {
  title: string;
  style?: any; // Replace 'any' with a more specific type based on your styles
  onPress?: () => void;
  isLoad?: boolean;
}

function ButtonComp({ title, style, isLoad, onPress }: SubmitButtonProps) {

  const { Colors, Fonts } = useTheme();
  
  return (
    <TouchableOpacity
      style={[
        {
          borderRadius: 10,
          backgroundColor: Colors.gradientRed,
          padding: 8,
          margin:8,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
      onPress={onPress}
      disabled={isLoad}
    >
      {isLoad ? (
        <ActivityIndicator color="white" size="small" />
      ) : (
        <Text style={Fonts.textButton}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

export default ButtonComp;