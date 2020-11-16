import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Products: {
        screens: {
          ProductOverview: 'overview',
          ProductDetail: 'detail',
          OverviewNavigator: 'OverviewNavigator',
        },
      },
    },
  },
};
