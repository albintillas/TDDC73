import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import { LinearGradient } from "expo-linear-gradient"

//password as arg
const TestPassword = ({testPassword, textColor,}: {
  testPassword: string
  textColor: string
}) => {
  console.log(testPassword)
  const [strength, setStrength] = useState<string>("")

  const calcStrength = (testPassword: string) => {
    let strengthLevel = ""

    const attributes = {
      length: /.{8,}/, // needs this to even be considere valid(will show Too Short until fixed)
      lengthPlus: /.{12,}/,
      gotNumber: /[0-9]/,
      lowCase: /[a-z]/,
      highCase: /[A-Z]/,
      specChar: /[!@¤%&/{}()+?´'*§]/,
    }

    let points: number = 0

    // "length" är inte med här för att det ej ska visas något innan man skriver in lösenord
    if (attributes.lengthPlus.test(testPassword)) points++
    if (attributes.gotNumber.test(testPassword)) points++
    if (attributes.lowCase.test(testPassword)) points++
    if (attributes.highCase.test(testPassword)) points++
    if (attributes.specChar.test(testPassword)) points++

    if (!testPassword) {
      strengthLevel = ""
      // Check so length is atleast 8 characters
    } else if (!attributes.length.test(testPassword)) {
      strengthLevel = "TOO SHORT"
    } else {
      switch (points) {
        case 0:
        case 1:
          strengthLevel = "WEAK"
          break
        case 2:
        case 3:
          strengthLevel = "MEDIUM"
          break
        case 4:
        case 5:
          strengthLevel = "STRONG"
          break
        default:
          strengthLevel = ""
          break
      }
    }
    setStrength(strengthLevel)
  }

  // Varje gång ett tecken ändras, testa password
  useEffect(() => {
    calcStrength(testPassword)
  }, [testPassword])

  const strengthColor = (): readonly [string, string] => {
    switch (strength) {
      case "TOO SHORT":
        return ["#FF4D4D", "#FF4D4D"] as const
      case "WEAK":
        return ["#FF4D4D", "#FF4D4D"] as const
      case "MEDIUM":
        return ["#FFD700", "#FFA500"] as const
      case "STRONG":
        return ["#4CAF50", "#2E7D32"] as const
      default:
        return ["#E0E0E0", "#BDBDBD"] as const
    }
  }

  const strengthWidth = (): number => {
    switch (strength) {
      case "TOO SHORT":
        return 0
      case "WEAK":
        return 34
      case "MEDIUM":
        return 68
      case "STRONG":
        return 100
      default:
        return 0
    }
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.textStyle, { color: textColor }]}> {strength}</Text>
      <View style={styles.gradientContainer}>
        <LinearGradient
          colors={strengthColor()}
          style={[styles.bar, { width: `${strengthWidth()}%` }]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    paddingTop: 5,
    paddingBottom: 5,
  },
  bar: {
    height: 10,
    borderRadius: 10,
    backgroundColor: "#d3d3d3",
  },
  gradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  view: {
    width: 100,
  },
  gradientContainer: {
    width: "100%",
    height: 8,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    overflow: "hidden",
  },
})

export default TestPassword
