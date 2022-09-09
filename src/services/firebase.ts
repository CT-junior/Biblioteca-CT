import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import {  getFirestore, } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBQz5Cxx5A_VJkkw7CY3jVCqmaf-1s_T7Q",
  authDomain: "library-ct.firebaseapp.com",
  projectId: "library-ct",
  storageBucket: "library-ct.appspot.com",
  messagingSenderId: "152894295524",
  appId: "1:152894295524:web:adaae9b104fa0f278fcbf1"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
const storage = getStorage(app)

async function handleUploadImage(imageFile: File) {
  if (!imageFile) {
      return 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png';
  }
  
  const imageRef = ref(storage, imageFile.name + Math.random());

  const downloadUrl = uploadBytes(imageRef, imageFile).then(async (snapshot) => {
      const downloadUrl = await getDownloadURL(snapshot.ref);

      return downloadUrl;
  })

  return downloadUrl;
}

export { app, db, storage, firebaseConfig, handleUploadImage }
