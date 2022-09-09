import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import {  getFirestore, } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId:process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
const storage = getStorage(app)

async function handleUploadImage(imageFile: File) {
  if (!imageFile) {
      return 'https://firebasestorage.googleapis.com/v0/b/library-ct.appspot.com/o/book-default-cover.jpg?alt=media&token=e15af89b-8e50-415d-b20c-bf8631c47f6a';
  }
  
  const imageRef = ref(storage, imageFile.name + Math.random());

  const downloadUrl = uploadBytes(imageRef, imageFile).then(async (snapshot) => {
      const downloadUrl = await getDownloadURL(snapshot.ref);

      return downloadUrl;
  })

  return downloadUrl;
}

export { app, db, storage, firebaseConfig, handleUploadImage }
