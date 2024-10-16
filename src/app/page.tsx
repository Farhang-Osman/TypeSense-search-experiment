'use client';

import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter';
import { Hits, InstantSearch, SearchBox } from 'react-instantsearch';
import type { NextPage } from 'next';

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: 'dO5e1kLIFhZdzbIoJrsqmpipx0aONY8u88JKid91KfihOwqN', // Be sure to use the search-only-api-key
    nodes: [
      {
        host: 'localhost',
        port: 8108,
        protocol: 'http',
      },
    ],
  },
  // The following parameters are directly passed to Typesense's search API endpoint.
  //  So you can pass any parameters supported by the search endpoint below.
  //  query_by is required.
  additionalSearchParameters: {
    query_by: 'title,authors',
  },
});

interface Props {
  hit: any;
}

export const hit = ({ hit }: Props) => {
  return <div>{hit.title}</div>;
};

const Home: NextPage = () => {
  return (
    <InstantSearch
      indexName='books'
      searchClient={typesenseInstantsearchAdapter.searchClient}
    >
      <SearchBox />
      <Hits hitComponent={hit} />
    </InstantSearch>
  );
};

export default Home;
