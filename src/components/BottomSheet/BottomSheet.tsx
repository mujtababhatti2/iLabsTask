import React, {
  useCallback,
  useRef,
  useMemo,
  useEffect,
  useState,
} from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { useTheme } from '../../hooks';
import { responsiveWidth } from 'react-native-responsive-dimensions';

const CustomBottomSheet: React.FC = (props: any) => {
  const { item }:any = props;
  // hooks
  const sheetRef = useRef<any>(null);
  const { Colors, Gutters, Layout, Fonts } = useTheme();
  const [point, setpoint] = useState<number>();

  // variables
  const data = useMemo<string[]>(
    () =>
      Array(50)
        .fill(0)
        .map((_, index) => `index-${index}`),
    [],
  );

  const snapPoints = useMemo(() => ['3%', '22%', '90%'], []);

  // callbacks
  const handleSheetChange = useCallback((index: number) => {
    setpoint(index);
    console.log('handleSheetChange', index);
  }, []);
  const handleSnapPress = useCallback((index: number) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  // render
  const renderItem = useCallback(
    (item: string) => (
      <View key={item} style={styles.itemContainer}>
        <Text>{item}</Text>
      </View>
    ),
    [],
  );

  return (
    <BottomSheet
      ref={sheetRef}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChange}
      handleStyle={{
        zIndex: props.zindex,
        backgroundColor: Colors.gradientRed,
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
      }}
      handleIndicatorStyle={{ backgroundColor: Colors.white }}
      // enablePanDownToClose
    >
      {(point == 1 || point == 0) && (
        <BottomSheetView>
          <View style={[Gutters.smallPadding]}>
            {/* <Text>Departure on</Text>
            <Text>08 min</Text> */}
          </View>
          <View
            style={[
              Gutters.smallPadding,
              Layout.row,
              Layout.justifyContentBetween,
              Layout.alignItemsCenter,
            ]}
          >
            <View  style={[Layout.alignItemsStart,{width: responsiveWidth(25)}]}>
              <Text style={[Fonts.textBold]}>Location</Text>
              <Text>{item.pickup_City}, {item.pickup_State}, {item.pickup_Country} </Text>
            </View>
            <Text>
              ..........................................
            </Text>
            <View  style={[Layout.alignItemsCenter,{width: responsiveWidth(25)}]}>
              <Text style={[Fonts.textBold]}>Destination</Text>
              <Text>{item.dropoff_City}, {item.dropoff_State}, {item.dropoff_Country}</Text>
            </View>
          </View>
        </BottomSheetView>
      )}
      <BottomSheetScrollView
        contentContainerStyle={[{}, styles.contentContainer]}
      >
        {data.map(renderItem)}
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 200,
    backgroundColor: 'transparent',
  },
  contentContainer: {
    backgroundColor: 'grey',
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: '#eee',
  },
});

export default CustomBottomSheet;
