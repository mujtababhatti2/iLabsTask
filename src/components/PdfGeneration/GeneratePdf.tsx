import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Signature from 'react-native-signature-canvas';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import Pdf from 'react-native-pdf';

const PodLogisticsBillScreen: React.FC = () => {

    const handleSignature = async (signatureImage: string) => {
        try {
            // Generate PDF with signature
            const htmlContent = `
            <div style="text-align: center;"><h1>Pod Logistics Bill</h1></div>
            <div style="text-align: right;">Signature:</div>
            <div style="text-align: center;"><img src="${signatureImage}" width="200" height="100" /></div>
          `;
            const options = {
                html: htmlContent,
                fileName: 'pod_logistics_bill',
                directory: 'Documents',
            };

            const file = await RNHTMLtoPDF.convert(options);


            // File path of the generated PDF
            const pdfFilePath = file.filePath;
            // Handle the PDF file as needed (e.g., share and save locally)
            Alert.alert('PDF Generated', `PDF saved at: ${pdfFilePath}`);
            // Set the PDF URI for display
            //   setPdfUri(`file://${pdfFilePath}`);
        } catch (error) {
            console.log('Error generating PDF:', error);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Signature
                onOK={handleSignature}
                descriptionText="Sign here"
                clearText="Clear"
                confirmText="Save"
                webStyle={style}
            />
        </View>
    );
};

const style = `
  .m-signature-pad {
    border: 1px solid #000;
  }
`;

export default PodLogisticsBillScreen;
