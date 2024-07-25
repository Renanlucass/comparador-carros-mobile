import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface SearchBarProps {
    searchQuery: string;
    handleSearchChange: (query: string) => void;
    theme: 'light' | 'dark';
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, handleSearchChange, theme }) => {
    const isDarkTheme = theme === 'dark';

    return (
        <View style={[styles.container, isDarkTheme ? styles.darkContainer : styles.lightContainer]}>
            <Icon name="search" size={20} color={isDarkTheme ? '#ffffff' : '#003366'} style={styles.icon} />
            <TextInput
                style={[styles.input, isDarkTheme ? styles.darkInput : styles.lightInput]}
                placeholder="Pesquisar carros..."
                placeholderTextColor={isDarkTheme ? '#ccc' : '#999'}
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
        borderRadius: 25,
        paddingHorizontal: 16,
        paddingVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        marginVertical: 16,
    },
    lightContainer: {
        backgroundColor: '#ffffff',
    },
    darkContainer: {
        backgroundColor: '#565656',
    },
    icon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        height: 40,
        fontSize: 16,
    },
    lightInput: {
        color: '#333',
    },
    darkInput: {
        color: '#ffffff',
    },
});

export default SearchBar;
