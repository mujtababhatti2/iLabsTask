import React, { useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import RNPickerSelect, { Item } from "react-native-picker-select";
import { useTheme } from "../../hooks";
import { ErrorMessage } from "../Form";
// import ErrorMessage from "./ErrorMessage";


interface PickerItemProps {
    name: string;
    placeholder: string;
    iconname: string;
    data: Item[] ;
    value:string | null;
}

const PickerItem: React.FC<PickerItemProps> = ({ name, placeholder, iconname, data,value }) => {
const [fieldValue,setFieldValue] = useState({
    name:'',
    val:''
})

    const { Colors, darkMode } = useTheme();

    return (
        <>
            <View style={[pickerSelectStyles.container, { backgroundColor: darkMode ? Colors.inputBackground : Colors.lightgrey, }]}>
                <MaterialCommunityIcons
                    name={iconname}
                    size={20}
                    color={Colors.text}
                    style={pickerSelectStyles.leftIcon}
                />
                <View style={{ flex: 1 }}>
                    <RNPickerSelect
                        key={name}
                        useNativeAndroidPickerStyle={false}
                        onValueChange={(val) => {
                            console.log(val)
                            setFieldValue(name, val);
                        }}
                        placeholder={{ label: placeholder }}
                        darkTheme={darkMode}
                        value={value}
                        items={data}
                        style={{
                            ...pickerSelectStyles,
                            inputAndroid: {
                                color: Colors.text,
                                marginLeft:15
                            },
                            inputIOS: {
                                color: Colors.text,
                            },
                            placeholder: {
                                color: Colors.text,
                            },
                            iconContainer: {
                                top: Platform.OS === 'ios' ? 0 : 15,
                                right: Platform.OS === 'ios' ? 0 : 15
                            }
                        }}
                        Icon={() => {
                            return (
                                <MaterialCommunityIcons name="chevron-down" color='gray' size={20} />
                            )
                        }}
                    />
                </View>
            </View>
            <ErrorMessage name={name} />
        </>
    );
}

const pickerSelectStyles = StyleSheet.create({
    container: {
        borderRadius: 10,
        flexDirection: "row",
        padding: Platform.OS === 'ios' ? 15 : 5,
        marginVertical: 10,
    },
    leftIcon: {
        marginRight: Platform.OS === 'android' ? 0 : 12,
        // position: 'absolute'
        marginLeft: Platform.OS === 'ios' ? 0 : 10, 
        marginTop: Platform.OS === 'ios' ? 0 : 15, 
    },
});

export default PickerItem;
