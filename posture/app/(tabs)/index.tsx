import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView, Animated, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import AnimatedCircleProgress from '../../components/AnimatedCircleProgress'; // Adjust the path as necessary
import AnimatedPieChart from '../../components/PieChartComponent';

const { width: screenWidth } = Dimensions.get('window');

const plantImages = [
  require('../../assets/images/plant1.png'),
  require('../../assets/images/plant2.png'),
  require('../../assets/images/plant3.png'),
];

const DailyPostureScreen = () => {
  const [goalInputVisible, setGoalInputVisible] = useState(false);
  const [goal, setGoal] = useState('');
  const [goalText, setGoalText] = useState('Set Goal');
  const [goalSet, setGoalSet] = useState(false);
  const [currentGoal, setCurrentGoal] = useState(0);
  const [isIncrementing, setIsIncrementing] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [goalCompleted, setGoalCompleted] = useState(false);
  const [isForward, setIsForward] = useState(true); // Track the direction of image cycling
  const [showPieChart, setShowPieChart] = useState(false); // State variable for pie chart visibility
  const scrollY = useRef(new Animated.Value(0)).current;
  const arrowsAnimation = useRef(new Animated.Value(0)).current;
  const [arrowImageSource, setArrowImageSource] = useState(require('../../assets/images/arrows.png'));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        let newIndex;
        if (isForward) {
          if (prevIndex === plantImages.length - 1) {
            setIsForward(false);
            newIndex = prevIndex - 1;
          } else {
            newIndex = prevIndex + 1;
          }
        } else {
          if (prevIndex === 0) {
            setIsForward(true);
            newIndex = prevIndex + 1;
          } else {
            newIndex = prevIndex - 1;
          }
        }
        setTimeout(() => {
          setArrowImageSource(newIndex === 2 ? require('../../assets/images/darrow.png') : require('../../assets/images/arrows.png'));
        }, 775); // Delay the arrow image change by 1 second
        return newIndex;
      });
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [isForward]);

  useEffect(() => {
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
  }, []);

  const sunImageTranslate = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, -50],
    extrapolate: 'clamp',
  });

  const sunRingImageTranslate = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, -30],
    extrapolate: 'clamp',
  });

  const handleSetGoalPress = () => {
    setGoalInputVisible(true);
  };

  const handleGoalSubmit1 = () => {
    setGoalText(`0/${goal}`);
    setGoalSet(true);
    setGoalInputVisible(false);
  };

  const handleGoalSubmit = () => {
    setGoalSet(true);
    setGoalInputVisible(false);
    setShowPieChart(true); // Show the pie chart when the button is pressed

    const goalValue = parseInt(goal, 10);
    const interval = setInterval(() => {
      setCurrentGoal((prevGoal) => {
        if (isIncrementing) {
          if (prevGoal < goalValue) {
            setGoalText(`${prevGoal + 1}/${goal}`);
            return prevGoal + 1;
          } else {
            setIsIncrementing(false);
            setGoalCompleted(true);
            clearInterval(interval);
            return prevGoal;
          }
        } else {
          if (prevGoal > 0) {
            setGoalText(`${prevGoal - 1}/${goal}`);
            return prevGoal - 1;
          } else {
            setIsIncrementing(true);
            clearInterval(interval);
            return prevGoal;
          }
        }
      });
    }, 10); // Adjust the interval time as needed
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Animated.Image
        source={require('../../assets/images/Sun1.png')}
        style={[styles.sunImage, { transform: [{ translateY: sunImageTranslate }] }]}
      />
      <Animated.Image
        source={require('../../assets/images/SunRing1.png')}
        style={[styles.sunRingImage, { transform: [{ translateY: sunRingImageTranslate }] }]}
      />

      <Animated.ScrollView
        contentContainerStyle={styles.scrollContainer}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {/* Header */}
        <Text style={styles.greeting}>Hello, Mariam</Text>
        
        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Your Daily</Text>
          <Text style={styles.title}>Posture</Text>
        </View>
        
        {/* Main Content */}
        <View style={styles.contentContainer}>
          {/* Plant Card */}
          <View style={styles.card}>
            <Animated.Image
              source={arrowImageSource}
              style={[styles.image4, { transform: [{ translateY: arrowsAnimation }] }]}
            />
            <Image source={plantImages[currentImageIndex]} style={styles.image} />
          </View>

          {/* Sit Time Card */}
          <View style={[styles.card, styles.sitTimeCard]}>
            <Text style={styles.sitTimeText}>Sit Time</Text>
            <Text style={styles.timeText}>
              <Text style={styles.timeNumber}>{currentGoal}</Text>
              <Text style={styles.timeUnit}> Min</Text>
            </Text>
            {/* Placeholder for pie chart */}
            <View style={styles.pieChart}>
              {showPieChart ? (
                <AnimatedPieChart />
              ) : (
                <View style={styles.filledcircle}>
                  <Text style={styles.noText}>{'no\nprogress\nyet...'}</Text>
                </View>
              )}
            </View>
            {/* Legend */}
            <View style={styles.legendContainer}>
              <View style={styles.legendItem}>
                <View style={[styles.legendCircle, { backgroundColor: '#347B20' }]} />
                <Text style={styles.legendText}>Bloom</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendCircle, { backgroundColor: '#CD4947' }]} />
                <Text style={styles.legendText}>Wilt</Text>
              </View>
            </View>
          </View>

          {/* Bloom Goal Card */}
          <View style={[styles.card, styles.bloomGoalCard]}>
            <View style={styles.bloomGoalHeader}>
              <Text style={styles.bloomGoalText}>Today's Bloom Goal</Text>
            </View>
            <View style={styles.motivationRow}>
              <View style={styles.progressBarContainer}>
                {goalSet ? (
                  <AnimatedCircleProgress onPress={handleGoalSubmit}/>
                ) : (
                  <Image source={require('../../assets/images/dash.png')} style={styles.progressBar} />
                )}
                {goalInputVisible ? (
                  <View style={styles.goalInputContainer}>
                    <Text style={styles.goalInputLabel}>How many minutes would you like to have good posture today?</Text>
                    <View style={styles.goalInputRow}>
                      <TextInput
                        style={styles.goalInput}
                        keyboardType="numeric"
                        value={goal}
                        onChangeText={setGoal}
                        placeholder=""
                        placeholderTextColor="#999"
                      />
                      <TouchableOpacity style={styles.submitButton} onPress={handleGoalSubmit1}>
                        <Image source={require('../../assets/images/check2.png')} style={styles.checkIcon} />
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  goalSet ? (
                    <View style={styles.goalTextContainer}>
                      <Text style={styles.goalText}>{goalText}</Text>
                      <Text style={styles.minutesText}>Minutes Bloom</Text>
                    </View>
                  ) : (
                    <TouchableOpacity style={styles.setGoalButton} onPress={handleSetGoalPress}>
                      <Image source={require('../../assets/images/plus.png')} style={styles.plusIcon} />
                      <Text style={styles.setGoalText}>Set Goal</Text>
                    </TouchableOpacity>
                  )
                )}
              </View>
              <View style={styles.motivationContainer}>
                <Image source={require('../../assets/images/bulb.png')} style={styles.lightbulbImage} />
                <Text style={styles.motivationText}>
                  {goalCompleted ? 'Goal completed!\nGood work :)\n\n' : "you're\nalmost\nthere! keep\nup the good\nwork"}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Animated.ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9EE', // Light background color similar to image
    paddingHorizontal: 15,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  noText: {
    fontSize: 12,
    color: '#000',
    fontWeight: '400',
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    marginTop: 20,
  },
  sunImage: {
    position: 'absolute',
    top: 0,
    right: -32,
    width: 200,
    height: 170,
    resizeMode: 'contain',
  },
  sunRingImage: {
    position: 'absolute',
    top: -10, // Adjust this value to position the sunRing relative to the sunImage
    right: -42, // Adjust this value to position the sunRing relative to the sunImage
    width: 223, // Adjust the size as needed
    height: 190, // Adjust the size as needed
    resizeMode: 'contain',
  },
  greeting: {
    marginTop: 70,
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    fontFamily: 'Inter',
    left: '6%',
  },
  titleContainer: {
    paddingVertical: 20,
    marginBottom: 0,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: -10,
    fontFamily: 'Inter',
    left: '6%',
  },
  contentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 10,
  },
  card: {
    width: screenWidth * 0.567,
    backgroundColor: '#D8C09A',
    borderRadius: 50,
    alignItems: 'center',
    fontFamily: 'Inter',
    height: 243,
  },
  sitTimeCard: {
    paddingVertical: 15,
    backgroundColor: '#B9D8D5',
    width: screenWidth * 0.33,
  },
  bloomGoalCard: {
    width: '100%',
    height: '62%',
    backgroundColor: '#CDE29B',
    paddingBottom: 10,
  },
  bloomGoalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    width: 21,
    height: 21,
    marginLeft: 5,
    marginTop: 20, // Adjust this value to move the icon down
  },
  progressBarContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', // Ensure the container takes the full width
    height: 50,
    left: '2%',
  },
  progressBar: {
    position: 'absolute',
    top: -80,
    width: '250%',
    height: '420%',
    resizeMode: 'contain',
  },
  setGoalButton: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 7,
    paddingVertical: 12,
    borderRadius: 30,
    alignSelf: 'center', // Center the button horizontally
  },
  setGoalText: {
    fontSize: 15,
    color: '#000',
    fontWeight: '400',
    fontFamily: 'Inter-Regular',
    left: '-1%',
  },
  goalInputContainer: {
    position: 'absolute',
    top: -33,
    width: '30%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 115,
  },
  goalInputLabel: {
    fontSize: 9,
    color: '#000',
    marginBottom: 10,
  },
  goalInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  goalInput: {
    width: 60,
    height: 38,
    borderRadius: 10,
    paddingHorizontal: 1,
    marginRight: 6,
    backgroundColor: '#D9D9D9',
    textAlign: 'center',
    fontSize: 24, // Set the font size
    fontWeight: '500', // Set the font weight
  },
  submitButton: {
    backgroundColor: '#D9D9D9',
    height: 33,
    width: 33,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  goalTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    top: 0,
  },
  goalText: {
    fontSize: 28,
    color: '#000',
    fontWeight: '600',
    textAlign: 'center', // Center align the text
  },
  minutesText: {
    fontSize: 13,
    color: '#000',
    fontWeight: '400',
    fontFamily: 'Inter-Regular',
    textAlign: 'center', // Center align the text
    marginTop: 3, // Adjust this value to move the text up
  },
  image: {
    width: '150%',
    height: '150%',
    resizeMode: 'contain',
    position: 'absolute',
    top: -90,
    left: 150,
    transform: [{ translateX: -188 }],
    // opacity: 0.5,
  },
  image4: {
    width: '75%',
    height: '75%',
    resizeMode: 'contain',
    position: 'absolute',
    top: 10,
    left: '15%',
    transform: [{ translateX: -50 }],
  },
  sitTimeText: {
    fontSize: 17,
    fontWeight: '600',
    fontFamily: 'Inter',
    marginBottom: 8, // Add marginBottom to create space below "Sit Time"
  },
  timeText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000',
    fontFamily: 'Inter',
  },
  timeNumber: {
    fontSize: 45,
    fontWeight: '600',
    color: '#000',
    fontFamily: 'Inter',
  },
  timeUnit: {
    fontSize: 12,
    fontWeight: '400',
    color: '#000',
    fontFamily: 'Inter',
  },
  pieChart: {
    width: 95,
    height: 95,
    borderRadius: 60,
    marginTop: 0,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 2,
  },
  legendCircle: {
    width: 11,
    height: 11,
    borderRadius: 5.5,
    marginRight: 3,
  },
  legendText: {
    fontSize: 10,
    color: '#000',
    fontFamily: 'Inter',
  },
  bloomGoalText: {
    fontSize: 25,
    fontWeight: '600',
    fontFamily: 'Inter',
    marginTop: '5.5%',
    marginLeft: '-2%',
  },
  motivationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '8%',
    left: '-3%',
  },
  motivationContainer: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 30,
    marginLeft: 8, // Add marginLeft to create space between the image and text
    alignItems: 'center', // Center align the children vertically
    width: '29%',
    height: '105%',
    left: '-18%',
  },
  lightbulbImage: {
    width: 31,
    height: 33,
    marginBottom: 20, // Add marginBottom to create space between the image and text
    marginTop: 7, // Add marginTop to create space between the image and text
  },
  motivationText: {
    color: '#000',
    fontSize: 14,
    textAlign: 'left',
    fontFamily: 'Inter',
    marginBottom: 30, // Add marginBottom to create space
  },
  plusIcon: {
    width: 25,
    height: 25,
    fontWeight: '400',
    marginRight: 9,
    left: 0,
  },
  circle: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 1000,
    borderWidth: 25,
    borderColor: '#00000033',
  },
  filledcircle: {
    width: 90,
    height: 90,
    borderRadius: 1000,
    backgroundColor: '#FFFFFF99',
    left: 2,
  },
});

export default DailyPostureScreen;