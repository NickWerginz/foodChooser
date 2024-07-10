import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { db } from './firebaseConfig'; // Importieren der Firebase-Konfiguration
import { Swipeable } from 'react-native-gesture-handler';

export default function RecipeScreen({ navigation }) {
    const [favorites, setFavorites] = useState([]);

    const loadFavorites = async () => {
        const snapshot = await db.collection('favorites').get();
        const favs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFavorites(favs);
    };

    useFocusEffect(
        React.useCallback(() => {
            loadFavorites();
        }, [])
    );

    const deleteRecipe = async (id) => {
        await db.collection('favorites').doc(id).delete();
        loadFavorites(); // Reload favorites after deletion
    };

    const renderRightActions = (item) => {
        return (
            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteRecipe(item.id)}>
                <Text style={styles.buttonText}>Löschen</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Deine Favoriten</Text>
            <FlatList
                data={favorites}
                keyExtractor={(item) => item.idMeal}
                renderItem={({ item }) => (
                    <Swipeable
                        renderRightActions={() => renderRightActions(item)}
                    >
                        <TouchableOpacity
                            style={styles.recipeCard}
                            onPress={() => navigation.navigate('RecipeDetail', { recipeId: item.idMeal })}
                        >
                            <Image source={{ uri: item.strMealThumb }} style={styles.image} />
                            <Text style={styles.recipeText}>{item.strMeal}</Text>
                        </TouchableOpacity>
                    </Swipeable>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
    recipeCard: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 10,
        marginVertical: 10, // Adjusted margin to have space between items
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 5,
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 10,
    },
    recipeText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 5,
        textAlign: 'center',
    },
    deleteButton: {
        backgroundColor: '#f54242',
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: '100%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});
