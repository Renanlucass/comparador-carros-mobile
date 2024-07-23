// screens/AddCar.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const AddCar: React.FC = () => {
    const [showAlert, setShowAlert] = useState<boolean>(false);

    const handleSubmit = () => {
        setShowAlert(true);
    };

    return (
        <View style={styles.container}>
            {/* <Text style={styles.title}>Cadastrar Novo Carro</Text> */}
            {showAlert && <Text style={styles.alert}>Carro cadastrado com sucesso!</Text>}
            <TextInput style={styles.input} placeholder="Modelo" />
            <TextInput style={styles.input} placeholder="Marca" />
            <TextInput style={styles.input} placeholder="Ano" keyboardType="numeric" />
            <TextInput style={styles.input} placeholder="Preço" keyboardType="numeric" />
            <TextInput style={styles.input} placeholder="Motor" />
            <TextInput style={styles.input} placeholder="Tipo de Combustível" />
            <TextInput style={styles.input} placeholder="Consumo de Combustível" />
            <TextInput style={styles.input} placeholder="Potência" />
            <TextInput style={styles.input} placeholder="Torque" />
            <TextInput style={styles.input} placeholder="Aceleração (0-100 km/h)" />
            <TextInput style={styles.input} placeholder="Aceleração Máxima" />
            <TextInput style={styles.input} placeholder="Transmissão" />
            <Button title="Cadastrar Carro" onPress={handleSubmit} color="#003366" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#003366',
        marginBottom: 16,
    },
    input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: 16,
    },
    alert: {
        fontSize: 16,
        color: '#00c853',
        marginBottom: 16,
    },
});

export default AddCar;
