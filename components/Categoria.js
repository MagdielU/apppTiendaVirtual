import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Categoria = (props) => {
  return (
    <TouchableOpacity style={styles.contenedor} onPress={props.onPress}>
      <Ionicons name={props.icono} size={28} color="#7C7CFF" />
      <Text style={styles.nombre}>{props.nombre}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F0F0FF",
    padding: 12,
    borderRadius: 12,
    marginRight: 10,
    width: 85,
  },
  nombre: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 5,
    textAlign: "center",
    color: "#333",
  },
});

export default Categoria;