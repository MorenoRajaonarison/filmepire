import { useState } from "react";
import useStyles from "./styles";
import {
  Modal,
  Typography,
  Button,
  Grid,
  Box,
  ButtonGroup,
  CircularProgress,
  useMediaQuery,
  Rating,
} from "@mui/material";
import {
  Movie as MovieIcon,
  Theaters,
  Language,
  PlusOne,
  Favorite,
  FavoriteBorderOutlined,
  Remove,
  ArrowBack,
} from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";
import {
  useGetMovieQuery,
  useGetRecomendationQuery,
} from "../../services/TMDB";
import genreIcons from "../../assets/genres";
import { MovieList } from "../";

const MovieInfo = () => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data, isFetching, error } = useGetMovieQuery(id);
  const { data: recomendations, isFetching: isRecomendationFetching } =
    useGetRecomendationQuery({
      list: "/recommendations",
      movie_id: id,
    });
  const isMovieFavorited = true;
  const isMovieWatchlisted = true;

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }
  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Link to="/">Something has goen wrong - Go back</Link>
      </Box>
    );
  }

  const addToFavorite = () => {};

  const addToWatchList = () => {};

  return (
    <Grid container className={classes.containerSpaceArround}>
      <Grid item sm={12} lg={4}>
        <img
          className={classes.poster}
          src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
          alt={data?.title}
        />
      </Grid>
      <Grid item container direction="column" lg={7}>
        <Typography variant="h3" align="center" gutterBottom>
          {data?.title} ({data.release_date.split("-")[0]})
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          {data?.tagline}
        </Typography>
        <Grid item className={classes.containerSpaceArround}>
          <Box display="flex" align="center">
            <Rating readOnly value={data?.vote_average / 2} />
            <Typography
              variant="subtitle1"
              gutterBottom
              style={{ marginLeft: "10px" }}
            >
              {data?.vote_average} / 10
            </Typography>
          </Box>
          <Typography variant="h6" align="center" gutterBottom>
            {data?.runtime}min /{" "}
            {data?.spoken_languages.length > 0 &&
              data?.spoken_languages[0].name}
          </Typography>
        </Grid>
        <Grid item className={classes.genresContainer}>
          {data.genres.map((genre, i) => (
            <Link
              key={genre.name}
              className={classes.links}
              to="/"
              onClick={() => dispatch(selectGenreOrCategory(genre?.id))}
            >
              <img
                src={genreIcons[genre.name.toLowerCase()]}
                className={classes.genreImg}
                height={30}
                alt=""
              />
              <Typography color="textPrimary" variant="subtitle1">
                {genre?.name}
              </Typography>
            </Link>
          ))}
        </Grid>
        <Typography variant="h5" gutterBottom style={{ marginTop: "10px" }}>
          Overview
        </Typography>
        <Typography gutterBottom style={{ marginBottom: "2rem" }}>
          {data?.overview}
        </Typography>
        <Typography variant="h5" gutterBottom>
          Top Casts
        </Typography>
        <Grid item container spacing={2}>
          {data &&
            data.credits?.cast
              ?.map(
                (actor) =>
                  actor.profile_path && (
                    <Grid
                      key={actor?.id}
                      item
                      xs={4}
                      md={2}
                      component={Link}
                      to={`/actors/${actor.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <img
                        alt={actor.name}
                        className={classes.castImg}
                        src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                      />
                      <Typography color="textPrimary">{actor?.name}</Typography>
                      <Typography color="textSecondary">
                        {actor?.character.split("/")[0]}
                      </Typography>
                    </Grid>
                  )
              )
              .slice(0, 6)}
        </Grid>
        <Grid item container style={{ marginTop: "2rem" }}>
          <div className={classes.btnsContainer}>
            <Grid item xs={12} sm={6} className={classes.btnsContainer}>
              <ButtonGroup size="small" variant="outlined">
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  href={data?.homepage}
                  endIcon={<Language />}
                >
                  Website
                </Button>
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.imdb.com/title/${data?.imdb_id}`}
                  endIcon={<MovieIcon />}
                >
                  IMDB
                </Button>
                <Button
                  onClick={() => setOpen(true)}
                  endIcon={<Theaters />}
                  href="#"
                >
                  Trailer
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.btnsContainer}>
              <ButtonGroup size="medium" variant="outlined">
                <Button
                  onClick={addToFavorite}
                  endIcon={
                    isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />
                  }
                >
                  {isMovieFavorited ? "Unfavorite" : "Favorite"}
                </Button>
                <Button
                  onClick={addToWatchList}
                  endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}
                >
                  Watchlist
                </Button>
                <Button
                  endIcon={<ArrowBack />}
                  sx={{ borderColor: "primary.main" }}
                >
                  <Typography
                    component={Link}
                    to="/"
                    color="inherit"
                    variant="subtitle2"
                    style={{ textDecoration: "none" }}
                  >
                    Back
                  </Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>
      <Box marginTop="5rem" width="100%">
        <Typography variant="h3" gutterBottom align="center">
          You might also like
        </Typography>
        {recomendations ? (
          <MovieList movies={recomendations} numberOfMovies={12} />
        ) : (
          <Box>Sorry, nothing was found</Box>
        )}
      </Box>
      <Modal
        closeAfterTransition
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
      >
        {data?.videos.results.length > 0 && (
          <iframe
            autoPlay
            className={classes.video}
            frameBorder="0"
            title="trailer"
            src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
            allow="autoplay"
          />
        )}
      </Modal>
    </Grid>
  );
};

export default MovieInfo;
