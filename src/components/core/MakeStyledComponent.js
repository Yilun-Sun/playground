// import { createUseStyles } from 'react-jss';
import { makeStyles } from '@material-ui/core/styles';

function MakeStyledComponent({ styleMap, children }) {
  return children(makeStyles(styleMap));
}

export default MakeStyledComponent;
