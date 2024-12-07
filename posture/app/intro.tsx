import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Animated, Image } from 'react-native';
import { DashedProgress } from 'react-native-dashed-progress';
import { router } from 'expo-router';

const IntroScreen = () => {
  const [taps, setTaps] = useState(0);
  const [showCircle, setShowCircle] = useState(false);
  const [showPlant, setShowPlant] = useState(false);
  const [showPostureText, setShowPostureText] = useState(false);
  const [showGoodPostureText, setShowGoodPostureText] = useState(false);
  const [showBadPostureText, setShowBadPostureText] = useState(false);
  const [showFinalText, setShowFinalText] = useState(false);
  const [showCalibrationText, setShowCalibrationText] = useState(false);
  const [calibrationText, setCalibrationText] = useState('In order to track your \n posture and keep your\n plant alive, let’s calibrate\n your device!');
  const [name, setName] = useState('');
  const [progress, setProgress] = useState(0); // Add progress state
  const [isCalibrationDone, setIsCalibrationDone] = useState(false); // Add state for calibration completion
  const progressBarWidth = useRef(new Animated.Value(0)).current;
  const arrowsAnimation = new Animated.Value(0);
  const spinAnimation = new Animated.Value(0);

  useEffect(() => {
    if (showGoodPostureText || showBadPostureText) {
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
  }, [showGoodPostureText, showBadPostureText]);

  useEffect(() => {
    if (showFinalText) {
      Animated.loop(
        Animated.timing(spinAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      ).start();
    }
  }, [showFinalText]);

  useEffect(() => {
    // Prefetch images
    const images = [
      require('../assets/images/plant1.png'),
      require('../assets/images/plant3.png'),
      require('../assets/images/happy.png'),
      require('../assets/images/sad.png'),
      require('../assets/images/arrows.png'),
      require('../assets/images/darrow.png'),
      require('../assets/images/load.png'),
      require('../assets/images/checkout.png'),
      require('../assets/images/sit.png'),
    ];

    images.forEach((image) => {
      const { uri } = Image.resolveAssetSource(image);
      Image.prefetch(uri);
    });
  }, []);

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
      } else if (taps + 1 === 5) {
        setShowBadPostureText(true);
      } else if (taps + 1 === 6) {
        setShowFinalText(true);
      }
    } else if (showFinalText) {
      setShowCalibrationText(true);
    }
  };

  const handleCalibrationTap = () => {
    if (calibrationText === 'In order to track your \n posture and keep your\n plant alive, let’s calibrate\n your device!') {
      setCalibrationText('Sit up straight in a posture\n that feels natural and\n comfortable for you.');
    } else if (calibrationText === 'Sit up straight in a posture\n that feels natural and\n comfortable for you.') {
      setCalibrationText('Stay still for 30 seconds');
    } else if (calibrationText === 'Stay still for 30 seconds') {
      setProgress((prevProgress) => {
        const newProgress = Math.min(prevProgress + 1, 9);
        if (newProgress === 9) {
          setIsCalibrationDone(true); // Set calibration done state
        }
        return newProgress;
      });
    } else if (isCalibrationDone) {
      router.push('/'); // Navigate to index screen
    }
  };

  const handleDoneTap = () => {
    if (isCalibrationDone) {
      router.push('/'); // Navigate to index screen
    }
  };

  const progressBarWidthInterpolated = progressBarWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  const spin = spinAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const arrowImageSource = showBadPostureText
    ? require('../assets/images/darrow.png')
    : require('../assets/images/arrows.png');

  return (
    <View style={[styles.container, showCalibrationText && styles.calibrationContainer, isCalibrationDone && styles.doneContainer]}>
      {!showCalibrationText && (
        <View style={styles.progressBarContainer}>
          <Animated.View style={[styles.progressBar, { width: progressBarWidthInterpolated }]} />
        </View>
      )}

      <View style={styles.contentContainer}>
        {showCalibrationText ? (
          <TouchableOpacity style={styles.contentContainer} onPress={isCalibrationDone ? handleDoneTap : handleCalibrationTap} activeOpacity={1}>
            {isCalibrationDone ? (
              <View style={styles.load2}>
                <View style={styles.innerCircle}>
                  <Animated.Image source={require('../assets/images/checkout.png')} style={[styles.loadImage]} />
                </View>
                <Text style={styles.doneText}>Done!</Text>
              </View>
            ) : (
              <Text style={styles.greetingText3}>{calibrationText}</Text>
            )}
            <Image source={require('../assets/images/sit.png')} style={styles.sit} />
            <View style={styles.circleContainer}>
              <DashedProgress
                fill={progress}
                countBars={9}
                radius={100}
                strokeColor="#B4FF00"
                trailColor="#908B8B"
                strokeThickness={10}
                barWidth={10}
                strokeLinecap="round"
                showTooltip={false}
                duration={1} // Shorter duration for faster animation
                indicatorColor="#B4FF00"
              />
            </View>
            {isCalibrationDone && (
              <Text style={styles.tapToContinueText}>Tap to continue to the app</Text>
            )}
          </TouchableOpacity>
        ) : showFinalText ? (
          <TouchableOpacity style={styles.contentContainer} onPress={handlePlantTap} activeOpacity={1}>
            <Text style={styles.greetingText2}>Let’s start your journey by connecting your device.</Text>
            <Text style={styles.finalText}>Press and hold the button on the back of the sleeve for 3 seconds</Text>
            <View style={styles.load}>
              <View style={styles.innerCircle}>
                <Animated.Image source={require('../assets/images/load.png')} style={[styles.loadImage, { transform: [{ rotate: spin }] }]} />
              </View>
              <Text style={styles.searchingText}>Searching...</Text>
            </View>
          </TouchableOpacity>
        ) : showPlant ? (
          <TouchableOpacity style={styles.contentContainer} onPress={handlePlantTap} activeOpacity={1}>
            <Text style={[styles.greetingText2, showGoodPostureText && styles.greetingText2Expanded]}>
              {showBadPostureText
                ? 'but when your posture is\n bad, your plant is in danger\n of dying.'
                : showGoodPostureText
                ? 'When your posture is good, your plant is tall,\n grounded, and healthy...'
                : showPostureText
                ? 'It represents your posture.'
                : 'This is your plant.'}
            </Text>
            {showBadPostureText ? (
              <View style={styles.goodPostureContainer}>
                <Text style={styles.goodPostureText2}>Uh oh!</Text>
                <Image source={require('../assets/images/sad.png')} style={styles.happyImage} />
              </View>
            ) : showGoodPostureText ? (
              <View style={styles.goodPostureContainer}>
                <Text style={styles.goodPostureText}>Looking Good!</Text>
                <Image source={require('../assets/images/happy.png')} style={styles.happyImage} />
              </View>
            ) : null}
            {showGoodPostureText || showBadPostureText ? (
              <Animated.Image
                source={arrowImageSource}
                style={[styles.arrowsImage, { transform: [{ translateY: arrowsAnimation }] }]}
              />
            ) : null}
            {!showFinalText && (
              <>
                <Image
                  source={
                    showBadPostureText
                      ? require('../assets/images/plant3.png')
                      : require('../assets/images/plant1.png')
                  }
                  style={styles.plantImage}
                />
                <View style={styles.box} />
              </>
            )}
          </TouchableOpacity>
        ) : showCircle ? (
          <>
            <Text style={styles.greetingText}>Hello {name}!</Text>
            <Text style={styles.postureText}>Welcome to</Text>
            <View style={styles.circle}>
              <Image source={require('../assets/images/logo.png')} style={styles.logoImage} />
            </View>
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
  calibrationContainer: {
    backgroundColor: '#D9D9D9', // Background color for calibration screen
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
  greetingText3: {
    fontSize: 24,
    fontWeight: '700',
    color: '#343434', // Darker text color for the greeting
    top: '-20%',
    textAlign: 'center',
    width: 350,
  },
  greetingText2Expanded: {
    top: '-18%',
    width: 350,
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
  goodPostureText2: {
    fontSize: 24,
    fontWeight: '700',
    color: '#BB271A',
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
    top: '51%',
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
    width: 235,
    height: 235,
    borderRadius: 1000,
    backgroundColor: '#CDE29B',
  },
  circleContainer: {
    position: 'absolute',
    top: '60%',
    left: '50%',
    transform: [{ translateX: -125 }, { translateY: -125 }],
  },
  dashedCircle: {
    width: 235,
    height: 235,
    borderRadius: 1000,
    borderWidth: 9,
    borderColor: '#908B8B',
    borderStyle: 'dashed',
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
    width: 350,
    height: 350,
    resizeMode: 'contain',
    zIndex: 1,
    position: 'absolute',
    top: '42%',
    left: '43%',
    transform: [{ translateX: -137.5 }],
  },
  logoImage: {
    width: 300,
    height: 300,
    left: -13,
    top: -50,
    resizeMode: 'contain',
    position: 'absolute',
  },
  box: {
    width: '108%',
    height: 500,
    backgroundColor: '#CDE29B',
    borderRadius: 50,
    position: 'absolute',
    top: '70%',
  },
  finalText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#343434',
    textAlign: 'center',
    width: 300,
    lineHeight: 35,
    position: 'absolute',
    top: '35%',
  },
  load: {
    width: 223,
    height: 62,
    backgroundColor: '#CDE29B',
    borderRadius: 50,
    position: 'absolute',
    top: '47%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  load2: {
    width: 223,
    height: 62,
    backgroundColor: '#CDE29B',
    borderRadius: 50,
    position: 'absolute',
    top: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneText: {
    fontSize: 20,
    fontWeight: '400',
    color: '#343434',
    textAlign: 'center',
  },
  innerCircle: {
    width: 38,
    height: 38,
    borderRadius: 100,
    backgroundColor: 'white',
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 10,
  },
  loadImage: {
    width: 38,
    height: 34,
    resizeMode: 'contain',
    top: 0,
  },
  searchingText: {
    fontSize: 18,
    fontWeight: '400',
    color: 'black',
    left: 10,
  },
  sit: {
    width: 125,
    height: 125,
    position: 'absolute',
    top: '53%',
    left: '36%',
    zIndex: 1,
    resizeMode: 'contain',
  },
  doneContainer: {
    backgroundColor: '#F9F9EE', // Change background color when calibration is done
  },
  tapToContinueText: {
    position: 'absolute',
    bottom: 20,
    fontSize: 16,
    fontWeight: '600',
    color: '#343434',
  },
});

export default IntroScreen;