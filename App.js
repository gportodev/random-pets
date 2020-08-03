import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text, 
  SafeAreaView, 
  ScrollView, 
  Image, 
  ActivityIndicator,
  RefreshControl, 
} from 'react-native';

import Constants from 'expo-constants'

import randomColor from 'randomcolor'

export default function App() {
  const [loading, setLoading] = useState(false)
  const [pet, setPet] = useState();
  const changeColor = randomColor()


  const loadPet = async () => {
    const res = await fetch("https://dog.ceo/api/breeds/image/random")
    const data = await res.json();
    await Image.prefetch(data.message)
    setPet(data.message)
    setLoading(false)
  }

  useEffect(()=> {
    loadPet()
    changeColor
  }, [])

  if(!pet) return <ActivityIndicator size="large" />

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={loadPet} />
        }
      >
        <Image style={styles.pic} source={{ uri: pet }} />
        <Text style={[styles.paragraph, { color: changeColor }]}>Dog</Text>
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    justifyContent: 'center',
    padding: 8
  },
  paragraph: {
    margin: 25,
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pic: {
    marginTop: 40,
    height: 500,
    width: 400,
    borderRadius: 15,
  }
});
