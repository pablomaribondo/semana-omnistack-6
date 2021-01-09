import React from 'react';
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';

import logo from '../../assets/logo.png';
import styles from './styles';

const Main = () => {
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
      />

      <TouchableOpacity onPress={() => {}} style={styles.button}>
        <Text style={styles.buttonText}>Criar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Main;
