import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function DetalleProducto({ route, navigation }) {
  // Recibimos el objeto producto enviado desde el catálogo
  const { producto } = route.params || {};

  if (!producto) {
    return (
      <View style={styles.containerError}>
        <Text style={styles.errorText}>No se encontró información del producto.</Text>
        <TouchableOpacity style={styles.botonRegresar} onPress={() => navigation.goBack()}>
          <Text style={styles.textoBoton}>Regresar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Botón para regresar */}
      <TouchableOpacity style={styles.botonAtras} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>

      {/* Imagen del producto */}
      {producto.imagen ? (
        <Image source={{ uri: producto.imagen }} style={styles.imagen} resizeMode="cover" />
      ) : (
        <View style={styles.imagenPlaceholder}>
          <Ionicons name="image-outline" size={50} color="#ccc" />
        </View>
      )}

      {/* Información del producto */}
      <View style={styles.infoContainer}>
        <Text style={styles.nombre}>{producto.nombre}</Text>
        <Text style={styles.precio}>C$ {producto.precio}</Text>

        <View style={styles.detallesFila}>
          <Text style={styles.etiqueta}>Color:</Text>
          <View style={[styles.colorCirculo, { backgroundColor: producto.color || "#000" }]} />
          <Text style={styles.valor}>{producto.color}</Text>
        </View>

        <View style={styles.detallesFila}>
          <Text style={styles.etiqueta}>Categoría ID:</Text>
          <Text style={styles.valor}>{producto.categoriaid}</Text>
        </View>

        <View style={styles.detallesFila}>
          <Text style={styles.etiqueta}>Tiempo:</Text>
          <Text style={styles.valor}>{producto.tiempo}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    paddingBottom: 30,
  },
  containerError: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 15,
  },
  botonAtras: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
    backgroundColor: "#f0f0f0",
    padding: 8,
    borderRadius: 20,
  },
  imagen: {
    width: "100%",
    height: 300,
    backgroundColor: "#f9f9f9",
  },
  imagenPlaceholder: {
    width: "100%",
    height: 300,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    padding: 20,
  },
  nombre: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 8,
  },
  precio: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#7C7CFF",
    marginBottom: 20,
  },
  detallesFila: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  etiqueta: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#555",
    width: 110,
  },
  valor: {
    fontSize: 15,
    color: "#333",
  },
  colorCirculo: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  botonRegresar: {
    backgroundColor: "#7C7CFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  textoBoton: {
    color: "#fff",
    fontWeight: "bold",
  },
});