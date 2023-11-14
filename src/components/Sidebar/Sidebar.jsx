import React from "react";
import useStyles from "./styles";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Box,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/styles";

const blueLogo =
  "https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png";
const redLogo =
  "https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png";

const demoCategories = [
  {
    label: "Comedy",
    value: "comedy",
  },
  {
    label: "Action",
    value: "action",
  },
  {
    label: "Animation",
    value: "animation",
  },
];
const categories = [
  {
    label: "Popular",
    value: "popular",
  },
  {
    label: "Top rated",
    value: "top_rated",
  },
  {
    label: "Upcoming",
    value: "upcoming",
  },
];

function Sidebar({ setMobileOpen }) {
  const theme = useTheme();
  const classes = useStyles();
  return (
    <>
      <Link to="/" className={classes.imgLink}>
        <img
          className={classes.image}
          src={theme.palette.mode === "light" ? blueLogo : redLogo}
          alt=""
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <Link key={value} className={classes.links} to="/">
            <ListItem onClick={() => {}} button>
              {/* <ListItemIcon>
                <img
                  src={redLogo}
                  className={classes.genreImgs}
                  height={30}
                  alt=""
                />
              </ListItemIcon> */}
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {demoCategories.map(({ label, value }) => (
          <Link key={value} className={classes.links} to="/">
            <ListItem onClick={() => {}} button>
              {/* <ListItemIcon>
                <img
                  src={redLogo}
                  className={classes.genreImgs}
                  height={30}
                  alt=""
                />
              </ListItemIcon> */}
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
    </>
  );
}

export default Sidebar;
