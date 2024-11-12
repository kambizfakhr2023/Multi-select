// App.tsx
import React, { useState } from "react";
import MultiSelectDropdown from "./components/MultiSelectDropdown";
const App: React.FC = () => {
  // Define the options with labels and emojis
  const options = [
    { label: "Education", emoji: "🎓" },
    { label: "Yeeeah, science!", emoji: "🚀" },
    { label: "Art", emoji: "🎨" },
    { label: "Sport", emoji: "⚽" },
    { label: "Games", emoji: "🎮" },
    { label: "Health", emoji: "🏥" },
  ]; // State to manage selected options
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]); // Handle changes from the dropdown component
  const handleSelectionChange = (newSelectedOptions: string[]) => {
    setSelectedOptions(newSelectedOptions);
  };
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {" "}
      <h2>Multi Select Dropdown Example</h2>{" "}
      <MultiSelectDropdown
        options={options}
        onChange={handleSelectionChange}
        placeholder="Select a category..."
      />{" "}
      <div style={{ marginTop: "20px" }}>
        {" "}
        <strong>Selected Options:</strong> {selectedOptions.join(", ")}{" "}
      </div>{" "}
    </div>
  );
};
export default App;
