import { useSearchState } from '../context/SearchContext';

interface DropdownProps {
  isOpen: boolean;
}

const Dropdown = ({ isOpen }: DropdownProps) => {
  const { suggestions, inputText } = useSearchState();
  console.log(suggestions);
  if (!isOpen) return null;

  return (
    <ul className="dropdown-container">
      <li className="sugegestion-item">{inputText}</li>
      {suggestions.map((suggestion, idx) => (
        <li key={`${suggestion}`} className="sugegestion-item">
          {suggestion}
        </li>
      ))}
    </ul>
  );
};

export default Dropdown;
