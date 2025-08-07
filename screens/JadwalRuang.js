import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Alert,
  ActivityIndicator
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const JadwalRuang = () => {
  const [ruangan, setRuangan] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [jadwalList, setJadwalList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchJadwal = async () => {
    if (!ruangan || !tanggal) {
      Alert.alert("Peringatan", "Pilih ruang dan tanggal terlebih dahulu.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        'https://uat-api.ftlgym.com/api/v1/test/jadwalruangan'
      );
      const data = response.data.data;

      // Filter berdasarkan nama ruangan dan tanggal jika diperlukan
      const filtered = data.filter(item => item.nama_ruangan === ruangan);

      setJadwalList(filtered);
    } catch (error) {
      Alert.alert("Gagal", "Tidak dapat mengambil data jadwal.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch otomatis saat tanggal atau ruangan berubah
    if (ruangan && tanggal) {
      fetchJadwal();
    }
  }, [ruangan, tanggal]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Ruang Meeting</Text>
      <Picker
        selectedValue={ruangan}
        onValueChange={(value) => setRuangan(value)}
        style={styles.picker}
      >
        <Picker.Item label="Pilih Ruangan" value="" />
        <Picker.Item label="Squats Room" value="Squats Room" />
        <Picker.Item label="Lungles Room" value="Lungles Room" />
      </Picker>

      <Text style={styles.label}>Tanggal Meeting</Text>
      <TextInput
        style={styles.input}
        placeholder="YYYY-MM-DD"
        value={tanggal}
        onChangeText={setTanggal}
      />

      <Text style={styles.label}>Jadwal Tersedia:</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#2980b9" />
      ) : (
        <FlatList
          data={jadwalList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.timeText}>
                {item.waktu_mulai} - {item.waktu_selesai}
              </Text>
              <Text style={styles.roomText}>{item.nama_ruangan}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default JadwalRuang;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  label: {
    marginTop: 15,
    fontWeight: 'bold',
    fontSize: 16,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 5,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    marginTop: 5,
  },
  card: {
    marginTop: 15,
    backgroundColor: '#ecf0f1',
    padding: 15,
    borderRadius: 6,
  },
  timeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  roomText: {
    fontSize: 14,
    color: '#7f8c8d',
  },
});