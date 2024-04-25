/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
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

  /**
   * method to fetch data from remote api
   */
  const fetchData = async () => {
    if (!selectedOption) {
      setIsLoading(true);
      try {
        const response = await fetch(
          "http://suhasini-autocomplete-api.s3-website.ap-south-1.amazonaws.com/data.json"
        );
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

  /**
   * handles onchange method of input field
   * @param event
   */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^a-zA-Z0-9\s]/g, "");
    setInputValue(value);
  };

  /**
   * Performs filtering on data as per searched criteria
   * @param data
   */
  const filterResults = (data: IData[]) => {
    let filteredOptions: IData[] = [];
    if (debouncedInputValue.trim().length > 0) {
      const regex = new RegExp(`^${debouncedInputValue}`, "i");
      filteredOptions = data.filter((item: IData) => regex.test(item.title));
    }
    setOptions(filteredOptions);
  };

  /**
   * handler for cross button action to clear input
   */
  const clearInputValue = () => {
    setInputValue("");
    setOptions([]);
    setSelectedOption(null);
  };

  /**
   * highlights the matching searched string from result data set
   * @param text
   * @param inputValue
   * @returns html element with highlighted string
   */
  const highLightMatch = (text: string, inputValue: string) => {
    const regex = new RegExp(`(${inputValue})`, "gi");
    return text.replace(regex, '<span class="highlight">$1</span>');
  };

  /**
   * selects the searched result
   * @param inputValue
   */
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
