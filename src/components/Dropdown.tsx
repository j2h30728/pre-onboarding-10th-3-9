interface DropdownProps {
  isOpen: boolean;
}

const Dropdown = ({ isOpen }: DropdownProps) => {
  if (!isOpen) return null;

  return (
    <ul className="dropdown-container">
      <li className="sugegestion-item">test1</li>
      <li className="sugegestion-item">test1</li>
      <li className="sugegestion-item">test1</li>
      <li className="sugegestion-item">test1</li>
      <li className="sugegestion-item">test1</li>
      <li className="sugegestion-item">test1</li>
      <li className="sugegestion-item">test1</li>
    </ul>
  );
};

export default Dropdown;
