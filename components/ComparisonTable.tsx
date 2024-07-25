import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Car } from '../types';

interface Row {
    label: string;
    key: keyof Car;
}

interface ComparisonTableProps {
    cars: Car[];
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({ cars }) => {
    const renderRow = ({ item }: { item: Row }) => (
        <View style={styles.row}>
            <Text style={styles.cell}>{item.label}</Text>
            {cars.map((car, index) => (
                <Text key={index} style={styles.cell}>{String(car[item.key])}</Text>
            ))}
        </View>
    );

    const rows: Row[] = [
        { label: 'Marca', key: 'make' },
        { label: 'Ano', key: 'year' },
        { label: 'Preço', key: 'price' },
        { label: 'Consumo de Combustível', key: 'fuelConsumption' },
        { label: 'Potência', key: 'horsepower' },
        { label: 'Aceleração (0-100 km/h)', key: 'acceleration' },
        { label: 'Transmissão', key: 'transmission' },
    ];

    return (
        <View style={styles.container}>
            <FlatList
                data={rows}
                renderItem={renderRow}
                keyExtractor={(item) => item.label}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 16,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#ffffff',
        elevation: 4,
    },
    row: {
        flexDirection: 'row',
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    cell: {
        flex: 1,
        padding: 8,
    },
});

export default ComparisonTable;
