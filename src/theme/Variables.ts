/**
 * This file contains the application's variables.
 *
 * Define color, sizes, etc. here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

import { ThemeNavigationColors } from "../../@types/theme";
import * as Yup from "yup";

/**
 * Colors
 */
export const Colors = {
  transparent: "rgba(0,0,0,0)",
  inputBackground: "#FFFFFF",
  text: "#383B43",
  white: "#ffffff",
  black: "#000000",
  gradientBlue: "rgb(10, 36, 149)",
  gradientBlueWithOpacity: "#0A2495",
  gradientRed: "#81221C",
  //Typography
  textGray800: "#000000",
  textGray400: "#4D4D4D",
  textGray200: "#A1A1A1",
  textDarkBlue: "#181461",
  primary: "#1077C2",
  textColor: "#169BD7",
  success: "#28a745",
  error: "#dc3545",
  placrholderColor: "#F9FAFA",
  //ComponentColors
  lightgrey: "#F2F2F2",
  circleButtonColor: "#44427D",
  pink: "#EE466E",
  blue: "#079FDF",
  yellow: "#FDD069",
  golden: "#F3BA2F",
  navy: "#181461",
  linear1:'#00A65380',
  linear2:'#1077C280',
  colorback:'#e6f3f5',
  textinputColor:'#1077C21A'
};

export const NavigationColors: Partial<ThemeNavigationColors> = {
  primary: Colors.primary,
  background: "#FFFFFF",
  card: "#EFEFEF",
};

/**
 * FontSize
 */
export const FontSize = {
  tiny: 14,
  small: 16,
  regular: 20,
  custom: 25,
  large: 40,
};

/**
 * Metrics Sizes
 */
const tiny = 10;
const small = tiny * 2; // 20
const regular = tiny * 3; // 30
const large = regular * 2; // 60
export const MetricsSizes = {
  tiny,
  small,
  regular,
  large,
};

export default {
  Colors,
  NavigationColors,
  FontSize,
  MetricsSizes,
};

// Assuming you have a type for user
type UserType = {
  userType: string;
  userId: number;
};

const USER_TYPES = {
  Client: "Client",
  Driver: "Driver",
  Transporter: "Transporter",
};

// USERS object with explicit type
const EXTERNAL_USERS: Record<string, UserType> = {
  Client: { userType: USER_TYPES.Client, userId: 7 },
  Driver: { userType: USER_TYPES.Driver, userId: 10 },
  Transporter: { userType: USER_TYPES.Transporter, userId: 13 },
};

const INTERNAL_USERS: Record<string, UserType> = {
  Client: { userType: USER_TYPES.Client, userId: 14 },
  Driver: { userType: USER_TYPES.Driver, userId: 6 },
  Transporter: { userType: USER_TYPES.Transporter, userId: 17 },
};

export { USER_TYPES, EXTERNAL_USERS, INTERNAL_USERS };
