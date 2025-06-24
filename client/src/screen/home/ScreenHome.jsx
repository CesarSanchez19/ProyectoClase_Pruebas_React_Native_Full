import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Card, Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function ScreenHome() {
  const rutaDevice = useNavigation();

  return (
    <View style={styles.container}>

      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>
        Bienvenido a tu Hogar Inteligente
      </Text>
      {/* Header decorativo */}
      <View style={styles.headerDecoration} />
      
      {/* Fila 1: Luces y Puertas */}
      <View style={styles.row}>
        <Card style={[styles.card, styles.cardLuces]}>
          <View style={[styles.cardGlow, styles.glowLuces]} />
          <Card.Content style={styles.cardContent}>
            <View style={styles.iconContainer}>
              <FontAwesome5 name="lightbulb" size={48} color="#F59E0B" />
              <View style={[styles.iconShadow, styles.shadowLuces]} />
            </View>
            <Text style={[styles.cardTitle, styles.titleLuces]}>💡 Luces</Text>
            <Text style={styles.cardDescription}>Control de iluminación inteligente</Text>
            <Button
              mode="contained"
              onPress={() => rutaDevice.push('lucescasas')}
              style={[styles.button, styles.buttonLuces]}
              labelStyle={styles.buttonLabel}
              icon="arrow-right"
            >
              Ver más
            </Button>
          </Card.Content>
        </Card>

        <Card style={[styles.card, styles.cardPuertas]}>
          <View style={[styles.cardGlow, styles.glowPuertas]} />
          <Card.Content style={styles.cardContent}>
            <View style={styles.iconContainer}>
              <FontAwesome5 name="door-open" size={48} color="#22C55E" />
              <View style={[styles.iconShadow, styles.shadowPuertas]} />
            </View>
            <Text style={[styles.cardTitle, styles.titlePuertas]}>🚪 Puertas</Text>
            <Text style={styles.cardDescription}>Acceso y seguridad del hogar</Text>
            <Button
              mode="contained"
              onPress={() => rutaDevice.push('puertacasa')}
              style={[styles.button, styles.buttonPuertas]}
              labelStyle={styles.buttonLabel}
              icon="arrow-right"
            >
              Ver más
            </Button>
          </Card.Content>
        </Card>
      </View>

      {/* Fila 2: Clima y Garaje */}
      <View style={styles.row}>
        <Card style={[styles.card, styles.cardClima]}>
          <View style={[styles.cardGlow, styles.glowClima]} />
          <Card.Content style={styles.cardContent}>
            <View style={styles.iconContainer}>
              <FontAwesome5 name="cloud-sun" size={48} color="#3B82F6" />
              <View style={[styles.iconShadow, styles.shadowClima]} />
            </View>
            <Text style={[styles.cardTitle, styles.titleClima]}>🌤️ Clima</Text>
            <Text style={styles.cardDescription}>Refrigeracion o temperatura</Text>
            <Button
              mode="contained"
              onPress={() => rutaDevice.push('detallescasa')}
              style={[styles.button, styles.buttonClima]}
              labelStyle={styles.buttonLabel}
              icon="arrow-right"
            >
              Ver más
            </Button>
          </Card.Content>
        </Card>

        <Card style={[styles.card, styles.cardGaraje]}>
          <View style={[styles.cardGlow, styles.glowGaraje]} />
          <Card.Content style={styles.cardContent}>
            <View style={styles.iconContainer}>
              <FontAwesome5 name="warehouse" size={48} color="#DC2626" />
              <View style={[styles.iconShadow, styles.shadowGaraje]} />
            </View>
            <Text style={[styles.cardTitle, styles.titleGaraje]}>🏠 Garaje</Text>
            <Text style={styles.cardDescription}>Control de acceso vehicular</Text>
            <Button
              mode="contained"
              onPress={() => rutaDevice.push('garage')}
              style={[styles.button, styles.buttonGaraje]}
              labelStyle={styles.buttonLabel}
              icon="arrow-right"
            >
              Ver más
            </Button>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F3F0FF',
    justifyContent: 'center',
  },
  headerDecoration: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 120,
    backgroundColor: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    opacity: 0.1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  card: {
    flex: 1,
    marginHorizontal: 8,
    borderRadius: 24,
    elevation: 8,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#7C3AED',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  cardGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 6,
  },
  glowLuces: {
    backgroundColor: '#A855F7',
    shadowColor: '#A855F7',
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 4,
  },
  glowPuertas: {
    backgroundColor: '#9333EA',
    shadowColor: '#9333EA',
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 4,
  },
  glowClima: {
    backgroundColor: '#8B5CF6',
    shadowColor: '#8B5CF6',
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 4,
  },
  glowGaraje: {
    backgroundColor: '#7C3AED',
    shadowColor: '#7C3AED',
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 4,
  },
  cardLuces: {
    borderWidth: 1,
    borderColor: '#E9D5FF',
  },
  cardPuertas: {
    borderWidth: 1,
    borderColor: '#DDD6FE',
  },
  cardClima: {
    borderWidth: 1,
    borderColor: '#C4B5FD',
  },
  cardGaraje: {
    borderWidth: 1,
    borderColor: '#A78BFA',
  },
  cardContent: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 16,
    padding: 16,
    borderRadius: 20,
    backgroundColor: '#FAF7FF',
    elevation: 3,
  },
  iconShadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 20,
    opacity: 0.3,
  },
  shadowLuces: {
    backgroundColor: '#E9D5FF',
  },
  shadowPuertas: {
    backgroundColor: '#DDD6FE',
  },
  shadowClima: {
    backgroundColor: '#C4B5FD',
  },
  shadowGaraje: {
    backgroundColor: '#A78BFA',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#581C87',
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  titleLuces: {
    color: '#7C3AED',
  },
  titlePuertas: {
    color: '#8B5CF6',
  },
  titleClima: {
    color: '#9333EA',
  },
  titleGaraje: {
    color: '#A855F7',
  },
  cardDescription: {
    fontSize: 13,
    color: '#6B46C1',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 18,
    fontWeight: '500',
  },
  button: {
    width: '100%',
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#7C3AED',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  buttonLuces: {
    backgroundColor: '#A855F7',
  },
  buttonPuertas: {
    backgroundColor: '#9333EA',
  },
  buttonClima: {
    backgroundColor: '#8B5CF6',
  },
  buttonGaraje: {
    backgroundColor: '#7C3AED',
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.3,
    paddingVertical: 4,
  },
});