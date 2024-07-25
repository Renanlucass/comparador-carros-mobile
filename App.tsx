import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigators/StackNavigator';

const App: React.FC = () => {
    return (
        <NavigationContainer>
            <StackNavigator theme={'light'}/>
        </NavigationContainer>
    );
};

export default App;
