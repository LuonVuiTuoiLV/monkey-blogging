import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyAmVmAFFqlz-BB6aHH5cPsTIB5CSE3A-Sg',
	authDomain: 'monkey-blogging-6f7c6.firebaseapp.com',
	projectId: 'monkey-blogging-6f7c6',
	storageBucket: 'monkey-blogging-6f7c6.appspot.com',
	messagingSenderId: '918656571576',
	appId: '1:918656571576:web:c2046491dcf71fe6803c4d',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
