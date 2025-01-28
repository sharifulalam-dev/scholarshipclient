import axios from "axios";
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/firebase.config";

export const Authentication = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          const email = currentUser.email || "user1@test.com";
          const name = currentUser.displayName;
          const photoURL = currentUser.photoURL;
          const response = await axios.post(
            `https://scholarshipserver.vercel.app/generate-token`,
            { email }
          );
          await axios.post(`https://scholarshipserver.vercel.app/add-user`, {
            name,
            email,
            photoURL,
          });

          const { token } = response.data;

          if (token) {
            localStorage.setItem("authToken", token);
          } else {
            console.error("No token received from the server");
          }
        } catch (error) {
          console.error(
            "Error generating token:",
            error.response?.data || error.message
          );
        }
      } else {
        localStorage.removeItem("authToken"); // Remove token if user logs out
      }

      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const createNewUser = async (email, password) => {
    setLoading(true);
    try {
      await setPersistence(auth, browserLocalPersistence);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      await setPersistence(auth, browserLocalPersistence);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      setUser(userCredential.user); // Ensure user is set
      return userCredential;
    } catch (err) {
      console.error("Login failed:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    setLoading(true);
    try {
      await setPersistence(auth, browserLocalPersistence);
      const result = await signInWithPopup(auth, googleProvider);
      return result;
    } finally {
      setLoading(false);
    }
  };

  const facebookLogin = async () => {
    setLoading(true);
    try {
      await setPersistence(auth, browserLocalPersistence);
      const result = await signInWithPopup(auth, facebookProvider);
      return result;
    } finally {
      setLoading(false);
    }
  };

  const manageUser = async (name, imageUrl) => {
    if (auth.currentUser) {
      setLoading(true);
      try {
        await updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: imageUrl,
        });

        setUser({ ...auth.currentUser, displayName: name, photoURL: imageUrl });
      } finally {
        setLoading(false);
      }
    }
  };

  const updateUserProfile = async (updates) => {
    if (auth.currentUser) {
      setLoading(true);
      try {
        await updateProfile(auth.currentUser, updates);
        setUser({ ...auth.currentUser, ...updates });
        return "Profile updated successfully!";
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    } else {
      throw new Error("No user is currently logged in.");
    }
  };

  const logOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const forgetPassword = async (email) => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      return "Password reset email sent successfully!";
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const authInfo = {
    user,
    setUser,
    loading,
    createNewUser,
    login,
    googleLogin,
    facebookLogin,
    manageUser,
    updateUserProfile,
    logOut,
    forgetPassword,
  };

  return (
    <Authentication.Provider value={authInfo}>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="text-blue-500 text-xl font-semibold">Loading...</div>
        </div>
      ) : (
        children
      )}
    </Authentication.Provider>
  );
}
