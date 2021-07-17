// import _ from 'lodash';
// import numRef from './ref.json';

// export function numToWord(num) {
//   return _.reduce(numRef, (accum, ref) => {
//     return ref.num === num ? ref.word : accum;
//   }, '');
// }

// export function wordToNum(word) {
//   return _.reduce(numRef, (accum, ref) => {
//     return ref.word === word && word.toLowerCase() ? ref.num : accum;
//   }, -1);
// }

// let gameconn = require('./conn1')
// let gameconn2 = require('./conn2')

// console.log(gameconn.type)
// console.log(gameconn.time)
// gameconn.type = 'mod'
// console.log(gameconn2.type)
// console.log(gameconn2.time)
// // gameconn2.type = 'base'
// console.log(gameconn.type)
// console.log(gameconn.time)
const gameconn = require('./conn')
window.GameConn = gameconn
