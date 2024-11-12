// MultiSelectDropdown.tsx
import React, { useState, useRef, useEffect } from "react";
import classNames from "classnames";
import "./MultiSelectDropdown.scss";
interface MultiSelectDropdownProps {
  options: { label: string; emoji: string }[];
  onChange: (selectedOptions: string[]) => void;
  placeholder?: string;
}
const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  options,
  onChange,
  placeholder = "Select...",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [dropdownOptions, setDropdownOptions] = useState(options);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const handleOutsideClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };
  const handleOptionSelect = (option: string) => {
    const updatedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((item) => item !== option)
      : [...selectedOptions, option];
    setSelectedOptions(updatedOptions);
    onChange(updatedOptions);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim()) {
      const newOption = inputValue.trim();
      if (!selectedOptions.includes(newOption)) {
        const updatedOptions = [...selectedOptions, newOption];
        setSelectedOptions(updatedOptions);
        onChange(updatedOptions); // Add new option to dropdown options list
        setDropdownOptions((prevOptions) => [
          ...prevOptions,
          { label: newOption, emoji: "" }, // Assuming no emoji for new options
        ]);
      }
      setInputValue("");
    }
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    const filtered = dropdownOptions.filter((option) =>
      option.label.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setDropdownOptions(filtered);
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);
  useEffect(() => {
    // Sync dropdown options with the initial options passed from props
    setDropdownOptions(options);
  }, [options]);
  return (
    <div className="multi-select-dropdown" ref={dropdownRef}>
      {" "}
      <div className="dropdown-input" onClick={toggleDropdown}>
        {" "}
        <div className="dropdown-selected">
          {" "}
          {selectedOptions.length ? (
            selectedOptions.join(", ")
          ) : (
            <span className="dropdown-placeholder">{placeholder}</span>
          )}{" "}
        </div>{" "}
        <span className="dropdown-arrow">&#9660;</span>{" "}
      </div>{" "}
      {isOpen && (
        <div className="dropdown-menu">
          {" "}
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="dropdown-input-field"
            placeholder="Type to add..."
          />{" "}
          <div className="dropdown-options">
            {" "}
            {dropdownOptions.map((option) => (
              <div
                key={option.label}
                className={classNames("dropdown-option", {
                  "dropdown-option-selected": selectedOptions.includes(
                    option.label
                  ),
                })}
                onClick={() => handleOptionSelect(option.label)}
              >
                {" "}
                <span className="option-emoji">{option.emoji}</span>{" "}
                <span className="option-label">{option.label}</span>{" "}
                {selectedOptions.includes(option.label) && (
                  <span className="checkmark">✓</span>
                )}{" "}
              </div>
            ))}{" "}
          </div>{" "}
        </div>
      )}{" "}
    </div>
  );
};
export default MultiSelectDropdown;
