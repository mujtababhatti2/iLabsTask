import {useDrawerStatus} from '@react-navigation/drawer';
import {useTheme} from '../../hooks';
import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  useColorScheme,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Icon} from 'react-native-elements';

interface HeaderProps {
  title?: string;
  navigation: any;
  style?: object;
  goBack?: boolean;
  hideNotificationsicon?: boolean;
  customIcon?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({
  title,
  navigation,
  style,
  goBack,
  hideNotificationsicon,
  customIcon,
}) => {
  const {Colors, NavigationColors} = useTheme();

  return (
    <View style={[styles.container, style]}>
      <View style={styles.leftIcons}>
        {goBack ? (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              type="antdesign"
              name="arrowleft"
              size={25}
              color={Colors.black}
              style={styles.icon}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Ionicons
              name="menu"
              size={30}
              color={Colors.black}
              style={styles.icon}
            />
          </TouchableOpacity>
        )}
      </View>

      {title && (
        <View style={styles.titleContainer}>
          <Text style={[styles.title, {color: Colors.black}]}>{title}</Text>
        </View>
      )}

      {hideNotificationsicon || customIcon ? (
        <View style={{marginHorizontal: 20}} />
      ) : (
        <TouchableOpacity
          activeOpacity={1}
          style={styles.rightIcons}
          onPress={() => navigation.navigate('Notifications')}>
          <Ionicons
            name="notifications"
            size={24}
            color={Colors.black}
            style={styles.icon}
          />
        </TouchableOpacity>
      )}
      {customIcon}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: 'transsparent',
  },
  leftIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 8,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
    fontWeight:'700'
  },
  notificationBadge: {
    backgroundColor: '#F3BA2F',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: Platform.OS === 'android' ? 0 : 2,
    position: 'absolute',
    top: -3,
    right: 5,
  },
  notificationText: {
    color: 'black',
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
  },
});

export default Header;
