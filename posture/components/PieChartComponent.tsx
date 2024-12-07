import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

interface AnimatedPieChartProps {
  greenRatio?: number;
}

const AnimatedPieChart: React.FC<AnimatedPieChartProps> = ({ greenRatio = 0.75 }) => {
  const [redFill, setRedFill] = useState(0); // Initial animation state for red
  const [rectangleColor, setRectangleColor] = useState('transparent'); // Initial color for createRectangle2
  const [showBubbles, setShowBubbles] = useState(false); // State to control the visibility of bubbles

  useEffect(() => {
    let redProgress = 0;
    const interval = setInterval(() => {
      if (redProgress < 0.25) {
        redProgress += 0.01;
        setRedFill(redProgress);
      } else {
        clearInterval(interval);
        setRectangleColor('#B9D8D5'); // Set the color to white when animation is complete
      }
    }, 67); // Adjust interval speed for smoother animation
    return () => clearInterval(interval);
  }, []);

  const radius = 40; // Radius of the pie chart
  const centerX = 60; // Center X of the pie chart
  const centerY = 60; // Center Y of the pie chart
  const whiteEdgeSize = 5; // Size of the white edges

  interface ArcPathProps {
    startAngle: number;
    endAngle: number;
    color: string;
  }

  const createArcPath = ({ startAngle, endAngle, color }: ArcPathProps) => {
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    const startX = centerX + radius * Math.cos((Math.PI * startAngle) / 180);
    const startY = centerY + radius * Math.sin((Math.PI * startAngle) / 180);
    const endX = centerX + radius * Math.cos((Math.PI * endAngle) / 180);
    const endY = centerY + radius * Math.sin((Math.PI * endAngle) / 180);

    return (
      <Path
        d={`M${centerX},${centerY} L${startX},${startY} A${radius},${radius} 0 ${largeArcFlag},1 ${endX},${endY} Z`}
        fill={color}
      />
    );
  };

  const createRectangle = (angle: number, color: string) => {
    const rectWidth = whiteEdgeSize;
    const rectHeight = radius * 2;
    const angleInRadians = (Math.PI * angle) / 180;
    const rectX = centerX + radius * Math.cos(angleInRadians) - rectWidth / 2;
    const rectY = centerY + radius * Math.sin(angleInRadians) - rectHeight / 2;

    return (
      <Rect
        x={rectX}
        y={rectY}
        width={rectWidth}
        height={40}
        fill={color}
        transform={`rotate(${180}, ${rectX + rectWidth / 2}, ${rectY + rectHeight / 2})`}
      />
    );
  };

  const createRectangle2 = (angle: number, color: string) => {
    const rectWidth = whiteEdgeSize;
    const rectHeight = radius * 2;
    const angleInRadians = (Math.PI * angle) / 180;
    const rectX = centerX + radius * Math.cos(angleInRadians) - rectWidth / 2;
    const rectY = centerY + radius * Math.sin(angleInRadians) - rectHeight / 2;

    return (
      <Rect
        x={100}
        y={60}
        width={2.5}
        height={42.5}
        fill={color}
        transform={`rotate(${90}, ${rectX + rectWidth / 2}, ${rectY + rectHeight / 2})`}
      />
    );
  };

  return (
    <TouchableOpacity
      onPressIn={() => setShowBubbles(true)}
      onPressOut={() => setShowBubbles(false)}
      style={styles.container}
      activeOpacity={0.9} // Prevents the opacity change on press
    >
      <Svg width={120} height={120}>
        {/* Full Green Section - Always Fully Green */}
        {createArcPath({ startAngle: 0, endAngle: 359.99999, color: '#347B20' })}
        
        {/* White Edge at the Start of Red Section */}
        {redFill > 0 && createRectangle(270, rectangleColor)}

        {/* Dynamic Red Section - Animates to fill 1/4 */}
        {createArcPath({ 
          startAngle: 270, 
          endAngle: 270 + 360 * redFill, 
          color: '#CD4947' 
        })}

        {/* White Edge at the End of Red Section */}
        {redFill > 0 && createRectangle2(270 + 360 * redFill, rectangleColor)}
      </Svg>
      {showBubbles && (
        <View style={styles.bubblesContainer}>
          <View style={styles.bubble}>
            <Text style={styles.bubbleText}>25%</Text>
          </View>
          <View style={styles.bubble}>
            <Text style={styles.bubbleText}>75%</Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bubblesContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bubble: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 4,
    margin: 10,
    left: 40,
  },
  bubbleText: {
    fontSize: 10,
    color: 'black',
  },
});

export default AnimatedPieChart;