import React, { useRef, useEffect } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import Truck from '../../theme/assets/svg/Truck';

const Loader: React.FC = () => {
    const slideValue = useRef(new Animated.Value(-100)).current;
    const smokeOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.parallel([
                Animated.timing(slideValue, {
                    toValue: 400, // Adjust the 'toValue' based on your container width
                    duration: 2000, // Adjust the duration as needed
                    useNativeDriver: true,
                }),
                
            ])
        ).start();
    }, [slideValue, smokeOpacity]);

    return (
        <View style={styles.container}>
            <Animated.View style={{ transform: [{ translateX: slideValue }] }}>
                <Truck />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // width:"50%",
        justifyContent: 'center',
        alignItems: 'flex-start', // Align the truck to the left
        overflow: 'hidden',
        backgroundColor:'rgba(0, 0, 0, 0.5)'
    },
  
});

export default Loader;