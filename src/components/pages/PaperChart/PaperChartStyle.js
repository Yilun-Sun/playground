import { CallReceived } from '@material-ui/icons';
import color from './PaperChartCommonStyle';
const defaultBackgroundColor = 'white';

const styles = {
  main: {
    backgroundColor: defaultBackgroundColor,
    // height: '100%',
  },
  header: {
    margin: '0px 0px 20px 0px',
    fontSize: '48px',
    textAlign: 'center',
    // padding: '0px',
    paddingTop: '15px',
    paddingBottom: '5px',
    // color: 'linear-gradient(to right, #FDFBFB, #EBEDEE)',
    // width: '100vw',
    // height: '100px',
  },
  gradientText: {
    textTransform: 'uppercase',
    background: 'linear-gradient(to right, #1ABC9C 0%, #3498DB 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  charts_containter: {
    position: 'absolute',
    top: '100px',
    left: '50%',
    minWidth: '600px',
    marginLeft: '-300px',
    paddingBottom: '100px',
  },
};

export default styles;
