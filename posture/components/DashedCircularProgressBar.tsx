import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { G, Circle } from 'react-native-svg';

interface DashedCircularProgressBarProps {
  dimensions?: number;
  progress?: number;
  maxProgress?: number;
  startAngle?: number;
  foregroundColor?: string;
  backgroundColor?: string;
  foregroundStrokeWidth?: number;
  backgroundStrokeWidth?: number;
  foregroundGapSize?: number;
  foregroundDashSize?: number;
  backgroundGapSize?: number;
  backgroundDashSize?: number;
  animation?: boolean;
  child?: React.ReactNode;
}

const DashedCircularProgressBar: React.FC<DashedCircularProgressBarProps> = ({
  dimensions = 250,
  progress = 0,
  maxProgress = 360,
  startAngle = -90,
  foregroundColor = '#908B8B',
  backgroundColor = '#eeeeee',
  foregroundStrokeWidth = 7,
  backgroundStrokeWidth = 7,
  foregroundGapSize = 20,
  foregroundDashSize = 40,
  backgroundGapSize = 20,
  backgroundDashSize = 40,
  animation = true,
  child,
}) => {
  const radius = (dimensions - foregroundStrokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${foregroundDashSize} ${foregroundGapSize}`;
  const strokeDashoffset = circumference - (progress / maxProgress) * circumference;

  return (
    <View style={[styles.container, { width: dimensions, height: dimensions }]}>
      <Svg width={dimensions} height={dimensions} viewBox={`0 0 ${dimensions} ${dimensions}`}>
        <G rotation={startAngle} origin={`${dimensions / 2}, ${dimensions / 2}`}>
          <Circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke={backgroundColor}
            strokeWidth={backgroundStrokeWidth}
            strokeDasharray={`${backgroundDashSize} ${backgroundGapSize}`}
            strokeLinecap="round"
            fill="none"
          />
          <Circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke={foregroundColor}
            strokeWidth={foregroundStrokeWidth}
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="none"
          />
        </G>
      </Svg>
      {child && <View style={styles.childContainer}>{child}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  childContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DashedCircularProgressBar;