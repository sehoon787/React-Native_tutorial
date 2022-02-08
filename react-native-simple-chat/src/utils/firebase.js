import * as firebase from '@firebase/app';
import * as auth from '@firebase/auth';
import * as storage from '@firebase/storage';

import { getFirestore, collection, doc, setDoc, addDoc } from "@firebase/firestore";

import config from '../../firebase.json';

const app = firebase.initializeApp(config);
const Auth = auth.getAuth(app);
const FirebaseStorage = storage.getStorage(app);

export const login = async ({ email, password }) => {
  // const { user } = await Auth.signInWithEmailAndPassword(email, password); // error
  const { user } = await auth.signInWithEmailAndPassword(Auth, email, password);
  return user;
};

const uploadImage = async uri => {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      reject(new TypeError('Network request failed'));
    };
  xhr.responseType = 'blob';
  xhr.open('GET', uri, true);
  xhr.send(null);
  });

  const user = Auth.currentUser;
  const ref = storage.ref(FirebaseStorage, `/profile/${user.uid}/photo.png`);
  const snapshot = await storage.uploadBytes(ref, blob);

  blob.close();

  return await storage.getDownloadURL(ref);
};

export const signup = async ({email, password, name, photoUrl}) => {
  // const {user} = await Auth.createUserWithEmailAndPassword(email, password);   // error
  const {user} = await auth.createUserWithEmailAndPassword(Auth, email, password);

  // console.log(user);

  const storageUrl = photoUrl.startsWith('https')
  ? photoUrl
  : await uploadImage(photoUrl);

  auth.updateProfile(user, {
    displayName: name,
    photoURL: storageUrl,
  });

  return user;
};

export const logout = async () => {
  return await Auth.signOut();
};

export const getCurrentUser = () => {
  // console.log(Auth.currentUser);

  const { uid, displayName, email, photoURL } = Auth.currentUser;
  return { uid, name: displayName, email, photoUrl: photoURL };
};

export const updateUserPhoto = async photoUrl => {
  const user = Auth.currentUser;
  const storageUrl = photoUrl.startsWith('https')
    ? photoUrl
    : await uploadImage(photoUrl);
  
  auth.updateProfile(user, {
    photoURL: storageUrl
  });

  return { name: user.displayName, email: user.email, photoUrl: user.photoURL};
};

export const DB = getFirestore(app);

export const createChannel = async ({ title, description }) => {
  // export const createChannel = async ({ title, description, idx }) => {
  const newChannelRef = doc(collection(DB, "channels"));  // Add a new document with a generated id

  // console.log(title);
  // console.log(description);

  id = newChannelRef.id;
  await setDoc(newChannelRef, {
    id: id,
    title: title,
    description: description,
    // title: title+idx,
    // description: description+idx,
    createdAt: Date.now(),
    });

    return id;
};

// export const createMessage = async({channelId, text})=>{
export const createMessage = async({channelId, message})=>{
  
  // return await addDoc(collection(DB,`channels/${channelId}/messages`), {
  //   // text: message,
  //   message: message,
  //   createdAt: Date.now(),
  // });

  // console.log(message);
  // console.log(message._id);

  const ref = collection(DB,`channels/${channelId}/messages`);
  return await setDoc(doc(ref, message._id), {
    ...message,
    createdAt: Date.now(),
  });
};