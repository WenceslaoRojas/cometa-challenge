/* eslint-disable import/named */
'use client';

import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app';
import { Auth, AuthProvider, GithubAuthProvider, UserCredential, getAuth, signInWithPopup } from 'firebase/auth';
import {
    CollectionReference,
    DocumentData,
    Firestore,
    WhereFilterOp,
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    query,
    setDoc,
    where
} from 'firebase/firestore';

 

// Load Firebase config from environment variables
const serviceAccount = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG || '{}');

// Define the Firebase config interface
interface FirebaseConfig {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
}

// Firebase configuration
const firebaseConfig: FirebaseConfig = serviceAccount;

// Initialize Firebase app
const app: FirebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app); // Initialize Firestore
const githubProvider: AuthProvider = new GithubAuthProvider();

// Define interfaces for auth results and errors
interface AuthResult {
    user: UserCredential['user'];
    token?: string;
}

interface AuthError {
    code: string;
    message: string;
    email?: string;
}

// Authentication service class
class AuthService {
    private auth: Auth;
    private provider: AuthProvider;

    constructor(auth: Auth, provider: AuthProvider) {
        this.auth = auth;
        this.provider = provider;
    }

    public async signInWithGithub(): Promise<AuthResult> {
        try {
            const result: UserCredential = await signInWithPopup(this.auth, this.provider);
            const credential = GithubAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            const user = result.user;

            // Optionally set the ID token in a cookie after sign-in
            const idToken = await user.getIdToken();
            await fetch('/api/auth/set-cookie', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idToken })
            });

            return { user, token };
        } catch (error) {
            const authError = error as { code: string; message: string; customData?: { email?: string } };
            const errorDetails: AuthError = {
                code: authError.code,
                message: authError.message,
                email: authError.customData?.email
            };
            throw errorDetails;
        }
    }

    public async signOut(): Promise<void> {
        try {
            await this.auth.signOut();
        } catch (error) {
            console.error('Sign out error:', error);
            throw new Error('Failed to sign out');
        }
    }
}

// Database service class for Firestore
class DatabaseService {
    private db: Firestore;

    constructor(db: Firestore) {
        this.db = db;
    }

    // Generic method to get data from a collection
    public async getData<T>(collectionName: string): Promise<T[]> {
        try {
            const colRef: CollectionReference<DocumentData> = collection(this.db, collectionName);
            const querySnapshot = await getDocs(colRef);
            const data: T[] = querySnapshot.docs.map(
                (doc) =>
                    ({
                        id: doc.id,
                        ...doc.data()
                    }) as T
            );

            return data;
        } catch (error) {
            console.error(`Error fetching data from ${collectionName}:`, error);
            throw new Error(`Failed to fetch data from ${collectionName}`);
        }
    }

    public async getDataById<T>(collectionName: string, docId: string): Promise<T | null> {
        try {
            const docRef = doc(this.db, collectionName, docId);
            const docSnapshot = await getDoc(docRef);
            if (docSnapshot.exists()) {
                return {
                    id: docSnapshot.id,
                    ...docSnapshot.data()
                } as T;
            }

            return null; // Document does not exist
        } catch (error) {
            console.error(`Error fetching document ${docId} from ${collectionName}:`, error);
            throw new Error(`Failed to fetch document ${docId} from ${collectionName}`);
        }
    }

    // Method to get data filtered by a specific field and value
    public async getDataByFilter<T>(
        collectionName: string,
        field: string,
        operator: WhereFilterOp,
        value: any
    ): Promise<T[]> {
        try {
            const colRef = collection(this.db, collectionName);
            const q = query(colRef, where(field, operator, value));
            const querySnapshot = await getDocs(q);

            const data: T[] = querySnapshot.docs.map(
                (doc) =>
                    ({
                        id: doc.id,
                        ...doc.data()
                    }) as T
            );

            return data;
        } catch (error) {
            console.error(`Error fetching filtered data from ${collectionName}:`, error);
            throw new Error(`Failed to fetch filtered data from ${collectionName}`);
        }
    }

    // Method to set data in a specific document
    public async setData(collectionName: string, docId: string, data: any): Promise<void> {
        try {
            const docRef = doc(this.db, collectionName, docId);
            const docCreated = await setDoc(docRef, data, { merge: true }); // Use merge to update existing doc or create new

            return docCreated;
        } catch (error) {
            console.error(`Error setting data in ${collectionName}/${docId}:`, error);
            throw new Error(`Failed to set data in ${collectionName}`);
        }
    }

    // Optional: Add a method to add a new document with auto-generated ID
    public async addData<T>(collectionName: string, data: any): Promise<T> {
        try {
            const colRef = collection(this.db, collectionName);
            const docRef = await addDoc(colRef, data); // Auto-generates ID

            const newDoc = await getDoc(docRef);

            return {
                id: newDoc.id,
                ...newDoc.data()
            } as T;
        } catch (error) {
            console.error(`Error adding data to ${collectionName}:`, error);
            throw new Error(`Failed to add data to ${collectionName}`);
        }
    }
}

// Create service instances
const authService = new AuthService(auth, githubProvider);
const databaseService = new DatabaseService(db);

// Export necessary items
export { app, authService, databaseService, type AuthResult, type AuthError };
