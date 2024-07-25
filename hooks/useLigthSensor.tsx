import { useState, useEffect, useRef } from 'react';
import { LightSensor } from 'expo-sensors';
import { Animated } from 'react-native';

const useLightSensor = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [lightLevel, setLightLevel] = useState<number>(0);
    const animation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const updateInterval = 2000; 
        LightSensor.setUpdateInterval(updateInterval);

        const subscription = LightSensor.addListener((data: any) => {
            const newLightLevel = data?.illuminance || 0;
            setLightLevel(newLightLevel);

            if (newLightLevel < 100) {
                setTheme('dark');
                Animated.timing(animation, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: false,
                }).start();
            } else {
                setTheme('light');
                Animated.timing(animation, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: false
                }).start();
            }
        });

        return () => {
            subscription.remove();
        };
    }, [animation]);

    return { theme, lightLevel, animation };
};

export default useLightSensor;
