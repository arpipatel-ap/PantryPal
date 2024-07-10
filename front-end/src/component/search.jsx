import {useState} from "react";
import { FaSearch } from "react-icons/fa";
export default function Search({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');
  
    const handleInputChange = (event) => {
      setSearchTerm(event.target.value);
    };
  
    const handleSearch = () => {
      onSearch(searchTerm);
};
    return (
        <div className="searches section">
            <div className="search-box">
                <input type="text"
                 placeholder="Search ..."
                 value={searchTerm} 
                 onChange={handleInputChange}  />
                <button className="btn" onClick={handleSearch}>
                    <FaSearch />
                </button>
            </div>
        </div>
    )
}