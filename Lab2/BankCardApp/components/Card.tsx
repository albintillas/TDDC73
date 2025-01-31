import React, { useState, useEffect, useRef } from "react"
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Animated,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native"

type CardType =
  | "visa"
  | "mastercard"
  | "amex"
  | "discover"
  | "diners_club"
  | "unknown"

// NEW: Add card format configurations
const CARD_FORMATS = {
  visa: {
    length: 16,
    cvvLength: 3,
    groups: [4, 4, 4, 4],
  },
  mastercard: {
    length: 16,
    cvvLength: 3,
    groups: [4, 4, 4, 4],
  },
  amex: {
    length: 15,
    cvvLength: 4,
    groups: [4, 6, 5],
  },
  discover: {
    length: 16,
    cvvLength: 3,
    groups: [4, 4, 4, 4],
  },
  diners_club: {
    length: 14,
    cvvLength: 3,
    groups: [4, 4, 4, 2],
  },
  unknown: {
    length: 16,
    cvvLength: 3,
    groups: [4, 4, 4, 4],
  },
}

const CARD_BACKGROUND_COUNT = 25

const getCardBackground = (index: number) => {
  const images = [
    require("@/assets/images/card/1.jpeg"),
    require("@/assets/images/card/2.jpeg"),
    require("@/assets/images/card/3.jpeg"),
    require("@/assets/images/card/4.jpeg"),
    require("@/assets/images/card/5.jpeg"),
    require("@/assets/images/card/6.jpeg"),
    require("@/assets/images/card/7.jpeg"),
    require("@/assets/images/card/8.jpeg"),
    require("@/assets/images/card/9.jpeg"),
    require("@/assets/images/card/10.jpeg"),
    require("@/assets/images/card/11.jpeg"),
    require("@/assets/images/card/12.jpeg"),
    require("@/assets/images/card/13.jpeg"),
    require("@/assets/images/card/14.jpeg"),
    require("@/assets/images/card/15.jpeg"),
    require("@/assets/images/card/16.jpeg"),
    require("@/assets/images/card/17.jpeg"),
    require("@/assets/images/card/18.jpeg"),
    require("@/assets/images/card/19.jpeg"),
    require("@/assets/images/card/20.jpeg"),
    require("@/assets/images/card/21.jpeg"),
    require("@/assets/images/card/22.jpeg"),
    require("@/assets/images/card/23.jpeg"),
    require("@/assets/images/card/24.jpeg"),
    require("@/assets/images/card/25.jpeg"),
  ]
  return images[index - 1]
}

const detectCardType = (number: string): string => {
  if (/^4/.test(number)) return "visa" // Starts with 4
  if (/^5[1-5]/.test(number)) return "mastercard" // Starts with 51-55
  if (/^(34|37)/.test(number)) return "amex" // Starts with 34 or 37
  if (/^6/.test(number)) return "discover" // Starts with 6
  if (/^3(?:0[0-5]|[68])/.test(number)) return "diners_club" // Starts with 300-305, 36, 38
  return "unknown"
}

const Card = () => {
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [cardMonth, setCardMonth] = useState("")
  const [cardYear, setCardYear] = useState("")
  const [cardCvv, setCardCvv] = useState("")
  const [isCvvFocused, setIsCvvFocused] = useState(false)
  const [currentCardBackground, setCurrentCardBackground] = useState(
    Math.floor(Math.random() * CARD_BACKGROUND_COUNT + 1)
  )
  const [animations, setAnimations] = useState(
    Array.from({ length: 16 }, () => ({
      scale: new Animated.Value(1),
      opacity: new Animated.Value(1),
    }))
  )

  // NEW: Get card format based on type
  const cardType = detectCardType(cardNumber) as CardType
  const cardFormat = CARD_FORMATS[cardType]

  const animateCharacter = (index: number) => {
    const { scale, opacity } = animations[index]

    Animated.parallel([
      Animated.timing(scale, {
        toValue: 1.2,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0.5,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start()
    })
  }

  useEffect(() => {
    if (cardNumber.length > 0) {
      animateCharacter(cardNumber.length - 1)
    }
  }, [cardNumber])

  const frontAnim = useRef(new Animated.Value(0)).current
  const backAnim = useRef(new Animated.Value(1)).current

  const flipCard = (toBack: boolean) => {
    Animated.timing(frontAnim, {
      toValue: toBack ? 1 : 0,
      duration: 400,
      useNativeDriver: false,
    }).start()
  }

  const handleFocus = (focused: boolean) => {
    setIsCvvFocused(focused)
    flipCard(focused)
  }

  // NEW: Add function to format card number according to groups
  const formatCardNumber = (number: string, groups: number[]): string[] => {
    let formattedGroups: string[] = []
    let currentIndex = 0

    groups.forEach((groupSize) => {
      formattedGroups.push(number.slice(currentIndex, currentIndex + groupSize))
      currentIndex += groupSize
    })

    return formattedGroups
  }

  // MODIFIED: Updated renderCardNumber to use dynamic grouping
  const renderCardNumber = () => {
    const { length, groups } = cardFormat
    const masked = "X".repeat(length - cardNumber.length)
    const fullNumber = (cardNumber + masked).slice(0, length)
    const formattedGroups = formatCardNumber(fullNumber, groups)

    let globalIndex = 0
    return formattedGroups.map((group, groupIndex) => (
      <View key={groupIndex} style={styles.digitGroup}>
        {group.split("").map((char, index) => {
          const currentGlobalIndex = globalIndex++
          return (
            <Animated.Text
              key={currentGlobalIndex}
              style={[
                styles.cardDigit,
                {
                  transform: [{ scale: animations[currentGlobalIndex]?.scale }],
                  opacity: animations[currentGlobalIndex]?.opacity,
                },
              ]}
            >
              {char}
            </Animated.Text>
          )
        })}
      </View>
    ))
  }

  const transformStyle = {
    transform: [
      {
        rotateY: frontAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "180deg"],
        }),
      },
    ],
  }

  const backStyle = {
    transform: [
      {
        rotateY: frontAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ["180deg", "0deg"],
        }),
      },
    ],
  }

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.cardContainer}>
          {/* Front Side */}
          <Animated.View style={[styles.card, transformStyle]}>
            <Image
              source={getCardBackground(currentCardBackground)}
              style={styles.cardBackground}
            />
            <Image
              source={require("@/assets/images/card/chip.png")}
              style={styles.chip}
            />

            {cardType && (
              <Image
                source={
                  cardType === "visa"
                    ? require("@/assets/images/card/visa.png")
                    : cardType === "mastercard"
                    ? require("@/assets/images/card/mastercard.png")
                    : cardType === "amex"
                    ? require("@/assets/images/card/amex.png")
                    : cardType === "discover"
                    ? require("@/assets/images/card/discover.png")
                    : cardType === "diners_club"
                    ? require("@/assets/images/card/dinersclub.png")
                    : require("@/assets/images/card/unknown.png")
                }
                style={styles.logo}
              />
            )}

            <View style={styles.cardNumberAnimation}>{renderCardNumber()}</View>
            <View style={styles.cardDetails}>
              <View>
                <Text style={styles.cardLabel}>Card Holder</Text>
                <Text style={styles.cardValue}>{cardName || "John Doe"}</Text>
              </View>
              <View>
                <Text style={styles.cardLabel}>Expires</Text>
                <Text style={styles.cardValue}>
                  {cardMonth && cardYear ? `${cardMonth}/${cardYear}` : "MM/YY"}
                </Text>
              </View>
            </View>
          </Animated.View>

          {/* Back Side */}
          <Animated.View style={[styles.card, styles.cardBack, backStyle]}>
            <Image
              source={getCardBackground(currentCardBackground)}
              style={styles.cardBackground}
            />
            <Text style={styles.cvvLabel}>CVV</Text>
            {/* MODIFIED: Dynamic CVV placeholder */}
            <Text style={styles.cvvValue}>
              {cardCvv || "X".repeat(cardFormat.cvvLength)}
            </Text>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>

      {/* Input Fields */}
      <View style={styles.form}>
        {/* MODIFIED: Dynamic maxLength for card number */}
        <TextInput
          style={styles.input}
          placeholder="Card Number"
          placeholderTextColor="#808080"
          maxLength={cardFormat.length}
          value={cardNumber}
          onChangeText={(text) => setCardNumber(text.replace(/\D/g, ""))}
          keyboardType="numeric"
          onFocus={() => handleFocus(false)}
          onBlur={() => handleFocus(false)}
        />
        <TextInput
          style={styles.input}
          placeholder="Card Name"
          placeholderTextColor="#808080"
          value={cardName}
          onChangeText={(text) => setCardName(text)}
          onFocus={() => handleFocus(false)}
          onBlur={() => handleFocus(false)}
          maxLength={35}
        />
        <View style={styles.row}>
          <TextInput
            style={[styles.lastInput, styles.inputSmall]}
            placeholder="MM"
            placeholderTextColor="#808080"
            value={cardMonth}
            onChangeText={(text) => setCardMonth(text)}
            keyboardType="numeric"
            maxLength={2}
            onFocus={() => handleFocus(false)}
            onBlur={() => handleFocus(false)}
          />
          <TextInput
            style={[styles.lastInput, styles.inputSmall]}
            placeholder="YY"
            placeholderTextColor="#808080"
            value={cardYear}
            onChangeText={(text) => setCardYear(text)}
            keyboardType="numeric"
            maxLength={2}
            onFocus={() => handleFocus(false)}
            onBlur={() => handleFocus(false)}
          />
          {/* MODIFIED: Dynamic maxLength for CVV */}
          <TextInput
            style={[styles.lastInput, styles.inputSmall]}
            placeholder="CVV"
            placeholderTextColor="#808080"
            value={cardCvv}
            onChangeText={(text) => setCardCvv(text)}
            keyboardType="numeric"
            maxLength={cardFormat.cvvLength}
            onFocus={() => handleFocus(true)}
            onBlur={() => handleFocus(false)}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EAF6FF", // Light blue background
    paddingVertical: 10,
  },
  cardContainer: {
    width: "90%",
    aspectRatio: 1.6, // Standard credit card ratio
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20, // Space between card and form
    borderRadius: 15, // Matches a modern card look
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10, // For Android shadow effect
    backgroundColor: "#FFF", // Backup if no background image
    overflow: "hidden",
    position: "absolute",
    zIndex: 1,
    top: 75,
  },
  card: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
    position: "absolute",
    backfaceVisibility: "hidden",
  },
  cardBackground: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute",
  },
  cardDigit: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  chip: {
    width: 45,
    height: 45,
    position: "absolute",
    top: 15,
    left: 15,
    resizeMode: "contain",
  },
  cardNumberAnimation: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "28%",
  },
  digitGroup: {
    flexDirection: "row", // Render digits in a row
    marginHorizontal: 5, // Space between groups
  },
  logo: {
    width: 65,
    height: 40,
    position: "absolute",
    top: 15,
    right: 15,
    resizeMode: "contain",
  },
  cardNumber: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    letterSpacing: 2, // Space out the digits for readability
    marginTop: "40%",
    fontWeight: "bold",
  },
  cardDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 50,
    paddingHorizontal: 20,
  },
  cardLabel: {
    color: "#ccc",
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  cardValue: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  form: {
    width: "80%",
    backgroundColor: "#FFF",
    padding: 20,
    paddingTop: 100,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 5, // For Android shadow
    top: -70,
  },
  input: {
    backgroundColor: "#F9F9F9",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    borderColor: "#ddd",
    borderWidth: 1,
    fontSize: 16,
  },
  lastInput: {
    backgroundColor: "#F9F9F9",
    borderRadius: 8,
    padding: 12,
    borderColor: "#ddd",
    borderWidth: 1,
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputSmall: {
    width: "30%",
  },
  submitButton: {
    backgroundColor: "#1E90FF",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  cvvLabel: {
    position: "absolute",
    top: "45%",
    left: 20,
    color: "#ccc",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 20,
  },
  cvvValue: {
    position: "absolute",
    top: "45%",
    left: 80,
    color: "#F9F9F9",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 20,
  },
  cardBack: {
    position: "absolute",
    backfaceVisibility: "hidden",
    overflow: "hidden",
  },
})

export default Card
