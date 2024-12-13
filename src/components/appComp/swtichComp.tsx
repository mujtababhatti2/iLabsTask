import {StyleSheet, Switch, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from '../../hooks';
interface swtichCompProps {
  title: string;
  flag: boolean;
  setFlag: (value: boolean) => void;
}

const SwtichComp = ({title, flag, setFlag}: swtichCompProps) => {
  const {
    Layout,
    Colors,
    Images,
    Gutters,
    Fonts,
    iosSafeAreaTPadding,
    NavigationColors,
  } = useTheme();
  return (
    <View
      style={[
        Layout.fullWidth,
        Layout.row,
        Layout.alignItemsCenter,
        Layout.justifyContentBetween,
        Gutters.smallTMargin,
      ]}>
      <Text style={[Fonts.textBold, Fonts.textSmall, {color: 'black'}]}>
        {title}
      </Text>
      <Switch
      disabled={true}
        // value={flag}
        value={false}
        thumbColor={Colors.primary}
        trackColor={{true: '#68FBF8', false: '#68FBF8'}}
        // onValueChange={val => {
        //   setFlag(val);
        // }}
      />
    </View>
  );
};

export default SwtichComp;

const styles = StyleSheet.create({});
