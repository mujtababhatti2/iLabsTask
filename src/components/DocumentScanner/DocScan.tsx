import { useTheme } from '../../../src/hooks';
import { generalErrorCatch } from '../../../src/services/api';
import { useUploadImageMutation } from '../../services/modules/auth';
import { showError } from '../../../src/utils/HelperFuctions';
import { useFormikContext } from 'formik';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Dimensions, Image, Linking, PermissionsAndroid, Platform, Text, TouchableOpacity, View } from 'react-native';
import DocumentScanner, { ResponseType } from 'react-native-document-scanner-plugin';
import Icon from "react-native-vector-icons/SimpleLineIcons";

interface DocScanProps {
    title: string;
    imgPath: string | null;
    fieldName:string
}
const DocScan = ({ title, imgPath , fieldName }: DocScanProps) => {

    const [scannedImage, setScannedImage] = useState(imgPath);
    const { Layout, Colors, Fonts, Gutters } = useTheme();
    const [uploadImage, { data, isLoading, isError, error }] = useUploadImageMutation();
    const { setFieldValue } = useFormikContext();

    console.log(isLoading, isError, error, data)

    const screenWidth = Dimensions.get('window').width;

    // Define the aspect ratio of the image
    const aspectRatio = 1.5; // You may adjust this according to your image aspect ratio

    // Calculate the width and height of the image based on the screen dimensions
    const imageWidth = screenWidth * 0.9; // Adjust the multiplier according to your preference
    const imageHeight = imageWidth / aspectRatio;


    const scanDocument = async () => {

        async function openAppSettings() {
            try {
                await Linking.openSettings();
            } catch (error) {
                console.log('Unable to open app settings:', error);
                Alert.alert('Error', 'Unable to open app settings. Please grant camera permissions manually.');
            }
        }

        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
            if (!granted) {
                const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
                if (result !== PermissionsAndroid.RESULTS.GRANTED) {
                    Alert.alert(
                        'Error',
                        'To use the document scanner, you need to grant camera permissions. Please follow these steps:\n\n1. Tap "Open Settings" below.\n2. In the app settings, tap "Permissions" or "App permissions".\n3. Find and tap "Camera".\n4. Toggle the switch to grant camera permissions to the app.\n\nOnce permissions are granted, you can use the document scanner.',
                        [
                            { text: 'Open Settings', onPress: openAppSettings },
                            { text: 'Cancel', style: 'cancel' },
                        ],
                        { cancelable: false }
                    );
                    return;
                }
            }
        }

        // start the document scanner
        const options = {
            // responseType: ResponseType.Base64, // Set the response type to base64
            responseType: ResponseType.ImageFilePath, // Set the response type to filepath
            maxNumDocuments: 1
        };
        const { scannedImages }: any = await DocumentScanner.scanDocument(options);
        // console.log(scannedImages)


        // get back an array with scanned image file paths
        if (scannedImages && scannedImages.length > 0) {
            // set the img src, so we can view the first scanned image
            // console.log("first,", scannedImages[0])
            setScannedImage(scannedImages[0])
            handleImageUpload(scannedImages[0])
        }


    }


    const handleImageUpload = async (scannedImage: string) => {
        try {
            const formData: any = new FormData();
            formData.append('image', {
                uri: scannedImage,
                name: 'document_scan.jpg',
                type: 'image/jpeg',
            });
            const response: any = await uploadImage(formData);
            if (response.data.statusCode === 200) {
                console.log(response,"her")
                setFieldValue(title, response.data.result)
                setFieldValue(fieldName,scannedImage)
                // console.log(response.data.result,"hahshashhah")
            }else{
                showError('Image upload Failed')
                setScannedImage(null)
            }
        } catch (error) {
            generalErrorCatch(error)
            setScannedImage(null)
        }
    };


    return (
        <View style={[Layout.fill, Layout.justifyContentCenter]}>
            <Text style={[Fonts.textSmall, Fonts.textCenter, Gutters.tinyPadding]}>{title}</Text>
            {scannedImage === null ? <TouchableOpacity
                onPress={() => scanDocument()}
                style={[
                    {
                        borderColor: Colors.text,
                        borderWidth: 1,
                        borderRadius: 10,
                        aspectRatio: 1.5,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }]}>
                <Icon name="plus" color={Colors.text} size={20} style={{ textAlign: "center", margin: 10 }} />
                <Text>Upload</Text>
            </TouchableOpacity>
                :
                <TouchableOpacity

                    onPress={() => scanDocument()}
                    style={[Layout.fill, Layout.alignItemsCenter, Layout.justifyContentCenter,
                    {
                        borderColor: Colors.text,
                        borderWidth: 1,
                        borderRadius: 10, // Adjust border radius to make it rectangular
                        aspectRatio: 1.5, // Set aspect ratio to make it rectangular
                        justifyContent: 'center', // Center content vertically
                        alignItems: 'center', // Center content horizontally
                        // marginLeft: '10%', // Add margin to separate from edges
                        // marginRight: '5%', // Add margin to separate from the next component
                    }]}>
                    <Image
                        resizeMode="contain"
                        source={{ uri: scannedImage }}
                        style={{ width: imageWidth, height: imageHeight }}
                    />
                    <View style={{ position: 'absolute' }}>
                        {isLoading && <Text>Uploading ...</Text>}
                        {isError && <Text>Uploading failed. please try again</Text>}
                    </View>
                </TouchableOpacity>

            }
        </View>

    )
}

export default DocScan;

