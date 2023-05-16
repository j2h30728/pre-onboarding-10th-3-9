import { FaPlusCircle, FaSpinner } from 'react-icons/fa';
import { useCallback, useEffect, useState } from 'react';

import { createTodo } from '../api/todo';
import { Todo } from '../@types/todos';

import SearchIcon from './SearchIcon';
import { useSearchDispatch, useSearchState } from '../context/SearchContext';
import useFocus from '../hooks/useFocus';

interface InputProps {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  onFocus: React.FocusEventHandler<HTMLInputElement>;
}
const InputTodo = ({ setTodos, onFocus }: InputProps) => {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { ref, setFocus } = useFocus<HTMLInputElement>();

  useEffect(() => {
    setFocus();
  }, [setFocus]);

  const { controlKeyboard, changeInputText } = useSearchDispatch();
  const { inputText: selectedText } = useSearchState();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeInputText(e.target.value);
    setInputText(e.target.value);
  };
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    controlKeyboard(e);
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      try {
        e.preventDefault();
        setIsLoading(true);

        const trimmed = selectedText ? selectedText.trim() : inputText.trim();
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
      <SearchIcon />
      <input
        ref={ref}
        className="input-text"
        placeholder="Add new todo..."
        value={selectedText || inputText}
        onChange={onChange}
        disabled={isLoading}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
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
