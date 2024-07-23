// Navigators/StackNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import AddCar from '../screens/AddCar';

const Stack = createNativeStackNavigator();

const StackNavigator: React.FC = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{ title: 'Comparador de Carros' }} />
            <Stack.Screen name="AddCar" component={AddCar} options={{ title: 'Cadastrar Novo Carro' }} />
        </Stack.Navigator>
    );
};

export default StackNavigator;
