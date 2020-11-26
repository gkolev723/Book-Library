import { uniqueId } from '../../shared/utilities/uuid';
import { Book } from '../models/book';

export const books: Book[] = [
  {
    genre: 'Novel',
    id: uniqueId(),
    title: 'The adventures of Tom Sawyer',
    year: 1876,
    image: 'https://images-na.ssl-images-amazon.com/images/I/51DbxHs00VL._SX331_BO1,204,203,200_.jpg',
    price: 2.99
  },
  {
    genre: 'Biography',
    id: uniqueId(),
    title: "Surely You're Joking, Mr. Feynman!",
    year: 1985,
    image: 'https://images-na.ssl-images-amazon.com/images/I/519fWd56vTL.jpg',
    price: 1.99
  },
  {
    genre: 'Novel',
    id: uniqueId(),
    title: 'White Fang',
    year: 1906,
    image: 'https://m.media-amazon.com/images/I/51Zlm66XqFL.jpg',
    price: 3.75
  },
  {
    genre: 'Fantasy',
    id: uniqueId(),
    title: 'The Wonderful Wizard of Oz',
    year: 1906,
    image: 'https://images-na.ssl-images-amazon.com/images/I/A1KIpX5soNL.jpg',
    price: 2.99
  },
  {
    genre: 'Fantasy',
    id: uniqueId(),
    title: 'The Lord of the Rings',
    year: 1954,
    image: 'https://images-na.ssl-images-amazon.com/images/I/51EstVXM1UL._SX331_BO1,204,203,200_.jpg',
    price: 4.99
  },
];
