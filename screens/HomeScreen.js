import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
  const [jadwal, setJadwal] = useState([]);

  useEffect(() => {
    fetchJadwal();
  }, []);

  const fetchJadwal = async () => {
    try {
      const response = await axios.get('https://uat-api.ftlgym.com/api/v1/test/jadwalruangan');
      if (response.data.status === 'success') {
        setJadwal(response.data.data);
      }
    } catch (error) {
      console.error('Gagal mengambil data:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.jadwalItem}>
      <Text style={styles.ruangan}>{item.nama_ruangan}</Text>
      <Text>{item.waktu_mulai} - {item.waktu_selesai}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Profile */}
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/100' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>Yosi</Text>
        <Text style={styles.job}>Website Developer</Text>
      </View>

      {/* Jadwal Ruangan */}
      <Text style={styles.sectionTitle}>Jadwal Ruang Meeting</Text>
      <FlatList
        data={jadwal}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />

      {/* Navigation Buttons */}
      <View style={styles.menuButtons}>
        <Button
          title="Jadwal Ruang Meeting"
          onPress={() => navigation.navigate('JadwalRuang')}
          color="#3498db"
        />
        <Button
          title="Booking Ruang Meeting"
          onPress={() => navigation.navigate('BookingScreen')}
          color="#2ecc71"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  job: {
    fontSize: 16,
    color: 'gray',
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  jadwalItem: {
    padding: 10,
    backgroundColor: '#f1f1f1',
    marginBottom: 10,
    borderRadius: 8,
  },
  ruangan: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
});

export default HomeScreen;