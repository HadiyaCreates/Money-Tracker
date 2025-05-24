
// import "./App.css";
// import { useEffect, useState } from "react";

// function App() {
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [datetime, setDatetime] = useState("");
//   const [description, setDescription] = useState("");
//   const [transactions, setTransactions] = useState([]);
//   const [errorMessage, setErrorMessage] = useState(null);

//   const API_URL = process.env.REACT_APP_API_URL;

//   useEffect(() => {
//     fetchTransactions();
//   }, []);

//   async function fetchTransactions() {
//     try {
//       const response = await fetch(`${API_URL}/transaction`);
//       if (!response.ok) throw new Error("Failed to fetch transactions");
//       const data = await response.json();
//       setTransactions(data);
//       setErrorMessage(null);
//     } catch (error) {
//       setErrorMessage(error.message);
//     }
//   }

//   async function addNewTransaction(event) {
//     event.preventDefault();

//     // Basic validation
//     if (!name || !price || !datetime || !description) {
//       setErrorMessage("All fields are required.");
//       return;
//     }
//     if (isNaN(price) || Number(price) <= 0) {
//       setErrorMessage("Price must be a positive number.");
//       return;
//     }

//     try {
//       const response = await fetch(`${API_URL}/transaction`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name,
//           price: Number(price),
//           description,
//           datetime,
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || "Failed to add transaction");
//       }

//       const newTransaction = await response.json();
//       setTransactions((prev) => [...prev, newTransaction]);
//       setName("");
//       setPrice("");
//       setDatetime("");
//       setDescription("");
//       setErrorMessage(null);
//     } catch (error) {
//       setErrorMessage(error.message);
//     }
//   }

//   const balance = transactions.reduce((sum, t) => sum + Number(t.price), 0);

//   return (
//     <main>
//       <h1>Balance: {balance}</h1>

//       {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}

//       <form onSubmit={addNewTransaction}>
//         <div className="basic">
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Name"
//           />
//           <input
//             type="number"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             placeholder="Price"
//           />
//           <input
//             type="datetime-local"
//             value={datetime}
//             onChange={(e) => setDatetime(e.target.value)}
//           />
//         </div>

//         <div className="description">
//           <input
//             type="text"
//             placeholder="Description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={!name || !price || !datetime || !description}
//         >
//           Add new transaction
//         </button>
//       </form>

//       <div className="transactions">
//         {transactions.length > 0 &&
//           transactions.map((transaction, index) => (
//             <div className="transaction" key={transaction._id || index}>
//               <div className="left">
//                 <div className="name">{transaction.name}</div>
//                 <div className="description">{transaction.description}</div>
//               </div>
//               <div className="right">
//                 <div
//                   className={
//                     "price " + (transaction.price < 0 ? "red" : "green")
//                   }
//                 >
//                   {transaction.price}
//                 </div>
//                 <div className="datetime">
//                   {new Date(transaction.datetime).toLocaleString()}
//                 </div>
//               </div>
//             </div>
//           ))}
//       </div>
//     </main>
//   );
// }

// export default App;

import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [datetime, setDatetime] = useState("");
  const [description, setDescription] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL; // e.g. "https://money-tracker-5.onrender.com/api"

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function fetchTransactions() {
    try {
      const response = await fetch(`${API_URL}/transactions`);  // plural here
      if (!response.ok) throw new Error("Failed to fetch transactions");
      const data = await response.json();
      setTransactions(data);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  async function addNewTransaction(event) {
    event.preventDefault();

    if (!name || !price || !datetime || !description) {
      setErrorMessage("All fields are required.");
      return;
    }
    if (isNaN(price) || Number(price) <= 0) {
      setErrorMessage("Price must be a positive number.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/transactions`, {  // plural here too
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          price: Number(price),
          description,
          datetime,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add transaction");
      }

      const newTransaction = await response.json();
      setTransactions((prev) => [...prev, newTransaction]);
      setName("");
      setPrice("");
      setDatetime("");
      setDescription("");
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  const balance = transactions.reduce((sum, t) => sum + Number(t.price), 0);

  return (
    <main>
      <h1>Balance: {balance}</h1>

      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}

      <form onSubmit={addNewTransaction}>
        <div className="basic">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
          />
          <input
            type="datetime-local"
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
          />
        </div>

        <div className="description">
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={!name || !price || !datetime || !description}
        >
          Add new transaction
        </button>
      </form>

      <div className="transactions">
        {transactions.length > 0 &&
          transactions.map((transaction, index) => (
            <div className="transaction" key={transaction._id || index}>
              <div className="left">
                <div className="name">{transaction.name}</div>
                <div className="description">{transaction.description}</div>
              </div>
              <div className="right">
                <div
                  className={
                    "price " + (transaction.price < 0 ? "red" : "green")
                  }
                >
                  {transaction.price}
                </div>
                <div className="datetime">
                  {new Date(transaction.datetime).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}

export default App;
