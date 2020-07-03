import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import ItemList from './ItemList'
import { GetCars, AddItem, addRealmListener, removeRealmListener } from '../realm/actions'

const App = () => {
  const [carName, setCarName] = useState("")
  const [list, setList] = useState([])

  const updateCarsList = async () => {
    GetCars()
      .then(cars => {
        if (cars) {
          if (cars.length > 0) {
            let carsList = []
            for (let index = 0; index < cars.length; index++) {
              const element = cars[index];
              carsList.push(element)
            }
            setList(carsList)
          }
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  function updateCars(a, changes) {
    updateCarsList()
  }

  const AddItemBtn = async () => {
    if (carName === null) {
      return alert("Nome do carro inválido")
    }
    if (carName === "") {
      return alert("Nome do carro não pode ser vazio.")
    }
    if (carName.length < 2) {
      return alert("Nome do carro precisa ter pelo menos 2 letras.")
    }

    AddItem(carName)
      .then(res => {
        if (res) {
          setCarName("")
          alert("Carro cadastrado com sucesso!")
        } else {
          alert("Erro ao cadastrar o carro.")
        }
      })
      .catch(err => {
        console.log(err)
        alert("Erro ao cadastrar o carro.")
      })
  }

  useEffect(() => {
    addRealmListener(updateCars)
    return () => {
      removeRealmListener(updateCars)
    }
  }, [])

  return (<View style={styles.container}>
    <View style={styles.header}>
      <View>
        <Text style={styles.inputLabel}>Nome do Carro</Text>
      </View>
      <View style={styles.inputandbtnrow}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.textinput}
            placeholder="Digite o nome do carro"
            onChangeText={text => setCarName(text)}
            defaultValue={carName}
          />
        </View>
        <View style={styles.btnView}>
          <TouchableOpacity
            onPress={() => {
              AddItemBtn()
            }}
            style={styles.btnAdd}>
            <Text>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    <View style={styles.content}>
      <FlatList
        data={list}
        renderItem={({ item }) => <ItemList title={item.name} id={item.id} />}
        keyExtractor={item => item.id}
      />
    </View>
  </View>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: 8
  },
  header: {

  },
  content: {
    flex: 1,
  },
  textinput: {
    height: "auto",
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'lightgray'
  },
  inputLabel: {
  },
  btnAdd: {
    backgroundColor: 'lightgray',
    padding: 8,
    borderRadius: 8,
  },
  inputandbtnrow: {
    display: 'flex',
    flexDirection: 'row'
  },
  inputView: {
    flex: 1
  },
  btnView: {
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default App