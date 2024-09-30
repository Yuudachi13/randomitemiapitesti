import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import itemIdList from './itemList';

// satunnainen itemID
const randomItemId = itemIdList[Math.floor(Math.random() * itemIdList.length)]
const URL = `http://services.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item=${randomItemId}`

export default function App() {
  const [itemName, setItemName] = useState('')
  const [itemImage, setItemImage] = useState('')
  const [itemPrice, setItemPrice] = useState('')

  useEffect(() => {
    fetch(URL)
      .then(response => {
        // Tarkistetaan, onko vastaus JSON-muodossa
        if (!response.ok) {
          console.log(randomItemId)
          throw new Error('kyseistä itemiä ei löydy' + response.status)
        }
        return response.json()
      })
      .then((json) => {
        setItemName(json.item.name)
        setItemImage(json.item.icon_large)
        setItemPrice(json.item.current.price)
      })
      .catch((error) => {
        console.log('Virhe haettaessa dataa: ', error)
      })
  }, [])

  return (
    <View style={styles.container}>
      <Text>Random OSRS Item</Text>
      <Text>{itemName}</Text>
      {itemImage ? ( // Tarkistetaan, onko itemImage tyhjö
        <Image source={{ uri: itemImage }} style={{ width: 50, height: 50 }} />
      ) : (
        <Text>Ladataan kuvaa</Text>
      )}
      <Text>Hinta: {itemPrice} gp</Text>
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
});