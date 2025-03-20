import { FirebaseError } from "firebase/app";
import {
  AuthProvider,
  createUserWithEmailAndPassword,
  getIdToken,
  signInWithEmailAndPassword,
  signInWithPopup,
  UserCredential,
  GoogleAuthProvider,
} from "firebase/auth";

import { errorMessage } from "~~/utils/errors";

export default function () {
  const { $firebase } = useNuxtApp();
  const { notifyError } = useNotify();

  const auth = useAuth();

  const register = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        $firebase.auth,
        email,
        password
      );
      return await authenticateApi(userCredentials);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        notifyError(errorMessage(error));
      }
    }
    return false;
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        $firebase.auth,
        email,
        password
      );
      return await authenticateApi(userCredentials);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        notifyError(errorMessage(error));
      }
    }
    return false;
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    return await loginWithPopup(provider);
  };

  const loginWithPopup = async (provider: AuthProvider) => {
    try {
      const userCredentials = await signInWithPopup($firebase.auth, provider);
      return await authenticateApi(userCredentials);
    } catch (error: unknown) {
      notifyError(errorMessage(error));
    }
    return false;
  };

  const authenticateApi = async (userCredentials: UserCredential) => {
    if (userCredentials) {
      const token = await getIdToken(userCredentials.user);
      const authResponse = await auth.authenticateWithFirebaseToken(token);
      return !!authResponse;
    }
    return false;
  };

  return {
    login,
    loginWithGoogle,
    register,
  };
}
