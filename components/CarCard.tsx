import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Car } from '../types';

interface CarCardProps {
    car: Car;
    onAdd: (car: Car) => void;
    theme: 'light' | 'dark';
}

const CarCard: React.FC<CarCardProps> = ({ car, onAdd, theme }) => {
    const cardStyle = theme === 'dark' ? styles.darkCard : styles.lightCard;
    const textColor = theme === 'dark' ? styles.darkText : styles.lightText;
    const addButtonColor = theme === 'dark' ? { backgroundColor: '#ef7d00' } : { backgroundColor: '#003366' };

    return (
        <View style={[styles.card, cardStyle]}>

            <View style={styles.imgContainer}>
                <Image source={car.image} style={styles.img} />
            </View>

            <Text style={[styles.model, textColor]}>{car.model}</Text>
            <Text style={[styles.make, textColor]}>{car.make}</Text>

            <View style={styles.detailsContainer}>

                <Text style={[styles.details, textColor]}>
                    <Text style={styles.bold}>Ano:</Text> {car.year}
                </Text>

                <Text style={[styles.details, textColor]}>
                    <Text style={styles.bold}>Preço:</Text> R${car.price}
                </Text>

                <Text style={[styles.details, textColor]}>
                    <Text style={styles.bold}>Transmissão:</Text> {car.transmission}
                </Text>

            </View>

            <TouchableOpacity style={[styles.addButton, addButtonColor]} onPress={() => onAdd(car)}>
                <Text style={styles.addButtonText}>Adicionar à Comparação</Text>
            </TouchableOpacity>
            
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        margin: 25,
        borderRadius: 10,
        elevation: 4,
        padding: 16,
    },
    lightCard: {
        backgroundColor: '#ffffff',
    },
    darkCard: {
        backgroundColor: '#333333',
    },
    imgContainer: {
        width: '100%',
        aspectRatio: 2,
        overflow: 'hidden',
        borderRadius: 10,
        marginBottom: 16,
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    model: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    make: {
        marginVertical: 8,
    },
    detailsContainer: {
        marginVertical: 8,
    },
    details: {
        color: '#333333',
    },
    bold: {
        fontWeight: 'bold',
    },
    addButton: {
        borderRadius: 25,
        paddingVertical: 12,
        paddingHorizontal: 24,
        alignItems: 'center',
        marginTop: 15,
    },
    addButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    lightText: {
        color: '#000000',
    },
    darkText: {
        color: '#ffffff',
    },
});

export default CarCard;
