/* eslint-disable no-param-reassign */
import { setDoc, doc, collection, getDocs } from "firebase/firestore";

import { store } from ".";
import { RegistryProps } from "../../interfaces/Registry";
import { db } from "../../services/firebase";

export const newRegistry = async ({
	id,
	action,
	book,
	date,
	user,
}: RegistryProps) => {
	try {
		store.update((s) => {
			s.isLoading = true;
		});

		await setDoc(doc(db, "registries", id), {
			id,
			action,
			book,
			date,
			user,
		});

		store.update((s) => {
			s.registries.push({ id, action, book, date, user });
			s.isLoading = false;
		});
	} catch (err) {
		store.update((s) => {
			s.isLoading = false;
		});
	}
};

export const requestRegistriesFirebase = async () => {
	try {
		store.update((s) => {
			s.isLoading = true;
		});

		const registryCollectionRef = collection(db, "registries");

		const response = await getDocs(registryCollectionRef);
		const registries = response.docs.map((doc) => {
			return {
				id: doc.id,
				action: doc.data().action,
				book: doc.data().book,
				date: doc.data().date,
				user: doc.data().user,
			};
		});

		store.update((s) => {
			s.registries = registries;
			s.isLoading = false;
		});
	} catch (err) {
		store.update((s) => {
			s.isLoading = false;
		});
	}
};
