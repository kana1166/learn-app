import { auth, googleProvider } from "./firebaseConfig";
import { signInWithPopup } from "firebase/auth";

const useAuth = () => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // ログイン成功時の処理（ユーザー情報の取得など）
      const user = result.user;
      console.log(user);
    } catch (error) {
      // エラー処理
      console.error("Googleログインエラー", error);
    }
  };

  return { signInWithGoogle };
};

export default useAuth;
