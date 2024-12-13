import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "../../../hooks";
import { Button, Header } from "../../../components";
import { Icon } from "react-native-elements";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

const TransactionComplete = ({ navigation, route }: any) => {
  const { data } = route.params;
  console.log("data", data);
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
        Layout.fill,
        iosSafeAreaTPadding,
        {
          backgroundColor: Colors.colorback,
        },
      ]}
    >
      <Header
        title="Transaction Complete"
        goBack
        hideNotificationsicon={true}
        navigation={navigation}
      />
      <View style={[Gutters.largeTMargin,Gutters.smallMargin]}>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/128/190/190411.png",
          }}
          style={{
            width: 180,
            height: 180,
            alignSelf: "center",
            marginTop: responsiveHeight(5)
          }}
        />
        <Text style={[
            Fonts.textRegular,
            Gutters.smallTMargin,
            {
                textAlign: "center",
                fontWeight: "bold",
            }
        ]}>Thank you!</Text>
        <Text style={[
            Fonts.textSmall,
            Gutters.tinyTMargin,
            {
                color:'#4E5054',
                textAlign: "center",

            }
        ]}>Wasn't that easy?</Text>

        <View style={[
            Layout.row,
            Layout.alignItemsCenter,
            Gutters.smallTMargin,
            Gutters.tinyPadding,
            Layout.justifyContentCenter,
            {
                borderWidth:1,
                borderColor:Colors.linear2,
                borderRadius:responsiveWidth(2),
                backgroundColor:'#169BD721',
            }
        ]}>
            <Icon
            name="alert-triangle"
            type="feather"
            size={responsiveFontSize(2.5)}
            color={Colors.linear2}
            />
            <Text  style={[
                Fonts.textSmall,
                {
                    color: Colors.linear2,
                    marginLeft:responsiveWidth(4),
                    fontWeight:'normal'
                }
            ]}>Reference number:  <Text style={{fontWeight:"bold"}}>{data?.referenceNumber}</Text></Text>
        </View>
            <Text style={[
                Fonts.textTiny,
                Gutters.largeTMargin,{
                    textAlign: "center",
                    color:"#828489"
                }
            ]}>Let’s head back to <Text style={{
                color:Colors.linear2,
                fontWeight:'bold'
            }}>dashboard</Text></Text>

            <Button
            title={'Send another'}
            style={[
                Gutters.smallTMargin,
                {

                }
            ]}
            onPress={()=>{
                navigation.pop(2)
            }}
            />
            <Text 
            onPress={()=>{
                navigation.navigate("ViewReceipt",{
                    data:data
                })
            }}
            style={[
                Fonts.textTiny,
                Gutters.regularTMargin,{
                    textAlign: "center",
                    color:"#828489"
                }
            ]}>View receipt</Text>
      </View>
    </View>
  );
};

export default TransactionComplete;

const styles = StyleSheet.create({});
