import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import useUserStore from '@/store/userStore';

export default function IndexScreen() {
  const router = useRouter();
  const token = useUserStore((state: any) => state.token);



  useEffect(() => {
    const timeout = setTimeout(() => {
    // Se o token existir, redireciona para a lista de notícias
    if (token) {
      router.replace('../News/NewsList');
    } else {
      // Caso contrário, redireciona para a tela de login
      router.replace('/Auth/Login') ;
      
    }}, 10)
  }, [token]);
return null

}
