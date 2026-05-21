import axios from 'axios';
const BASE_URL = 'https://dummyjson.com/quotes';
import type { Quote } from '../types/Quote';

export const getRandomQuote = async (): Promise<Quote> => {
  const res = await axios.get(`${BASE_URL}/random`);

  return res.data;
};
