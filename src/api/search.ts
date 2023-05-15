import { Todo } from '../@types/todos';
import apiRequest from './index';

const RESOURCE = '/search';

interface getSuggestionProps {
  keyword: string;
  page: number;
}

export const getSuggestion = async ({ keyword, page }: getSuggestionProps) => {
  try {
    const response = await apiRequest.get<Todo[]>(`${RESOURCE}?q=${keyword}&page=${page}&limit=10`);
    return response;
  } catch (error) {
    throw new Error('API search error');
  }
};
