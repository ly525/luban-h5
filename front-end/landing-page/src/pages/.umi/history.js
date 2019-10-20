// create history
const history = require('history/createHashHistory').default({ basename: '/' });
window.g_history = history;
export default history;
