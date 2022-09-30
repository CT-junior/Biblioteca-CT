/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-param-reassign */
import { getDocs, collection } from "firebase/firestore";

import { store } from ".";
import { UserProps } from "../../interfaces/User";
import { toast } from "../../pages/_app";
import { db } from "../../services/firebase";

export const requestUsersFirebase = async () => {
    try {
        store.update((s) => {
            s.isLoading = true;
        });

        const usersCollectionRef = collection(db, "users");

        const response = await getDocs(usersCollectionRef);

        const users: UserProps[] = response.docs.map((doc) => {
            return {
                id: doc.id,
                image: doc.data().image,
                name: doc.data().name,
                email: doc.data().email,
            };
        });

        store.update((s) => {
            s.users = users;
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
