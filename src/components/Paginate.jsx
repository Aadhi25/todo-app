import React from "react";
import Pagination from "@mui/material/Pagination";

const Paginate = ({ todosPerPage, todos, setCurrPage }) => {
  const paginationNums = [];
  for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
    paginationNums.push(i);
  }

  return (
    <div>
      <Pagination
        count={paginationNums.length}
        variant="outlined"
        boundaryCount={2}
        onChange={
          (event, page) => setCurrPage(page)
          // parseInt(e.target.ariaLabel.slice(e.target.ariaLabel.length - 1))
        }
      />
    </div>
  );
};

export default Paginate;
