import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Car } from '../types';  
import images from '../assets/images';

interface CarCardProps {
    car: Car;
    onAdd: (car: Car) => void;
}

const getCarImage = (imageName: string) => {
    return images[imageName] || images['default.jpg']; 
};

const CarCard: React.FC<CarCardProps> = ({ car, onAdd }) => {
    return (
        <View style={styles.card}>
            <View style={styles.imgContainer}>
                <Image source={getCarImage(car.image)} style={styles.img} />
            </View>
            <Text style={styles.model}>{car.model}</Text>
            <Text style={styles.make}>{car.make}</Text>
            <View style={styles.detailsContainer}>
                <Text style={styles.details}><Text style={styles.bold}>Ano:</Text> {car.year}</Text>
                <Text style={styles.details}><Text style={styles.bold}>Preço:</Text> R${car.price}</Text>
                <Text style={styles.details}><Text style={styles.bold}>Motor:</Text> {car.engine}</Text>
            </View>
            <TouchableOpacity style={styles.addButton} onPress={() => onAdd(car)}>
                <Text style={styles.addButtonText}>Adicionar à Comparação</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        margin: 16,
        borderRadius: 10,
        elevation: 4,
        backgroundColor: '#ffffff',
        padding: 16,
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
        color: '#333333',
    },
    make: {
        color: '#666666',
        marginVertical: 8,
    },
    detailsContainer: {
        marginVertical: 8,
    },
    details: {
        color: '#444444',
    },
    bold: {
        fontWeight: 'bold',
    },
    addButton: {
        backgroundColor: '#003366',
        borderRadius: 25,
        paddingVertical: 12,
        paddingHorizontal: 24,
        alignItems: 'center',
        marginTop: 16,
    },
    addButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CarCard;
