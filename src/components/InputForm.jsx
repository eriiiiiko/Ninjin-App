// InputForm.jsx
import React, { useState } from 'react';
import firebase from '../firebase';

const InputForm = ({ getNinjinsFromFirestore }) => {
  const [type, setType] = useState('');
  const [company, setCompany] = useState('');
  const [operator, setOperator] = useState('');

  // Firestoreにデータを送信する関数
  const postDataToFirestore = async (collectionName, postData) => {
    const addedData = await firebase.firestore().collection(collectionName).add(postData);
    return addedData;
  }

  // submitボタンクリック時の処理
  const submitData = async () => {
    if (type === '' || company === '') { return false };
    const postData = {
      type: type,
      company: company,
      operator: operator,
      isDone: false,
    }

    const addedData2 = await postDataToFirestore('ninjins', postData);
    setType('');
    setCompany('');
    setOperator('');
    getNinjinsFromFirestore();
  }

  return (
    <form action="">
      <ul>
        <li>
          <label htmlFor="operator">作業者：</label>
          <input list="testlist"
            type="text"
            id="operator"
            value={operator}
            onChange={e => setOperator(e.target.value)}
          />
          <datalist id="testlist">
            <option value="吉本聖"></option>
            <option value="江口顕弘"></option>
            <option value="小野原梨紗"></option>
            <option value="松岡恵里子"></option>

          </datalist>

        </li>

        <li>
          <label htmlFor="type">種別：</label>
          <input
            type="text"
            id="type"
            value={type}
            onChange={e => setType(e.target.value)}
          />
        </li>
        <li>
          <label htmlFor="company">企業：</label>
          <input
            type="text"
            id="company"
            value={company}
            onChange={e => setCompany(e.target.value)}
          />
        </li>
        <li>
          <button
            type="button"
            onClick={submitData}
          >submit</button>
        </li>
      </ul>
    </form >
  )
}

export default InputForm;