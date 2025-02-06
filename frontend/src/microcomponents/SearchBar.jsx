import { useState } from "react";
import "../styling/SearchBar.css";

const SearchBar = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const data = [
        { id: 1, name: "Apple" },
        { id: 2, name: "Banana" },
        { id: 3, name: "Orange" },
        { id: 4, name: "Grape" },
        { id: 5, name: "Watermelon" },
    ];

    const handleChange = (event) => {
        const searchTerm = event.target.value;
        setQuery(searchTerm);

        const filteredResults = data.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setResults(filteredResults);
    };

    return (
        <div className="search-container">
            <div className="form-cc">
                <input
                    type="text"
                    className="input"
                    placeholder="Search..."
                    value={query}
                    onChange={handleChange}
                />
                {query && (
                    <div className="results-container">
                        {results.length > 0 ? (
                            results.map((result) => (
                                <div key={result.id} className="result-item">
                                    {result.name}
                                </div>
                            ))
                        ) : (
                            <div className="no-results">No results found</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchBar;
