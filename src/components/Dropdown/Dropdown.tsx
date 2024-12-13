import { useTheme } from '../../hooks';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/FontAwesome';

interface DropdownOption {
  value: string;
  title: string;
}

interface DropdownProps {
  options: DropdownOption[];
  onSelect: (value: string) => void;
  preSelect?: DropdownOption;
  placeholder?:string;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect, preSelect,placeholder }) => {
  const { Colors } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(preSelect || null);

  const handleOptionSelect = (option: DropdownOption) => {
    setSelectedOption(option);
    onSelect(option.value);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.header, { backgroundColor: Colors.inputBackground }]} onPress={() => setIsOpen(!isOpen)}>
        {selectedOption?.title ? <Text style={[styles.title,{ color: Colors.text }]}>{selectedOption?.title}</Text> : <Text style={[styles.title, { color: "grey" }]}>{placeholder}</Text>}
        <Text style={styles.title}><Ionicons name={'caret-down'} color={Colors.text} size={20} /></Text>
      </TouchableOpacity>
      {isOpen && (
        <View style={[styles.optionsContainer, { backgroundColor: Colors.inputBackground }]}>
          {options.map(option => (
            <TouchableOpacity
              key={option.value}
              style={styles.option}
              onPress={() => handleOptionSelect(option)}
            >
              <Text style={{ color: Colors.text }}>{option.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    margin: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // height: 45,
    // width: '100%',
    borderRadius: 20,
    padding: 12,
    paddingHorizontal: 20,
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.3)',
    // shadowColor: '#000000',
    // shadowOffset: {
    //     width: 0,
    //     height: -3,
    // },
    // shadowOpacity: 0.3,
    // shadowRadius: 6,
    // elevation: 1,
  },
  title: {
    fontSize: 14,
    color: 'grey',
    fontFamily: "Poppins-Regular",
  },
  optionsContainer: {
    position: 'absolute',
    top: 50,
    left: 15,
    right: 15,
    borderRadius: 4,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 3,
    zIndex: 3
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});

export default Dropdown;
