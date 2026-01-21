import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <Image 
          source={require('../assets/mziuri-logo.png')} 
          style={styles.logoSmall}
          resizeMode="contain"
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>404</Text>
        <Text style={styles.subtitle}>PAGE NOT FOUND</Text>
        
        <Text style={styles.message}>
          Oops! We can’t seem to find the page you’re looking for.
        </Text>

        <TouchableOpacity 
          activeOpacity={0.7}
          onPress={() => router.push('/(tabs)/feedback')} 
          style={styles.button}
        >
          <Text style={styles.buttonText}>GO TO HOME</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={() => router.push('')}
          style={styles.secondaryButton}
        >
          <Text style={styles.secondaryButtonText}>Report a problem</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA", 
  },
  header: {
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    marginTop:50,
  },
  logoSmall: {
    width: 100,
    height: 30,
    opacity: 0.7, 
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    marginTop: -80, 
  },
  title: {
    fontSize: 100, 
    fontWeight: "900",
    color: "#2C3E50", 
    letterSpacing: -5,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#2C3E50",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 8,
  },
  message: {
    fontSize: 15,
    color: "#546E7A",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#F9C94D", 
    paddingVertical: 18,
    width: '100%',
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "#2C3E50",
    fontSize: 15,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  secondaryButton: {
    marginTop: 25,
  },
  secondaryButtonText: {
    color: "#546E7A",
    fontSize: 14,
    fontWeight: "500",
    textDecorationLine: 'underline',
  },
});