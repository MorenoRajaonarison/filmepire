import { useState, useEffect, useContext } from "react";
import useStyles from "./styles";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThemeModeContext } from "../../utils/ThemeToggle";
import {
  AppBar,
  IconButton,
  Toolbar,
  Drawer,
  Button,
  Avatar,
  useMediaQuery,
} from "@mui/material";
import {
  Menu,
  AccountCircle,
  Brightness4,
  Brightness7,
} from "@mui/icons-material";
import { Sidebar, Search } from "../.";
import { createSessionId, fetchToken, movieApi } from "../../utils";
import { setUser, userSelector } from "../../features/auth";

const Navbar = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const colorMode = useContext(ThemeModeContext);

  const isMobile = useMediaQuery("(max-width:600px)");
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const token = localStorage.getItem("request_token");
  const session_id = localStorage.getItem("session_id");
  const { isAuthenticated, user } = useSelector(userSelector);

  useEffect(() => {
    const login = async () => {
      if (token) {
        if (session_id) {
          const { data: userData } = await movieApi.get(
            `/account?session_id=${session_id}`
          );
          dispatch(setUser(userData));
        } else {
          const sessionId = await createSessionId();
          const { data: userData } = await movieApi.get(
            `/account?session_id=${sessionId}`
          );
          dispatch(setUser(userData));
        }
      }
    };
    login();
  }, [token]);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              style={{ outiline: "none" }}
              onClick={() => setMobileOpen((prev) => !prev)}
              className={classes.menuButton}
            >
              <Menu />
            </IconButton>
          )}
          <IconButton
            color="inherit"
            sx={{ ml: 1 }}
            onClick={colorMode.toggleColorMode}
          >
            {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && <Search />}
          <div>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={fetchToken}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                color="inherit"
                component={Link}
                to={`/profile/${user.id}`}
                className={classes.linkButton}
                onClick={() => {}}
              >
                {!isMobile && <>My movies &nbsp;</>}
                <Avatar
                  style={{ width: 30, height: 30 }}
                  alt="Profile"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAACCCAMAAAC93eDPAAAAOVBMVEWVu9////+QuN6Mtt3t8/nX5PL1+Pzm7veavuCfweLK3O650em90+rT4vGvy+aqyOWFstvf6vXD2OzY3JmZAAADjUlEQVR4nO2b23KDMAxEQY4NtsEG///HFtLm1nLREoswHfapncmEEyHJ9gqK4tSpU6dyin70qavXNjSuHeSaYOu9OUjVrjflk0zvarUfBVFzKSd0SXuFgryZArjGwu/BQLaaAxhVWXEICksAo4IwA/k1grKUvRnUrBOUZSPIQJFDUJZRjkHNlsKrjJIiIM0jKEstFQbLJShLK0PAD4JYGIAgCIWBHILgJMKgJpemOV0kEJg94aaYn4DXGB8SaJEKqIdROn97wlJhSIb8CB1GUJZddgRCEfLnQo0i1NkRoN44Kn9/PBEOgnCAdFQowr9sTdyt600CW1jVYwh9fgRs0ySybTrAfuEAu6aigPLRSBCA21eJM90BNvHr5sazggDBsEoAyWDyrxCjCGhOvcyZEukMYkYLH0EI4AgWB9dqkjT+Pu81sVzHUZLOI7GatIi3cEdgdUhZC5jTnoTa0oNhHUHaiv+8Ez8U5sqa7eQK8i5qlwjaXUZDS3HYIwZXhjRHkMQJbkGmOD2hi+rXB7MDqMb8/Eyi5s9yYZqfEaFKppEYWZKy1xRo1e3/oJ8ojA63q6prujqbl2K4vr+NBu8pP06MvdN9r51/zIvpXjCVz0YxfLl/Hg4/TyKJSKnnsfnLFNP0vsgwvyUV/+yVUjfzvdT9qRUd3w2Fmsx946d+HE1Pkh91skmznfCS7EuMh79tmttMvNMxaWk8XblA6vsJCkXBLX50M8MiwbfMpaou6zvKrQxrayKijWsH6Gksa5Pj0a3fBkDVBg+Qf27hacMoHTlHc7RhUwt7zmuCHQfU41sXfN5XWZNxVIXWpQUt53UZdEABeVs8gQ4Y6jhzBPqA6GyWI9ANRacPHIHGBzwM4wjKR66dggkyXySyEczH3AvEt6BlggSycchHBAEeSvKElIRIQUAlgY0e+AI8IJmCgEpCpiCgkjgAQiGwSI268AmQKRQiYGIlVJNIVR4AIfMp5iH2sU6qMwG9Kf8Z4ib2WYJm3dV3ldgIQv0Z6NBHQPh8LhyhL0jlIzsbRwYvcZrCJqhURJ11rTI64lMKVXjwueN5aV9sc/1IdbF92+qo2ti9Y4WPRn9oq433xFRtKHK8YkeKbEw9+qRfn6LN+oYfKVWHpHmTe51CrUTeqLvOYIqY2n76zpiqb5v4a04joev7k3VtbfDJuVbr1rnkg7V1Xez9biW9aM8rnzp16r/rCw3WKgGq93onAAAAAElFTkSuQmCC"
                />
              </Button>
            )}
          </div>
          {isMobile && <Search />}
        </Toolbar>
      </AppBar>
      <div>
        <nav className={classes.drawer}>
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              onClose={() => setMobileOpen((prev) => !prev)}
              classes={{ paper: classes.drawerPaper }}
              ModalProps={{ keepMounted: true }}
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer
              variant="permanent"
              classes={{ paper: classes.drawerPaper }}
              open
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </nav>
      </div>
    </>
  );
};

export default Navbar;
