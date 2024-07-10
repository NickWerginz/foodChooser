import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, TextInput, FlatList, Text, Image, StyleSheet, Alert, Vibration } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { db } from './firebaseConfig'; // Importieren der Firebase-Konfiguration
import { Swipeable } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

export default function HomeScreen({ navigation }) {
    const [textInput, setTextInput] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        (async () => {
            const storedIngredients = await AsyncStorage.getItem('ingredients');
            if (storedIngredients) {
                setIngredients(JSON.parse(storedIngredients));
            }
            fetchFavoritesFromFirebase();
        })();
    }, []);

    const fetchFavoritesFromFirebase = async () => {
        const snapshot = await db.collection('favorites').get();
        const favs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFavorites(favs);
    };

    const saveIngredient = async () => {
        if (textInput) {
            const newIngredient = { name: textInput, id: Date.now().toString() };
            const updatedIngredients = [...ingredients, newIngredient];
            setIngredients(updatedIngredients);
            await AsyncStorage.setItem('ingredients', JSON.stringify(updatedIngredients));
            setTextInput('');
        }
    };

    const fetchRecipes = async () => {
        const ingredientList = ingredients.map(item => item.name).join(',');
        try {
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientList}`);
            setRecipes(response.data.meals || []);
        } catch (error) {
            console.error('Error fetching recipes:', error);
        }
    };
    const deleteIngredient = async (id) => {
        const updatedIngredients = ingredients.filter(ingredient => ingredient.id !== id);
        setIngredients(updatedIngredients);
        await AsyncStorage.setItem('ingredients', JSON.stringify(updatedIngredients));
    };

    const addFavorite = async (recipe) => {
        if (!favorites.some(fav => fav.idMeal === recipe.idMeal)) {
            const newFavorite = { ...recipe, addedAt: new Date().toISOString() };
            const docRef = await db.collection('favorites').add(newFavorite);
            setFavorites([...favorites, { id: docRef.id, ...newFavorite }]);
            showToast();
            navigation.navigate("Favorites")

        }
    };

    const showToast = () => {
        Toast.show({
            type: 'success',
            text1: 'Saved to favorites',
            position: 'top',
            visibilityTime: 2000,
            autoHide: true,
            topOffset: 30,
        });
    };

    const handleLongPress = async (recipe) => {
        Vibration.vibrate(100);
        await addFavorite(recipe);
    };


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.logo}>Foodchooser</Text>
                <View style={styles.headerIcons}>
                    <TouchableOpacity>
                        <Text style={styles.icon}>🎙️</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.icon}>💬</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Was hast du in deinem Kühlschrank?"
                    value={textInput}
                    onChangeText={setTextInput}
                />
                <TouchableOpacity style={styles.saveButton} onPress={saveIngredient}>
                    <Text style={styles.buttonText}>Hinzufügen</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>Auf was hast du Lust</Text>
            <FlatList
                data={ingredients}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.recording}>
                        <Text style={styles.recordingText}>{item.name}</Text>
                        <TouchableOpacity style={styles.deleteButton} onPress={() => deleteIngredient(item.id)}>
                            <Text style={styles.buttonText}>Löschen</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
            <TouchableOpacity style={styles.fetchButton} onPress={fetchRecipes}>
                <Text style={styles.buttonText}>Get Recipes</Text>
            </TouchableOpacity>
            {recipes.length > 0 && (
                <FlatList
                    data={recipes}
                    keyExtractor={(item) => item.idMeal}
                    renderItem={({ item }) => (

                            <TouchableOpacity
                                style={styles.recipeCard}
                                onPress={() => navigation.navigate('RecipeDetail', { recipeId: item.idMeal })}
                                onLongPress={() => handleLongPress(item)}
                            >
                                <Image source={{ uri: item.strMealThumb }} style={styles.image} />
                                <Text style={styles.recipeText}>{item.strMeal}</Text>
                            </TouchableOpacity>

                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 50,
        paddingHorizontal: 20,
        borderColor:'black'

    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    headerIcons: {
        flexDirection: 'row',
    },
    icon: {
        fontSize: 24,
        marginLeft: 15,
    },
    inputContainer: {
        flexDirection: 'row',
        marginVertical: 20,
        alignItems: 'center',
    },
    input: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        paddingVertical: 5,
        marginRight: 10,
    },
    saveButton: {
        backgroundColor: '#4287f5',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
    },
    fetchButton: {
        backgroundColor: '#42f554',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        marginVertical: 20,
        alignSelf: 'center',
    },
    deleteButton: {
        backgroundColor: '#f54242',
        paddingVertical: 3,
        paddingHorizontal: 20,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: '100%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
    recording: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
        padding: 15,
        marginVertical: 5,
        borderRadius: 10,
    },
    recordingText: {
        fontSize: 16,
        flex: 1,
    },
    recipeCard: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 10,
        marginVertical: 10,
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
});
