import React from "react";
import useStyles from "./styles";
import { Button, Typography } from "@mui/material";

const Pagination = ({ totalPages, currentPage, setPage }) => {
  const classes = useStyles();

  const handlePrev = () => {
    if (currentPage !== 1) {
      setPage((page) => page - 1);
    }
  };
  const handleNext = () => {
    if (currentPage !== totalPages) {
      setPage((page) => page + 1);
    }
  };

  if (totalPages === 0) return;

  return (
    <div className={classes.container}>
      <Button
        className={classes.btn}
        variant="contained"
        color="primary"
        type="button"
        onClick={handlePrev}
      >
        Prev
      </Button>
      <Typography variant="h4" className={classes.pageNumber}>
        {currentPage}
      </Typography>
      <Button
        className={classes.btn}
        variant="contained"
        color="primary"
        type="button"
        onClick={handleNext}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
