import { StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
  
    <SafeAreaView style={styles.background}>
      <View style={styles.container}>

        <Image
            source={require('@/assets/images/circle.png')} // You'll need to add your own image
            style={styles.circleImage}
            resizeMode="contain"
          />

      </View>

      <View style={styles.buttonGrid}>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>BUTTON 1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>BUTTON 2</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>BUTTON 3</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>BUTTON 4</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.emailtext}>Email</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="#888"
            keyboardType="email-address"
          />
        </View>


    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    backgroundColor: "#ffffff",
    flex: 1
  },
  circleImage: {
    width: 150,
    height: 150,
    marginTop: 30,
  },
  buttonGrid: {
    width: '100%',
    marginBottom: 20,
    marginTop: 20
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: '#000',
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '60%',
    height: 40,
    borderBottomWidth: 2,
    borderBottomColor: '#E91E63',
    fontSize: 16,
    marginLeft: 40
  
  },
  emailtext: {
   paddingLeft: 20,
   fontSize: 20
  }
});
