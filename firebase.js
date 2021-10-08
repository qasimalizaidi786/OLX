import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage";
import config from "./config"
firebase.initializeApp(config)

const auth=firebase.auth()
const db=firebase.firestore()
const stg=firebase.storage()

export {auth,db,stg};