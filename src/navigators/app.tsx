import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View, StyleSheet, Platform, Text } from "react-native";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import {
  Coupons,
  History,
  More,
  SelectBeneficiary,
  HomeScreen,
  TransactionComplete,
  ViewReceipt,
} from "../screens/app";
import {
  createBottomTabNavigator,
  BottomTabBar as RNBottomTabBar,
} from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useTheme } from "../hooks";
import { ApplicationStackParamList } from "../../@types/navigation";

const tabBarHeight = responsiveHeight(8);
const HomeStack = createStackNavigator<ApplicationStackParamList>(); //DashBoard screen
const SearchStack = createStackNavigator<ApplicationStackParamList>(); //Search screen
const CartStack = createStackNavigator<ApplicationStackParamList>(); //cart screen
const ProfileStack = createStackNavigator<ApplicationStackParamList>(); //Profile screen
const Stack = createStackNavigator<ApplicationStackParamList>(); //
const MainTab = createBottomTabNavigator<ApplicationStackParamList>();
const DrawerStack = createDrawerNavigator<ApplicationStackParamList>();

// const ApDrawer = () => {
//   return (
//     <DrawerStack.Navigator
//       screenOptions={{
//         headerShown: false,
//         drawerPosition: "right",
//         animationEnabled: false,
//       }}
//       drawerContent={(props) => <AppDrawer {...props} />}
//       initialRouteName={"MainTabScreens"}
//     >
//       <DrawerStack.Screen name={"MainTabScreens"} component={MainTabScreens} />
//     </DrawerStack.Navigator>
//   );
// };

const HomeStackScreens = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={"Home"}
    >
      <HomeStack.Screen name={"Home"} component={HomeScreen} />
    </HomeStack.Navigator>
  );
};
const SearchStackScreens = () => {
  return (
    <SearchStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={"History"}
    >
      <SearchStack.Screen name={"History"} component={History} />
    </SearchStack.Navigator>
  );
};
const CartStackScreens = () => {
  return (
    <CartStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={"Coupons"}
    >
      <CartStack.Screen name="Coupons" component={Coupons} />
    </CartStack.Navigator>
  );
};
const ProfileStackScreens = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={"More"}
    >
      <ProfileStack.Screen name={"More"} component={More} />
    </ProfileStack.Navigator>
  );
};

const renderTabBar = (props: any) => {
  return (
    <View style={styles.bottomTabBarContainer}>
      {Platform.OS === "ios" ? (
        <>
          <View
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              height: responsiveHeight(4),
              width: responsiveWidth(50),
              position: "absolute",
              bottom: 0,
            }}
          />
          <View
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              height: responsiveHeight(4),
              width: responsiveWidth(50),
              position: "absolute",
              bottom: 0,
              right: 0,
            }}
          />
        </>
      ) : null}
      <RNBottomTabBar {...props} />
    </View>
  );
};

const MainTabScreens = () => {
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
    <MainTab.Navigator
      tabBar={renderTabBar}
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,

        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "white",
          display: "flex",
          width: responsiveWidth(100),
          alignSelf: "center",
          height:
            Platform.OS === "ios" ? responsiveHeight(9) : responsiveHeight(8),

          borderTopWidth: 0.2,
          borderTopColor: "white",
          position: "absolute",
          bottom: 0,
          paddingTop: responsiveHeight(2),
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 2,
        },
      }}
      initialRouteName={"Home"}
    >
      <MainTab.Screen
        name={"Home"}
        component={HomeStackScreens}
        options={(props) => ({
          unmountOnBlur: true,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View style={styles.tabIconContainer}>
                <Icon
                  name="home"
                  type="octicon"
                  size={23}
                  color={focused ? Colors.primary : "black"}
                />
                <Text
                  style={{
                    paddingTop: responsiveHeight(1),
                    color: focused ? Colors.primary : "black",
                    fontSize: 12,
                    textAlign: "center",
                  }}
                >
                  Home
                </Text>
              </View>
            );
          },
        })}
      />
      <MainTab.Screen
        name={"History"}
        component={SearchStackScreens}
        options={(props) => ({
          unmountOnBlur: true,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View style={styles.tabIconContainer}>
                <Icon
                  name="history"
                  type="font-awesome"
                  size={23}
                  style={{
                    transform: [
                      { rotate: "180deg" },
                      { scaleX: 1.1 },
                      { scaleY: 1.1 },
                    ],
                  }}
                  color={focused ? Colors.primary : "black"}
                />
                <Text
                  style={{
                    paddingTop: responsiveHeight(1),
                    color: focused ? Colors.primary : "black",
                    fontSize: 12,
                    textAlign: "center",
                  }}
                >
                  History
                </Text>
              </View>
            );
          },
        })}
      />

      <MainTab.Screen
        name={"Coupons"}
        component={CartStackScreens}
        options={(props) => ({
          unmountOnBlur: true,

          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View style={styles.tabIconContainer}>
                <Icon
                  name="ticket-outline"
                  type="ionicon"
                  size={23}
                  style={{
                    transform: [
                      { rotate: "-45deg" }, // rotates 90 degrees
                      { rotateY: "180deg" },
                      { scaleX: 1.2 }, // scales horizontally by 1.1
                      { scaleY: 1.2 },
                    ],
                  }}
                  color={focused ? Colors.primary : "black"}
                />
                <Text
                  style={{
                    paddingTop: responsiveHeight(1),
                    color: focused ? Colors.primary : "black",
                    fontSize: 12,
                    textAlign: "center",
                  }}
                >
                  Coupon
                </Text>
              </View>
            );
          },
        })}
      />

      <MainTab.Screen
        name={"More"}
        component={ProfileStackScreens}
        options={(props) => ({
          unmountOnBlur: true,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View style={styles.tabIconContainer}>
                <Icon
                  name="dots-three-horizontal"
                  type="entypo"
                  size={23}
                  color={focused ? Colors.primary : "black"}
                />
                <Text
                  style={{
                    paddingTop: responsiveHeight(1),
                    color: focused ? Colors.primary : "black",
                    fontSize: 12,
                    textAlign: "center",
                  }}
                >
                  More
                </Text>
              </View>
            );
          },
        })}
      />
    </MainTab.Navigator>
  );
};
const App = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="MainTabScreens"
    >
      <Stack.Screen name={"MainTabScreens"} component={MainTabScreens} />
      <Stack.Screen name={"SelectBeneficiary"} component={SelectBeneficiary} />
      <Stack.Screen name={"TransactionComplete"} component={TransactionComplete} />
      <Stack.Screen name={"ViewReceipt"} component={ViewReceipt} />
    </Stack.Navigator>
  );
};
export default App;

const styles = StyleSheet.create({
  bottomTabBarContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabIconContainer: {
    width: responsiveWidth(25),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    height:
      Platform.OS == "android" ? responsiveHeight(8) : responsiveHeight(9),
  },
});
