import { useEffect, useState } from 'react';

import Header from '../components/Header';
import InputTodo from '../components/InputTodo';
import TodoList from '../components/TodoList';
import { getTodoList } from '../api/todo';
import { Todo } from '../@types/todos';
import Dropdown from '../components/Dropdown';
import useClickOutside from '../hooks/useClickOutside';
import useBoolean from '../hooks/useBoolean';

const Main = () => {
  const [todoListData, setTodoListData] = useState<Todo[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await getTodoList();
      setTodoListData(data || []);
    })();
  }, []);

  const {
    value: isDropdownOpen,
    setFalse: closeDropdown,
    setTrue: openDropdown,
  } = useBoolean(false);
  const { ref } = useClickOutside<HTMLDivElement>(closeDropdown);

  return (
    <div className="container">
      <div className="inner">
        <Header />
        <div className="searchbar" ref={ref}>
          <InputTodo setTodos={setTodoListData} onFocus={openDropdown} />
          <Dropdown isOpen={isDropdownOpen} />
        </div>
        <TodoList todos={todoListData} setTodos={setTodoListData} />
      </div>
    </div>
  );
};

export default Main;
