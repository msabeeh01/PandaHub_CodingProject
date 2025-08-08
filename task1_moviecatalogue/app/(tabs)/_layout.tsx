import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View, Text } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import { Ionicons } from '@expo/vector-icons';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '@/utils/theme';

// Custom tab bar icon component that shows text when active
const CustomTabBarIcon = ({ 
  focused, 
  color, 
  iconName, 
  title 
}: { 
  focused: boolean; 
  color: string; 
  iconName: keyof typeof Ionicons.glyphMap; 
  title: string; 
}) => {
  if (focused) {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ 
          color: color, 
          fontSize: 13, 
          fontWeight: '500',
          marginBottom: 2,
          width: 50,
          textAlign: 'center'
        }}>
          {title}
        </Text>
        <View style={{
          width: 12,
          height: 4,
          borderRadius: 3,
          backgroundColor: color,
        }} />
      </View>
    );
  }

  return (
    <Ionicons 
      size={24} 
      name={iconName} 
      color={color} 
    />
  );
};

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary, // Orange color
        tabBarInactiveTintColor: theme.colors.muted, // Gray color
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarShowLabel: false, // Hide default labels since we show custom ones
        tabBarStyle: {
          backgroundColor: '#1C1C1E', // Dark background
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: 60 + insets.bottom, // Adjust for safe area
          paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
          paddingTop: 8,
          paddingHorizontal: 16,
          position: 'absolute',
        },
        tabBarItemStyle: {
          paddingVertical: 8,
        },
      }}>
      
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <CustomTabBarIcon
              focused={focused}
              color={color}
              iconName="home-outline"
              title="Home"
            />
          ),
        }}
      />
      
      <Tabs.Screen
        name="movie"
        options={{
          title: 'Movie',
          tabBarIcon: ({ color, focused }) => (
            <CustomTabBarIcon
              focused={focused}
              color={color}
              iconName="film-outline"
              title="Movie"
            />
          ),
        }}
      />
      
      <Tabs.Screen
        name="tickets"
        options={{
          title: 'Tickets',
          tabBarIcon: ({ color, focused }) => (
            <CustomTabBarIcon
              focused={focused}
              color={color}
              iconName="ticket-outline"
              title="Tickets"
            />
          ),
        }}
      />
      
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <CustomTabBarIcon
              focused={focused}
              color={color}
              iconName="person-outline"
              title="Profile"
            />
          ),
        }}
      />
    </Tabs>
  );
}