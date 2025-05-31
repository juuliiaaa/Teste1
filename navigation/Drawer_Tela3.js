import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Tela3 from '../screens/Tela3';
import Dicas from '../screens/Dicas';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Sobre" component={Tela3} />
      <Drawer.Screen name="Dicas" component={Dicas} />
    </Drawer.Navigator>
  );
}