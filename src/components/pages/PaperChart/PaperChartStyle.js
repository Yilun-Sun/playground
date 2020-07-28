import color from './PaperChartCommonStyle';
const defaultBackgroundColor = color.midnight.light;

const styles = {
  main: {
    backgroundColor: defaultBackgroundColor,
    height: '100vh',
  },
  header: {
    margin: '0px 0px 20px 0px',
    fontSize: '48px',
    textAlign: 'center',
    paddingTop: '15px',
    paddingBottom: '5px',
    color: color.cloud.light,
    width: '100vw',
    // height: '100px',
  },
  charts_containter: {
    position: 'absolute',
    top: '100px',
    left: '50%',
    minWidth: '600px',
    marginLeft: '-300px',
  },
};

export default styles;
