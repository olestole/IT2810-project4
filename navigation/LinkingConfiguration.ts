import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Products: {
        screens: {
          ProductOverview: 'overview',
          ProductDetail: 'detail',
        },
      },
      Profile: {
        screens: {
          ProfileScreen: 'profile',
        },
      },
      NotFound: '*',
    },
  },
};
