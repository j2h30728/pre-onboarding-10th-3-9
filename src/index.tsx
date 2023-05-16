import ReactDOM from 'react-dom';
import { StrictMode } from 'react';
import App from './App';
import Cache from './utils/cache';
import { SearchContextProvider } from './context/SearchContext';

const SuggestionsCache = new Cache();

ReactDOM.render(
  <StrictMode>
    <SearchContextProvider cache={SuggestionsCache}>
      <App />
    </SearchContextProvider>
  </StrictMode>,
  document.getElementById('root'),
);
