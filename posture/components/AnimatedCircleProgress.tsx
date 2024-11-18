import React, { useCallback } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import Animated, { useSharedValue, withTiming, useAnimatedProps } from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const CIRCLE_LENGTH = 180 * Math.PI; // 2PI*R
const R = CIRCLE_LENGTH / (2 * Math.PI);

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface AnimatedCircleProgressProps {
  circleColor?: string;
  backgroundColor?: string;
  onPress: () => void;
}

const AnimatedCircleProgress = ({ circleColor = '#48833C', backgroundColor = '#00000033', onPress }: AnimatedCircleProgressProps) => {
  const progress = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
  }));

  const handlePress = useCallback(() => {
    progress.value = withTiming(progress.value > 0 ? 0 : 1, { duration: 2150 }); // for 120
    onPress();
  }, [onPress]);

  return (
    <View style={styles.container}>
      <Svg width={screenWidth} height={screenHeight / 2} style={styles.svg}>
        <Circle
          cx={screenWidth / 2}
          cy={screenHeight / 4}
          r={R}
          stroke={backgroundColor}
          strokeWidth={25}
          fill="none" // Make the circle transparent
        />
        <AnimatedCircle
          cx={screenWidth / 2}
          cy={screenHeight / 4}
          r={R}
          stroke={circleColor}
          strokeWidth={25}
          strokeDasharray={CIRCLE_LENGTH}
          animatedProps={animatedProps}
          strokeLinecap={'round'}
          fill="none" // Make the animated circle transparent
        />
        <Circle
          cx={screenWidth / 2 + R}
          cy={screenHeight / 4}
          r={10} // Adjust the radius as needed
          fill="white" // Color of the small circle
        />
      </Svg>
      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <ImageBackground
          source={require('../assets/images/Sun1.png')}
          style={styles.buttonImage}
          imageStyle={styles.buttonImageStyle}
        >
          <Text style={styles.buttonText}></Text>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9EE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  svg: {
    position: 'absolute',
    top: -200,
  },
  button: {
    position: 'absolute',
    bottom: 550,
    left: screenWidth / 2 - screenWidth / 6,
    width: screenWidth,
    height: 60,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonImageStyle: {
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 25,
    color: 'white',
    letterSpacing: 2.0,
  },
});

export default AnimatedCircleProgress;