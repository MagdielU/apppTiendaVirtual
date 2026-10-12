import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

// Importa tus pantallas (asegúrate de que los archivos estén en screens/)
import Catalogo from "../Screens/Catalogo";
import AdminProductosScreen from "../screens/AdminProductosScreen";
import FormularioProductoScreen from "../screens/FormularioProductoScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Stack para el módulo administrativo (Lista <-> Formulario)
function AdminStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AdminProductos" component={AdminProductosScreen} />
      <Stack.Screen name="FormularioProducto" component={FormularioProductoScreen} />
    </Stack.Navigator>
  );
}

// Navegación Principal por Pestañas (Tabs)
export default function Navegacion() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: "#7C7CFF",
          tabBarInactiveTintColor: "#AAA",
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === "Catálogo") {
              iconName = "home-outline";
            } else if (route.name === "Admin Productos") {
              iconName = "flask-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Catálogo" component={Catalogo} />
        <Tab.Screen name="Admin Productos" component={AdminStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}