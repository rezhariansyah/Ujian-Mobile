import Frirebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyBhRu6TRnLQnUw7I53rzZcD0BVZZ7AmOY0",
  authDomain: "managerapp-c7e3e.firebaseapp.com",
  databaseURL: "https://managerapp-c7e3e.firebaseio.com",
  projectId: "managerapp-c7e3e",
  storageBucket: "managerapp-c7e3e.appspot.com",
  messagingSenderId: "553344973611",
  appId: "1:553344973611:web:dc44ecc33ef05635"
};
export const Fire =Frirebase.initializeApp(firebaseConfig)