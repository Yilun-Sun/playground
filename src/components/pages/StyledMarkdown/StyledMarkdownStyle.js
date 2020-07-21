const defaultBackgroundColor = '#666666';

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
    color: '#fafafa',
    // height: '100px',
  },
  main_canvas: {
    position: 'absolute',
    left: '100px',
    right: '100px',
    top: '100px',
    bottom: '100px',
    backgroundColor: 'black',
  },
  markdown: {
    position: 'absolute',
    left: '10px',
    top: '100px',
    bottom: '100px',
    width: '400px',
    backgroundColor: 'white'
  },
  converted_html: {
    position: 'absolute',
    right: '10px',
    top: '100px',
    bottom: '100px',
    width: '400px',
    backgroundColor: 'white'
  }
};

export default styles;