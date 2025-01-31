import React, { useState } from "react"
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native"
import { IconSymbol } from "@/components/ui/IconSymbol"
import TestPassword from "./TestPassword"

interface FieldConfig {
  // Beställmer om ett fält ska visas eller ej
  show: boolean
  // Bestämmer om ett fält är mandatory eller ej. ? för att den kan vara null / optional
  required?: boolean
}

interface AccountCreationProps {
  // Skapa konto med email eller username?
  accountType: "email" | "username"

  fields?: {
    firstName?: FieldConfig //Välj vilka fält som ska vara synliga
    lastName?: FieldConfig
    password?: FieldConfig
  }
  // Tar hand om onSubmit fältens data, och att vi kan göra en funktion i komponenten
  onSubmit: (data: { [key: string]: string }) => void
}

const AccountCreationForm: React.FC<AccountCreationProps> = ({
  accountType,
  fields = {},
  onSubmit,
}) => {
  // Formulärs inputs
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [password, setPassword] = useState("")

  // Checkar alla krav på inputs
  const handleSubmit = () => {
    const formData: { [key: string]: string } = {}

    // Kollar så mail fältet är ifyllt
    if (accountType === "email" && !email) {
      Alert.alert("Error", "Email is required.")
      return
    } else formData.email = email

    // Kollar så username fältet är ifyllt
    if (accountType === "username" && !username) {
      Alert.alert("Error", "Username is required.")
      return
    } else formData.username = username

    // Kollar om firstname fältet visas, och om det är ett krav att fylla i
    if (fields.firstName?.show) {
      if (fields.firstName.required && !firstName) {
        Alert.alert("Error", "First Name is required.")
        return
      }
      formData.firstName = firstName
    }

    // Samma som firstname checken
    if (fields.lastName?.show) {
      if (fields.lastName.required && !lastName) {
        Alert.alert("Error", "Last Name is required.")
        return
      }
      formData.lastName = lastName
    }

    // Samma som firstname checken
    if (fields.password?.show) {
      if (fields.password.required && !password) {
        Alert.alert("Error", "Password is required.")
        return
      }
      formData.password = password
    }

    // Ger tillbaka datan från formData till "funktionen" i huvudfilen
    // i detta fall "handleAccountCreation" i albin.tsx
    onSubmit(formData)
  }

  return (
    <View style={styles.container}>
      {accountType === "email" ? (
        <View style={styles.sidebyside}>
          <IconSymbol
            size={28}
            name="mail"
            color="#ffffff"
            style={styles.icon}
          />
          <Text style={styles.title}>Create Account with Email</Text>
        </View>
      ) : accountType === "username" ? (
        <View style={styles.sidebyside}>
          <IconSymbol
            size={28}
            name="person"
            color="#ffffff"
            style={styles.icon}
          />
          <Text style={styles.title}>Create Account with Username</Text>
        </View>
      ) : null}

      {/* Visa Email eller Username fältet baserad på accountType */}
      {accountType === "email" ? (
        <View>
          <Text style={styles.text}>Email:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            hitSlop={{ top: 10, bottom: 10 }}
          />
        </View>
      ) : accountType === "username" ? (
        <View>
          <Text style={styles.text}>Username:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your username"
            onChangeText={setUsername}
            autoCapitalize="none"
            hitSlop={{ top: 10, bottom: 10 }}
          />
        </View>
      ) : null}

      {/* Firstname */}
      {fields.firstName?.show && (
        <View>
          <Text style={styles.text}>First Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your first name"
            onChangeText={setFirstName}
            hitSlop={{ top: 10, bottom: 10 }}
          />
        </View>
      )}

      {/* Lastname */}
      {fields.lastName?.show && (
        <View>
          <Text style={styles.text}>Last Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your last name"
            onChangeText={setLastName}
            hitSlop={{ top: 10, bottom: 10 }}
          />
        </View>
      )}

      {/* Password */}
      {fields.password?.show && (
        <View>
          <Text style={styles.text}>Password:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            onChangeText={setPassword}
            secureTextEntry
            hitSlop={{ top: 20, bottom: 20 }}
          />
          <View style={{ alignSelf: "center" }}>
            <TestPassword testPassword={password} textColor="#ffffff" />
          </View>
        </View>
      )}

      {/* Submit Button */}
      <Button color="#ffffff" title="Create Account" onPress={handleSubmit} />
    </View>
  )
}

export default AccountCreationForm

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 8,
    color: "#ffffff",
  },
  text: {
    color: "#ffffff",
  },
  sidebyside: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    padding: 10,
  },
  icon: {
    position: "absolute",
    left: 0,
  },
})
