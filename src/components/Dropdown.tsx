import { useSearchState } from '../context/SearchContext';
import DropdownItem from './DropdownItem';

interface DropdownProps {
  isOpen: boolean;
}

const Dropdown = ({ isOpen }: DropdownProps) => {
  const { suggestions, inputText } = useSearchState();
  if (!isOpen) return null;

  return (
    <ul className="dropdown-container">
      <li className="sugegestion-item">{inputText}</li>
      {suggestions.map((suggestion, idx) => {
        const id = suggestion + idx;
        return (
          <DropdownItem key={id} index={idx}>
            {suggestion}
          </DropdownItem>
        );
      })}
    </ul>
  );
};

export default Dropdown;
