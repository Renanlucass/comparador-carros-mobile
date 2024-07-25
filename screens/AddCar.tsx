import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const AddCar: React.FC = () => {
    const [showAlert, setShowAlert] = useState<boolean>(false);

    const handleSubmit = () => {
        setShowAlert(true);
    };

    return (
        <View style={styles.container}>
            {showAlert && <Text style={styles.alert}>Carro cadastrado com sucesso!</Text>}
            <TextInput style={styles.input} placeholder="Modelo" placeholderTextColor="#888" />
            <TextInput style={styles.input} placeholder="Marca" placeholderTextColor="#888" />
            <TextInput style={styles.input} placeholder="Ano" keyboardType="numeric" placeholderTextColor="#888" />
            <TextInput style={styles.input} placeholder="Preço" keyboardType="numeric" placeholderTextColor="#888" />
            <TextInput style={styles.input} placeholder="Consumo de Combustível" placeholderTextColor="#888" />
            <TextInput style={styles.input} placeholder="Potência" placeholderTextColor="#888" />
            <TextInput style={styles.input} placeholder="Aceleração (0-100 km/h)" placeholderTextColor="#888" />
            <TextInput style={styles.input} placeholder="Transmissão" placeholderTextColor="#888" />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Cadastrar Carro</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f8f8f8', 
    },
    alert: {
        fontSize: 16,
        color: '#00c853',
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 16,
        marginBottom: 16,
        backgroundColor: '#fff',
        fontSize: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    button: {
        backgroundColor: '#003366',
        borderRadius: 10,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default AddCar;
