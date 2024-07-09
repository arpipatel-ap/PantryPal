import { FaSearch } from "react-icons/fa";
export default function Search(){
    
    return (
        <div className="searches section">
            <div className="search-box">
                <input type="text" placeholder="Search ..." />
                <button className="btn">
                    <FaSearch />
                </button>
            </div>
        </div>
    )
}