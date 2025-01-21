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
  Index,
} from 'react-instantsearch';
import type { NextPage } from 'next';
import Image from 'next/image';

import { Autocomplete } from './autocomplete';
import Typesense from 'typesense';

const client = new Typesense.Client({
  nodes: [
    {
      host: 'localhost', // For Typesense Cloud use xxx.a1.typesense.net
      port: 8108, // For Typesense Cloud use 443
      protocol: 'http', // For Typesense Cloud use https
    },
  ],
  apiKey: 'dO5e1kLIFhZdzbIoJrsqmpipx0aONY8u88JKid91KfihOwqN',
  connectionTimeoutSeconds: 2,
});

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
    query_by: 'title',
    // include_fields: '$author(*)',
    highlight_full_fields: 'title',
    highlight_start_tag: '<b>',
    highlight_end_tag: '</b>',
  },
});

export const hit = ({ hit }: any) => {
  return (
    <div>
      {/* <Image src={hit.image_url} width={100} height={100} alt='image' /> */}
      <h3 className='truncate bg-gray-400'>{hit.title}</h3>
      {/* <h4>{hit.author.title}</h4> */}
    </div>
  );
};

export async function sources({ query }) {
  const results = await client.collections('books').documents().search({
    q: query,
    query_by: 'title',
    highlight_full_fields: 'title',
    highlight_start_tag: '<b>',
    highlight_end_tag: '</b>',
  });

  return [
    {
      sourceId: 'predictions',
      getItems() {
        return results.hits;
      },
      getItemInputValue({
        item: {
          document: { address },
        },
      }) {
        return `${address}`;
      },
      templates: {
        item({ item, html }) {
          // html is from the `htm` package. Docs: https://github.com/developit/htm
          const address =
            item.highlights.find(h => h.field === 'address')?.value ||
            item.document['address'];
          // const postcode =
          //   item.highlights.find((h) => h.field === 'postcode')?.value ||
          //   item.document['postcode'];
          // Get the highlighted HTML fragment from Typesense results
          const html_fragment = html`${address}`;

          // Send the html_fragment to `html` tagged template
          // Reference: https://github.com/developit/htm/issues/226#issuecomment-1205526098
          return html`<div
            dangerouslySetInnerHTML=${{ __html: html_fragment }}
          ></div>`;
        },
        noResults() {
          return 'No results found.';
        },
      },
    },
  ];
}

const Home: NextPage = () => {
  // await importBooks();

  return (
    <InstantSearch
      indexName='books'
      searchClient={typesenseInstantsearchAdapter.searchClient}
    >
      <Autocomplete
        placeholder='Search products'
        detachedMediaQuery='none'
        openOnFocus={false}
        getSources={sources}
      />
    </InstantSearch>
  );
};

export default Home;
