import { useSearchDispatch, useSearchState } from '../context/SearchContext';

interface DropdownItemProps {
  index: number;
  children: string;
}

const DropdownItem = ({ index, children: name }: DropdownItemProps) => {
  const { inputText, activeIndex } = useSearchState();
  const { hoverSuggestion, inactivate, changeInputText } = useSearchDispatch();
  const onMouseEnter = () => hoverSuggestion(index);
  const onClick = () => changeInputText(name);

  const keywordRegex = new RegExp(`(${inputText})`, 'gi');
  const texts = name.split(keywordRegex);
  return (
    <button
      type="button"
      className={`sugegestion-item ${index === activeIndex ? 'active-index' : ''}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={inactivate}
      onClick={onClick}
    >
      {texts.map((text, idx) => {
        const key = text + idx;
        if (keywordRegex.test(text)) {
          return (
            <span className="sugegestion-item-text sugegestion-item-keyword" key={key}>
              {text}
            </span>
          );
        }
        return (
          <span className="sugegestion-item-text" key={key}>
            {text}
          </span>
        );
      })}
    </button>
  );
};

export default DropdownItem;
