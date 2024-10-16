import Typesense from 'typesense';
import fs from 'fs/promises';

export async function importBooks(): Promise<void> {
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

  interface FieldType {
    name: string;
    type: string;
    facet?: boolean;
  }
  interface bookType {
    name: string;
    fields: FieldType[];
    default_sorting_field: string;
  }

  const booksSchema: bookType = {
    name: 'books',
    fields: [
      {
        name: 'title',
        type: 'string',
      },
      {
        name: 'authors',
        type: 'string[]',
        facet: true,
      },
      {
        name: 'publication_year',
        type: 'int32',
        facet: true,
      },
      {
        name: 'ratings_count',
        type: 'int32',
      },
      {
        name: 'average_rating',
        type: 'float',
      },
    ],
    default_sorting_field: 'ratings_count',
  };

  await client.collections('books').delete();

  client.collections().create(booksSchema);
  // .then(data => {
  //   console.log(data);
  // });

  const booksInJsonl = await fs.readFile('books.jsonl', 'utf-8');
  await client.collections('books').documents().import(booksInJsonl);

  // const searchParameters = {
  //   q: 'harry potter',
  //   query_by: 'title',
  //   sort_by: 'ratings_count:desc',
  // };

  // client
  //   .collections('books')
  //   .documents()
  //   .search(searchParameters)
  // .then(searchResults => {
  //   console.log(searchResults);
  // });
}

importBooks();
