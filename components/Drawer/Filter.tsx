import React from 'react';
import { Keyboard, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, FilterOptions } from '../../store/types';
import { filter, filterVolumAndPrice, setSearchText, updateViewMode } from '../../store/action';
import { Chip, Divider, List, TextInput, useTheme } from 'react-native-paper';
import { CheckBox } from 'react-native-elements';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    margin: 15,
    justifyContent: 'center',
  },
  checkBox: {
    backgroundColor: '#fff',
    borderWidth: 0,
    margin: 0,
    padding: 2,
  },
  divider: {
    marginVertical: 30,
  },
  searchChip: {
    marginTop: 10,
  },
});

const categories = {
  rodvin: 'Rødvin',
  hvitvin: 'Hvitvin',
  musserende_vin: 'Musserende',
  sterk_vin: 'Sterk',
  annen_vin: 'Annen',
  ol: 'Øl',
  brennevin: 'Brennevin',
  alkoholfritt: 'Alkoholfritt',
  annet: 'Annet',
};

const renderCheckboxes = (
  categories: { [key: string]: string },
  dispatch: any,
  filterOptions: any
) => {
  return Object.keys(categories).map((key) => (
    <CheckBox
      key={key}
      containerStyle={styles.checkBox}
      checked={filterOptions.kategorier[key]}
      title={categories[key]}
      onPress={() => {
        dispatch(filter({ field: key, value: !filterOptions.kategorier[key] }));
      }}
    />
  ));
};

const Filter = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  let filterOptions: FilterOptions = useSelector((state: AppState) => state.filterOptions);
  let searchText: string = useSelector((state: AppState) => state.searchText);

  const [searchInput, setSearchInput] = React.useState('');
  const [volumeInput, setVolumeInput] = React.useState(6);
  const [priceInput, setPriceInput] = React.useState(60000);

  const handleSearchSubmit = () => {
    dispatch(setSearchText(searchInput));
    dispatch(updateViewMode({ field: 'initialLoad', value: true }));
    setSearchInput('');
    navigation.closeDrawer();
  };

  const handleDelete = () => {
    dispatch(setSearchText(''));
    dispatch(updateViewMode({ field: 'initialLoad', value: true }));
  };

  const activeCategoryFilters = () => {
    return Object.values(filterOptions.kategorier)
      .filter((value) => value)
      .length.toString();
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.rootContainer}>
        <View>
          <TextInput
            dense={true}
            blurOnSubmit
            label='Søk på ønsket produkt'
            multiline
            mode='outlined'
            value={searchInput}
            onChangeText={(value) => setSearchInput(value)}
            onBlur={() => Keyboard.dismiss()}
            onSubmitEditing={handleSearchSubmit}
            returnKeyType={'search'}
          />
          {searchText !== '' && (
            <Chip
              icon='close'
              onPress={() => handleDelete()}
              style={[styles.searchChip, { backgroundColor: colors.accent }]}
            >
              {searchText}
            </Chip>
          )}
        </View>
        <Divider style={styles.divider} />
        <List.AccordionGroup>
          <List.Accordion
            title={`Kategorier [${activeCategoryFilters()}]`}
            id='1'
            left={() => <MaterialCommunityIcons name='bottle-wine' size={24} color='black' />}
          >
            {renderCheckboxes(categories, dispatch, filterOptions)}
          </List.Accordion>
          <List.Accordion
            title={`Max volum: ${volumeInput.toPrecision(2)}L`}
            id='2'
            left={() => <MaterialCommunityIcons name='water-outline' size={24} color='black' />}
            style={{ width: '100%' }}
          >
            <Slider
              style={{ width: '90%', alignSelf: 'center', padding: 0 }}
              value={volumeInput}
              minimumValue={0}
              maximumValue={6}
              step={0.1}
              onSlidingComplete={() =>
                dispatch(filterVolumAndPrice({ field: 'maxVolum', value: volumeInput }))
              }
              onValueChange={(e) => setVolumeInput(e)}
            />
          </List.Accordion>
          <View>
            <List.Accordion
              title={`Max pris: ${priceInput}kr`}
              id='3'
              left={() => <MaterialIcons name='attach-money' size={24} color='black' />}
            >
              <Slider
                style={{ width: '90%', alignSelf: 'center', padding: 0 }}
                value={priceInput}
                minimumValue={0}
                maximumValue={50000}
                step={25}
                onSlidingComplete={() =>
                  dispatch(filterVolumAndPrice({ field: 'maxPrice', value: priceInput }))
                }
                onValueChange={(e) => setPriceInput(e)}
              />
            </List.Accordion>
          </View>
        </List.AccordionGroup>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Filter;
