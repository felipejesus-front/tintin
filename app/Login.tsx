import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from 'expo-router';
import { login } from '@/services/auth';
import useUserStore from '@/store/userStore';


type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  const { control, handleSubmit } = useForm<FormData>();
  const navigation = useNavigation();
  const setUser = useUserStore((state: any) => state.setUser);

  const onSubmit = async (data: FormData) => {
    try {
      const jwt = await login(data.email, data.password);
      // Armazene o JWT e os dados do usuário no Zustand
      setUser({ token: jwt, email: data.email });
      // Navegar para a tela de notícias (ex: "NewsList")
      navigation.navigate('NewsList' as never);
    } catch (error) {
      console.error('Erro no login:', error);
      // Aqui você pode exibir uma mensagem de erro para o usuário
    }
  };

  return (
    <View className="flex-1 items-center justify-center p-4 bg-m-blue">
      <Image
        source={require('../assets/images/Logo.png')}
        style={{ width: 342, height: 214 }} // ajuste o tamanho conforme necessário
      />

      <Text className="text-black text-3xl font-bold mb-5">Login</Text>

      <Controller
        control={control}
        name="email"
        rules={{ required: 'Email é obrigatório' }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <TextInput
              placeholder="Email"
              value={value}
              onChangeText={onChange}
              className="border border-slate-100 bg-white p-2 w-full rounded-md"
            />
            {error && <Text className="text-red-500">{error.message}</Text>}
          </>
        )}
      />

      <Controller
        control={control}
        name="password"
        rules={{ required: 'Senha é obrigatória' }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <TextInput
              placeholder="Senha"
              secureTextEntry
              value={value}
              onChangeText={onChange}
              className="border border-slate-100 bg-white p-2 mt-5 w-full rounded-md"
            />
            {error && <Text className="text-red-500">{error.message}</Text>}
          </>
        )}
      />

      <TouchableOpacity onPress={handleSubmit(onSubmit)} className="border px-6 py-3 rounded  mt-4 bg-l-blue">
        <Text className="text-black text-cente  ">Entrar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
