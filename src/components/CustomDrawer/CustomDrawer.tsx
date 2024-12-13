import {
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';
import {
    Dimensions,
    Image,
    ImageBackground,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../../src/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { AuthState, Logout } from '../../store/auth';
import { useLogoutMutation } from '../../services/modules/auth';
import { showCustomAlert, showError } from '../../utils/HelperFuctions';
import LoadingModal from '../Loader/LoadingModal';
import NavigationService from '../../navigators/NavigationService';
import { generalErrorCatch } from '../../services/api';



const CustomDrawer = (props: any) => {
    const { Images, Colors, NavigationColors,Fonts } = useTheme();
    const [logout, { isLoading }] = useLogoutMutation();

    const dispatch = useDispatch();
    const width = Dimensions.get("window").width
    const isLargeScreen = width > 375

    const { user, userType } = useSelector(
        (state: { auth: AuthState }) => state.auth,
    );
    const styles: any = {
        container: {
            flex: 1,
            backgroundColor: NavigationColors.background,
        },
        imageBackground: {
            flex: 1,
            justifyContent: 'center', // Center vertically
        },
        upperSection: {
            paddingHorizontal: 20,
        },
        middleContainer: { flex: isLargeScreen ? 3 : 2 },
        userImage: {
            height: 80,
            width: 80,
            borderRadius: 40,
        },
        userInfo: {
            padding: 5,
            paddingHorizontal: 10,
            width:'80%'
        },
        userName: {
            color: Colors.white,
            fontSize: 16,
            fontFamily: 'Poppins-SemiBold',
        },
        userLocation: {
            color: Colors.white,
            fontSize: 14,
            fontFamily: 'Poppins-Regular',
        },
        userRole: {
            color: Colors.white,
            fontSize: 14,
            fontFamily: 'Poppins-SemiBold',
        },
        middleSection: {
            backgroundColor: NavigationColors.background,
        },
        bottomSection: {
            padding: 20,
            borderTopWidth: 1,
            borderTopColor: '#ccc',
            backgroundColor: NavigationColors.background,
        },
        drawerItem: {
            paddingVertical: 15,
            flexDirection: 'row',
            alignItems: 'center',
        },
        drawerIcon: {
            marginRight: 15,
        },
        drawerText: {
            fontFamily: 'Poppins-Medium',
            color: Colors.text,
        },
    };

    const handleLogout = () => {
        showCustomAlert('Logout', 'Are you sure you want to logout ?',
            () => {
                logout().unwrap().then((data) => {
                    if (data.statusCode === 200) {
                        dispatch(Logout())
                        NavigationService.reset('Auth')
                    } else {
                        showError(data.messages[0]);
                    }
                })
                    .catch((e) => {
                        generalErrorCatch(e)
                    })
            },
            () => null
        )
    }

    return (<>
        <View style={styles.container}>
            {/* Upper Section */}
            <ImageBackground source={Images.customDrawer.header} style={styles.imageBackground}>
                <View style={styles.upperSection}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={Images.customDrawer.user} style={styles.userImage} />
                        <View style={styles.userInfo}>
                            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.userName}>
                                {user?.userName}
                            </Text>
                            <Text style={{marginTop:-10,color:'white'}}>________________</Text>
                            <Text style={styles.userRole}>{userType}</Text>
                        </View>
                    </View>
                </View>
            </ImageBackground>

            <View style={[styles.middleContainer,{
            }]}>
                {/* Middle Section */}
                <DrawerContentScrollView {...props} showsVerticalScrollIndicator={false}>
                    <View style={styles.middleSection}>
                        <DrawerItemList {...props} />
                    </View>
                </DrawerContentScrollView>

                {/* Bottom Section */}
                <View style={[styles.bottomSection,{ 
                    marginTop: 10
                }]}>
                    <TouchableOpacity onPress={() => { }} style={styles.drawerItem}>
                        <Ionicons name="share-social-outline" size={22} color={Colors.text} style={styles.drawerIcon} />
                        <Text style={styles.drawerText}>Tell a Friend</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleLogout()} style={styles.drawerItem}>
                        <Ionicons name="exit-outline" size={22} color={Colors.text} style={styles.drawerIcon} />
                        <Text style={styles.drawerText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        <LoadingModal visible={isLoading} />

    </>
    );
};

export default CustomDrawer;
