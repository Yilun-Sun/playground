const defaultBackgroundColor = '#3e5780';
const gridHeight = 50

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
        color: 'white'
    },
    button_group: {
        position: 'absolute',
        left: '200px',
        right: '200px',
        height: '200px',
        bottom: '30px',
        backgroundColor: '#f0f6ff',
        borderRadius: '15px',
        padding: '10px',
    },
    button: {
        height: `${gridHeight - 10}px`,
        width: '200px',
    },
    run_button: {
        height: `${gridHeight - 10}px`,
        width: '200px',
        background: 'linear-gradient(45deg, #00e600 30%, #00e600 90%)',
    },
    main_canvas: {
        position: 'absolute',
        left: '200px',
        right: '200px',
        top: '100px',
        bottom: '260px',
        backgroundColor: '#3e5780',
    },
    formControl: {
        height: `${gridHeight}px`,
        minWidth: '300px'
    },
    grid_container: {
        // position: 'absolute',
        // top: '30px',
        // left: '30px'
        padding: '15px'
    }
};

export default styles;