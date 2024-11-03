import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView, Animated } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const DailyPostureScreen = () => {
  const scrollY = useRef(new Animated.Value(0)).current;

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

  return (
    <View style={styles.container}>
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
            <Image source={require('../../assets/images/arrows.png')} style={styles.image2} />
            <Image source={require('../../assets/images/plant.png')} style={styles.image} />
          </View>

          {/* Sit Time Card */}
          <View style={[styles.card, styles.sitTimeCard]}>
            <Text style={styles.sitTimeText}>Sit Time</Text>
            <Text style={styles.timeText}>
              <Text style={styles.timeNumber}>120</Text>
              <Text style={styles.timeUnit}> Min</Text>
            </Text>
            {/* Placeholder for pie chart */}
            <View style={styles.pieChart}>
              <Image source={require('../../assets/images/PieChart.png')} style={{ width: '100%', height: '100%' }} />
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
              <Image source={require('../../assets/images/Info.png')} style={styles.infoIcon} />
            </View>
            {/* <View style={styles.progressBarContainer}>
              <Image source={require('../../assets/images/Progress.png')} style={styles.progressBar} />
              <TouchableOpacity style={styles.setGoalButton}>
                <Text style={styles.setGoalText}>+ Set Goal</Text>
              </TouchableOpacity>
            </View> */}
            <View style={styles.motivationRow}>
              <Image source={require('../../assets/images/Progress.png')} style={styles.progressBar} />
              <View style={styles.motivationContainer}>
                <Image source={require('../../assets/images/bulb.png')} style={styles.lightbulbImage} />
                <Text style={styles.motivationText}>
                  you're{'\n'}
                  almost{'\n'}
                  there! keep{'\n'}
                  up the good{'\n'}
                  work
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Animated.ScrollView>
    </View>
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
    marginTop: 60,
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
    height: '65%',
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
  },
  progressBar: {
    width: '65%',
    height: '110%',
    resizeMode: 'contain',
  },
  // setGoalButton: {
  //   position: 'absolute',
  //   backgroundColor: '#ffffff',
  //   paddingHorizontal: 20,
  //   paddingVertical: 10,
  //   borderRadius: 20,
  // },
  // setGoalText: {
  //   fontSize: 16,
  //   color: '#000',
  //   fontWeight: 'bold',
  //   fontFamily: 'Inter-Regular',
  // },
  image: {
    width: '140%',
    height: '105%',
    resizeMode: 'contain',
    position: 'absolute',
    top: -25,
    left: '50%',
    transform: [{ translateX: -188 }],
  },
  image2: {
    width: '75%',
    height: '75%',
    resizeMode: 'contain',
    position: 'absolute',
    top: 10,
    left: '34%',
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
    marginTop: 5,
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
    marginLeft: '-23%',
  },
  motivationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '8%',
    left: '-4%',
  },
  motivationContainer: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 30,
    marginLeft: 8, // Add marginLeft to create space between the image and text
    alignItems: 'center', // Center align the children vertically
    width: '27%',
    height: '105%',
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
});

export default DailyPostureScreen;