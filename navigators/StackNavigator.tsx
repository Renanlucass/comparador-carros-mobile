import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import AddCar from '../screens/AddCar';

const Stack = createNativeStackNavigator();

const StackNavigator: React.FC<{ theme: 'light' | 'dark' }> = ({ theme }) => {
    const headerStyle = {
        backgroundColor: theme === 'dark' ? '#333333' : '#003366',
    };

    const headerTintColor = theme === 'dark' ? '#ffffff' : '#ffffff';

    return (
        <Stack.Navigator screenOptions={{headerStyle, headerTintColor,headerTitleStyle: {color: headerTintColor}}}>

            <Stack.Screen name="Home" component={Home} options={{title: 'Comparador de Carros'}}/>
            <Stack.Screen name="AddCar" component={AddCar} options={{title: 'Cadastrar Novo Carro'}}/>

        </Stack.Navigator>
    );
};

export default StackNavigator;
