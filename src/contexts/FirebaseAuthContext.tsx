import * as React from 'react';
import { 
  User, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged 
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/config/firebase';
import { toast } from '@/hooks/use-toast';

export interface UserData {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  college?: string;
}

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  signUp: (email: string, password: string, firstName: string, lastName: string, phone?: string, college?: string) => Promise<{ success: boolean; user?: User; error?: string }>;
  signIn: (email: string, password: string) => Promise<{ success: boolean; user?: User; error?: string }>;
  logout: () => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const useFirebaseAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useFirebaseAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [userData, setUserData] = React.useState<UserData | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        // Fetch user data from Firestore
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data() as UserData);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, firstName: string, lastName: string, phone?: string, college?: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      const userData: UserData = {
        email,
        firstName,
        lastName,
        phone,
        college
      };

      // Store user data in Firestore
      const docRef = doc(db, "users", user.uid);
      await setDoc(docRef, userData);
      
      toast({
        title: "Account Created Successfully! 🎉",
        description: "Welcome to Memories! Your account has been created.",
      });

      return { success: true, user };
    } catch (error: any) {
      let errorMessage = "Unable to create account";
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = "Email address already exists!";
      } else if (error.code === 'auth/weak-password') {
        errorMessage = "Password should be at least 6 characters";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "Invalid email address";
      }
      
      toast({
        title: "Sign Up Failed",
        description: errorMessage,
        variant: "destructive"
      });

      return { success: false, error: errorMessage };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      toast({
        title: "Welcome Back! 🎉",
        description: "You have successfully signed in.",
      });

      return { success: true, user: userCredential.user };
    } catch (error: any) {
      let errorMessage = "Invalid email or password";
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = "No account found with this email";
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = "Incorrect password";
      } else if (error.code === 'auth/invalid-credential') {
        errorMessage = "Invalid email or password";
      }
      
      toast({
        title: "Sign In Failed",
        description: errorMessage,
        variant: "destructive"
      });

      return { success: false, error: errorMessage };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      return { success: true };
    } catch (error: any) {
      toast({
        title: "Logout Failed",
        description: "There was an error logging out.",
        variant: "destructive"
      });
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    userData,
    loading,
    signUp,
    signIn,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};