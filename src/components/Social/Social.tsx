import React from 'react';
import { DimensionValue, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '../../hooks';

type Props = {
    height?: DimensionValue;
    width?: DimensionValue;
    mode?: 'contain' | 'cover' | 'stretch' | 'repeat' | 'center';
    source: object
};

const Social = ({ height, width, mode,source }: Props) => {
    const { Layout , Gutters } = useTheme();

    return (
        <TouchableOpacity style={[Layout.colCenter, Gutters.smallHPadding,{height,width}]}>
            <Image
                style={Layout.fullSize}
                source={source}
                resizeMode={mode}
            />
        </TouchableOpacity>
    );
};

Social.defaultProps = {
    height: 80,
    width: 80,
    mode: 'contain',
};

export default Social;
