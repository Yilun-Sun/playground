const topNavBarHeight = '64px';
const leftToolboxWidth = '200px';

const toolBoxColor = '#828282';
const defaultBackgroundColor = '#B5CAA0';

const styles = {
    main: {
        position: 'absolute',
        bottom: '0px',
        width: '100%',
        height: '100%',
        backgroundColor: defaultBackgroundColor,
    },
    header: {
        position: 'abosulute',
        textAlign: 'center',
    },
    media: {
        height: 140,
    },
    stage_select_list: {
        display: "grid",
        margin: "auto",
        gridTemplateColumns: "repeat(auto-fit, minmax(480px, 1fr))",
        gridGap: "30px"
    },
    stage_select_list_item: {
        background: "rgba(255, 255, 255, 0.95)",
        display: "grid",
        gridTemplateColumns: "480px 2.5fr",
        position: "relative"
    },
    button_group: {
        margin: '800px 0px 0px 0px',
        textAlign: 'center'
    }

};

export default styles;