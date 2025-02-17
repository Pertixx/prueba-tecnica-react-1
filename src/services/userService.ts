import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  query, 
  getDocs 
} from 'firebase/firestore';
import { User } from 'firebase/auth';
import { db } from './firebase';
import { BlogUser } from '../types';

export const userService = {
  // Crear o actualizar usuario después del login
  saveUser: async (user: User) => {
    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userRef);

    const userData: BlogUser = {
      uid: user.uid,
      email: user.email || '',
      displayName: user.displayName || '',
      photoURL: user.photoURL || '',
      lastLogin: new Date(),
      createdAt: userDoc.exists() 
        ? userDoc.data().createdAt.toDate()
        : new Date()
    };

    await setDoc(userRef, userData, { merge: true });
    return userData;
  },

  // Obtener un usuario específico
  getUser: async (uid: string) => {
    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      return null;
    }

    return userDoc.data() as BlogUser;
  },

  // Obtener todos los usuarios
  getAllUsers: async () => {
    const usersRef = collection(db, 'users');
    const q = query(usersRef);
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => doc.data() as BlogUser);
  }
};