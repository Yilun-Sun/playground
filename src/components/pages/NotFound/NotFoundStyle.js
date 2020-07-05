const defaultBackgroundColor = '#333333';

const styles = {
    main: {
        width: '100vw',
        height: '100vh',
        backgroundColor: defaultBackgroundColor,
    },
    header: {
        textAlign: 'center'
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
    }
};

export default styles;