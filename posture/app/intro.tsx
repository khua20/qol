import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Animated, Image } from 'react-native';

const IntroScreen = () => {
  const [taps, setTaps] = useState(0);
  const [showCircle, setShowCircle] = useState(false);
  const [showPlant, setShowPlant] = useState(false);
  const [showPostureText, setShowPostureText] = useState(false);
  const [showGoodPostureText, setShowGoodPostureText] = useState(false);
  const [name, setName] = useState('');
  const progressBarWidth = useRef(new Animated.Value(0)).current;
  const arrowsAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (showGoodPostureText) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(arrowsAnimation, {
            toValue: -10,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(arrowsAnimation, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [showGoodPostureText]);

  const handleNameSubmit = () => {
    if (taps < 6) {
      setTaps(taps + 1);
      Animated.timing(progressBarWidth, {
        toValue: (taps + 1) / 6 * 100,
        duration: 500,
        useNativeDriver: false,
      }).start();

      if (taps + 1 === 1) {
        setShowCircle(true);
      }
    }
  };

  const handleGetStarted = () => {
    if (taps < 6) {
      setTaps(taps + 1);
      Animated.timing(progressBarWidth, {
        toValue: (taps + 1) / 6 * 100,
        duration: 500,
        useNativeDriver: false,
      }).start();

      if (taps + 1 === 2) {
        setShowPlant(true);
      }
    }
  };

  const handlePlantTap = () => {
    if (taps < 6) {
      setTaps(taps + 1);
      Animated.timing(progressBarWidth, {
        toValue: (taps + 1) / 6 * 100,
        duration: 500,
        useNativeDriver: false,
      }).start();

      if (taps + 1 === 3) {
        setShowPostureText(true);
      } else if (taps + 1 === 4) {
        setShowGoodPostureText(true);
      }
    }
  };

  const progressBarWidthInterpolated = progressBarWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      {/* Custom Progress Bar */}
      <View style={styles.progressBarContainer}>
        <Animated.View style={[styles.progressBar, { width: progressBarWidthInterpolated }]} />
      </View>

      <View style={styles.contentContainer}>
        {showPlant ? (
          <TouchableOpacity style={styles.contentContainer} onPress={handlePlantTap} activeOpacity={1}>
            <Text style={[styles.greetingText2, showGoodPostureText && styles.greetingText2Expanded]}>
              {showGoodPostureText
                ? 'When your posture is good, your plant is tall, grounded, and healthy...'
                : showPostureText
                ? 'It represents your posture.'
                : 'This is your plant.'}
            </Text>
            {showGoodPostureText && (
              <View style={styles.goodPostureContainer}>
                <Text style={styles.goodPostureText}>Looking Good!</Text>
                <Image source={require('../assets/images/happy.png')} style={styles.happyImage} />
              </View>
            )}
            {showGoodPostureText && (
              <Animated.Image
                source={require('../assets/images/arrows.png')}
                style={[styles.arrowsImage, { transform: [{ translateY: arrowsAnimation }] }]}
              />
            )}
            <Image source={require('../assets/images/plant.png')} style={styles.plantImage} />
            <View style={styles.box} />
          </TouchableOpacity>
        ) : showCircle ? (
          <>
            <Text style={styles.greetingText}>Hello {name}!</Text>
            <Text style={styles.postureText}>Welcome to</Text>
            <View style={styles.circle} />
            <Text style={styles.postureText}>your posture companion.</Text>
            <TouchableOpacity style={styles.getStartedButton} onPress={handleGetStarted}>
              <Text style={styles.getStartedButtonText}>Get Started</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            {/* Greeting Text */}
            <Text style={styles.greetingText1}>Hello...</Text>

            {/* Input Field */}
            <View style={styles.inputContainer}>
              <Text style={styles.verticalBar}>|</Text>
              <TextInput
                style={styles.input}
                placeholder="type your name here"
                placeholderTextColor="#989595"
                onChangeText={setName}
                onSubmitEditing={handleNameSubmit}
                returnKeyType="done"
              />
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9EE', // Light background color
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  progressBarContainer: {
    width: '50%',
    height: 5,
    backgroundColor: '#0F161E59',
    position: 'absolute',
    top: 75,
    borderRadius: 20,
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'black',
    borderRadius: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    top: '-4.5%',
  },
  greetingText1: {
    fontSize: 24,
    fontWeight: '700',
    color: '#343434', // Darker text color for the greeting
    left: -125,
    marginBottom: 1,
    top: '-30%',
  },
  greetingText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#343434', // Darker text color for the greeting
    left: 5,
    top: '-5%',
  },
  greetingText2: {
    fontSize: 24,
    fontWeight: '700',
    color: '#343434', // Darker text color for the greeting
    top: '-23%',
    textAlign: 'center',
    width: 350,
  },
  greetingText2Expanded: {
    top: '-18%',
  },
  goodPostureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    top: '-14.5%',
  },
  goodPostureText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#9DC284',
  },
  happyImage: {
    width: 35,
    height: 35,
    marginLeft: 2,
  },
  arrowsImage: {
    width: 200,
    height: 200,
    position: 'absolute',
    top: '49%',
    left: '23%',
    zIndex: 0,
    resizeMode: 'contain',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    paddingHorizontal: 3,
    width: 235,
    left: 38,
    top: '-30%',
    height: 31,
  },
  verticalBar: {
    fontSize: 40, // Larger font size for the vertical bar
    color: '#989595',
    marginRight: 8,
    height: 35,
    top: -5,
  },
  input: {
    width: 225,
    height: 31,
    fontSize: 22,
    fontWeight: '700',
    color: '#343434',
    left: -5,
  },
  circle: {
    width: 230,
    height: 230,
    borderRadius: 1000,
    backgroundColor: '#CDE29B',
  },
  postureText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#343434',
    marginBottom: 26,
    marginTop: 26,
  },
  getStartedButton: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 16,
    width: 207,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  getStartedButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  plantImage: {
    width: 275,
    height: 275,
    resizeMode: 'contain',
    zIndex: 1,
    position: 'absolute',
    top: '45.5%',
    left: '43%',
    transform: [{ translateX: -137.5 }],
  },
  box: {
    width: '108%',
    height: 500,
    backgroundColor: '#CDE29B',
    borderRadius: 50,
    position: 'absolute',
    top: '70%',
  },
});

export default IntroScreen;