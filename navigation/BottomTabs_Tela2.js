import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Tela2 from "../screens/Tela2";
import Drawer_Tela3 from "../navigation/Drawer_Tela3";


export default function BottomTabs_Tela2() {

    const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Tela2" component={Tela2} options={{ tabBarLabel: 'Tela inicial',  headerShown: true}}/>
      <Tab.Screen name="Nav-Tela3" component={Drawer_Tela3} options={{ tabBarLabel: 'Sobre' }}/>
    </Tab.Navigator>
  );
}