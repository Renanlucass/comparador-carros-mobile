import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigators/StackNavigator';
import useLightSensor from './hooks/useLigthSensor';
import Notification from './components/Notification';

const App: React.FC = () => {
    const { theme, notification, closeNotification } = useLightSensor();

    return (
        <NavigationContainer>
            <View style={styles.container}>
                <StackNavigator theme={theme} />
                {notification && <Notification message={notification} onClose={closeNotification} />}
            </View>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default App;
