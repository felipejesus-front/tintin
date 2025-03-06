import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import api from '@/services/api';

const NewsList = () => {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    try {
      const response = await api.get('/news');
      setNews(response.data);
    } catch (error) {
      console.error('Erro ao buscar notícias:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  if (loading) return <Text>Carregando...</Text>;

  return (
    <View className="p-4">
      <FlatList
        data={news}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="border p-4 rounded mb-2">
            <Text className="font-bold">{item.title}</Text>
            <Text>{item.summary}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default NewsList;
