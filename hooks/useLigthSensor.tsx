import { useState, useEffect, useRef } from 'react';
import { LightSensor } from 'expo-sensors';
import { Animated } from 'react-native';

const useLightSensor = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [lastTheme, setLastTheme] = useState<'light' | 'dark'>('light');
    const [lightLevel, setLightLevel] = useState<number>(0);
    const [notification, setNotification] = useState<string | null>(null);
    const animation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const updateInterval = 2000;
        LightSensor.setUpdateInterval(updateInterval);

        const subscription = LightSensor.addListener((data: any) => {
            const newLightLevel = data?.illuminance || 0;
            setLightLevel(newLightLevel);

            if (newLightLevel < 100 && lastTheme !== 'dark') {
                setTheme('dark');
                setLastTheme('dark');
                setNotification('Luz baixa detectada! Tema alterado para escuro.');
                Animated.timing(animation, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: false,
                }).start();
            } else if (newLightLevel >= 100 && lastTheme !== 'light') {
                setTheme('light');
                setLastTheme('light');
                setNotification('Luz suficiente detectada! Tema alterado para claro.');
                Animated.timing(animation, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: false,
                }).start();
            }
        });

        return () => {
            subscription.remove();
        };
    }, [animation, lastTheme]);

    const closeNotification = () => {
        setNotification(null);
    };

    return { theme, lightLevel, animation, notification, closeNotification };
};

export default useLightSensor;
