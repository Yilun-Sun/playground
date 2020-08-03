// const defaultBackgroundColor = '#f2f9ff';
const defaultBackgroundColor = '#88bdbc';

const styles = {
  root: {
    // for card???
  },
  main: {
    backgroundColor: defaultBackgroundColor,
  },
  footer: {
    height: '200px',
  },
  header: {
    margin: '0px 0px 20px 0px',
    fontSize: '48px',
    textAlign: 'center',
    paddingTop: '15px',
    paddingBottom: '5px',
    color: '#def2f1',
    // height: '100px',
  },
  media: {
    height: '240px',
  },
  construction_layer: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    opacity: '1',
  },
  stage_select_list: {
    display: 'grid',
    margin: 'auto',
    gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))',
    gridGap: '40px',
    padding: '0px',
    maxWidth: '80vw',
    marginTop: '30px',
  },
  stage_select_list_item: {
    background: defaultBackgroundColor,
    width: '480px',
    // listStyle: 'none',
    justifySelf: 'center',
    display: 'grid',
    gridTemplateColumns: '480px 2.5fr',
    position: 'relative',
    transition: '0.1s ease-out',
    '&:hover': {
      transform: 'translateY(-20px)',
    },
  },
};

export default styles;
