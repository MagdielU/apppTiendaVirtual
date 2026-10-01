import React, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";
import Categoria from "../components/Categoria";
import Producto from "../components/Producto";

const Catalogo = () => {
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    obtenerCategorias();
    obtenerProductos();
  }, []);

  const obtenerCategorias = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Categorias"));
      const datos = [];
      querySnapshot.forEach((doc) => {
        datos.push({ id: doc.id, ...doc.data() });
      });
      setCategorias(datos);
    } catch (error) {
      console.error("Error obteniendo categorías: ", error);
    }
  };

  const obtenerProductos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Productos"));
      const datos = [];
      querySnapshot.forEach((doc) => {
        datos.push({ id: doc.id, ...doc.data() });
      });
      setProductos(datos);
    } catch (error) {
      console.error("Error obteniendo productos: ", error);
    }
  };

  const obtenerProductosPorCategoria = async (categoriaId) => {
  try {
    const consulta = query(
      collection(db, "Productos"),
      where("categoriaid", "==", Number(categoriaId)) // Usamos 'categoriaid' en minúsculas
    );
    const consultaSnapshot = await getDocs(consulta);
    const datos = [];
    consultaSnapshot.forEach((doc) => {
      datos.push({ id: doc.id, ...doc.data() });
    });
    setProductos(datos);
  } catch (error) {
    console.error("Error obteniendo productos por categoría:", error);
  }
};

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const listaCategoriasConTodos = [
    { id: "todos", nombre: "Todos", icono: "grid-outline" },
    ...categorias,
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={productosFiltrados}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => <Producto producto={item} />}
        ListHeaderComponent={
          <>
            <View style={styles.searchContainer}>
              <Ionicons name="search-outline" size={20} color="#888" />
              <TextInput
                placeholder="Buscar producto..."
                placeholderTextColor="#888"
                style={styles.searchInput}
                value={busqueda}
                onChangeText={setBusqueda}
              />
            </View>

            <Text style={styles.sectionTitle}>Categorías</Text>
            <FlatList
              horizontal
              data={listaCategoriasConTodos}
              keyExtractor={(item) => item.id.toString()}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <Categoria
                  nombre={item.nombre}
                  icono={item.icono}
                  onPress={() => {
                    if (item.id === "todos") {
                      obtenerProductos();
                    } else {
                      obtenerProductosPorCategoria(item.id);
                    }
                  }}
                />
              )}
              contentContainerStyle={styles.categoriasList}
            />

            <Text style={styles.sectionTitle}>Productos</Text>
          </>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingTop: 40,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 40,
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  categoriasList: {
    paddingBottom: 10,
  },
});

export default Catalogo;