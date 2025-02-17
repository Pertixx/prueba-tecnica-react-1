import { createContext, useContext, useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { auth } from "../services/firebase";
import { userService } from "../services/userService";
import { BlogUser } from "../types";

interface AuthContextType {
  user: User | null;
  users: BlogUser[] | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  getAllUsers: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<BlogUser[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchUsersAndSetupAuth = async () => {
      // Set up auth state listener
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user && isMounted) {
          await userService.saveUser(user);
        }
        if (isMounted) {
          setUser(user);
        }
      });

      // Fetch all users
      try {
        const result = await userService.getAllUsers();
        if (isMounted) {
          setUsers(result);
        }
      } catch (error) {
        console.error('Error fetching all users:', error);
      }

      // Set loading to false after both operations
      if (isMounted) {
        setLoading(false);
      }

      return unsubscribe;
    };

    fetchUsersAndSetupAuth();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      await userService.saveUser(result.user);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getAllUsers = async () => {
    try {
      const result = await userService.getAllUsers();
      setUsers(result);
    } catch (error) {
      console.error('Error fetching all users:', error);
    }
  };

  const value: AuthContextType = {
    user,
    users,
    loading,
    signInWithGoogle,
    signOut,
    getAllUsers
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};