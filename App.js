import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

// Importa tus pantallas usando "Screens" con Mayúscula (ajusta la ruta según tu estructura, ej: "./Screens/...")
import Login from "./Screens/Login";
import Catalogo from "./Screens/Catalogo";
import DetalleProducto from "./Screens/DetalleProducto";
import AdminProductosScreen from "./Screens/AdminProductosScreen";
import FormularioProductoScreen from "./Screens/FormularioProductoScreen";
import OtraScreenCliente from "./Screens/OtraScreenCliente";
import OtraScreenAdmin from "./Screens/OtraScreenAdmin";

const RootStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Stack del catálogo (para el cliente)
function CatalogoStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="CatalogoMain" 
        component={Catalogo} 
        options={{ title: "Catálogo", headerShown: false }} 
      />
      <Stack.Screen 
        name="DetalleProducto" 
        component={DetalleProducto} 
        options={{ title: "Detalle del producto", headerShown: false }} 
      />
    </Stack.Navigator>
  );
}

// Stack de administración
function AdminStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AdminProductos" component={AdminProductosScreen} />
      <Stack.Screen name="FormularioProducto" component={FormularioProductoScreen} />
    </Stack.Navigator>
  );
}

// Pestañas del cliente
function ClienteTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#7C7CFF",
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "CatalogoTab") {
            iconName = "home-outline";
          } else if (route.name === "OtraScreenCliente") {
            iconName = "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen 
        name="CatalogoTab" 
        component={CatalogoStack} 
        options={{ title: "Catálogo" }} 
      />
      <Tab.Screen 
        name="OtraScreenCliente" 
        component={OtraScreenCliente} 
        options={{ title: "Mi perfil" }} 
      />
    </Tab.Navigator>
  );
}

// Pestañas del administrador
function AdminTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#7C7CFF",
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "ProductosTab") {
            iconName = "cube-outline";
          } else if (route.name === "OtraScreenAdmin") {
            iconName = "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen 
        name="ProductosTab" 
        component={AdminStack} 
        options={{ title: "Productos" }} 
      />
      <Tab.Screen 
        name="OtraScreenAdmin" 
        component={OtraScreenAdmin} 
        options={{ title: "Mi perfil" }} 
      />
    </Tab.Navigator>
  );
}

// Navegación principal y componente App
export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator 
        initialRouteName="Login" 
        screenOptions={{ headerShown: false }}
      >
        <RootStack.Screen name="Login" component={Login} />
        <RootStack.Screen name="ClienteTabs" component={ClienteTabs} />
        <RootStack.Screen name="AdminTabs" component={AdminTabs} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}