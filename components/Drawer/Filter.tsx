import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, FilterOptions } from '../../store/types';
import { filter, filterVolumAndPrice } from '../../store/action';
import { List } from 'react-native-paper';
import { CheckBox } from 'react-native-elements';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    margin: 15,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  appMenu: {},
  checkBox: {
    backgroundColor: '#fff',
    borderWidth: 0,
    margin: 0,
    padding: 2,
  },
});

const getPriceRange = (price: number) => {
  switch (price) {
    case 0: {
      return [0, 500000];
    }
    case 1: {
      return [1, 100];
    }
    case 100: {
      return [100, 150];
    }
    case 150: {
      return [150, 200];
    }
    case 200: {
      return [200, 300];
    }
    case 300: {
      return [300, 500];
    }
    case 500: {
      return [500, 750];
    }
    case 750: {
      return [750, 1000];
    }
    case 1000: {
      return [1000, 5000];
    }
    case 5000: {
      return [5000, 500000];
    }
    default: {
      return [0, 500000];
    }
  }
};

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

const Filter = () => {
  const [volumeInput, setVolumeInput] = React.useState(6);
  const [priceInput, setPriceInput] = React.useState(60000);
  const [volumRange, setVolumeRange] = React.useState<number[]>([0, 6]);
  const [openCategory, setOpenCategory] = React.useState<boolean>(false);
  const [openVolume, setOpenVolume] = React.useState<boolean>(false);
  const [openPrice, setOpenPrice] = React.useState<boolean>(false);
  let filterOptions: FilterOptions = useSelector((state: AppState) => state.filterOptions);
  const dispatch = useDispatch();

  let handleClick = (func: any, openValue: boolean) => {
    func(!openValue);
  };

  const changeVolumeRange = (event: any, newValue: number) => {};

  const handleLocalVolumeChange = (event: any, newValue: number | number[]) => {
    setVolumeRange(newValue as number[]);
  };

  const handlePChange = (n: number) => {
    dispatch(filterVolumAndPrice({ field: 'minPrice', value: getPriceRange(n)[0] }));
    dispatch(filterVolumAndPrice({ field: 'maxPrice', value: getPriceRange(n)[1] }));
  };

  return (
    <View style={styles.rootContainer}>
      <List.AccordionGroup>
        <List.Accordion
          title='Kategorier'
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
  );
};

export default Filter;
