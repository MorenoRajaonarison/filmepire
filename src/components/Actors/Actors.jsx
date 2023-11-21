import { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  useGetActorDetailQuery,
  useGetActorMovieQuery,
} from "../../services/TMDB";
import { Box, CircularProgress, Button, Grid, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import useStyles from "./styles";
import { MovieList, Pagination } from "../";

const Actors = () => {
  const { id } = useParams();
  const history = useHistory();
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const { data, isFetching, error } = useGetActorDetailQuery(id);
  const { data: actorMovies, isFetching: isActorMoviesFetcing } =
    useGetActorMovieQuery({ id, page: 1 });

  if (isFetching)
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Button
          startIcon={<ArrowBack />}
          color="primary"
          onClick={() => history.goBack()}
        >
          Back
        </Button>
      </Box>
    );
  }
  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={5} xl={4}>
          <img
            alt={data.name}
            className={classes.img}
            src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`}
          />
        </Grid>
        <Grid
          lg={7}
          xl={8}
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h2" gutterBottom>
            {data?.name}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Born: {new Date(data?.birthday).toDateString()}
          </Typography>
          <Typography variant="body1" align="jusitify" paragraph>
            {data?.biography || "No biography ..."}
          </Typography>
          <Box marginTop="2rem" display="flex" justifyContent="space-around">
            <Button
              variant="contained"
              color="primary"
              target="_blank"
              href={`https://www.imdb.com/name/${data?.imdb_id}`}
            >
              IMDB
            </Button>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => history.goBack()}
              color="primary"
            >
              Back
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box margin="2rem 0">
        <Typography variant="h2" gutterBottom align="center">
          Movies
        </Typography>
        {actorMovies && <MovieList movies={actorMovies} numberOfMovies={12} />}
        <Pagination
          currentPage={page}
          setPage={setPage}
          totalPages={data?.total_pages}
        />
      </Box>
    </>
  );
};

export default Actors;
