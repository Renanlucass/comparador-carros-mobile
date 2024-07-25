import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';

interface NotificationProps {
    message: string;
    onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, onClose }) => {
    return (
        <Animated.View style={styles.notification}>
            <Text style={styles.message}>{message}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    notification: {
        position: 'absolute',
        top: 50,
        left: '10%',
        right: '10%',
        backgroundColor: '#444',
        padding: 15,
        margin: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    message: {
        color: '#fff',
        fontSize: 16,
        flex: 1,
    },
    closeButton: {
        marginLeft: 10,
        padding: 5,
        backgroundColor: '#666',
        borderRadius: 5,
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default Notification;
