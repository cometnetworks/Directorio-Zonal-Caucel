import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/screens/HomeScreen';
import CategoriesScreen from './src/screens/CategoriesScreen';
import SearchScreen from './src/screens/SearchScreen';
import BusinessListScreen from './src/screens/BusinessListScreen';
import BusinessDetailScreen from './screens/BusinessDetailScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          headerBackTitleVisible: false,
        }}
      >
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Inicio' }} />
        <Stack.Screen name="CategoriesScreen" component={CategoriesScreen} options={{ title: 'Categorías' }} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} options={{ title: 'Buscar' }} />
        <Stack.Screen name="BusinessList" component={BusinessListScreen} options={{ title: 'Negocios' }} />
        <Stack.Screen
          name="BusinessDetail"
          component={BusinessDetailScreen}
          options={{ title: 'Detalle del negocio' }}
        />
        <Stack.Screen name="FavoritesScreen" component={FavoritesScreen} options={{ title: 'Favoritos' }} />
        <Stack.Screen name="Perfil" component={ProfileScreen} options={{ title: 'Perfil' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
