import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importe o ícone desejado

interface SearchBarProps {
    searchQuery: string;
    handleSearchChange: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, handleSearchChange }) => {
    return (
        <View style={styles.container}>
            <Icon name="search" size={20} color="#003366" style={styles.icon} />
            <TextInput
                style={styles.input}
                placeholder="Pesquisar carros..."
                placeholderTextColor="#999"
                value={searchQuery}
                onChangeText={handleSearchChange}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 25,
        paddingHorizontal: 16,
        paddingVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        marginVertical: 16,
        top: -10,
    },
    icon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        height: 40,
        fontSize: 16,
        color: '#333',
    },
});

export default SearchBar;
