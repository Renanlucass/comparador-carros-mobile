import React, { useState, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import CarCard from '../components/CarCard';
import ComparisonTable from '../components/ComparisonTable';
import SearchBar from '../components/Search';
import carsData from '../components/carsData';

const Home: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [selectedCars, setSelectedCars] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const flatListRef = useRef<FlatList<any>>(null);

    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
    };

    const addCarToComparison = (car: any) => {
        if (selectedCars.length < 3 && !selectedCars.includes(car)) {
            setSelectedCars(prev => {
                const newSelectedCars = [...prev, car];
                // Scroll to the end of the list after adding a new car
                setTimeout(() => {
                    flatListRef.current?.scrollToEnd({ animated: true });
                }, 100); // Delay to ensure the new item is rendered
                return newSelectedCars;
            });
        }
    };

    const resetComparison = () => {
        setSelectedCars([]);
    };

    const filteredCarsData = carsData.filter((car: any) =>
        car.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.make.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const ListHeaderComponent = () => (
        <View style={styles.header}>
            <SearchBar searchQuery={searchQuery} handleSearchChange={handleSearchChange} />
            <TouchableOpacity
                style={styles.addCarButton}
                onPress={() => navigation.navigate('AddCar')}
            >
                <Text style={styles.addCarButtonText}>Cadastrar Novo Carro</Text>
            </TouchableOpacity>
            <Text style={styles.subheader}>Escolha até 3 carros para comparar</Text>
        </View>
    );

    const ListFooterComponent = () => {
        if (selectedCars.length > 0) {
            return (
                <View style={styles.comparisonContainer}>
                    <Text style={styles.comparisonTitle}>Comparar Carros Selecionados</Text>
                    <ComparisonTable cars={selectedCars} />
                    <TouchableOpacity
                        style={styles.resetButton}
                        onPress={resetComparison}
                    >
                        <Text style={styles.resetButtonText}>Resetar Comparação</Text>
                    </TouchableOpacity>
                </View>
            );
        }
        return null;
    };

    return (
        <FlatList
            ref={flatListRef}
            ListHeaderComponent={ListHeaderComponent}
            data={filteredCarsData}
            renderItem={({ item }) => (
                <CarCard car={item} onAdd={addCarToComparison} />
            )}
            keyExtractor={(item) => item.model}
            contentContainerStyle={styles.container}
            ListFooterComponent={ListFooterComponent}
            // Remove extra space at the end of the list
            removeClippedSubviews={false}
            // Important to avoid rendering issues
            initialNumToRender={10}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 18,
    },
    header: {
        marginBottom: 10,
        alignItems: 'center',
    },
    subheader: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
        color: '#003366',
    },
    addCarButton: {
        backgroundColor: '#003366',
        borderRadius: 25,
        paddingVertical: 12,
        paddingHorizontal: 24,
        alignItems: 'center',
        marginBottom: 10,
    },
    addCarButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    comparisonContainer: {
        marginTop: 16,
    },
    comparisonTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#003366',
        marginBottom: 16,
    },
    resetButton: {
        backgroundColor: '#ff4d4d',
        borderRadius: 25,
        paddingVertical: 12,
        paddingHorizontal: 24,
        alignItems: 'center',
        marginTop: 16,
    },
    resetButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Home;
