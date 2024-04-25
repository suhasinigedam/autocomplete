import React, { useState, useEffect } from "react";
import "./style.css";

export interface IData {
  code: string;
  title: string;
}

const AutoComplete: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [options, setOptions] = useState<IData[]>([]);
  const [debouncedInputValue, setDebouncedInputValue] = useState<string>("");
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  let timeoutId: NodeJS.Timeout | null = null;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedInputValue(inputValue);
    }, 300);

    return () => {
      return clearTimeout(timeoutId); //clears previous timeout fun, component unmount
    };
  }, [inputValue]);

  useEffect(() => {
    fetchData();
  }, [debouncedInputValue]);

  const fetchData = async () => {
    if (!selectedOption) {
      setIsLoading(true);
      try {
        const response = await fetch("/api/data.json");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const responseData = await response.json();
        setData(responseData);
        filterResults(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^a-zA-Z0-9\s]/g, "");
    setInputValue(value);
  };

  const filterResults = (data: IData[]) => {
    let filteredOptions: IData[] = [];
    if (debouncedInputValue.trim().length > 0) {
      const regex = new RegExp(`^${debouncedInputValue}`, "i");
      filteredOptions = data.filter((item: IData) => regex.test(item.title));
    }
    setOptions(filteredOptions);
  };

  const clearInputValue = () => {
    setInputValue("");
    setOptions([]);
    setSelectedOption(null);
  };

  const highLightMatch = (text: string, inputValue: string) => {
    const regex = new RegExp(`(${inputValue})`, "gi");
    return text.replace(regex, '<span class="highlight">$1</span>');
  };

  const handleOptionClick = (inputValue: string) => {
    setInputValue(inputValue);
    setSelectedOption(inputValue);
    setOptions([]);
  };

  return (
    <div className="container">
      <h1>Get started with Deel today</h1>
      <p>Let's find suitable role for your organization</p>
      <div>
        <input
          type="text"
          onChange={handleChange}
          placeholder="I am looking for.."
          value={inputValue}
          aria-label="auto-complete"
        />
        {inputValue.length > 0 && (
          <button
            className="buttonClear"
            onClick={clearInputValue}
            aria-label="clear-button"
          >
            X
          </button>
        )}
      </div>
      <div>
        {options.length > 0 ? (
          <ul>
            {options.map((item) => {
              return (
                <li
                  key={item.code}
                  onClick={() => handleOptionClick(item.title)}
                >
                  <span
                    dangerouslySetInnerHTML={{
                      __html: highLightMatch(item.title, inputValue),
                    }}
                  />
                </li>
              );
            })}
          </ul>
        ) : (
          <ul>
            {inputValue.trim().length > 0 && !selectedOption && (
              <li>
                <span>no result found.</span>
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AutoComplete;
