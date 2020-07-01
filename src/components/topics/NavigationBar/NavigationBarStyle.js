import { makeStyles } from '@material-ui/core/styles';

const topNavBarHeight = '64px';
const leftToolboxWidth = '200px';

const toolBoxColor = '#828282';
const defaultBackgroundColor = '#333333';

const useStyles = makeStyles({
    navigation: {
        position: "absolute",
        left: '10px',
        top: '0px'
    },
    link: {
        textDecoration: 'none'
    }
});

export default { useStyles };
