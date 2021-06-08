import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SimplePokemon} from '../interfaces/pokemonInterfaces';

import {RootStackParms} from '../navigation/Navigator';
import {globalStyles} from '../theme/appTheme';

interface Props extends StackScreenProps<RootStackParms, 'PokemonScreen'> {
  simplePokemon: SimplePokemon;
  color: string;
}

export const PokemonScreen = ({navigation, route}: Props) => {
  const {top} = useSafeAreaInsets();
  const {simplePokemon, color} = route.params;
  return (
    <View style={{...globalStyles.globalMargin, marginTop: top + 20}}>
      <Text>Id {simplePokemon.id}</Text>
      <Text>Nombre: {simplePokemon.name}</Text>
    </View>
  );
};
