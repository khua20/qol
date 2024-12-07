import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, Animated } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const { width: screenWidth } = Dimensions.get('window');

const PostureInsightsScreen = () => {
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [postureData, setPostureData] = useState([
    'Good', 'Ok', 'Ok', 'Bad', 'Good', 'Ok', 'Bad',
    'None', 'None', 'None', 'None', 'None', 'None', 'None',
    'None', 'None', 'None', 'None', 'None', 'None', 'None',
    'None', 'None', 'None', 'None', 'None', 'None', 'None',
  ]);
  const pickerRef = useRef<RNPickerSelect>(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  const daysOfWeek = ['S', 'M', 'T', 'W', 'TH', 'F', 'S'];
  const monthsAbbreviated = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const renderDay = ({ item }: { item: string }) => {
    const color = {
      'Good': '#48833C',
      'Ok': '#A0CDC8',
      'Bad': '#CD4947',
      'None': '#D9D9D9'
    }[item];
    return <View style={[styles.dayCircle, { backgroundColor: color }]} />;
  };

  const renderHeader = () => (
    <View style={styles.content}>
      <Text style={styles.header}>Posture Insights</Text>

      {/* Month Selector */}
      <View style={styles.monthSelector}>
        <TouchableOpacity
          style={[styles.pickerContainer, { width: selectedMonth.length * 10 + 90 }]} // Adjust width based on selected month
          onPress={() => pickerRef.current?.togglePicker()}
        >
          <View style={styles.calendarIconContainer}>
            <Image source={require('../../assets/images/calendar.png')} style={styles.calendarIcon} />
          </View>
          <View style={styles.pickerWithArrow}>
            <RNPickerSelect
              ref={pickerRef}
              value={selectedMonth}
              onValueChange={(value) => {
                setSelectedMonth(value);
                if (value !== 'January') {
                  setPostureData(Array(28).fill('None'));
                } else {
                  setPostureData([
                    'Good', 'Ok', 'Ok', 'Bad', 'Good', 'Ok', 'Bad',
                    'None', 'None', 'None', 'None', 'None', 'None', 'None',
                    'None', 'None', 'None', 'None', 'None', 'None', 'None',
                    'None', 'None', 'None', 'None', 'None', 'None', 'None',
                  ]);
                }
              }}
              items={[
                { label: 'January', value: 'January' },
                { label: 'February', value: 'February' },
                { label: 'March', value: 'March' },
                { label: 'April', value: 'April' },
                { label: 'May', value: 'May' },
                { label: 'June', value: 'June' },
                { label: 'July', value: 'July' },
                { label: 'August', value: 'August' },
                { label: 'September', value: 'September' },
                { label: 'October', value: 'October' },
                { label: 'November', value: 'November' },
                { label: 'December', value: 'December' },
              ]}
              placeholder={{}}
              style={pickerSelectStyles}
              useNativeAndroidPickerStyle={false}
              Icon={() => {
                return <Image source={require('../../assets/images/down.png')} style={styles.downArrowIcon} />;
              }}
            />
          </View>
        </TouchableOpacity>
        <View style={styles.legendContainer}>
          <View style={[styles.legendItem]}>
            <View style={[styles.legendCircle, { backgroundColor: '#48833C' }]} />
            <Text style={styles.legendText}>Good</Text>
          </View>
          <View style={[styles.legendItem]}>
            <View style={[styles.legendCircle, { backgroundColor: '#A0CDC8' }]} />
            <Text style={styles.legendText}>Ok</Text>
          </View>
          <View style={[styles.legendItem]}>
            <View style={[styles.legendCircle, { backgroundColor: '#CD4947' }]} />
            <Text style={styles.legendText}>Bad</Text>
          </View>
        </View>
      </View>

      {/* Calendar */}
      <View style={styles.calendarContainer}>
        <View style={styles.daysOfWeekContainer}>
          {daysOfWeek.map((day, index) => (
            <Text key={`${day}-${index}`} style={styles.dayHeader}>{day}</Text>
          ))}
        </View>
      </View>
    </View>
  );

  const renderFooter = () => (
    <View style={styles.breakdownCard}>
      <View style={styles.breakdownTitleContainer}>
        <Text style={styles.breakdownTitle}>Monthly</Text>
        <Text style={styles.breakdownTitle}>Breakdown</Text>
      </View>
      <Text style={styles.percentage}>% of Good Posture</Text>
      <Text style={styles.percentage1}>0%</Text>
      <Text style={styles.percentage2}>25%</Text>
      <Text style={styles.percentage3}>50%</Text>
      <Text style={styles.percentage4}>75%</Text>
      <Text style={styles.percentage5}>100%</Text>
      <View style={styles.box}></View>
      <View style={styles.box2}></View>
      <View style={styles.box3}></View>
      <View style={styles.box4}></View>
      <View style={styles.box5}></View>
      <Image source={require('../../assets/images/lines.png')} style={styles.graphImage} />
      <View style={styles.monthsContainer}>
        {monthsAbbreviated.map((month, index) => (
          <Text key={index} style={styles.monthText}>{month}</Text>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={postureData}
        renderItem={renderDay}
        keyExtractor={(item, index) => index.toString()}
        numColumns={7}
        columnWrapperStyle={{ justifyContent: 'space-around' }}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9EE',
    padding: 15,
  },
  box: {
    width: 8,
    height: 90,
    backgroundColor: '#000',
    position: 'absolute',
    top: 160,
    left: 53,
  },
  box2: {
    width: 8,
    height: 50,
    backgroundColor: '#000',
    position: 'absolute',
    top: 200,
    left: 78,
  },
  box3: {
    width: 8,
    height: 30,
    backgroundColor: '#000',
    position: 'absolute',
    top: 220,
    left: 103
  },
  box4: {
    width: 8,
    height: 10,
    backgroundColor: '#000',
    position: 'absolute',
    top: 240,
    left: 128
  },
  box5: {
    width: 8,
    height: 80,
    backgroundColor: '#000',
    position: 'absolute',
    top: 170,
    left: 153
  },
  percentage: {
    fontSize: 10,
    fontWeight: '400',
    color: '#000',
    textAlign: 'center', // Center the text horizontally
    position: 'absolute', // Position the text absolutely within the card
    transform: [{ rotate: '-90deg' }], // Rotate the text 90 degrees
    left: -25, // Adjust this value to move the text to the left
    top: 200, // Adjust this value to move the text up
  },
  percentage1: {
    position: 'absolute',
    fontSize: 6,
    fontWeight: '400',
    color: '#000',
    top: 245,
    left: 38,
  },
  percentage2: {
    position: 'absolute',
    fontSize: 6,
    fontWeight: '400',
    color: '#000',
    top: 230,
    left: 34,
  },
  percentage3: {
    position: 'absolute',
    fontSize: 6,
    fontWeight: '400',
    color: '#000',
    top: 200,
    left: 33,
  },
  percentage4: {
    position: 'absolute',
    fontSize: 6,
    fontWeight: '400',
    color: '#000',
    top: 170,
    left: 33,
  },
  percentage5: {
    position: 'absolute',
    fontSize: 6,
    fontWeight: '400',
    color: '#000',
    top: 155,
    left: 30,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  content: {
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 37,
    fontWeight: '700',
    color: '#000',
    marginBottom: 15,
    marginTop: 80,
    left: '-2%',
  },
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    left: '-3%',
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#CDE29B',
    borderRadius: 30,
    padding: 5,
    height: 45,
  },
  calendarIconContainer: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 5,
    marginRight: -5,
    left: -1,
  },
  calendarIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  pickerWithArrow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  downArrowIcon: {
    width: 33,
    height: 33,
    marginTop: 3,
    resizeMode: 'contain',
    fontFamily: 'Inter',
    left: 10,
  },
  legendContainer: {
    flexDirection: 'row',
    left: '-3%',
    marginTop: 5,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  legendCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 5,
  },
  legendText: {
    fontSize: 12,
    fontWeight: '400',
  },
  calendarContainer: {
    alignItems: 'center',
  },
  daysOfWeekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
    left: '-4%',
  },
  dayHeader: {
    fontSize: 16,
    width: (screenWidth - 40) / 7,
    textAlign: 'center',
    fontWeight: '800',
    color: '#000',
  },
  dayCircle: {
    width: (screenWidth - 80) / 7,
    height: (screenWidth - 100) / 7,
    borderRadius: 22,
    margin: 3.7,
  },
  breakdownCard: {
    backgroundColor: '#B9D8D5',
    paddingVertical: 104, // Increase vertical padding to change height
    paddingHorizontal: 20, // Keep horizontal padding the same
    borderRadius: 50,
    marginTop: 20,
    position: 'relative', // Ensure the container is positioned relative for absolute children
  },
  breakdownTitleContainer: {
    alignItems: 'center',
    position: 'absolute', // Position the container absolutely within the card
    top: 10, // Adjust this value to move the title to the top
    left: '50%',
    transform: [{ translateX: -60 }], // Center the container horizontally
  },
  breakdownTitle: {
    marginTop: 10,
    fontSize: 35,
    fontWeight: '600',
    marginBottom: -15,
    left: '-2%',
  },
  navButton: {
    position: 'absolute',
    backgroundColor: '#fff',
    width: 45,
    height: 45,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    top: 25,
  },
  leftNavButton: {
    left: 25, // Adjust this value to position the left button
  },
  rightNavButton: {
    right: 25, // Adjust this value to position the right button
  },
  navButtonImage: {
    width: 33,
    height: 33,
    resizeMode: 'contain',
  },
  graphImage: {
    position: 'absolute',
    top: 100, // Center the image vertically
    left: '27.5%', // Center the image horizontally
    transform: [{ translateX: -50 }, { translateY: -50 }], // Adjust the position to center the image
    width: 300, // Adjust the width as needed
    height: 310, // Adjust the height as needed
    resizeMode: 'contain',
  },
  monthsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '84%',
    top: 58,
    marginTop: 100,
    left: '7.5%',
  },
  monthText: {
    fontSize: 11,
    fontWeight: '400',
    color: '#000',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 0, // Remove border
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 0, // Remove border
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default PostureInsightsScreen;