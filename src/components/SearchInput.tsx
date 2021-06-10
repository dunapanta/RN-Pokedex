import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  style?: StyleProp<ViewStyle>;
}

export const SearchInput = ({style}: Props) => {
  return (
    <View style={{...styles.container, ...(style as any)}}>
      <View style={styles.textBackground}>
        <TextInput
          placeholder="Búscar Pokemon"
          style={styles.textInput}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Icon name="search-outline" size={30} color="grey" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //backgroundColor: 'blue',
    marginBottom: 20,
    marginHorizontal: 14,
  },
  textBackground: {
    backgroundColor: '#f3f1f3',
    borderRadius: 60,
    height: 40,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 4,
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    top: 2,
  },
});
