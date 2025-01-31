import { Image, StyleSheet, Platform, View, FlatList, Text, Button, TouchableOpacity, Modal } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { GetRepo } from '@/components/getRepo';
import {Picker} from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';



export default function HomeScreen() {

  const [repos, setRepos] = useState<any[]>([]);
  const [language, setLanguage] = useState('java'); // Default to "Java"
  const [sort, setSort] = useState('stars'); // Default to "Stars"
  const [order, setOrder] = useState('desc'); // Default to "Descending"
  const [perPage, setPerPage] = useState(10); // Default to 10  
  const [fetch, setFetch] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState<any>(null);


  const handleFetchRepos = (fetchedRepos: any[]) => {
    setRepos(fetchedRepos);
    setFetch(false)
  }

  const fetchRepos = () => {
    setFetch(true);
  };

  const openModal = (repo: any) => {
    setSelectedRepo(repo);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedRepo(null);
  };

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.sidebyside}>
          
        <Picker style={styles.picker} 
          itemStyle={styles.pickerItemStyle}
          selectedValue={language}
          onValueChange={(itemValue, itemIndex) =>
            setLanguage(itemValue)
          }>
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
            <Picker.Item label="C++" value="cpp" />
        </Picker>

        <Picker style={styles.picker}
            itemStyle={styles.pickerItemStyle}
            selectedValue={sort}
            onValueChange={(itemValue, itemIndex) =>
              setSort(itemValue)
            }>
              <Picker.Item label="Stars" value="stars" />
              <Picker.Item label="Forks" value="forks" />
              <Picker.Item label="Updated At" value="updated" />
        </Picker>
      </View>
      <View style={styles.sidebyside}>

        <Picker style={styles.picker}
            itemStyle={styles.pickerItemStyle}
            selectedValue={order}
            onValueChange={(itemValue, itemIndex) =>
              setOrder(itemValue)
            }>
              <Picker.Item label="Decending" value="desc" />
              <Picker.Item label="Ascending" value="asc" />
           
          </Picker>

          <Picker style={styles.picker}
              itemStyle={styles.pickerItemStyle}
              selectedValue={perPage}
              onValueChange={(itemValue, itemIndex) =>
                setPerPage(itemValue)
              }>
                <Picker.Item label="10" value="10" />
                <Picker.Item label="20" value="20" />
                <Picker.Item label="30" value="30" />
          </Picker>
      </View>
      <View style={styles.button}>
        <Button title="Fetch Repos" onPress={fetchRepos} color="#ffffff"/>
      </View>
      {fetch && (
        <GetRepo 
          language={language} 
          sort={sort} 
          order={order} 
          perPage={perPage} 
          onFetchRepos={handleFetchRepos} 
        />
      )}

      <View style={styles.mid}>
      <FlatList
        data={repos}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.flatListContentContainer}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View style={styles.sidebyside}>
              <Text style={styles.textBold}>Name: </Text>
              <Text style={styles.text}>{item.name}</Text>
              <TouchableOpacity style={styles.infoIcon} onPress={() => router.push({
                pathname: "/details",
                params: {repo: JSON.stringify(item)}
              })}
              hitSlop={{ top: 25, bottom: 25, left: 25, right: 25 }}>
                  <Ionicons name="information-circle-outline" size={24} color="white" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.sidebyside}>
              <Text style={styles.textBold}>Stars: </Text>
              <Text style={styles.text}>{item.stargazers_count}</Text>
            </View>

          </View>
        )}
      />
      </View>

      {selectedRepo && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTextBold}>Name: </Text>
              <Text style={styles.modalText}>{selectedRepo.name}</Text>
              <Text style={styles.modalTextBold}>Stars: </Text>
              <Text style={styles.modalText}>{selectedRepo.stargazers_count}</Text>
              <Text style={styles.modalTextBold}>Language: </Text>
              <Text style={styles.modalText}>{selectedRepo.language}</Text>
              <Text style={styles.modalTextBold}>Description: </Text>
              <Text style={styles.modalText}>{selectedRepo.description}</Text>
              <Button title="Close" onPress={closeModal} color="#ffffff" />
            </View>
          </View>
        </Modal>
      )}
      
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  sidebyside:{
    flexDirection: "row",
    alignItems: "center"
    
  },
  inputContainer:{
    flexDirection: "column",
  },
  itemContainer: {
    padding: 10, 
    backgroundColor: '#2b2b2b',
    justifyContent: "center",
    top: 5,
    borderRadius: 10,
    marginBottom: 20,
    width: 350,
    height: 70
  },
  text: {
    color: "#ffffff",
    flex: 1,
    flexWrap: 'wrap', // Ensure text wraps within the container

  },
  textBold:{
    color: "#ffffff",
    fontWeight: "bold",
  },
  picker: {
    width: "50%",
  },
  pickerItemStyle: {
    height: 104,
    fontSize: 16,
    color: "#ffffff"
  },
  button: {
    backgroundColor: "#306337",
    position: "fixed",
    left: "30%",
    right: "30%",
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    borderRadius: 10
  },
  mid: {
    alignItems: "center",
    top: 10,
    
  },
  flatListContentContainer: {
    paddingBottom: 400, 
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: '#1f1f1f',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    
  },
  infoIcon: {
    position: "absolute",
    right: 6,
    top: 7
  },
  modalText: {
    color: "#ffffff",
    marginBottom: 15

  },
  modalTextBold:{
    color: "#ffffff",
    fontWeight: "bold",
    marginBottom: 2
  },
});
