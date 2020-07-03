import Realm from 'realm'
import { CarSchema } from './schemas'

export const OpenConnection = async () => {
  return Realm.open({ schema: [CarSchema] })
    .then(async realm => {
      return realm
    })
    .catch(error => {
      console.log(error)
      return false
    })
}