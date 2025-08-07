import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const BookingScreen = () => {
  const [divisi, setDivisi] = useState('');
  const [ruangan, setRuangan] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [waktuMulai, setWaktuMulai] = useState('');
  const [waktuSelesai, setWaktuSelesai] = useState('');
  const [jumlahPeserta, setJumlahPeserta] = useState('');

  const handleSubmit = () => {
    if (
      divisi && ruangan && tanggal &&
      waktuMulai && waktuSelesai && jumlahPeserta
    ) {
      Alert.alert("Sukses", "Booking berhasil!", [{ text: "OK", style: "default" }]);
      // Lanjutkan ke API POST jika diperlukan
    } else {
      Alert.alert("Gagal", "Mohon lengkapi semua data.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Divisi</Text>
      <Picker
        selectedValue={divisi}
        onValueChange={(itemValue) => setDivisi(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Pilih Divisi" value="" />
        <Picker.Item label="Marketing" value="Marketing" />
        <Picker.Item label="IT" value="IT" />
        <Picker.Item label="HRD" value="HRD" />
      </Picker>

      <Text style={styles.label}>Ruang Meeting</Text>
      <Picker
        selectedValue={ruangan}
        onValueChange={(itemValue) => setRuangan(itemValue)}
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

      <Text style={styles.label}>Waktu Mulai</Text>
      <TextInput
        style={styles.input}
        placeholder="08:00"
        value={waktuMulai}
        onChangeText={setWaktuMulai}
      />

      <Text style={styles.label}>Waktu Selesai</Text>
      <TextInput
        style={styles.input}
        placeholder="09:00"
        value={waktuSelesai}
        onChangeText={setWaktuSelesai}
      />

      <Text style={styles.label}>Jumlah Peserta</Text>
      <TextInput
        style={styles.input}
        placeholder="Masukkan jumlah peserta"
        keyboardType="numeric"
        value={jumlahPeserta}
        onChangeText={setJumlahPeserta}
      />

      <View style={styles.buttonContainer}>
        <Button title="Submit" color="#27ae60" onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff'
  },
  label: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: 'bold'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginTop: 5
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 5
  },
  buttonContainer: {
    marginTop: 30
  }
});