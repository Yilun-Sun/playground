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
  div_canvas: {
    position: 'absolute',
    left: '300px',
    right: '100px',
    top: '100px',
    bottom: '100px',
    backgroundColor: 'black',
  },
  canvas: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    backgroundColor: 'white',
  },
  div_picker: {
    position: 'absolute',
    left: '25px',
    top: '100px',
    width: '250px',
    height: '800px',
    backgroundColor: 'blue',
  },
  picker: {
    position: 'absolute',
    left: '5px',
    top: '5px',
    width: '240px',
    height: '600px',
    backgroundColor: 'green',
  },
};

export default styles;
