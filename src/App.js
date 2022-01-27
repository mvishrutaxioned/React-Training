import React, { useState } from 'react';
import './App.css';
import Form from './components/Form';
import Table from './components/Table';

function App() {

  const [editInfo, setEditInfo] = useState({});
  const [data, setData] = useState([]);

  // add data
  const addData = (d, items) => {
    if(items.id) {
      const newData = {...items }
      setData(data.map(e => (e.id === items.id ? Object.assign({}, e, newData) : e)))
    } else {
      const id = Math.floor(Math.random() * 10000) + 1
      const newData = { id, ...items }
      setData([...data, newData])
    }
  }

  // Delete data
  const deleteData = (d, id) => {
    d.preventDefault();
    setData(data.filter(e => e.id !== id))
  }

  // Edit Data
  const editData = (d, id) => {
    d.preventDefault();
    setEditInfo(data.find(e => e.id === id));
  }

  return (
    <div className="App">
      <Form data={data} setData={setData} onAdd={addData} editInfo={editInfo} setEditInfo={setEditInfo} />
      {data.length > 0 ? <Table data={data} onDelete={deleteData} onEdit={editData} /> : null}
    </div>
  );
}

export default App;
