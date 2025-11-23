import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDXhGKm_WbG0agWRjWCMseLVBMEd5fSF_w",
  authDomain: "photo-app-46544.firebaseapp.com",
  projectId: "photo-app-46544",
  storageBucket: "photo-app-46544.firebasestorage.app",
  messagingSenderId: "573567450848",
  appId: "1:573567450848:web:8164f7205dfdc35f539a85"
};

// 初始化 Firebase
const app = initializeApp(firebaseConfig);

// 导出数据库和存储服务，供 App.jsx 使用
export const db = getFirestore(app);
export const storage = getStorage(app);