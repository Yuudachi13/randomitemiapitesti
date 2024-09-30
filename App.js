import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import itemIdList from './itemList';


export default function App() {
  const [itemName, setItemName] = useState('')
  const [itemImage, setItemImage] = useState('')
  const [itemPrice, setItemPrice] = useState('')

  const fetchNewItem = () => {
    // satunnainen itemID
    const randomItemId = itemIdList[Math.floor(Math.random() * itemIdList.length)]

    const URL = `http://services.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item=${randomItemId}`

    fetch(URL)
      .then(response => {
        if (!response.ok) {
          console.log(randomItemId)
          throw new Error('Kyseistä itemiä ei löydy, status: ' + response.status)
        }
        return response.json();
      })
      .then((json) => {
        setItemName(json.item.name);
        setItemImage(json.item.icon_large)
        setItemPrice(json.item.current.price)
      })
      .catch((error) => {
        console.log('Virhe haettaessa dataa: ', error)
      });
  };

  // Haetaan alkuu yks item
  useEffect(() => {
    fetchNewItem()
  }, [])

  return (
    <View style={styles.container}>
      <Text>Random OSRS Item</Text>
      <Text>{itemName}</Text>
      {itemImage ? ( // Tarkistetaan, onko itemImage tyhjö, ei pitäs olla
        <Image source={{ uri: itemImage }} style={styles.imagenStyle} />
      ) : (
        <Text>no photoo found</Text>
      )}
      <Text>Hinta: {itemPrice} gp</Text>
      <Button title ="Roll new item" onPress={fetchNewItem} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagenStyle: {
    width: 120,
    height: 120
  },
});