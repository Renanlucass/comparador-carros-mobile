import React, { useState, useRef, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { LightSensor } from 'expo-sensors';
import CarCard from '../components/CarCard';
import ComparisonTable from '../components/ComparisonTable';
import SearchBar from '../components/Search';
import carsData from '../components/carsData';

const Home: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [selectedCars, setSelectedCars] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [lightLevel, setLightLevel] = useState<number>(0);
    const flatListRef = useRef<FlatList<any>>(null);

    useEffect(() => {
        const subscription = LightSensor.addListener((data: any) => {
            console.log('Sensor Data:', data);
    
            const newLightLevel = data?.light || 0;
            setLightLevel(newLightLevel);
    
            if (newLightLevel < 10) {
                setTheme('dark'); 
            } else {
                setTheme('light');
            }
        });

        return () => {
            subscription.remove();
        };
    }, []);

    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
    };

    const addCarToComparison = (car: any) => {
        if (selectedCars.length < 3 && !selectedCars.includes(car)) {
            setSelectedCars(prev => {
                const newSelectedCars = [...prev, car];
                setTimeout(() => {
                    flatListRef.current?.scrollToEnd({ animated: true });
                }, 100);
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
                <Text style={[styles.addCarButtonText, theme === 'dark' && styles.darkText]}>Cadastrar Novo Carro</Text>
            </TouchableOpacity>
            <Text style={[styles.subheader, theme === 'dark' && styles.darkText]}>Escolha até 3 carros para comparar</Text>
            <Text style={[styles.lightLevelText, theme === 'dark' && styles.darkText]}>
                Nível de Luminosidade: {lightLevel.toFixed(2)}
            </Text>
        </View>
    );

    const ListFooterComponent = () => {
        if (selectedCars.length > 0) {
            return (
                <View style={styles.comparisonContainer}>
                    <Text style={[styles.comparisonTitle, theme === 'dark' && styles.darkText]}>Comparar Carros Selecionados</Text>
                    <ComparisonTable cars={selectedCars} />
                    <TouchableOpacity
                        style={styles.resetButton}
                        onPress={resetComparison}
                    >
                        <Text style={[styles.resetButtonText, theme === 'dark' && styles.darkText]}>Resetar Comparação</Text>
                    </TouchableOpacity>
                </View>
            );
        }
        return null;
    };

    return (
        <View style={[styles.container, theme === 'dark' ? styles.darkTheme : styles.lightTheme]}>
            <FlatList
                ref={flatListRef}
                ListHeaderComponent={ListHeaderComponent}
                data={filteredCarsData}
                renderItem={({ item }) => (
                    <CarCard car={item} onAdd={addCarToComparison} theme={theme} />
                )}
                keyExtractor={(item) => item.model}
                contentContainerStyle={styles.listContent}
                ListFooterComponent={ListFooterComponent}
                removeClippedSubviews={false}
                initialNumToRender={10}
            />
        </View>
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
    lightTheme: {
        backgroundColor: '#ffffff',
        color: '#000000',
    },
    darkTheme: {
        backgroundColor: '#000000',
        color: '#ffffff',
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
