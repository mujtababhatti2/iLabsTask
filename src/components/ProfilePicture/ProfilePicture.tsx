import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Install and link this package to use FontAwesome icons
import { useTheme } from '../../hooks'


type PropTypes = {
    imageUrl?: string;
    onPress?: () => void;
    iconVisible?: boolean;
}



const ProfilePictureUpdate: React.FC<PropTypes> = ({ imageUrl, onPress, iconVisible }) => {
    const { Layout, Images, Gutters } = useTheme()
    return (
        <View style={[Gutters.smallMargin, Layout.selfCenter]}>
            <View style={styles.container}>
                <Image source={imageUrl ? { uri: imageUrl } : Images.customDrawer.user} style={styles.profilePicture} />
            </View>
            {iconVisible &&
                <TouchableOpacity style={styles.addButton} onPress={onPress}>
                    <Icon name="camera" size={12} color="white" />
                </TouchableOpacity>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: 100,
        height: 100,
        borderRadius: 60,
        overflow: 'hidden',
        backgroundColor: 'black',
    },
    profilePicture: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    addButton: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        borderRadius: 20,
        padding: 5,
    },
});

export default ProfilePictureUpdate;
