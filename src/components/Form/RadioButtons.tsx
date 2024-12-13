import { useTheme } from '../../hooks';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
// import Colors from "../../config/colors";
import { Text } from 'react-native';
import ErrorMessage from './ErrorMessage';

export interface Option {
    key: string;
    text: string;
    option: string;
}

interface RadioButtonsProps {
    options: Option[];
    selectedOption: string | null;
    onSelect: (option: Option) => void;
    style?: any; // Adjust this as per your style prop type
    styleBtnContainer?: any; // Adjust this as per your style prop type
    fieldName: string;
}

const RadioButtons: React.FC<RadioButtonsProps> = ({ options, selectedOption, onSelect, style, styleBtnContainer, fieldName }) => {
    const { Colors, Fonts, Gutters } = useTheme();
    return (<>
        <View style={[styles.mainContainer, style]}>
            {options.map((item) => {
                return (
                    <View key={item.key} style={[styles.buttonContainer, styleBtnContainer]}>

                        <TouchableOpacity
                            style={[styles.circle, { borderColor: Colors.text }]}
                            onPress={() => {
                                onSelect(item);
                            }}>
                            {selectedOption && selectedOption === item.key && (
                                <View style={[styles.checkedCircle, { backgroundColor: Colors.gradientRed, borderColor: Colors.white, borderWidth: 1, }]} />
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            onSelect(item);
                        }}>
                            <Text style={[Fonts.textSmall, Gutters.tinyLPadding]}>{item.text}</Text>
                        </TouchableOpacity>
                    </View>
                );
            })}
        </View>
        <ErrorMessage name={fieldName} />
    </>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        // flexDirection: 'row',
    },
    buttonContainer: {
        alignItems: 'center',
        padding: 10,
        flexDirection: 'row'
    },
    circle: {
        height: 20,
        width: 20,
        borderRadius: 15,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkedCircle: {
        width: 18,
        height: 18,
        borderRadius: 10,
    },

});

export default RadioButtons;
