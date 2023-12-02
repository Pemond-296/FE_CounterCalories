import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';

interface FoodItem {
  id: number;
  name: string;
}

const SearchFoodScreen: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState<FoodItem[]>([]);
  

  const foods: FoodItem[] = [
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Banana' },
    { id: 3, name: 'Orange' },
    { id: 4, name: 'Grapes' },
  ];

  const handleSearch = () => {
    const filteredFoods = foods.filter(food =>
      food.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setSearchResults(filteredFoods);
  };

  return (
    <View>
      <TextInput
        placeholder="Search food"
        value={searchText}
        onChangeText={text => setSearchText(text)}
      />
      <Button title="Search" onPress={handleSearch} />

      <FlatList
        data={searchResults}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </View>
  );
};

export default SearchFoodScreen;