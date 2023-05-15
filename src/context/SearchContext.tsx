import { createContext, useContext, useEffect, useState } from 'react';
import { DEBOUNCE_DELAY_IN_MS } from '../utils/const';
import useSuggestions from '../hooks/useSuggestions';
import useDebounce from '../hooks/useDebounce';
import type Cache from '../utils/cache';

interface SearchState {
  suggestions: string[];
  inputText: string;
}
interface Dispatch {
  changeInputText: (newKeyword: string) => void;
}

const SearchContext = createContext<SearchState | null>(null);
const SearchDispatchContext = createContext<Dispatch | null>(null);

export const SearchContextProvider = ({
  cache,
  children,
}: {
  cache: Cache;
  children: React.ReactNode;
}) => {
  const [suggestions, search] = useSuggestions(cache);
  const [inputText, setInputText] = useState('');
  const debouncedKeyword = useDebounce<string>(inputText.trim(), DEBOUNCE_DELAY_IN_MS);

  useEffect(() => {
    search(debouncedKeyword);
  }, [debouncedKeyword]);

  const changeInputText = (keyword: string) => {
    setInputText(keyword);
  };

  return (
    <SearchContext.Provider value={{ inputText, suggestions }}>
      <SearchDispatchContext.Provider value={{ changeInputText }}>
        {children}
      </SearchDispatchContext.Provider>
    </SearchContext.Provider>
  );
};

export const useSearchState = () => {
  const state = useContext(SearchContext);
  if (!state) {
    throw new Error('SearchContextProvider not found');
  }
  return state;
};

export const useSearchDispatch = () => {
  const dispatch = useContext(SearchDispatchContext);
  if (!dispatch) {
    throw new Error('SearchContextProvider not found');
  }
  return dispatch;
};
