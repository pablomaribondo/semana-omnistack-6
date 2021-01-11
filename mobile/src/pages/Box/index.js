import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {formatDistanceToNow, parseJSON} from 'date-fns';
import {launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FileViewer from 'react-native-file-viewer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import pt from 'date-fns/locale/pt';
import RNFS from 'react-native-fs';
import socket from 'socket.io-client';

import api from '../../services/api';

import styles from './styles';

const Box = () => {
  const [box, setBox] = useState({});

  useEffect(() => {
    (async () => {
      const id = await AsyncStorage.getItem('@RocketBox:box');
      subscribeToNewFiles(id);

      const response = await api.get(`boxes/${id}`);

      setBox(response.data);
    })();
  }, []);

  const subscribeToNewFiles = (id) => {
    const io = socket('http://10.0.3.2:3333');

    io.emit('connectRoom', id);

    io.on('file', (data) => {
      setBox((boxState) => ({...boxState, files: [data, ...boxState.files]}));
    });
  };

  const handleUpload = () => {
    launchImageLibrary({}, async (upload) => {
      if (upload.error) {
        console.log('ImagePicker Error');
      } else if (upload.didCancel) {
        console.log('Canceled by user');
      } else {
        const data = new FormData();

        const [prefix, suffix] = upload.fileName.split('.');
        const ext = suffix.toLowerCase() === 'heic' ? 'jpg' : suffix;

        data.append('file', {
          uri: upload.uri,
          type: upload.type,
          name: `${prefix}.${ext}`,
        });

        api.post(`boxes/${box._id}/files`, data);
      }
    });
  };

  const openFile = async (file) => {
    try {
      const filePath = `${RNFS.DocumentDirectoryPath}/${file.title}`;
      const url = file.url.replace('localhost', '10.0.3.2');

      await RNFS.downloadFile({
        fromUrl: url,
        toFile: filePath,
      });

      await FileViewer.open(filePath);
    } catch (error) {
      console.log('Arquivo não suportado!');
    }
  };

  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => openFile(item)} style={styles.file}>
      <View style={styles.fileInfo}>
        <Icon name="insert-drive-file" size={24} color="#a5cfff" />
        <Text style={styles.fileTitle}>{item.title}</Text>
      </View>

      <Text style={styles.fileDate}>
        há {formatDistanceToNow(parseJSON(item.createdAt), {locale: pt})}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.boxTitle}>{box.title}</Text>

      <FlatList
        style={styles.list}
        data={box.files}
        keyExtractor={(file) => file._id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={renderItem}
      />

      <TouchableOpacity style={styles.fab} onPress={handleUpload}>
        <Icon name="cloud-upload" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default Box;
