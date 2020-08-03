import color from '../../PaperChartCommonStyle';

const defaultBackgroundColor = '#FAFAFA';

const styles = {
  main: {
    marginTop: '30px',
    width: '600px',
    backgroundColor: defaultBackgroundColor,
    border: '1px solid white',
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
  chart_data_div: {
    position: 'relative',
    width: '600px',
    // height: '300px',
  },
  chart_data: {
    position: 'absolute',
    top: '50px',
    left: '50px',
    width: '500px',
    height: '300px',
  },
};

export default styles;
