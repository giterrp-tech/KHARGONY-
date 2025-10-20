import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
  sendPasswordResetEmail,
  signOut as firebaseSignOut,
  updateProfile,
  User,
  AuthError,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './firebase';

// Error mapping for user-friendly messages
const getAuthErrorMessage = (error: AuthError): string => {
  const errorMessages: Record<string, string> = {
    'auth/email-already-in-use': 'هذا البريد الإلكتروني مستخدم بالفعل',
    'auth/invalid-email': 'البريد الإلكتروني غير صحيح',
    'auth/operation-not-allowed': 'العملية غير مسموح بها',
    'auth/weak-password': 'كلمة المرور ضعيفة. يجب أن تكون 6 أحرف على الأقل',
    'auth/user-disabled': 'تم تعطيل هذا الحساب',
    'auth/user-not-found': 'لا يوجد حساب بهذا البريد الإلكتروني',
    'auth/wrong-password': 'كلمة المرور غير صحيحة',
    'auth/too-many-requests': 'محاولات كثيرة جداً. حاول لاحقاً',
    'auth/network-request-failed': 'خطأ في الاتصال بالإنترنت',
    'auth/popup-closed-by-user': 'تم إغلاق نافذة تسجيل الدخول',
    'auth/cancelled-popup-request': 'تم إلغاء تسجيل الدخول',
    'auth/account-exists-with-different-credential': 'يوجد حساب بنفس البريد بطريقة دخول مختلفة',
  };

  return errorMessages[error.code] || 'حدث خطأ غير متوقع. حاول مرة أخرى';
};

// Create user document in Firestore
const createUserDocument = async (user: User, displayName?: string) => {
  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      displayName: displayName || user.displayName || 'مستخدم خرجوني',
      photoURL: user.photoURL || null,
      createdAt: serverTimestamp(),
      language: 'ar-EG',
      points: 100, // Welcome bonus
      level: 1,
      visits: 0,
      achievements: [],
      favorites: [],
      location: {
        city: 'القاهرة',
        country: 'مصر',
        lastUpdated: serverTimestamp(),
      },
    });
  }
};

// Sign up with email and password
export const signUpWithEmail = async (
  email: string,
  password: string,
  displayName: string
): Promise<{ success: boolean; user?: User; error?: string }> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName });
    await createUserDocument(userCredential.user, displayName);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: getAuthErrorMessage(error as AuthError) };
  }
};

// Sign in with email and password
export const signInWithEmail = async (
  email: string,
  password: string
): Promise<{ success: boolean; user?: User; error?: string }> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    await createUserDocument(userCredential.user); // Create document if doesn't exist
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: getAuthErrorMessage(error as AuthError) };
  }
};

// Sign in with Google
export const signInWithGoogle = async (): Promise<{
  success: boolean;
  user?: User;
  error?: string;
}> => {
  try {
    const provider = new GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    const userCredential = await signInWithPopup(auth, provider);
    await createUserDocument(userCredential.user);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: getAuthErrorMessage(error as AuthError) };
  }
};

// Sign in with Apple
export const signInWithApple = async (): Promise<{
  success: boolean;
  user?: User;
  error?: string;
}> => {
  try {
    const provider = new OAuthProvider('apple.com');
    provider.addScope('email');
    provider.addScope('name');
    const userCredential = await signInWithPopup(auth, provider);
    await createUserDocument(userCredential.user);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: getAuthErrorMessage(error as AuthError) };
  }
};

// Sign in with Facebook
export const signInWithFacebook = async (): Promise<{
  success: boolean;
  user?: User;
  error?: string;
}> => {
  try {
    const provider = new FacebookAuthProvider();
    provider.addScope('public_profile');
    provider.addScope('email');
    const userCredential = await signInWithPopup(auth, provider);
    await createUserDocument(userCredential.user);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: getAuthErrorMessage(error as AuthError) };
  }
};

// Reset password
export const resetPassword = async (
  email: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error) {
    return { success: false, error: getAuthErrorMessage(error as AuthError) };
  }
};

// Sign out
export const signOut = async (): Promise<{ success: boolean; error?: string }> => {
  try {
    await firebaseSignOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: 'فشل تسجيل الخروج. حاول مرة أخرى' };
  }
};
