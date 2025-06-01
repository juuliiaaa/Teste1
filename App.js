// Importação de componentes
import { Text, StyleSheet, View, Button } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

// Import das telas
import Login from "./screens/Login";
import HomeScreen from "./screens/HomeScreen";

// Import das Navegações
import { NavigationContainer } from "@react-navigation/native";
//import BottomTabs_Tela2 from "./navigation/BottomTabs_Tela2";
//import Drawer_Tela3 from "./navigation/Drawer_Tela3";

// Import das libs de navegação - Stack
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import lib de icons
import { Ionicons } from "@expo/vector-icons";
import Perfil from "./screens/Perfil";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="HomeScreen"
          options={(title = "Tela inicial")}
          component={HomeScreen}
        />
        <Stack.Screen
          name="Perfil"
          options={{ title: "Perfil do Usuário" }}
          component={Perfil}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
