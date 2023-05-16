import { useState } from 'react';
import type Cache from '../utils/cache';
import { getSearchData } from '../api/search';

type UseSuggestionsOutput = [string[], (keyword: string) => Promise<void>];

const useSuggestions = (cache: Cache): UseSuggestionsOutput => {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const clearSuggestions = () => setSuggestions([]);
  const changeKeyword = async (keyword: string) => {
    if (keyword === '') {
      clearSuggestions();
    } else {
      const cachedData = cache.get<string[]>(keyword);
      if (cachedData) {
        setSuggestions(cachedData);
      } else {
        const searchData = (await getSearchData({ keyword, page: 1 })).result;
        setSuggestions(searchData);
        cache.set(keyword, searchData);
      }
    }
  };

  return [suggestions, changeKeyword];
};

export default useSuggestions;
