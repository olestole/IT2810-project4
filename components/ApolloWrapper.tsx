import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import React from 'react';

const ApolloWrapper: React.FC = ({ children }) => {
  const httpLink = new HttpLink({
    uri: 'http://it2810-49.idi.ntnu.no:3000/graphql',
  });

  const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloWrapper;
