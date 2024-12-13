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

function SubmitButton({ title, style, isLoad, onPress }: SubmitButtonProps) {
  const { handleSubmit, isSubmitting } = useFormikContext<any>();
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
      onPress={isLoad ? undefined : () => handleSubmit()}
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

export default SubmitButton;

// import React from "react";
// import { useFormikContext } from "formik";
// import { Button } from "react-native-paper";
// import { GestureResponderEvent } from "react-native";
// import { useTheme } from "../../../src/hooks";
// import { Text, ActivityIndicator} from "react-native";

// interface SubmitButtonProps {
//   title: string;
//   style?: any; // Replace 'any' with a more specific type based on your styles
//   onPress?: () => void,
//   isLoad?: boolean
// }

// function SubmitButton({ title, style,isLoad}: SubmitButtonProps) {
//   const { handleSubmit, isSubmitting } = useFormikContext<any>();
//   const { Colors, Fonts } = useTheme();

//   // console.log("isSubmitting",isSubmitting)

//   // disabled={isSubmitting} 

//   return (<>
//     <Button mode="contained"  style={[{ borderRadius: 10, backgroundColor: Colors.gradientRed, marginVertical: 15, padding: 2 }, style]} onPress={() => handleSubmit()} disabled={isLoad}>
//       {isLoad ? <ActivityIndicator color="white" size={'small'}/> : <Text style={Fonts.textButton}>{title}</Text>}
//     </Button>
//   </>
//   );
// }

// export default SubmitButton;
