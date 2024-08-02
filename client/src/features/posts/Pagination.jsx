import PropTypes from "prop-types";

function Pagination({ currentPage, totalPosts, postsPerPage, onPageChange }) {
	// calculate the number of posts with the division and rounds up(ceil function)
	const totalPages = Math.ceil(totalPosts / postsPerPage);

	const handlePrevious = () => {
		if (currentPage > 1) {
			onPageChange(currentPage - 1);
		}
	};

	const handleNext = () => {
		if (currentPage < totalPages) {
			onPageChange(currentPage + 1);
		}
	};

	const getVisiblePageNumbers = () => {
		// return numbers to be visible and when add "..." (ellipsis)

		// prev 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 next 
		if (totalPages <= 10) {
			return createRange(1, totalPages);
		}

		// prev 1, 2, 3, 4, 5, 6, 7, 8, ..., 50 next 
		if (currentPage <= 6) {
			const lastPageBeforeEllipsis = 8;
			return [...createRange(1, lastPageBeforeEllipsis), "...", totalPages];
		}

		if (currentPage >= totalPages - 5) {
			return [1, "...", ...createRange(totalPages - 8, totalPages)];
		}

		return [1, "...", ...createMiddlePages(), "...", totalPages];
	};

	const createRange = (start, end) => {
		return Array.from({ length: end - start + 1 }, (_, i) => i + start);
	};

	const createMiddlePages = () => {
		const middlePagesStart = Math.max(2, currentPage - 3);
		const middlePagesEnd = Math.min(currentPage + 3, totalPages - 1);

		return createRange(middlePagesStart, middlePagesEnd);
	};

	return (
		<div>
			<button onClick={handlePrevious} disabled={currentPage === 1}>
				Prev
			</button>

			{getVisiblePageNumbers().map((page, index) =>
				typeof page === "number" ? (
					<button
						key={page}
						onClick={() => onPageChange(page)}
						disabled={currentPage === page}>
						{page}
					</button>
				) : ( // will show a ellipsis when the number is not visible
					<span key={`ellipsis-${index}`} style={{ margin: "0 5px" }}>
						{page}
					</span>
				)
			)}

			<button
				onClick={handleNext}
				disabled={currentPage === totalPages || totalPages === 0}>
				Next
			</button>
		</div>
	);
}

Pagination.propTypes = {
	currentPage: PropTypes.number.isRequired,
	totalPosts: PropTypes.number.isRequired,
	postsPerPage: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
