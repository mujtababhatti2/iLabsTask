// import React from "react";
// import { useFormikContext } from "formik";
// import { TextInput, TextInputProps } from 'react-native-paper';
// import ErrorMessage from "./ErrorMessage";
// import { useTheme } from "../../../src/hooks";


// interface AppFormFieldProps extends TextInputProps {
//   name: string ;
//   width?: number | string;
//   iconName?: any;
// }

// function AppFormField({ name, width, iconName, ...otherProps }: AppFormFieldProps) {
//   const {Colors}= useTheme();
//   const values = useFormikContext().values as Record<string, any>;
//   const { setFieldTouched, setFieldValue } = useFormikContext();

//   return (
//     <>
//       <TextInput
//         onBlur={() => setFieldTouched(name)}
//         onChangeText={(text) => setFieldValue(name, text)}
//         value={values[name] as any}
//         mode="flat"
//         style={{ borderTopStartRadius:10,borderTopEndRadius:10,borderRadius:10,marginVertical: 10,backgroundColor:Colors.inputBackground}}
//         left={<TextInput.Icon icon={iconName} color={Colors.textGray400} />}  
//         theme={{
//           colors: {primary:Colors.text, onSurfaceVariant:Colors.text},
//         }}
//         {...otherProps} 
//       />
//       <ErrorMessage name={name} />
//     </>
//   );
// }

// export default AppFormField;


import React from "react";
import { View, TextInput as RNTextInput, Text } from 'react-native';
import { FormikValues, useFormikContext } from "formik";
import ErrorMessage from "./ErrorMessage";
import { useTheme } from "../../../src/hooks";
import { TextInputProps } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface AppFormFieldProps extends TextInputProps {
  name: string;
  label?: string;
  width?: number | string;
  leftIconName?: string;
  FontAwesom?: string;
  rightIconName?: any;
  onSubmitEditing?: any;
  
}

function FormField({ name, label, width, leftIconName,FontAwesom ,rightIconName,onSubmitEditing,...otherProps }: AppFormFieldProps) {
  const { Colors, darkMode, Gutters, Fonts } = useTheme();
  const { values, setFieldTouched, setFieldValue } = useFormikContext<FormikValues>();

  return (
    <>
      {label && <Text style={[Gutters.tinyLPadding, Fonts.textBold,Fonts.textTiny]}>{label}</Text>}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: darkMode ? Colors.inputBackground : Colors.lightgrey,
          borderRadius: 10,
          paddingHorizontal: 12,
          marginVertical:10
        }}>
          {leftIconName ?  <Icon name={leftIconName} size={20} color={Colors.text}  /> : null }
          {FontAwesom ?   <FontAwesome name={FontAwesom} size={20} color={Colors.text}  />: null }
          {/* {leftIconName && FontAwesom && <FontAwesome name={leftIconName} size={20} color={Colors.text}  />} */}
          <RNTextInput
            onBlur={() => setFieldTouched(name)}
            onChangeText={(text) => setFieldValue(name, text)}
            value={values[name] as any}
            placeholderTextColor={Colors.text}
            onSubmitEditing={onSubmitEditing}
            style={{
              flex: 1,
              color: Colors.text,
              padding: 15,
              borderRadius: 10,
              backgroundColor: darkMode ? Colors.inputBackground : Colors.lightgrey,
            }}
            {...otherProps}
          />
           {rightIconName && rightIconName}
        </View>
      </View>
      <ErrorMessage name={name} />
    </>
  );
}

export default FormField;


