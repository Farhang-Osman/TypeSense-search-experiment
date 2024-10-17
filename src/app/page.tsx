'use client';

import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter';
import {
  Configure,
  Hits,
  InstantSearch,
  Pagination,
  RefinementList,
  SearchBox,
  SortBy,
} from 'react-instantsearch';
import type { NextPage } from 'next';
import Image from 'next/image';

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
  return (
    <div>
      <Image src={hit.image_url} width={100} height={100} alt='image' />
      <h3 className='truncate bg-gray-400'>{hit.title}</h3>
    </div>
  );
};

const Home: NextPage = () => {
  return (
    <InstantSearch
      indexName='books'
      searchClient={typesenseInstantsearchAdapter.searchClient}
    >
      <Configure hitsPerPage={9} />
      <div className='flex'>
        <aside className='bg-gray-500'>
          <RefinementList attribute='authors' />
        </aside>

        <main className='bg-gray-300'>
          <div>
            <SearchBox placeholder='search books' />
            <SortBy
              items={[
                { label: 'Featured', value: 'books' },
                {
                  label: 'publication_year',
                  value: 'books/sort/publication_year:asc',
                },
              ]}
            />
            <Hits hitComponent={hit} />
          </div>
          <div>
            <Pagination />
          </div>
        </main>
      </div>
    </InstantSearch>
  );
};

export default Home;
