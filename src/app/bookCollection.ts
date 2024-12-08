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
    reference?: string;
  }
  interface bookAndAuthorType {
    name: string;
    fields: FieldType[];
    default_sorting_field?: string;
  }

  const authorsScheme: bookAndAuthorType = {
    name: 'author',
    fields: [
      {
        name: 'id',
        type: 'string',
      },
      {
        name: 'title',
        type: 'string',
        facet: true,
      },
    ],
  };
  const booksSchema: bookAndAuthorType = {
    name: 'books',
    fields: [
      {
        name: 'title',
        type: 'string',
      },
      {
        name: 'authors_id',
        type: 'string',
        reference: 'author.id',
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
        name: 'image_url',
        type: 'string',
      },
      {
        name: 'average_rating',
        type: 'float',
        facet: true,
      },
    ],
    default_sorting_field: 'ratings_count',
  };

  await client.collections('books').delete();
  await client.collections('author').delete();

  client.collections().create(authorsScheme);
  client.collections().create(booksSchema);
  // .then(data => {
  //   console.log(data);
  // });

  // const booksInJsonl = await fs.readFile('books.jsonl', 'utf-8');
  // await client.collections('books').documents().import(booksInJsonl);

  const doc = [
    {
      title: 'The Hunger Games',
      author: 'Suzanne Collins',
      publication_year: 2008,
      id: '1',
      average_rating: 4.34,
      image_url: 'https://images.gr-assets.com/books/1447303603m/2767052.jpg',
      ratings_count: 4780653,
    },
    {
      title: "Harry Potter and the Philosopher's Stone",
      author: 'J.K. Rowling',
      publication_year: 1997,
      id: '2',
      average_rating: 4.44,
      image_url: 'https://images.gr-assets.com/books/1474154022m/3.jpg',
      ratings_count: 4602479,
    },
    {
      title: 'Twilight',
      author: 'Stephenie Meyer',
      publication_year: 2005,
      id: '3',
      average_rating: 3.57,
      image_url: 'https://images.gr-assets.com/books/1361039443m/41865.jpg',
      ratings_count: 3866839,
    },
    {
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      publication_year: 1960,
      id: '4',
      average_rating: 4.25,
      image_url: 'https://images.gr-assets.com/books/1361975680m/2657.jpg',
      ratings_count: 3198671,
    },
    {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      publication_year: 1925,
      id: '5',
      average_rating: 3.89,
      image_url: 'https://images.gr-assets.com/books/1490528560m/4671.jpg',
      ratings_count: 2683664,
    },
    {
      title: 'The Fault in Our Stars',
      author: 'John Green',
      publication_year: 2012,
      id: '6',
      average_rating: 4.26,
      image_url: 'https://images.gr-assets.com/books/1360206420m/11870085.jpg',
      ratings_count: 2346404,
    },
    {
      title: 'The Hobbit or There and Back Again',
      author: 'J.R.R. Tolkien',
      publication_year: 1937,
      id: '7',
      average_rating: 4.25,
      image_url: 'https://images.gr-assets.com/books/1372847500m/5907.jpg',
      ratings_count: 2071616,
    },
    {
      title: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
      publication_year: 1951,
      id: '8',
      average_rating: 3.79,
      image_url: 'https://images.gr-assets.com/books/1398034300m/5107.jpg',
      ratings_count: 2044241,
    },
    {
      title: 'Angels & Demons ',
      author: 'Dan Brown',
      publication_year: 2000,
      id: '9',
      average_rating: 3.85,
      image_url: 'https://images.gr-assets.com/books/1303390735m/960.jpg',
      ratings_count: 2001311,
    },
    {
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      publication_year: 1813,
      id: '10',
      average_rating: 4.24,
      image_url: 'https://images.gr-assets.com/books/1320399351m/1885.jpg',
      ratings_count: 2035490,
    },
    {
      title: 'The Kite Runner ',
      author: 'Khaled Hosseini',
      publication_year: 2003,
      id: '11',
      average_rating: 4.26,
      image_url: 'https://images.gr-assets.com/books/1484565687m/77203.jpg',
      ratings_count: 1813044,
    },
    {
      title: 'Divergent',
      author: 'Veronica Roth',
      publication_year: 2011,
      id: '12',
      average_rating: 4.24,
      image_url: 'https://images.gr-assets.com/books/1328559506m/13335037.jpg',
      ratings_count: 1903563,
    },
    {
      title: 'Nineteen Eighty-Four',
      author: 'George Orwell',
      publication_year: 1949,
      id: '13',
      average_rating: 4.14,
      image_url: 'https://images.gr-assets.com/books/1348990566m/5470.jpg',
      ratings_count: 1956832,
    },
    {
      title: 'Animal Farm: A Fairy Story',
      author: 'George Orwell',
      publication_year: 1945,
      id: '14',
      average_rating: 3.87,
      image_url: 'https://images.gr-assets.com/books/1424037542m/7613.jpg',
      ratings_count: 1881700,
    },
    {
      title: 'Het Achterhuis: Dagboekbrieven 14 juni 1942 - 1 augustus 1944',
      author: 'B.M. Mooyaart-Doubleday',
      publication_year: 1947,
      id: '15',
      average_rating: 4.1,
      image_url: 'https://images.gr-assets.com/books/1358276407m/48855.jpg',
      ratings_count: 1972666,
    },
    {
      title: 'Män som hatar kvinnor',
      author: ' Reg Keeland',
      publication_year: 2005,
      id: '16',
      average_rating: 4.11,
      image_url: 'https://images.gr-assets.com/books/1327868566m/2429135.jpg',
      ratings_count: 1808403,
    },
    {
      title: 'Catching Fire',
      author: 'Suzanne Collins',
      publication_year: 2009,
      id: '17',
      average_rating: 4.3,
      image_url: 'https://images.gr-assets.com/books/1358273780m/6148028.jpg',
      ratings_count: 1831039,
    },
    {
      title: 'Harry Potter and the Prisoner of Azkaban',
      author: 'Rufus Beck',
      publication_year: 1999,
      id: '18',
      average_rating: 4.53,
      image_url: 'https://images.gr-assets.com/books/1499277281m/5.jpg',
      ratings_count: 1832823,
    },
    {
      title: ' The Fellowship of the Ring',
      author: 'J.R.R. Tolkien',
      publication_year: 1954,
      id: '19',
      average_rating: 4.34,
      image_url: 'https://images.gr-assets.com/books/1298411339m/34.jpg',
      ratings_count: 1766803,
    },
    {
      title: 'Mockingjay',
      author: 'Suzanne Collins',
      publication_year: 2010,
      id: '20',
      average_rating: 4.03,
      image_url: 'https://images.gr-assets.com/books/1358275419m/7260188.jpg',
      ratings_count: 1719760,
    },
  ];

  for (let i = 0; i < doc.length; i++) {
    await client
      .collections('author')
      .documents()
      .upsert({
        id: String(doc[i].id),
        title: String(doc[i].author),
      });
    await client
      .collections('books')
      .documents()
      .upsert({
        title: String(doc[i].title),
        authors_id: String(doc[i].id),
        publication_year: doc[i].publication_year,
        ratings_count: doc[i].ratings_count,
        image_url: doc[i].image_url,
        average_rating: doc[i].average_rating,
      });
  }

  console.dir('-*-*-*-*-*-*-*-*-*-*-*-*');
  console.dir('complete');
  console.dir('-*-*-*-*-*-*-*-*-*-*-*-*');

  const searchParameters = {
    q: '*',
    query_by: 'title',
    include_fields: '$author(title)',
    sort_by: 'ratings_count:desc',
    facet_by: '$author(title)',
    per_page: 20,
  };

  client
    .collections('books')
    .documents()
    .search(searchParameters)
    .then(searchResults => {
      console.dir(searchResults, { depth: 5 });
    });
}

importBooks();
