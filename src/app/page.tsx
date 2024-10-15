// import { NextPage } from 'next';
import importBooks from './bookCollection';

const Home = () => {
  importBooks();

  return <div className='bg-green-400'>hello world</div>;
};

export default Home;
