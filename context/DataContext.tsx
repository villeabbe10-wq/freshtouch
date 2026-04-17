
import React, { createContext, useContext, useState, useEffect } from 'react';
import { GalleryItem, PricingItem, Realization, Testimonial } from '../types';
import { db, auth } from '../firebase';
import { 
  collection, 
  onSnapshot, 
  addDoc, 
  deleteDoc, 
  doc, 
  query, 
  setDoc,
  getDocFromServer
} from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';
import { REALIZATIONS, TESTIMONIALS } from '../constants';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  // We don't throw here to avoid crashing the whole app, but we log it
}

export interface Message {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'new' | 'read';
}

interface DataContextType {
  galleryItems: GalleryItem[];
  pricingItems: PricingItem[];
  realizations: Realization[];
  messages: Message[];
  testimonials: Testimonial[];
  admins: { uid: string; email: string; role: string }[];
  settings: { 
    aboutPhotoUrl?: string; 
    logoUrl?: string;
    instagramUrl?: string;
    facebookUrl?: string;
    tiktokUrl?: string;
    whatsappNumber?: string;
    mainVideoUrl?: string;
    mainVideoCoverUrl?: string;
    mainVideoTitle?: string;
    mainVideoSubtitle?: string;
  };
  user: User | null;
  loading: boolean;
  addGalleryItem: (item: GalleryItem) => Promise<void>;
  deleteGalleryItem: (id: string) => Promise<void>;
  addPricingItem: (item: PricingItem) => Promise<void>;
  deletePricingItem: (id: string) => Promise<void>;
  addRealization: (item: Realization) => Promise<void>;
  deleteRealization: (id: string) => Promise<void>;
  addTestimonial: (item: Testimonial) => Promise<void>;
  deleteTestimonial: (id: string) => Promise<void>;
  addMessage: (message: Omit<Message, 'id' | 'createdAt' | 'status'>) => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;
  markMessageAsRead: (id: string) => Promise<void>;
  addAdminByEmail: (email: string) => Promise<void>;
  removeAdmin: (uid: string) => Promise<void>;
  updateSettings: (settings: { 
    aboutPhotoUrl?: string; 
    logoUrl?: string;
    instagramUrl?: string;
    facebookUrl?: string;
    tiktokUrl?: string;
    whatsappNumber?: string;
    mainVideoUrl?: string;
    mainVideoCoverUrl?: string;
    mainVideoTitle?: string;
    mainVideoSubtitle?: string;
  }) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [pricingItems, setPricingItems] = useState<PricingItem[]>([]);
  const [realizations, setRealizations] = useState<Realization[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [admins, setAdmins] = useState<{ uid: string; email: string; role: string }[]>([]);
  const [settings, setSettings] = useState<{ 
    aboutPhotoUrl?: string; 
    logoUrl?: string;
    instagramUrl?: string;
    facebookUrl?: string;
    tiktokUrl?: string;
    whatsappNumber?: string;
    mainVideoUrl?: string;
    mainVideoCoverUrl?: string;
    mainVideoTitle?: string;
    mainVideoSubtitle?: string;
  }>({});
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Test connection
  useEffect(() => {
    async function testConnection() {
      try {
        await getDocFromServer(doc(db, 'test', 'connection'));
      } catch (error) {
        if(error instanceof Error && error.message.includes('the client is offline')) {
          console.error("Please check your Firebase configuration. ");
        }
      }
    }
    testConnection();
  }, []);

  // Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Real-time Gallery
  useEffect(() => {
    const q = query(collection(db, 'gallery'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as GalleryItem));
      setGalleryItems(items);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'gallery');
    });
    return () => unsubscribe();
  }, []);

  // Real-time Pricing
  useEffect(() => {
    const q = query(collection(db, 'pricing'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as PricingItem));
      setPricingItems(items);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'pricing');
    });
    return () => unsubscribe();
  }, []);

  // Real-time Realizations
  useEffect(() => {
    const q = query(collection(db, 'realizations'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Realization));
      setRealizations(items);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'realizations');
    });
    return () => unsubscribe();
  }, []);

  // Real-time Messages
  useEffect(() => {
    if (!user) {
      setMessages([]);
      return;
    }
    const q = query(collection(db, 'messages'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Message));
      // Sort by date descending
      items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setMessages(items);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'messages');
    });
    return () => unsubscribe();
  }, [user]);

  // Real-time Testimonials
  useEffect(() => {
    const q = query(collection(db, 'testimonials'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Testimonial));
      setTestimonials(items);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'testimonials');
    });
    return () => unsubscribe();
  }, []);

  // Real-time Settings
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'settings', 'site'), (snapshot) => {
      if (snapshot.exists()) {
        setSettings(snapshot.data());
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'settings/site');
    });
    return () => unsubscribe();
  }, []);
  
  // Real-time Admins
  useEffect(() => {
    if (!user) {
      setAdmins([]);
      return;
    }
    const q = query(collection(db, 'users'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ ...doc.data(), uid: doc.id } as any));
      setAdmins(items.filter(i => i.role === 'admin'));
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'users');
    });
    return () => unsubscribe();
  }, [user]);
  
  // Create user doc on login if doesn't exist
  useEffect(() => {
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      setDoc(userRef, { 
        email: user.email, 
        lastLogin: new Date().toISOString() 
      }, { merge: true }).catch(err => console.error("Update user failed:", err));
    }
  }, [user]);

  // Actions
  const addGalleryItem = async (item: GalleryItem) => {
    try {
      await setDoc(doc(db, 'gallery', item.id), item);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `gallery/${item.id}`);
    }
  };

  const deleteGalleryItem = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'gallery', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `gallery/${id}`);
    }
  };

  const addPricingItem = async (item: PricingItem) => {
    try {
      await setDoc(doc(db, 'pricing', item.id), item);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `pricing/${item.id}`);
    }
  };

  const deletePricingItem = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'pricing', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `pricing/${id}`);
    }
  };

  const addRealization = async (item: Realization) => {
    try {
      await setDoc(doc(db, 'realizations', item.id), item);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `realizations/${item.id}`);
    }
  };

  const deleteRealization = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'realizations', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `realizations/${id}`);
    }
  };

  const addTestimonial = async (item: Testimonial) => {
    try {
      await setDoc(doc(db, 'testimonials', item.id), item);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `testimonials/${item.id}`);
    }
  };

  const deleteTestimonial = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'testimonials', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `testimonials/${id}`);
    }
  };

  const addMessage = async (messageData: Omit<Message, 'id' | 'createdAt' | 'status'>) => {
    try {
      const newMessage = {
        ...messageData,
        createdAt: new Date().toISOString(),
        status: 'new' as const
      };
      await addDoc(collection(db, 'messages'), newMessage);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'messages');
    }
  };

  const deleteMessage = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'messages', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `messages/${id}`);
    }
  };

  const markMessageAsRead = async (id: string) => {
    try {
      await setDoc(doc(db, 'messages', id), { status: 'read' }, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `messages/${id}`);
    }
  };

  const addAdminByEmail = async (email: string) => {
    // Note: Since we can't easily get UID from email client-side without a cloud function,
    // we'll store a "pending_admin" list or the user can just log in and then be promoted.
    // For now, we'll implement a simple system where we search for the user doc or create a placeholder.
    try {
      // In this setup, we'll just add a doc to 'users' with a generated ID if we don't have the UID
      // But better: tell them the user must log in once, then they show up in a list to be promoted.
      // Or we use the email as the ID for a special collection.
      // Let's use a simpler approach: add to a 'authorized_emails' collection.
      await setDoc(doc(db, 'authorized_emails', email.toLowerCase()), { 
        email: email.toLowerCase(),
        role: 'admin',
        addedAt: new Date().toISOString()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `authorized_emails/${email}`);
    }
  };

  const removeAdmin = async (uid: string) => {
    try {
      await setDoc(doc(db, 'users', uid), { role: 'user' }, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `users/${uid}`);
    }
  };

  const updateSettings = async (newSettings: { 
    aboutPhotoUrl?: string; 
    logoUrl?: string;
    instagramUrl?: string;
    facebookUrl?: string;
    tiktokUrl?: string;
    whatsappNumber?: string;
    mainVideoUrl?: string;
    mainVideoCoverUrl?: string;
    mainVideoTitle?: string;
    mainVideoSubtitle?: string;
  }) => {
    try {
      await setDoc(doc(db, 'settings', 'site'), newSettings, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'settings/site');
    }
  };

  return (
    <DataContext.Provider value={{
      galleryItems,
      pricingItems,
      realizations: realizations.length > 0 ? realizations : REALIZATIONS,
      messages,
      testimonials: testimonials.length > 0 ? testimonials : TESTIMONIALS,
      admins,
      settings,
      user,
      loading,
      addGalleryItem,
      deleteGalleryItem,
      addPricingItem,
      deletePricingItem,
      addRealization,
      deleteRealization,
      addTestimonial,
      deleteTestimonial,
      addMessage,
      deleteMessage,
      markMessageAsRead,
      addAdminByEmail,
      removeAdmin,
      updateSettings
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
