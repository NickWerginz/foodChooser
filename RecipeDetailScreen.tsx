import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function RecipeDetailScreen({ route }) {
    const { recipeId } = route.params;
    const [recipeDetails, setRecipeDetails] = useState(null);
    const [currentTab, setCurrentTab] = useState('ingredients');

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            try {
                const response = await axios.get(`https://www.themealdb.com/api/json/v2/9973533/lookup.php?i=${recipeId}`);
                setRecipeDetails(response.data.meals[0]);
            } catch (error) {
                console.error('Error fetching recipe details:', error);
            }
        };

        fetchRecipeDetails();
    }, [recipeId]);

    if (!recipeDetails) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{recipeDetails.strMeal}</Text>
            <Image source={{ uri: recipeDetails.strMealThumb }} style={styles.image} />
            <View style={styles.tabContainer}>
                <TouchableOpacity onPress={() => setCurrentTab('ingredients')} style={[styles.tabButton, currentTab === 'ingredients' && styles.activeTab]}>
                    <Text style={styles.tabText}>Zutaten</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setCurrentTab('instructions')} style={[styles.tabButton, currentTab === 'instructions' && styles.activeTab]}>
                    <Text style={styles.tabText}>Anweisungen</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.detailsContainer}>
                {currentTab === 'ingredients' && (
                    <>
                        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => {
                            const ingredient = recipeDetails[`strIngredient${num}`];
                            const measure = recipeDetails[`strMeasure${num}`];
                            return ingredient ? (
                                <Text key={num} style={styles.ingredient}>
                                    {measure} {ingredient}
                                </Text>
                            ) : null;
                        })}
                    </>
                )}
                {currentTab === 'instructions' && (
                    <Text style={styles.instruction}>{recipeDetails.strInstructions}</Text>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 20,
    },
    tabButton: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f8f8f8',
        alignItems: 'center',
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#f54242',
    },
    tabText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    detailsContainer: {
        marginTop: 10,
    },
    ingredient: {
        fontSize: 16,
        marginVertical: 5,
    },
    instruction: {
        fontSize: 16,
        marginVertical: 5,
    },
});
