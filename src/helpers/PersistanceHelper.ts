// import React from 'react';
// import EncryptedStorage from 'react-native-encrypted-storage';

// class PersistantHelper {
//   async getItem(key) {
//     try {
//       const session = await EncryptedStorage.getItem(key);

//       return session;
//     } catch (error) {
//       // There was an error on the native side
//     }
//   }

//   async setItem(key, value) {
//     try {
//       let storedVal = typeof value === 'object' ? JSON.stringify(value) : value;
//       await EncryptedStorage.setItem(key, storedVal);

//       // Congrats! You've just stored your first value!
//     } catch (error) {
//       // There was an error on the native side
//     }
//   }

//   async removeItem(key) {
//     try {
//       await EncryptedStorage.removeItem(key);
//       // Congrats! You've just removed your first value!
//     } catch (error) {
//       // There was an error on the native side
//     }
//   }
// }

// export default new PersistantHelper();
