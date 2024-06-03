import styles from "./page.module.css";
import Profile from './test';
import { getData } from './libs/api'
import { useEffect } from "react";

// const getData = async () => {
//   const data = await fetch('https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY', {cache: 'no-cache'});
//   if (!data.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error('Failed to fetch data')
//   }
 
//   return data.json()
// }


export default async  function Home() {
  const getData = async () => {
    const data = await fetch('https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY', {cache: 'no-cache'});
  if (!data.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
 
  return data.json()
}
  let data = await getData();
  
  return (
    <main className={styles.main}>
      <h1>LTP calulator</h1>
      {/* {{data}} */}
      {/* <Profile post={data}/> */}
    </main>
  );
}
