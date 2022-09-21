import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

async function handleUploadImage(
    imageFile: File | null | undefined,
    id: String
) {
    if (!imageFile) {
        return "https://firebasestorage.googleapis.com/v0/b/library-ct.appspot.com/o/book-default-cover.jpg?alt=media&token=e15af89b-8e50-415d-b20c-bf8631c47f6a";
    }

    const imageRef = ref(storage, String(id));

    const downloadUrl = uploadBytes(imageRef, imageFile).then(
        async (snapshot) => {
            const downloadUrl = await getDownloadURL(snapshot.ref);

            return downloadUrl;
        }
    );

    return downloadUrl;
}

export { app, db, storage, firebaseConfig, handleUploadImage };
