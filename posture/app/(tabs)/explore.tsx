// SettingsScreen.js

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const SettingsScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>

            {/* Profile Section */}
            <View style={styles.profileSection}>
                <Image
                    source={{ uri: 'https://via.placeholder.com/50' }} // Placeholder image
                    style={styles.profileImage}
                />
                <View style={styles.profileInfo}>
                    <Text style={styles.profileName}>Mariam Jalloh</Text>
                    <TouchableOpacity style={styles.editButton}>
                        <Text style={styles.editButtonText}>Edit Account</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Settings Options */}
            <View style={styles.settingsOptions}>
                <TouchableOpacity style={styles.settingsItem}>
                    <Text style={styles.settingsText}>Mariam's Device</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.settingsItem}>
                    <Text style={styles.settingsText}>Alerts / Notifications</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.settingsItem}>
                    <Text style={styles.settingsText}>Help</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.settingsItem}>
                    <Text style={styles.settingsText}>Log Out</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// Add this in the same file (SettingsScreen.js) or in a separate StyleSheet if you prefer.

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#f5f5f0',
      alignItems: 'center',
      paddingTop: 50,
  },
  title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 20,
  },
  profileSection: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#444',
      borderRadius: 15,
      padding: 15,
      width: '90%',
      marginBottom: 20,
  },
  profileImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 15,
  },
  profileInfo: {
      flex: 1,
  },
  profileName: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
  },
  editButton: {
      backgroundColor: '#fff',
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 10,
      marginTop: 5,
  },
  editButtonText: {
      color: '#444',
      fontSize: 14,
  },
  settingsOptions: {
      backgroundColor: '#444',
      borderRadius: 15,
      width: '90%',
      paddingVertical: 10,
  },
  settingsItem: {
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#666',
  },
  settingsText: {
      color: '#fff',
      fontSize: 16,
  },
});

export default SettingsScreen;
