import { Button } from '../../components';
import { useTheme } from '../../hooks';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SecondaryBrand } from '../Brand/Brand';

const Thanks = ({ navigation }: any) => {
  const { Layout, Colors, Gutters, Fonts } = useTheme();

  return (
    <>
      <ScrollView style={[Layout.fill, Gutters.smallPadding]} contentContainerStyle={[Gutters.regularBPadding]} showsVerticalScrollIndicator={false}>
        <View style={[Gutters.smallMargin]}>
          <SecondaryBrand />
        </View>
        <Text style={[Fonts.titleSmall, Fonts.textCenter, Gutters.smallMargin, { color: Colors.textGray200 }]}>Thank you {'\n'}for your service! </Text>
        <Text style={[Fonts.textSmall, Fonts.textCenter, { color: Colors.textGray200 }]}>We are glad to have you {'\n'}on board!</Text>
        <Button title='Track Requests >>>' style={[Gutters.largeTMargin, { backgroundColor: Colors.yellow }]} onPress={() => navigation.navigate('myRequests')} />
        <Button title='Continue >>>' onPress={() => navigation.navigate('Home')}/>
      </ScrollView>

    </>
  )
}

export default Thanks