import React, { useRef } from "react"; // useRef: hold values between renderings
import PropTypes from "prop-types";

function SearchBar({ value, onSearchChange, onImmediateChange }) {
	const searchDebounceRef = useRef(null);

	const handleSeachChange = (e) => {
		// searchValue will receive the value typed at the search bar
		const searchValue = e.target.value;

		onImmediateChange(searchValue); // function received by props

		if (searchDebounceRef.current) { 
			//if searchDebounceRef.current has a value will clear the timeout
			clearTimeout(searchDebounceRef.current);
		}

		// adds a timeout (debounce) to call onSearchChange after 500ms to avoid 
		// frequent calls while the user is typing
		searchDebounceRef.current = setTimeout(() => {
			onSearchChange(searchValue);
		}, 500);
	};

	return (
		<div>
			<input
				type="text"
				placeholder="Search..."
				value={value}
				onChange={handleSeachChange}
			/>
		</div>
	);
}

SearchBar.propTypes = {
    value: PropTypes.string.isRequired,
    onSearchChange: PropTypes.func.isRequired,
    onImmediateChange: PropTypes.func.isRequired
};

export default SearchBar;

