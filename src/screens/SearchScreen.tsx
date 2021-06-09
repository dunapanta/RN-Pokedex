import React from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SearchInput} from '../components/SearchInput';

export const SearchScreen = () => {
  const {top} = useSafeAreaInsets();
  return (
    <View style={{flex: 1, marginTop: top + 30, marginHorizontal: 20}}>
      <SearchInput />
    </View>
  );
};
