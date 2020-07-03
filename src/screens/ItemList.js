import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { DeleteCar } from '../realm/actions'

const ItemList = ({ title, id }) => {
  return (
    <View style={styles.item}>
      <View style={styles.titletextview}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            DeleteCar(id)
              .then(result => {
                if (result) {
                  alert("Removido com sucesso.")
                } else {
                  alert("Erro ao remover o carro")
                }
              })
              .catch(err => {
                console.log(err)
                alert("Erro ao remover o carro")
              })
          }}
          style={styles.btnRemove}>
          <Text>Del</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'lightblue',
    padding: 8,
    marginVertical: 8,
    marginHorizontal: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontSize: 22,
  },
  titletextview: {
    flex: 1
  },
  btnRemove: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 8
  }
})

export default ItemList