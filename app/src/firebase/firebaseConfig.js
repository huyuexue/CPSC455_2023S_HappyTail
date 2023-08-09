import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyD5UQDToBLJOUoDIfNInSD2FyXJt4pm2tE",
    authDomain: "happytrail-a2431.firebaseapp.com",
    projectId: "happytrail-a2431",
    storageBucket: "happytrail-a2431.appspot.com",
    messagingSenderId: "973049866540",
    appId: "1:973049866540:web:ed882d1cbeb33a28aee489"
}
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
export { auth }