import React, { useRef } from "react";
import PropTypes from "prop-types";

function SearchBar({ value, onSearchChange, onImmediateChange }) {
	const searchDebounceRef = useRef(null);

	const handleSeachChange = (e) => {
		const searchValue = e.target.value;
		onImmediateChange(searchValue);

		if (searchDebounceRef.current) {
			clearTimeout(searchDebounceRef.current);
		}

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

