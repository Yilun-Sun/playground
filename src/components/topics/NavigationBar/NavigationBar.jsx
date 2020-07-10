import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import HomeIcon from '@material-ui/icons/Home';
import MenuItem from '@material-ui/core/MenuItem';
import NavigationBarStyle from './NavigationBarStyle';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const classes = NavigationBarStyle.useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className={classes.navigation}
      >
        <MenuIcon />
      </IconButton>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={() => {
          window.location.href = '/playground';
        }}
        className={classes.home_button}
      >
        <HomeIcon />
      </IconButton>
      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleClose}>
          <Link to="/playground" className={classes.link}>
            Home
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/visual-sort-algo" className={classes.link}>
            Visual Algo
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/pathfind" className={classes.link}>
            Pathfind
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/orereo" className={classes.link}>
            Orereo
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/css-jss" className={classes.link}>
            Css To Jss
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/notfound" className={classes.link}>
            NotFound
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Navigation;
