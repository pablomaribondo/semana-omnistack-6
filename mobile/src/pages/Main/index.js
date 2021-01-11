import React, {useState, useEffect} from 'react';
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../../services/api';

import logo from '../../assets/logo.png';
import styles from './styles';

const Main = (props) => {
  const {navigation} = props;
  const [newBox, setNewBox] = useState('');

  useEffect(() => {
    (async () => {
      const box = await AsyncStorage.getItem('@RocketBox:box');

      if (box) {
        navigation.navigate('Box');
      }
    })();
  }, []);

  const handleSignIn = async () => {
    const response = await api.post('boxes', {
      title: newBox,
    });

    await AsyncStorage.setItem('@RocketBox:box', response.data._id);

    navigation.navigate('Box');
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={logo} />

      <TextInput
        style={styles.input}
        placeholder="Crie um box"
        placeholderTextColor="#999"
        autoCapitalize="none"
        autoCorrect={false}
        underlineColorAndroid="transparent"
        value={newBox}
        onChangeText={(text) => setNewBox(text)}
      />

      <TouchableOpacity onPress={handleSignIn} style={styles.button}>
        <Text style={styles.buttonText}>Criar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Main;
