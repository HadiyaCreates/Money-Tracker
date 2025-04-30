
import './App.css';
import { useState } from 'react';

function App() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [description, setDescription] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    if (!name) {
      newErrors.name = 'Name is required';
    }
    if (!description) {
      newErrors.description = 'Description is required';
    }
    if (!dateTime) {
      newErrors.dateTime = 'Date and time is required';
    }
    if (!price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(price) || price <= 0) {
      newErrors.price = 'Invalid price';
    }
    return newErrors;
  };

  const addNewTransaction = (event) => {
    event.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      const url = process.env.REACT_APP_API_URL + '/transaction';
      fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ price, name, description, datetime: dateTime }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.json();
        })
        .then(json => {
          setTransactions([...transactions, json]);
          setName('');
          setPrice('');
          setDateTime('');
          setDescription('');
        })
        .catch(error => {
          console.error('Error:', error);
          setErrorMessage(`Failed to add transaction: ${error.message}`);
        });
    }
  };

  let balance = 0;
  for(const transaction of transactions){
    balance += transaction.price;
  }

  return (
    <main>
      <h1>{balance}</h1>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <form onSubmit={addNewTransaction}>
        <div className="basic">
          <input type="text" value={name} onChange={event => setName(event.target.value)} placeholder={"Name"} />
          {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
          <input type="number" value={price} onChange={event => setPrice(event.target.value)} placeholder={"Price"} />
          {errors.price && <div style={{ color: 'red' }}>{errors.price}</div>}
          <input type="datetime-local" value={dateTime} onChange={event => setDateTime(event.target.value)} />
          {errors.dateTime && <div style={{ color: 'red' }}>{errors.dateTime}</div>}
        </div>
        <div className="description">
          <input type="text" placeholder={"description"} value={description} onChange={event => setDescription(event.target.value)} />
          {errors.description && <div style={{ color: 'red' }}>{errors.description}</div>}
        </div>
        <button>Add New Transaction</button>
      </form>
      <div className="transactions">
        {transactions.map((transaction, index) => (
          <div className="transaction" key={index}>
            <div className="left">
              <div className="name">{transaction.name}</div>
              <div className="description">{transaction.description}</div>
            </div>
            <div className="right">
              <div className="price-green">{transaction.price}</div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;

