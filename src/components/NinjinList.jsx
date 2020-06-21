import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import InputForm from './InputForm';

const NinjinList = props => {

  const [ninjindata, setNinjindata] = useState(null);

  // firestoreから全データを取得してstateに格納する関数
  const getNinjinsFromFirestore = async () => {
    const ninjindataArray = await firebase.firestore().collection('ninjins')
      .orderBy('type')
      .get();
    const ninjinArray = ninjindataArray.docs.map(x => {
      return {
        id: x.id,
        data: x.data(),
      }
    })
    setNinjindata(ninjinArray);
    return ninjinArray;
  }

  // useEffectを利用してFirestoreからデータの一覧を取得．
  useEffect(() => {
    const result = getNinjinsFromFirestore();
  }, [props])

  return (
    <div>
      <InputForm
        getNinjinsFromFirestore={getNinjinsFromFirestore}
      />
      <ul>
        {
          ninjindata?.map((x, index) =>
            <li key={index} id={x.id}>
              <input type="checkbox" value={x.id} />
              <button value={x.id}>delete</button>
              <p>作業種別：{x.data.type}</p>
              <p>企業：{x.data.company}</p>
              <p>作業者：{x.data.operator}</p>
            </li>
          )
        }
      </ul>
    </div>
  );
}
export default NinjinList;