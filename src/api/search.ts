import apiRequest from './index';

const RESOURCE = '/search';

interface GetSearchDataProps {
  keyword: string;
  page: number;
}

interface SuggestionResponse {
  limite: number;
  page: number;
  q: string;
  qty: number;
  result: string[];
  message: string;
  opcode: number;
}
export const getSearchData = async ({ keyword, page }: GetSearchDataProps) => {
  try {
    const { data } = await apiRequest.get<SuggestionResponse>(
      `${RESOURCE}?q=${keyword}&page=${page}&limit=10`,
    );
    return data;
  } catch (error) {
    throw new Error('API search error');
  }
};
