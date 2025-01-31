import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native"
import React, { useState } from "react"
import TestPassword from "@/components/TestPassword"

export default function Index() {
  const [password, setPassword] = useState<string>("")

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.text}>Test the strength of your password</Text>
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            placeholder="Insert password..."
            hitSlop={{ top: 20, bottom: 20 }}
          />
          <Text style={styles.text}>Strength of password:</Text>
          <TestPassword testPassword={password} textColor="#ffffff" />
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  input: {
    height: 40,
    fontSize: 16,
    margin: 12,
    marginTop: 10,
    width: "60%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 8,
    color: "#ffffff",
  },
  text: {
    fontSize: 16,
    color: "#ffffff",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    bottom: 100,
  },
})
