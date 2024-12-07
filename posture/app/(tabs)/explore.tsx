import React, { useEffect, useState, useRef } from "react";
import * as Notifications from "expo-notifications";
import {
  View,
  Platform,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
  Modal,
} from "react-native";
import Slider from "@react-native-community/slider";
import { useNavigation } from "@react-navigation/native";

interface ToggleSwitchProps {
  isOn: boolean;
  onToggle: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isOn, onToggle }) => {
  return (
    <TouchableOpacity
      style={[
        styles.toggleSwitch,
        isOn ? styles.toggleSwitchOn : styles.toggleSwitchOff,
      ]}
      onPress={onToggle}
    >
      <Animated.View
        style={[
          styles.toggleCircle,
          isOn ? styles.toggleCircleOn : styles.toggleCircleOff,
        ]}
      />
    </TouchableOpacity>
  );
};

const SettingsScreen = () => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [vibrateOn, setVibrateOn] = useState(false);
  const [popupAlertOn, setPopupAlertOn] = useState(false);
  const [remindersOn, setRemindersOn] = useState(false);
  const [showOption2, setShowOption2] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState("1 min");
  const animation = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation<any>();
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);

  const registerForPushNotificationsAsync = async () => {
    try {
      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }

      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return null;
      }

      const token = (await Notifications.getExpoPushTokenAsync()).data;
      setExpoPushToken(token);
      console.log("Push Token:", token);
      return token;
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  const sendNotification = async () => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "StemUp",
          body: "Slouch Detected!",
          sound: true,
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: 2,
        },
      });
    } catch (error) {
      alert("Failed to send notification");
    }
  };

  const toggleExpand = (item: string): void => {
    if (item === "logout") {
      handleLogout();
      return;
    }
    if (expandedItem === item) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setExpandedItem(null));
    } else {
      setExpandedItem(item);
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleLogout = () => {
    // Perform any logout logic here if needed
    navigation.navigate("intro");
  };

  const handleVibrateToggle = () => {
    setVibrateOn(!vibrateOn);
    setShowOption2(!vibrateOn);
  };

  const handleRemindersToggle = () => {
    setRemindersOn(!remindersOn);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setModalVisible(false);
  };

  const screenHeight = Dimensions.get("window").height;
  const containerHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [screenHeight * 0.26, screenHeight * 0.5], // Adjust the heights as needed
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContainer}
    >
      <Text style={styles.title}>Settings</Text>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={require("../../assets/images/person.png")}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>Mariam Jalloh</Text>
        </View>
      </View>

      {/* Settings Options */}
      <Animated.View
        style={[styles.settingsOptions, { height: containerHeight }]}
      >
        <TouchableOpacity
          style={styles.settingsItem}
          onPress={() => toggleExpand("device")}
        >
          <View style={styles.settingsItemContent}>
            <Image
              source={require("../../assets/images/device.png")}
              style={styles.deviceIcon}
            />
            <Text style={styles.settingsText}>Mariam's Device</Text>
            <Image
              source={
                expandedItem === "device"
                  ? require("../../assets/images/downA.png")
                  : require("../../assets/images/rightA.png")
              }
              style={styles.arrowIcon}
            />
          </View>
          {expandedItem !== "device" && <View style={styles.leftBorder} />}
        </TouchableOpacity>
        {expandedItem === "device" && (
          <View style={styles.dropdownContent}>
            <View style={styles.dropdownItem}>
              <Text style={styles.dropdownText}>Connection</Text>
              <View style={styles.statusContainer}>
                <Text style={styles.dropdownText}>On</Text>
                <Image
                  source={require("../../assets/images/check.png")}
                  style={styles.checkIcon}
                />
              </View>
              <View style={styles.leftBorder2} />
            </View>
            <TouchableOpacity style={styles.dropdownItem}>
              <Text style={styles.dropdownText}>Re-Calibrate</Text>
              <View style={styles.statusContainer}>
                <Image
                  source={require("../../assets/images/disclosure.png")}
                  style={styles.disclosureIcon}
                />
              </View>
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity
          style={styles.settingsItem}
          onPress={() => toggleExpand("alerts")}
        >
          <View style={styles.settingsItemContent}>
            <Image
              source={require("../../assets/images/bell.png")}
              style={styles.bellIcon}
            />
            <Text style={styles.settingsText}>Alerts / Notifications</Text>
            <Image
              source={
                expandedItem === "alerts"
                  ? require("../../assets/images/downA.png")
                  : require("../../assets/images/rightA.png")
              }
              style={styles.arrowIcon}
            />
          </View>
          {expandedItem !== "alerts" && <View style={styles.leftBorder} />}
        </TouchableOpacity>
        {expandedItem === "alerts" && (
          <View style={styles.dropdownContent}>
            <View style={styles.dropdownItem}>
              <Text style={styles.dropdownText}>Vibrate when bad posture</Text>
              <ToggleSwitch isOn={vibrateOn} onToggle={handleVibrateToggle} />
              <View style={styles.leftBorder2} />
            </View>
            {showOption2 && (
              <View style={styles.sliderContainer}>
                <View style={styles.circle} />
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={1}
                  value={sliderValue}
                  onValueChange={setSliderValue}
                  minimumTrackTintColor="#007AFF"
                  maximumTrackTintColor="#00000033"
                  thumbTintColor="white"
                />
                <View style={[styles.circle, styles.filledCircle]} />
                <View style={styles.leftBorder2} />
              </View>
            )}
            <View style={styles.dropdownItem}>
              <Text style={styles.dropdownText}>
                Pop-up alert for bad posture
              </Text>
              <ToggleSwitch
                isOn={popupAlertOn}
                onToggle={() => setPopupAlertOn(!popupAlertOn)}
              />
              <View style={styles.leftBorder2} />
            </View>
            <View style={styles.dropdownItem}>
              <Text style={styles.dropdownText}>Reminders to Stand</Text>
              <ToggleSwitch
                isOn={remindersOn}
                onToggle={handleRemindersToggle}
              />
              <View style={styles.leftBorder2} />
            </View>
            {remindersOn && (
              <View style={styles.dropdownItem}>
                <Text style={styles.dropdownText2}>Notify every</Text>
                <TouchableOpacity
                  style={styles.timeButton}
                  onPress={() => setModalVisible(true)}
                >
                  <Text style={styles.timeButtonText}>{selectedTime}</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
        <TouchableOpacity
          style={styles.settingsItem}
          onPress={() => toggleExpand("help")}
        >
          <View style={styles.settingsItemContent}>
            <Image
              source={require("../../assets/images/help.png")}
              style={styles.helpIcon}
            />
            <Text style={styles.settingsText}>Help</Text>
            <Image
              source={
                expandedItem === "help"
                  ? require("../../assets/images/downA.png")
                  : require("../../assets/images/rightA.png")
              }
              style={styles.arrowIcon}
            />
          </View>
          {expandedItem !== "help" && <View style={styles.leftBorder} />}
        </TouchableOpacity>
        {expandedItem === "help" && (
          <View style={styles.dropdownContent}>
            <View style={styles.dropdownItem}>
              <Text style={styles.dropdownText}>Email</Text>
              <TouchableOpacity>
                <Text style={styles.emailText}>posturecorrector@gmail.com</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <TouchableOpacity style={styles.settingsItem1} onPress={handleLogout}>
          <View style={styles.settingsItemContent}>
            <Image
              source={require("../../assets/images/log.png")}
              style={styles.logIcon}
            />
            <Text style={styles.settingsText}>Log Out</Text>
            <Image
              source={require("../../assets/images/rightA.png")}
              style={styles.arrowIcon}
            />
          </View>
        </TouchableOpacity>
      </Animated.View>

      <TouchableOpacity
          style={styles.notificationButton}
          onPress={sendNotification}
        >
          <Text style={styles.notificationButtonText}>Send Notification</Text>
      </TouchableOpacity>

      {/* Modal for time selection */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Time</Text>
            {["1 min", "5 min", "10 min", "15 min"].map((time) => (
              <TouchableOpacity
                key={time}
                style={styles.modalOption}
                onPress={() => handleTimeSelect(time)}
              >
                <Text style={styles.modalOptionText}>{time}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  notificationButton: {
    backgroundColor: "F9F9EE",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  notificationButtonText: {
    color: "#F9F9EE",
    fontSize: 18,
    fontWeight: "600",
  },
  container: {
    flex: 1,
    backgroundColor: "#F9F9EE",
  },
  scrollContainer: {
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#404040",
    marginBottom: 14,
    marginTop: "8%",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // Center the content horizontally
    backgroundColor: "#404040DE",
    borderRadius: 40,
    padding: 15,
    width: "86%",
    height: 105, // Fixed height
    marginBottom: 20,
  },
  profileImage: {
    width: 52,
    height: 52,
    borderRadius: 25,
    marginBottom: 0,
    left: "10%",
  },
  profileInfo: {
    flex: 1,
    alignItems: "center", // Center the profile info horizontally
    // left: '-5%',
  },
  profileName: {
    color: "#fff",
    fontSize: 27,
    fontWeight: "bold",
    marginBottom: 3,
  },
  editButton: {
    backgroundColor: "#fff",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 50,
    marginTop: 15, // Reduced marginTop to shrink the gap
    width: "58%",
  },
  editButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // Center the content horizontally
    height: 30,
  },
  pencilIcon: {
    width: 16,
    height: 16,
    marginRight: 7,
  },
  // editButtonText: {
  //   color: '#444',
  //   fontWeight: '400',
  //   fontSize: 14,
  // },
  settingsOptions: {
    backgroundColor: "#404040DE",
    borderRadius: 40,
    width: "88%",
    paddingVertical: 15,
    marginTop: 8,
  },
  settingsItem: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    // borderBottomWidth: 1,
    borderBottomColor: "#878787",
    position: "relative", // Ensure the left border is positioned correctly
  },
  settingsItem1: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    position: "relative", // Ensure the left border is positioned correctly
  },
  settingsItemContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Space between the icon-text and the arrow
    marginBottom: -5,
  },
  deviceIcon: {
    width: 28,
    height: 28,
    marginRight: 15,
    resizeMode: "contain",
  },
  bellIcon: {
    width: 28,
    height: 28,
    marginRight: 15,
    resizeMode: "contain",
  },
  helpIcon: {
    width: 28,
    height: 28,
    marginRight: 15,
    resizeMode: "contain",
  },
  logIcon: {
    width: 28,
    height: 28,
    marginRight: 15,
    resizeMode: "contain",
  },
  arrowIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    left: "-4%",
  },
  settingsText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "500",
    flex: 1, // Allow text to take up remaining space
  },
  leftBorder: {
    position: "absolute",
    bottom: 0,
    left: 72,
    width: "89%", // Adjust this value to control the length of the left border
    borderBottomWidth: 1,
    borderBottomColor: "#878787",
  },
  leftBorder2: {
    position: "absolute",
    bottom: 0,
    left: 2,
    width: "98%", // Adjust this value to control the length of the left border
    borderBottomWidth: 1,
    borderBottomColor: "#878787",
  },
  dropdownContent: {
    paddingVertical: 5,
    paddingHorizontal: 25,
    backgroundColor: "transparent", // Match the background color of settingsOptions
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    overflow: "hidden", // Ensure content is clipped to the bounds of the container
    left: "4%",
  },
  dropdownItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    left: "-5%",
  },
  dropdownText: {
    color: "#fff",
    fontSize: 16,
    paddingVertical: 5,
    marginBottom: 4,
    marginTop: 4,
  },
  dropdownText2: {
    color: "#fff",
    fontSize: 16,
    paddingVertical: 5,
    marginBottom: 4,
    marginTop: 4,
    left: "8%",
  },
  checkIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    marginLeft: 7, // Add some space between the text and the check icon
  },
  disclosureIcon: {
    width: 13,
    height: 13,
    resizeMode: "contain",
    marginLeft: 7, // Add some space between the text and the check icon
  },
  toggleSwitch: {
    width: 51,
    height: 31,
    borderRadius: 100,
    padding: 3,
    justifyContent: "center",
    left: "-5%",
  },
  toggleSwitchOn: {
    backgroundColor: "#34C759",
    alignItems: "flex-end",
  },
  toggleSwitchOff: {
    backgroundColor: "#0000001F",
    alignItems: "flex-start",
  },
  toggleCircle: {
    width: 27,
    height: 27,
    borderRadius: 100,
    backgroundColor: "white",
  },
  toggleCircleOn: {
    transform: [{ translateX: 1 }],
  },
  toggleCircleOff: {
    transform: [{ translateX: 0 }],
  },
  sliderContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  slider: {
    width: 220,
    height: 40,
  },
  circle: {
    width: 17,
    height: 17,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
    marginHorizontal: 15,
  },
  filledCircle: {
    backgroundColor: "white",
  },
  timeButton: {
    backgroundColor: "#1B1F26B8",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginLeft: 0,
    left: "-5%",
  },
  timeButtonText: {
    color: "#007AFF",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalOption: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: "#1B1F26B8",
  },
  modalOptionText: {
    color: "white",
    fontSize: 16,
  },
  modalCloseButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: "#FF3B30",
    marginTop: 20,
  },
  modalCloseButtonText: {
    color: "white",
    fontSize: 16,
  },
  emailText: {
    color: "#58ACFF",
    textDecorationLine: "underline",
    left: "-51%",
  },
});

export default SettingsScreen;
