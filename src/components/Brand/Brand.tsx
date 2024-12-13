import React from 'react';
import { View, Image, DimensionValue } from 'react-native';
import { useTheme } from '../../hooks';

type Props = {
  height?: DimensionValue;
  width?: DimensionValue;
  mode?: 'contain' | 'cover' | 'stretch' | 'repeat' | 'center';
};

export default function Brand({ height, width, mode }: Props) {
  const { Layout, Images } = useTheme();

  return (
    <View testID={'brand-img-wrapper'} style={[Layout.selfCenter, { height, width }]}>
      <Image
        testID={'brand-img'}
        style={Layout.fullSize}
        source={Images.logo}
        resizeMode={mode}
      />
    </View>
  );
};
export function BrandForHome({ height, width, mode }: Props) {
  const { Layout, Images,Gutters } = useTheme();

  return (
    <View testID={'brand-img-wrapper'} style={[Layout.selfCenter , { height, width }]}>
      <Image
        testID={'brand-img'}
        style={Layout.fullSize}
        source={Images.utradeLogo}
        resizeMode={mode}
      />
    </View>
  );
};

Brand.defaultProps = {
  height: 200,
  width: 200,
  mode: 'contain',
};

BrandForHome.defaultProps = {
  height: 150,
  width: 150,
  mode: 'contain',
};


