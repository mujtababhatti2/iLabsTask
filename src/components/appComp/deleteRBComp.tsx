import React, { forwardRef } from 'react';
import { View, StyleSheet } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { responsiveWidth } from 'react-native-responsive-dimensions';

// Define RbsheetComp and use React.forwardRef to handle the ref
const DeleteRbsheetComp = forwardRef(({ comp }:any, ref) => {
  return (
    <RBSheet
      ref={ref}
      height={600} // Adjust the height as needed
      openDuration={300}
      closeOnPressMask={true}
      closeOnDragDown={true}
      closeDuration={300}
      customStyles={{
        wrapper: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Light black background
        },
        container: styles.modalContainer,
        draggableIcon: {
          backgroundColor: '#fff',
        },
      }}
    >
      <View style={styles.handleBar} />
      <View style={styles.container}>{comp}</View>
    </RBSheet>
  );
});

const styles = StyleSheet.create({
    modalContainer: {
      backgroundColor: 'transparent',
    },
    handleBar: {
      width: 60,
      height: 5,
      backgroundColor: '#fff',
      borderRadius: 10,
      alignSelf: 'center',
      marginBottom: 16,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 16,
      textAlign: 'center',
    },
    container: {
      flex: 1,
      backgroundColor: 'white',
      borderTopRightRadius: responsiveWidth(8),
      borderTopLeftRadius: responsiveWidth(8),
    },
  });

export default DeleteRbsheetComp;



