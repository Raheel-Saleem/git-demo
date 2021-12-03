import React from "react";

const Paginantion = ({ pageNumbers, setPage, currentPage }) => {
  const lastindex = pageNumbers.at(-1);

  const handleClick = (event) => {
    console.log("event.id", Number(event.target.id));
    setPage(Number(event.target.id));
  };

  return (
    <div>
      <ul className="pagination">
        <li className="page-item" key={-1}>
          <button
            type="button"
            className="pagination-btn page-link "
            id={pageNumbers.at(0)}
            onClick={handleClick}
          >
            <i className="fa fa-angle-double-left" />
          </button>
        </li>

        {pageNumbers.map((pageNumber) => (
          <li className="page-item px-1" key={pageNumber}>
            <button
              type="button"
              className={
                (currentPage === pageNumber ? "active " : "") +
                "btn btn-outline-primary btn-sm "
              }
              id={pageNumber}
              onClick={handleClick}
            >
              {pageNumber}
            </button>
          </li>
        ))}
        <li className="page-item" key={pageNumbers.at(-1) + 1}>
          <button
            type="button"
            className="pagination-btn page-link "
            id={lastindex}
            onClick={handleClick}
          >
            <i className="fa fa-angle-double-right " />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Paginantion;
