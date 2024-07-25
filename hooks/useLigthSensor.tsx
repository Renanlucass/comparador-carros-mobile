import { useState, useEffect } from 'react';
import { LightSensor } from 'expo-sensors';

const useLightSensor = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [lightLevel, setLightLevel] = useState<number>(0);
    const [notification, setNotification] = useState<string | null>(null);

    useEffect(() => {
        const updateInterval = 1500;
        LightSensor.setUpdateInterval(updateInterval);

        const subscription = LightSensor.addListener((data: any) => {
            const newLightLevel = data?.illuminance || 0;
            setLightLevel(newLightLevel);

            if (newLightLevel < 100 && theme !== 'dark') {
                setTheme('dark');
                setNotification('Luz baixa detectada! Tema alterado para escuro.');
            } else if (newLightLevel >= 100 && theme !== 'light') {
                setTheme('light');
                setNotification('Luz suficiente detectada! Tema alterado para claro.');
            }
        });

        return () => {
            subscription.remove();
        };
    }, [theme]);

    const closeNotification = () => {
        setNotification(null);
    };

    return { theme, lightLevel, notification, closeNotification };
};

export default useLightSensor;
