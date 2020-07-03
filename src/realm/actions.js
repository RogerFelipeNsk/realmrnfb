import { OpenConnection } from './connector'

export const AddItem = async (car) => {
  return OpenConnection()
    .then(async realm => {
      try {
        await realm.write(() => {
          realm.create('Cars', { id: String(Math.floor(Math.random() * 16777215).toString(16)), name: car });
        })
        return true
      } catch (e) {
        console.log("Error on creation")
        return false
      }
    })
    .catch(err => {
      console.log(err)
      return false
    })
}

export const GetCars = async () => {
  return OpenConnection()
    .then(realm => {
      if (realm) {
        let cars = realm.objects('Cars')
        return cars
      } else {
        return false
      }
    })
    .catch(err => {
      console.log(err)
      return false
    })
}

export const DeleteCar = async (id) => {
  return OpenConnection()
    .then(async realm => {
      if (realm) {
        let cars = realm.objects('Cars')
        let filtered = cars.filtered(`id = "${id}"`)
        if (filtered.length > 0) {
          await realm.write(() => {
            realm.delete(filtered)
          })
        }
        return true
      } else {
        return false
      }
    })
    .catch(err => {
      console.log(err)
      return false
    })
}

export const addRealmListener = async (updateCars) => {
  return OpenConnection()
    .then(async res => {
      try {
        let cars = res.objects('Cars')
        await cars.addListener(updateCars)
        return true
      } catch (error) {
        console.log("ERROR ON ADD LISTENER", error)
        return false
      }
    })
    .catch(err => {
      console.log("ERROR ON ADD LISTENER", err)
      return false
    })
}

export const removeRealmListener = async (updateCars) => {
  return OpenConnection()
    .then(async res => {
      try {
        let cars = res.objects('Cars')
        await cars.removeListener(updateCars)
        //res.removeListener(updateCars)
        return true
      } catch (error) {
        console.log(error)
        return false
      }
    })
    .catch(err => {
      console.log(err)
      return false
    })
}