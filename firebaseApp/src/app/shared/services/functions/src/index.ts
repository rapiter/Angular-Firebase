import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
import {DependencyFactory} from "./dependency-factory";
const serviceAccount = require("../secret.json");
const difa = new DependencyFactory();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fir-appauth-684c1.firebaseio.com"
});

exports.deleteUser = functions.firestore.document('users/{userId}').onDelete((snap, context) => {
  return admin.auth().deleteUser(snap.id).then( () => console.log('USER DELETED (ID: ' + snap.id)).catch((error) => console.error('Deleting user failed'))
})

exports.defaultStock = functions.firestore.document('products/{prodId}').onCreate((snap, context)=>{
  return difa.getProductController().written(snap,context)
})

exports.buyItem = functions.firestore.document('orders/{orderId}').onCreate((snap, context) => {
  return difa.getOrderController().placeOrder(snap, context);
})

exports.renameProduct = functions.firestore.document('products/{prodId}').onUpdate((snap, context) => {
  return difa.getProductController().renameProduct(snap, context);
})
/*
// On sign up.
exports.processSignUp = functions.auth.user().onCreate((user) => {
  // Check if user meets role criteria.
    const customClaims = {
      admin: false,
      normal: true
    };
    // Set custom user claims on this newly created user.
    return admin.auth().
    setCustomUserClaims(user.uid, customClaims)
      .catch(error => {
        console.log(error);
      });

});

*/
