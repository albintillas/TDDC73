import { Image, StyleSheet, Platform, Dimensions, View } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from "@/components/Card"

export default function HomeScreen() {

  return (
    <View style={styles.backgroundPlain}>
        <Card/>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundPlain:{
    flex: 1,
    backgroundColor: "#ADD8E6"
  },
  backgroundImage:{
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,

  }
});
