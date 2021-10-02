import io from 'socket.io-client';
let socketConnection = io.connect(process.env.REACT_APP_BASE_URL_NODE)

export default socketConnection