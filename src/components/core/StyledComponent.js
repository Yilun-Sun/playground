import { createUseStyles } from 'react-jss';

function StyledComponent({ styleMap, children }) {
  window.history.pushState(null, null, document.URL);
  window.addEventListener('popstate', function () {
    window.history.pushState(null, null, document.URL);
  });
  return children(createUseStyles(styleMap));
}

export default StyledComponent;
