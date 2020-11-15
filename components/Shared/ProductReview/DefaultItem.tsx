import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 4,
    padding: 10,

    backgroundColor: '#fff',

    borderRadius: 5,

    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
  textContainer: {
    margin: 0,
    padding: 0,
    marginLeft: 20,
    flexDirection: 'column',
  },
  ratingContainer: {
    flexDirection: 'column',

    justifyContent: 'center',
  },
  header: {
    fontWeight: '700',
    margin: 0,
    marginBottom: 5,
    padding: 0,
  },
  icon: {
    color: 'gold',
    margin: 0,
    // '& > *': {
    //   width: 30,
    //   height: 30,
    // },
  },
});

interface IDefaultItem {
  title: string;
  description: string;
}

const DefaultItem: React.FC<IDefaultItem> = ({ title, description }) => {
  return (
    <View style={styles.root}>
      <View style={styles.textContainer}>
        <Text style={styles.header}>{title}</Text>
        <Text>{description}</Text>
      </View>
    </View>
  );
};

export default DefaultItem;
