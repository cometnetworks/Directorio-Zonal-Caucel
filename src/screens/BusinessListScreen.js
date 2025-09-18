import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BusinessListScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Business List Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default BusinessListScreen;
