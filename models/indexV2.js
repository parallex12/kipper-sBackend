import {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    query,
    where,
    deleteDoc,
    updateDoc,
} from "firebase/firestore";
import firebase from "../services/Firebase.js";
import { SortTableData } from "../services/index.js";

let app = firebase?.app;
let db = firebase?.db;
let storage = firebase?.storage;

export const Query = {
    query_Get_by_id: async (path, id) => {
        const querySnapshot = await getDoc(doc(db, path, id))
        return querySnapshot.data()
    },
    query_Get_all: async (path) => {
        const querySnapshot = await getDocs(collection(db, path));
        return SortTableData(querySnapshot)
    },
    query_Get_by_key: async (path, key, value) => {
        const querySnapshot = await getDocs(query(collection(db, path), where(key, "==", value)));
        return SortTableData(querySnapshot)
    },
    query_update: async (path, id, data) =>
        await updateDoc(doc(db, path, id), data),
    query_create: async (path, id, data) =>
        await setDoc(doc(db, path, id), data, { merge: true, }),
    query_delete: async (path, id) => {
        await deleteDoc(doc(db, path, id))
    },
};
