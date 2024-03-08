import {io} from "socket.io-client";

const url = 'http://localhost:8080'
export const socket = io(url, {
    autoConnect: false
})


