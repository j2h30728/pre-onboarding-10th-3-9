import { FaPlusCircle, FaSpinner } from 'react-icons/fa';
import { useCallback, useEffect, useState } from 'react';

import { createTodo } from '../api/todo';
import useFocus from '../hooks/useFocus';
import { Todo } from '../@types/todos';
import { getSuggestion } from '../api/search';
import { DEBOUNCE_DELAY_IN_MS } from '../utils/const';
import useDebounce from '../hooks/useDebounce';

interface InputProps {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const InputTodo = ({ setTodos }: InputProps) => {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { ref, setFocus } = useFocus<HTMLInputElement>();
  const debouncedKeyword = useDebounce<string>(inputText.trim(), DEBOUNCE_DELAY_IN_MS);

  useEffect(() => {
    setFocus();
  }, [setFocus]);

  useEffect(() => {
    if (debouncedKeyword) {
      getSuggestion({ keyword: debouncedKeyword, page: 1 });
    }
  }, [debouncedKeyword]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      try {
        e.preventDefault();
        setIsLoading(true);

        const trimmed = inputText.trim();
        if (!trimmed) {
          return alert('Please write something');
        }

        const newItem = { title: trimmed };
        const { data } = await createTodo(newItem);

        if (data) {
          return setTodos((prev) => [...prev, data]);
        }
      } catch (error) {
        console.error(error);
        alert('Something went wrong.');
      } finally {
        setInputText('');
        setIsLoading(false);
      }
      return undefined;
    },
    [inputText, setTodos],
  );

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <input
        className="input-text"
        placeholder="Add new todo..."
        ref={ref}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        disabled={isLoading}
      />
      {!isLoading ? (
        <button className="input-submit" type="submit">
          <FaPlusCircle className="btn-plus" />
        </button>
      ) : (
        <FaSpinner className="spinner" />
      )}
    </form>
  );
};

export default InputTodo;
