import { Tabs } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';

import { Dimensions } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
      }}
    >
      <Tabs.Screen
        name="calendar"
        options={{
          title: '',
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconContainerFocused]}>
              <Image
                source={focused ? require('../../assets/images/calendar.png') : require('../../assets/images/calendar.png')}
                style={styles.icon}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconContainerFocused]}>
              <Image
                source={focused ? require('../../assets/images/home.png') : require('../../assets/images/home-outline.png')}
                style={focused ? styles.iconFocused : styles.icon}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: '',
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconContainerFocused]}>
              <Image
                source={focused ? require('../../assets/images/setting-outline.png') : require('../../assets/images/setting.png')}
                style={styles.icon3}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: '2%',
    width: '50%', // Adjusted width to fit icons properly
    height: '6.2%', 
    borderRadius: 30,
    backgroundColor: '#404040',
    paddingBottom: 0, // Adjust padding to avoid clipping
    paddingTop: 10, // Adjust padding to avoid clipping
    left: '25%', // Move to the center of the screen
    top: '90%', // Move to the bottom of the screen
  },
  tabBarItem: {
    marginTop: 0, // Remove top margin to avoid clipping
    paddingVertical: 5, // Add vertical padding to center icons
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5, // Move the icons down
  },
  iconContainerFocused: {
    backgroundColor: 'white',
    width: 46, // Set width to make it a perfect circle
    height: 46, // Set height to make it a perfect circle
    borderRadius: 23, // Half of the width/height to make it a perfect circle
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 34,
    height: 34,
  },
  iconFocused: {
    width: 30.1,
    height: 28.42,
  },
  icon3: {
    width: 28.57,
    height: 29.71,
  },
});