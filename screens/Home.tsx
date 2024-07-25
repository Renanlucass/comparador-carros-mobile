import React, { useState, useRef, useCallback, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import CarCard from '../components/CarCard';
import ComparisonTable from '../components/ComparisonTable';
import SearchBar from '../components/Search';
import carsData from '../components/carsData';
import useLightTheme from '../hooks/useLigthSensor';

const Home: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [selectedCars, setSelectedCars] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const { theme, lightLevel, animation } = useLightTheme(); 
    const flatListRef = useRef<FlatList<any>>(null);

    const backgroundColor = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['#dcdcdc', '#151515']
    });

    const handleSearchChange = useCallback((query: string) => setSearchQuery(query), []);

    const addCarToComparison = useCallback((car: any) => {
        if (selectedCars.length < 3 && !selectedCars.includes(car)) {
            setSelectedCars(prev => [...prev, car]);
        }
    }, [selectedCars]);

    const resetComparison = useCallback(() => setSelectedCars([]), []);

    const filteredCarsData = useMemo(() => carsData.filter((car: any) =>
        car.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.make.toLowerCase().includes(searchQuery.toLowerCase())
    ), [searchQuery]);

    const ListHeaderComponent = useCallback(() => (
        <View style={styles.header}>
            <SearchBar searchQuery={searchQuery} handleSearchChange={handleSearchChange} theme={theme} />
            <TouchableOpacity
                style={[styles.addCarButton, theme === 'dark' && styles.addCarButtonDark]}
                onPress={() => navigation.navigate('AddCar')}
            >
                <Text style={[styles.addCarButtonText, theme === 'dark' && styles.darkText]}>Cadastrar Novo Carro</Text>
            </TouchableOpacity>
            <Text style={[styles.subheader, theme === 'dark' && styles.darkText]}>Escolha até 3 carros para comparar</Text>
            <Text style={[styles.lightLevelText, theme === 'dark' && styles.darkText]}>
                Nível de Luminosidade: {lightLevel.toFixed(2)}
            </Text>
        </View>
    ), [searchQuery, theme, lightLevel, handleSearchChange, navigation]);

    const ListFooterComponent = useCallback(() => selectedCars.length > 0 ? (
        <View style={styles.comparisonContainer}>
            <Text style={[styles.comparisonTitle, theme === 'dark' && styles.darkText]}>Comparar Carros Selecionados</Text>
            <ComparisonTable cars={selectedCars} />
            <TouchableOpacity style={styles.resetButton} onPress={resetComparison}>
                <Text style={[styles.resetButtonText, theme === 'dark' && styles.darkText]}>Resetar Comparação</Text>
            </TouchableOpacity>
        </View>
    ) : null, [selectedCars, theme, resetComparison]);

    return (
        <Animated.View style={[styles.container, { backgroundColor }]}>
            <FlatList
                ref={flatListRef}
                ListHeaderComponent={ListHeaderComponent}
                data={filteredCarsData}
                renderItem={({ item }) => (
                    <CarCard car={item} onAdd={addCarToComparison} theme={theme} />
                )}
                keyExtractor={item => item.model}
                contentContainerStyle={styles.listContent}
                ListFooterComponent={ListFooterComponent}
                removeClippedSubviews={false}
                initialNumToRender={10}
            />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 18,
    },
    listContent: {
        paddingBottom: 16,
    },
    header: {
        marginBottom: 10,
        alignItems: 'center',
    },
    subheader: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
    },
    addCarButton: {
        backgroundColor: '#003366',
        borderRadius: 25,
        paddingVertical: 12,
        paddingHorizontal: 24,
        alignItems: 'center',
        marginBottom: 10,
    },
    addCarButtonDark: {
        backgroundColor: '#ef7d00',
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
    lightLevelText: {
        fontSize: 16,
        marginTop: 10,
        color: '#003366',
    },
    darkText: {
        color: '#ffffff',
    },
});

export default Home;
