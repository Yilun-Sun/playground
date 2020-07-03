const topNavBarHeight = '64px';
const leftToolboxWidth = '200px';

const toolBoxColor = '#828282';
const defaultBackgroundColor = '#f2f9ff';

const styles = {
    main: {
        backgroundColor: defaultBackgroundColor,
    },
    header: {
        margin: '0px 0px 20px 0px',
        textAlign: 'center',
    },
    media: {
        height: 240,
    },
    stage_select_list: {
        display: "grid",
        margin: "auto",
        gridTemplateColumns: "repeat(auto-fit, minmax(480px, 1fr))",
        gridGap: "30px"
    },
    stage_select_list_item: {
        background: defaultBackgroundColor,
        display: "grid",
        gridTemplateColumns: "480px 2.5fr",
        position: "relative"
    }
};

export default styles;