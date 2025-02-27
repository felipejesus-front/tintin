import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
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
    <View className="flex-1 items-center justify-center p-4">
      <Text className="text-2xl font-bold mb-4">Login</Text>

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
              className="border p-2 mb-2 w-full"
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
              className="border p-2 mb-2 w-full"
            />
            {error && <Text className="text-red-500">{error.message}</Text>}
          </>
        )}
      />

      <TouchableOpacity onPress={handleSubmit(onSubmit)} className="bg-blue-500 p-3 rounded mt-4">
        <Text className="text-white text-center">Entrar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
