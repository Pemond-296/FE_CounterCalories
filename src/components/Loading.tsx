import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import { Colors } from '../utils/Color';

export const SmallLoading = () => (
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator size="small" color={Colors.gender} />
  </View>
);

export const LargeLoading = () => (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color={Colors.gender} />
    </View>
  );

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
