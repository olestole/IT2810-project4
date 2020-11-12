import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LoadingIndicator from '../components/Shared/LoadingIndicator';
import { GET_SINGLE_PRODUCT } from '../graphql';

const DetailScreen = ({ navigation }: any) => {
  const { data, loading, error } = useQuery(GET_SINGLE_PRODUCT, {
    variables: { number: '255' },
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (loading) return <LoadingIndicator />;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Overview')}>
        <Text>Detail-screen</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  inputField: {
    width: '80%',
    padding: 10,
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    textAlign: 'center',
    borderRadius: 6,
  },
});
