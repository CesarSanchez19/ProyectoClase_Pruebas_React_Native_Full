// PuertaCard.jsx
import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { Card, IconButton, Text, Switch } from "react-native-paper";
import { estadoDevicesGlobal } from "../context/contexData";

export default function PuertaCard(props) {
  const api = process.env.EXPO_PUBLIC_API_URL;

  const [nombre, setNombre] = useState(props.puerta.nombre || "");
  const [registroEntrada, setRegistroEntrada] = useState(props.puerta.registro_entrada || 0);

  const [modoEditarNombre, setModoEditarNombre] = useState(false);
  const [nombreTemp, setNombreTemp] = useState(nombre);

  const { cambiarEstadoPuerta, obtenerEstadoPuerta } = useContext(estadoDevicesGlobal);
  const estado = obtenerEstadoPuerta(props.puerta.id);

  useEffect(() => {
    console.log(`Puerta ID ${props.puerta.id} - nombre: ${nombre} - Estado: ${estado ? "abierta" : "cerrada"} - Entradas: ${registroEntrada}`);
  }, [estado, nombre, registroEntrada]);

  const actualizarCampo = async (campo, valor, estadoOverride = null) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const estadoParaEnviar = estadoOverride !== null ? estadoOverride : (estado ? "abierta" : "cerrada");

    const dataToSend = {
      id: props.puerta.id,
      nombre: campo === "nombre" ? valor : nombre,
      estado: campo === "estado" ? valor : estadoParaEnviar,
      registro_entrada: campo === "registro_entrada" ? valor : registroEntrada,
    };

    const raw = JSON.stringify(dataToSend);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(`${api}/api/puertas/actualizar`, requestOptions);
      const resultado = await response.json();
      console.log(`RESPUESTA API - Campo ${campo} actualizado:`, resultado);

      if (campo === "nombre") {
        props.recargarPuertas();
      }
    } catch (error) {
      console.error(` ERROR API - al actualizar ${campo}:`, error);
      throw error;
    }
  };

  const eliminarPuerta = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ id: props.puerta.id });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(`${api}/api/puertas/eliminar`, requestOptions);
      const resultado = await response.json();
      console.log(`Puerta eliminada: ${nombre}`, resultado);
      props.recargarPuertas();
    } catch (error) {
      console.error("Error al eliminar puerta:", error);
    }
  };

  const guardarNombre = () => {
    if (nombreTemp !== nombre) {
      setNombre(nombreTemp);
      actualizarCampo("nombre", nombreTemp);
    }
    setModoEditarNombre(false);
  };

  const verificarEstadoEnBD = async () => {
    try {
      const response = await fetch(`${api}/api/puertas`, {
        method: "GET",
        redirect: "follow",
      });
      const data = await response.json();
      const puertaActual = data.body.find((p) => p.id === props.puerta.id);
      console.log(`VERIFICACIÓN BD - Puerta ${props.puerta.id}: Estado en BD = "${puertaActual?.estado}", Estado en contexto = "${estado ? 'abierta' : 'cerrada'}"`);
    } catch (error) {
      console.error("Error al verificar estado en BD:", error);
    }
  };

  const actualizarEstado = async () => {
    const estadoActual = obtenerEstadoPuerta(props.puerta.id);
    const nuevoEstadoBooleano = !estadoActual;
    const nuevoEstadoString = nuevoEstadoBooleano ? "abierta" : "cerrada";

    console.log(`ANTES - Estado actual: ${estadoActual ? "abierta" : "cerrada"}, Nuevo estado: ${nuevoEstadoString}`);

    try {
      cambiarEstadoPuerta(props.puerta.id);
      await actualizarCampo("estado", nuevoEstadoString);
      setTimeout(() => verificarEstadoEnBD(), 1000);

      if (nuevoEstadoBooleano) {
        const nuevoRegistro = registroEntrada + 1;
        setRegistroEntrada(nuevoRegistro);
        await actualizarCampo("registro_entrada", nuevoRegistro, nuevoEstadoString);
      }
    } catch (error) {
      console.error("Error al actualizar estado:", error);
      cambiarEstadoPuerta(props.puerta.id);
    }
  };

  return (
    <Card style={[styles.card, estado && styles.cardActive]}>
      <View style={[styles.cardGlow, estado && styles.cardGlowActive]} />
      <Card.Content style={styles.cardContent}>
        <View style={styles.headerContainer}>
          <View style={styles.statusIndicator}>
            <View style={[styles.statusDot, estado && styles.statusDotActive]} />
            <Text style={[styles.statusText, estado && styles.statusTextActive]}>
              {estado ? "🚪 Abierta" : "🔒 Cerrada"}
            </Text>
          </View>
          <Switch
            value={estado}
            onValueChange={actualizarEstado}
            trackColor={{ false: "#E9D5FF", true: "#C4B5FD" }}
            thumbColor={estado ? "#8B5CF6" : "#9CA3AF"}
            style={styles.switch}
          />
        </View>

        <View style={styles.nombreSection}>
          {modoEditarNombre ? (
            <View style={styles.nombreEditContainer}>
              <TextInput
                value={nombreTemp}
                onChangeText={setNombreTemp}
                style={styles.nombreInput}
                placeholder="Nombre de la puerta"
                placeholderTextColor="#9CA3AF"
                autoFocus
              />
              <View style={styles.accionesEditar}>
                <IconButton
                  icon="check"
                  iconColor="#8B5CF6"
                  size={20}
                  style={styles.editButton}
                  onPress={guardarNombre}
                />
                <IconButton
                  icon="close"
                  iconColor="#EF4444"
                  size={20}
                  style={styles.editButton}
                  onPress={() => setModoEditarNombre(false)}
                />
              </View>
            </View>
          ) : (
            <View style={styles.nombreDisplayContainer}>
              <Text
                onPress={() => setModoEditarNombre(true)}
                style={[styles.nombreTexto, estado && styles.nombreTextoActive]}
              >
                {nombre || "🚪 Sin nombre"}
              </Text>
              <IconButton
                icon="delete"
                iconColor="#EF4444"
                size={20}
                style={styles.deleteButton}
                onPress={eliminarPuerta}
              />
            </View>
          )}
        </View>

        <View style={styles.registroSection}>
          <View style={styles.registroHeader}>
            <Text style={styles.registroLabel}>📊 Entradas registradas</Text>
            <View style={styles.registroValueContainer}>
              <Text style={[styles.registroValue, estado && styles.registroValueActive]}>
                {registroEntrada}
              </Text>
            </View>
          </View>
          <View style={styles.registroInfo}>
            <Text style={styles.registroDescription}>
              Contador incrementa cada vez que se abre la puerta
            </Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    elevation: 4,
    shadowColor: "#8B5CF6",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: "#E9D5FF",
    overflow: "hidden",
    position: "relative",
  },
  cardActive: {
    borderColor: "#8B5CF6",
    elevation: 8,
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  cardGlow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: "#E5E7EB",
  },
  cardGlowActive: {
    backgroundColor: "#8B5CF6",
    shadowColor: "#8B5CF6",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 4,
  },
  cardContent: {
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  statusIndicator: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#9CA3AF",
    marginRight: 8,
  },
  statusDotActive: {
    backgroundColor: "#8B5CF6",
    shadowColor: "#8B5CF6",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 2,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
  },
  statusTextActive: {
    color: "#7C3AED",
  },
  switch: {
    transform: [{ scale: 1.1 }],
  },
  nombreSection: {
    marginBottom: 20,
  },
  nombreEditContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  nombreInput: {
    flex: 1,
    borderBottomWidth: 2,
    borderBottomColor: "#8B5CF6",
    paddingVertical: 8,
    paddingHorizontal: 4,
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    marginRight: 12,
  },
  accionesEditar: {
    flexDirection: "row",
  },
  editButton: {
    margin: 0,
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
  },
  nombreDisplayContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nombreTexto: {
    fontSize: 20,
    fontWeight: "700",
    color: "#374151",
    flex: 1,
    letterSpacing: -0.3,
  },
  nombreTextoActive: {
    color: "#7C3AED",
  },
  deleteButton: {
    margin: 0,
    backgroundColor: "#FEF2F2",
    borderRadius: 8,
  },
  registroSection: {
    backgroundColor: "#F5F3FF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E9D5FF",
  },
  registroHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  registroLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    flex: 1,
  },
  registroValueContainer: {
    backgroundColor: "#8B5CF6",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    minWidth: 40,
    alignItems: "center",
    shadowColor: "#8B5CF6",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  registroValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  registroValueActive: {
    color: "#FFFFFF",
  },
  registroInfo: {
    marginTop: 8,
  },
  registroDescription: {
    fontSize: 12,
    color: "#6B7280",
    fontStyle: "italic",
    textAlign: "center",
  },
});
