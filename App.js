import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Text, View, ScrollView, Button, Alert, SafeAreaView, } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import * as Random from 'expo-random';
import styles from './styles';

export default function App() {
  const [lat, setLat] = useState(65.00811)
  const [lon, setLon] = useState(25.50132)
  const [lat1, setLat1] = useState(65.008038)
  const [lon1, setLon1] = useState(25.501001)
  const [info, setInfo] = useState(false)
  const [first, setFirst] = useState(true)
  const [result, setResult] = useState(false)
  const [uusiKartta, setUusiKartta] = useState(false)
  const [markers1, setMarkers1] = useState([
    {"lat":65.00811,"lon":25.50132}
  ])
  const [markers, setMarkers] = useState([])
/*
 //paikka tulisi satunnaisesti mutta ei toimi Random.nextDouble...
 //setLat(Random.nextDouble(64.98359,65.07350));
 //setLon(Random.nextDouble(25.40329,25.60391));

      Alert.alert('Tervetuloa OuluGuesseriin! Lisätietoja pelistä löydät (?) näppäimestä!')
*/
  if (info == true) {
    Alert.alert('Pelin säännöt: Tavoitteenasi on paikantaa ja merkata toiselle kartalle mahdollisimman tarkasti missä ensimmäisen kartan pinni on. Aseta pinni painamalla karttaa pitkään.')
    setInfo(false)
  }

  if (uusiKartta == true) {
    //simuloidaan hardcodella toinen lokaatio (ei toimi..)
      setLat(65.01635)
      setLon(25.47853)
  }

  if (result == true) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
        <Button title='(?)' style={styles.header} onPress={() => {setInfo(true)}}></Button>
        <Text style={styles.header}>OuluGuesser</Text>
        <MapView style={styles.map} zoomEnabled='false' scrollEnabled='false' mapType='satellite'
      initialRegion={{
        latitude: lat,
        longitude: lon,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
      >
        {markers1.map((marker1,index) => (
          <Marker key={index} coordinate={{latitude: marker1.lat, longitude: marker1.lon}}/>
        ))}
      </MapView>
        
        <MapView style={styles.map} mapType='standard'
        initialRegion={{
          latitude: lat1,
          longitude: lon1,
          latitudeDelta: 0.1922,
          longitudeDelta: 0.1441,
        }}>
          {markers.map((marker,index) => (
            <Marker key={index} pinColor='blue' coordinate={{latitude: marker.lat1, longitude: marker.lon1}}/>
          ))}
           {markers1.map((marker1,index) => (
            <Marker key={index} coordinate={{latitude: marker1.lat, longitude: marker1.lon}}/>
          ))}
        </MapView>

        <Button title='ANNA UUSI KARTTA' style={styles.vastausbtn} onPress={() => {setUusiKartta(true)}}></Button>
        <StatusBar style="auto" />
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (first == true) {
    Alert.alert('Tervetuloa OuluGuesseriin! Lisätietoja pelistä löydät (?) näppäimestä!')
    setFirst(false)
  }

  return (
    
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <Button title='(?)' style={styles.header} onPress={() => {setInfo(true)}}></Button>
      <Text style={styles.header}>OuluGuesser</Text>
      <MapView style={styles.map} zoomEnabled='false' scrollEnabled='false' mapType='satellite'
      initialRegion={{
        latitude: lat,
        longitude: lon,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
      >
        {markers1.map((marker1,index) => (
          <Marker key={index} coordinate={{latitude: marker1.lat, longitude: marker1.lon}}/>
        ))}
      </MapView>
      
      <MapView style={styles.map} mapType='standard'
      initialRegion={{
        latitude: lat1,
        longitude: lon1,
        latitudeDelta: 0.1922,
        longitudeDelta: 0.1441,
      }}
      onLongPress={(e) => {
        const newMarker = {"lat1":e.nativeEvent.coordinate.latitude,"lon1":e.nativeEvent.coordinate.longitude}
        const updatedMarkers = [markers, newMarker]
        setMarkers(updatedMarkers)
      }}>
        {markers.map((marker,index) => (
          <Marker key={index} pinColor='blue' coordinate={{latitude: marker.lat1, longitude: marker.lon1}}/>
        ))}
      </MapView>
      <Button title='NÄYTÄ VASTAUS' style={styles.vastausbtn} onPress={() => {setResult(true)}}></Button>
      <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
}
