/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-param-reassign */
import { getDoc, doc } from "firebase/firestore";

import { store } from ".";
import { UserProps } from "../../interfaces/User";
import { toast } from "../../pages/_app";
import { db } from "../../services/firebase";

export const requestUserFirebase = async (userID: string) => {
    try {
        store.update((s) => {
            s.isLoading = true;
        });

        const userDocRef = doc(db, "users", userID);

        const response = await getDoc(userDocRef);

        const user: UserProps = {
            id: response.id,
            image: response.data().image,
            name: response.data().name,
            email: response.data().email,
        };

        store.update((s) => {
            s.user = user;
            s.isLoading = false;
        });
    } catch (error) {
        toast({
            title: "Falha na comunicação com o banco de dados!",
            status: "error",
            description: error,
            duration: 4000,
            isClosable: true,
            position: "top-right",
        });
        store.update((s) => {
            s.isLoading = false;
        });
    }
};
