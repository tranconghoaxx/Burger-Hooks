import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-project-firebase-8b1a9.firebaseio.com/'
});
export default instance;