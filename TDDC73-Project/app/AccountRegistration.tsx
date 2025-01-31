import {
  StyleSheet,
  SafeAreaView,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native"
import React from "react"
import AccountCreation from "@/components/AccountCreation"

const AccountRegistration = () => {
  // Handle form submission
  const handleAccountCreation = (data: { [key: string]: string }) => {
    Alert.alert("Account Created!", JSON.stringify(data, null, 2))
    console.log("Account Data:", data)
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <AccountCreation
          accountType="email" // Byt mellan username & email
          fields={{
            // Välj vilka input fields
            firstName: { show: true, required: false },
            lastName: { show: true }, // required = false om inget anges
            password: { show: true, required: true },
          }}
          onSubmit={handleAccountCreation}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
})

export default AccountRegistration
