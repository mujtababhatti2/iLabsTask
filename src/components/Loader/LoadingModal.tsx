import { useTheme } from '../../hooks';
import React from 'react';
import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

interface LoadingModalProps {
  visible: boolean;
}

const LoadingModal: React.FC<LoadingModalProps> = ({ visible }) => {
  const { Colors, iosSafeAreaPadding } = useTheme(); // Customize according to your theme
  return (
    <View style={[iosSafeAreaPadding]}>
      <Modal visible={visible} transparent={true} animationType="fade">
        <View style={styles.modalBackground}>
          {/* <View style={styles.activityIndicatorWrapper}> */}
          {/* <ActivityIndicator size="large" color={Colors.gradientRed} /> */}

          <LottieView
            source={require('../../theme/assets/loader.json')}
            style={{ width: 200, height: 200 }}
            resizeMode="contain"
            autoPlay
            loop
          />
        </View>
        {/* </View> */}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent black background
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityIndicatorWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background for activity indicator container
    padding: 0,
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default LoadingModal;
