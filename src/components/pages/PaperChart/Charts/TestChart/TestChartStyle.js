import color from '../../PaperChartCommonStyle';

const defaultBackgroundColor = '#FAFAFA';

const styles = {
  main: {
    width: '600px',
    backgroundColor: defaultBackgroundColor,
    border: '1px solid #DDDDDD',
    borderRadius: 0,
  },
  header: {
    fontSize: '20px',
    textAlign: 'center',
    width: '100%',
    margin: '0px',
    marginTop: '10px',
    color: color.midnight.light,
  },
  main_canvas: {
    width: '600px',
    height: '400px',
  },
  canvas: {
    width: '100%',
    height: '100%',
  },
};

export default styles;
