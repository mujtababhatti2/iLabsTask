import { useTheme } from '../../hooks';
import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { useGetDriversMutation } from '../../services/modules/driver';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { showCustomAlert } from '../../utils/HelperFuctions';
import LoadingModal from '../Loader/LoadingModal';
import { useNavigation } from '@react-navigation/native';
import { on } from 'stream';

interface DriverAssignmentProps {
  visible: boolean;
  onClose: () => void;
  navigation: any;
}

const DriverAssignment: React.FC<DriverAssignmentProps> = ({
  visible,
  onClose,
  navigation,
}) => {
  const { Layout, Colors, iosSafeAreaPadding, Gutters, Fonts } = useTheme(); // Customize according to your theme
  const [getDrivers, { data, isLoading, isError, error }] =
    useGetDriversMutation();

  useEffect(() => {
    getDrivers({
      pageNumber: 1,
      pageSize: 5,
    });
   
  }, []);

  const list = [
    {
      gender: null,
      genderIdFk: null,
      userId: 3871,
      userName: 'sharjeelwaheed125@gmail.com',
      email: 'sharjeelwaheed125@gmail.com',
      fullName: null,
      lastName: null,
      businessName: 'Bxxhx',
      country: 'Australia',
      city: 'Brisbane City',
      state: null,
      phoneNumber: '09321255778',
      webAddress: null,
      status: true,
      createdAt: null,
      address: '123 Eagle Street',
      address2: null,
      salary: 0,
      logoPath: null,
      phone2: null,
      postalCode: '',
      latitude: 0,
      longitude: 0,
      deviceId: null,
      fcm: null,
      parent: '3853',
      licensePic: null,
      isActive: true,
    },
    {
      gender: null,
      genderIdFk: null,
      userId: 3871,
      userName: 'sharjeelwaheed125@gmail.com',
      email: 'sharjeelwaheed125@gmail.com',
      fullName: null,
      lastName: null,
      businessName: 'Bxxhx',
      country: 'Australia',
      city: 'Brisbane City',
      state: null,
      phoneNumber: '09321255778',
      webAddress: null,
      status: true,
      createdAt: null,
      address: '123 Eagle Street',
      address2: null,
      salary: 0,
      logoPath: null,
      phone2: null,
      postalCode: '',
      latitude: 0,
      longitude: 0,
      deviceId: null,
      fcm: null,
      parent: '3853',
      licensePic: null,
      isActive: true,
    },
    {
      gender: null,
      genderIdFk: null,
      userId: 3871,
      userName: 'sharjeelwaheed125@gmail.com',
      email: 'sharjeelwaheed125@gmail.com',
      fullName: null,
      lastName: null,
      businessName: 'Bxxhx',
      country: 'Australia',
      city: 'Brisbane City',
      state: null,
      phoneNumber: '09321255778',
      webAddress: null,
      status: true,
      createdAt: null,
      address: '123 Eagle Street',
      address2: null,
      salary: 0,
      logoPath: null,
      phone2: null,
      postalCode: '',
      latitude: 0,
      longitude: 0,
      deviceId: null,
      fcm: null,
      parent: '3853',
      licensePic: null,
      isActive: true,
    },
    {
      gender: null,
      genderIdFk: null,
      userId: 3871,
      userName: 'sharjeelwaheed125@gmail.com',
      email: 'sharjeelwaheed125@gmail.com',
      fullName: null,
      lastName: null,
      businessName: 'Bxxhx',
      country: 'Australia',
      city: 'Brisbane City',
      state: null,
      phoneNumber: '09321255778',
      webAddress: null,
      status: true,
      createdAt: null,
      address: '123 Eagle Street',
      address2: null,
      salary: 0,
      logoPath: null,
      phone2: null,
      postalCode: '',
      latitude: 0,
      longitude: 0,
      deviceId: null,
      fcm: null,
      parent: '3853',
      licensePic: null,
      isActive: true,
    },
    {
      gender: null,
      genderIdFk: null,
      userId: 3871,
      userName: 'sharjeelwaheed125@gmail.com',
      email: 'sharjeelwaheed125@gmail.com',
      fullName: null,
      lastName: null,
      businessName: 'Bxxhx',
      country: 'Australia',
      city: 'Brisbane City',
      state: null,
      phoneNumber: '09321255778',
      webAddress: null,
      status: true,
      createdAt: null,
      address: '123 Eagle Street',
      address2: null,
      salary: 0,
      logoPath: null,
      phone2: null,
      postalCode: '',
      latitude: 0,
      longitude: 0,
      deviceId: null,
      fcm: null,
      parent: '3853',
      licensePic: null,
      isActive: true,
    },
    {
      gender: null,
      genderIdFk: null,
      userId: 3871,
      userName: 'sharjeelwaheed125@gmail.com',
      email: 'sharjeelwaheed125@gmail.com',
      fullName: null,
      lastName: null,
      businessName: 'Bxxhx',
      country: 'Australia',
      city: 'Brisbane City',
      state: null,
      phoneNumber: '09321255778',
      webAddress: null,
      status: true,
      createdAt: null,
      address: '123 Eagle Street',
      address2: null,
      salary: 0,
      logoPath: null,
      phone2: null,
      postalCode: '',
      latitude: 0,
      longitude: 0,
      deviceId: null,
      fcm: null,
      parent: '3853',
      licensePic: null,
      isActive: true,
    },
    {
      gender: null,
      genderIdFk: null,
      userId: 3871,
      userName: 'sharjeelwaheed125@gmail.com',
      email: 'sharjeelwaheed125@gmail.com',
      fullName: null,
      lastName: null,
      businessName: 'Bxxhx',
      country: 'Australia',
      city: 'Brisbane City',
      state: null,
      phoneNumber: '09321255778',
      webAddress: null,
      status: true,
      createdAt: null,
      address: '123 Eagle Street',
      address2: null,
      salary: 0,
      logoPath: null,
      phone2: null,
      postalCode: '',
      latitude: 0,
      longitude: 0,
      deviceId: null,
      fcm: null,
      parent: '3853',
      licensePic: null,
      isActive: true,
    },
    {
      gender: null,
      genderIdFk: null,
      userId: 3871,
      userName: 'sharjeelwaheed125@gmail.com',
      email: 'sharjeelwaheed125@gmail.com',
      fullName: null,
      lastName: null,
      businessName: 'Bxxhx',
      country: 'Australia',
      city: 'Brisbane City',
      state: null,
      phoneNumber: '09321255778',
      webAddress: null,
      status: true,
      createdAt: null,
      address: '123 Eagle Street',
      address2: null,
      salary: 0,
      logoPath: null,
      phone2: null,
      postalCode: '',
      latitude: 0,
      longitude: 0,
      deviceId: null,
      fcm: null,
      parent: '3853',
      licensePic: null,
      isActive: true,
    },
    {
      gender: null,
      genderIdFk: null,
      userId: 3871,
      userName: 'sharjeelwaheed125@gmail.com',
      email: 'sharjeelwaheed125@gmail.com',
      fullName: null,
      lastName: null,
      businessName: 'Bxxhx',
      country: 'Australia',
      city: 'Brisbane City',
      state: null,
      phoneNumber: '09321255778',
      webAddress: null,
      status: true,
      createdAt: null,
      address: '123 Eagle Street',
      address2: null,
      salary: 0,
      logoPath: null,
      phone2: null,
      postalCode: '',
      latitude: 0,
      longitude: 0,
      deviceId: null,
      fcm: null,
      parent: '3853',
      licensePic: null,
      isActive: true,
    },
    {
      gender: null,
      genderIdFk: null,
      userId: 3871,
      userName: 'sharjeelwaheed125@gmail.com',
      email: 'sharjeelwaheed125@gmail.com',
      fullName: null,
      lastName: null,
      businessName: 'Bxxhx',
      country: 'Australia',
      city: 'Brisbane City',
      state: null,
      phoneNumber: '09321255778',
      webAddress: null,
      status: true,
      createdAt: null,
      address: '123 Eagle Street',
      address2: null,
      salary: 0,
      logoPath: null,
      phone2: null,
      postalCode: '',
      latitude: 0,
      longitude: 0,
      deviceId: null,
      fcm: null,
      parent: '3853',
      licensePic: null,
      isActive: true,
    },
  ];

  const renderListItem = ({ item }: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          onClose();
          navigation.navigate('containerList', item);
        }}
        style={[
          Gutters.smallPadding,
          Gutters.tinyMargin,
          Layout.row,
          Layout.justifyContentBetween,
          {
            backgroundColor: Colors.inputBackground,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            borderRadius: 8,
          },
        ]}
      >
        <Text style={{ color: Colors.text }}>{item.userName}</Text>
        {/* <View style={[Layout.row]}>

                    <TouchableOpacity onPress={() => navigation.navigate('AddDriver', item)} style={[Gutters.smallHMargin]}>
                        <FontAwesome5 name="pen" size={18} color={Colors.text} style={{}} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        showCustomAlert('Delete Driver', 'Are you sure to delete ?', () => null)
                    }}>
                        <FontAwesome5 name="trash" size={18} color={Colors.text} style={{}} />
                    </TouchableOpacity>
                </View> */}
      </TouchableOpacity>
    );
  };
  return (
    <View style={[iosSafeAreaPadding, Layout.fill]}>
      <Modal
        visible={visible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => onClose()}
      >
        <TouchableOpacity
          style={{
            alignItems: 'center',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.4)',
            flex: 1,
          }}
          activeOpacity={1}
          onPress={() => onClose()}
        >
          <TouchableOpacity
            activeOpacity={1}
            disabled={true}
            style={[
              styles.modalBackground,
              {
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}
          >
            <View
              style={[
                styles.modalBackground,
                {
                  backgroundColor: 'rgba(1, 1, 1, 0.8)',
                },
              ]}
            >
              <Text
                style={[
                  Fonts.titleSmall,
                  Gutters.tinyPadding,
                  {
                    color: 'white',
                  },
                ]}
              >
                Drivers
              </Text>
              <FlatList
                data={data?.result.driverList}
                // data={list}
                showsVerticalScrollIndicator={false}
                renderItem={renderListItem}
                contentContainerStyle={[Gutters.tinyVPadding]}
                // keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={() => (
                  <Text
                    style={[
                      Fonts.textCenter,
                      Gutters.smallTMargin,
                      Fonts.textSmall,
                    ,{color: Colors.white}]}
                  >
                    No Drivers. Please add a driver
                  </Text>
                )}
              />
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
      <LoadingModal visible={isLoading} />
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    width: '94%',
    height: '90%',
    borderRadius: 20,
    // Semi-transparent black background
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DriverAssignment;
