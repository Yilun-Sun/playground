import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  navigation: {
    position: 'fixed',
    left: '10px',
    top: '0px',
  },
  home_button: {
    position: 'fixed',
    left: '15px',
    bottom: '15px',
  },
  link: {
    textDecoration: 'none',
  },
});

export default { useStyles };
