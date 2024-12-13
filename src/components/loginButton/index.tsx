import {
  Modal,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useState } from "react";
import Button from "../Button/Button";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useTheme } from "../../hooks";

const LoginButton = ({ firstPress, modalVisible, setModalVisible }: any) => {
  const { Layout, Fonts, Images, Colors } = useTheme();

  const LoginButtoninside = ({ title, image, onPress }: any) => {
    return (
      <TouchableOpacity style={styles.loginButton} onPress={onPress}>
        <Image
          source={image}
          style={{
            width: responsiveWidth(8),
            height: responsiveHeight(8),
            resizeMode: "contain",
          }}
        />
        <Text
          style={[
            styles.buttonText,
            {
              color: Colors.primary,
            },
          ]}
        >
          {title}
        </Text>
        <Icon
          name="arrow-right"
          size={20}
          color={Colors.primary}
          style={styles.arrowIcon}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <Button
        title="Get Started"
        onPress={() => {
          setModalVisible(!modalVisible);
        }}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableOpacity
          onPress={() => setModalVisible(!modalVisible)}
          activeOpacity={1}
          style={styles.centeredView}
        >
          <TouchableOpacity activeOpacity={1} style={styles.modalView}>
            <LoginButtoninside
              image={Images.admisitrator}
              title={"Login as Election Commission"}
              onPress={firstPress}
            />
            <View style={styles.separator} />
            <LoginButtoninside
              image={Images.vote}
              title={"Login as Polling Staff"}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default LoginButton;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: responsiveWidth(6),
    borderTopRightRadius: responsiveWidth(6),
    padding: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    // shadowOpacity: 0.25,
    position: "absolute",
    bottom: Platform.OS == "ios" ? responsiveHeight(10) : responsiveHeight(11),
    shadowRadius: 4,
    width: "85%",
    // elevation: 5
  },
  // modalContainer: {
  //   width: "90%",
  //   backgroundColor: "#fff",
  //   borderRadius: 10,
  //   padding: 20,
  //   alignItems: "center",
  //   shadowColor: "#000",
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.3,
  //   shadowRadius: 5,
  //   elevation: 5,
  // },
  loginButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    width: "100%",
  },
  icon: {
    marginRight: 10,
  },
  buttonText: {
    flex: 1,
    // color: "#333",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: responsiveWidth(3),
  },
  arrowIcon: {
    marginLeft: 10,
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#ddd",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#333",
    fontSize: 16,
  },
  separator: {
    height: 0.5,
    backgroundColor: "#000",
    width: "100%",
  },
  modalContainer: {
    backgroundColor: "red",
    width: responsiveWidth(86),
    height: responsiveHeight(16),
    // position: "absolute",
    bottom: responsiveHeight(11),
    borderTopRightRadius: responsiveWidth(5),
    borderTopLeftRadius: responsiveWidth(5),
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  modalContainermain: {
    backgroundColor: "red",
    alignSelf: "center",
  },
});
