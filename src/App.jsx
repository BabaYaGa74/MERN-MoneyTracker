import { useEffect, useState } from "react";
import "./App.css";
import { AiOutlineDelete } from "react-icons/ai";

function App() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [datetime, setDateTime] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [valid, setValid] = useState(true);

  useEffect(() => {
    getTransactions();
  }, []);

  async function getTransactions() {
    const url = "http://localhost:4000/api/transactions";
    try {
      const response = await fetch(url);
      return await response.json().then((transactions) => {
        setTransactions(transactions);
      });
    } catch (error) {
      return alert(error.message);
    }
  }

  async function addNewTransaction(ev) {
    ev.preventDefault();
    if (!name.trim() || !datetime.trim() || !description.trim()) {
      setValid(false);
      return;
    }

    const priceValue = name.split(" ")[0];

    if (isNaN(priceValue) || name.split(" ").length < 2) {
      alert("Please enter the transaction in the format '+/- (Amount) Name'");
      return;
    }
    setValid(true);
    const url = "http://localhost:4000/api/transaction";
    const price = priceValue;
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        price,
        name: name.substring(price.length + 1),
        description,
        datetime,
      }),
    })
      .then((response) =>
        response.json().then((json) => {
          setName("");
          setDateTime("");
          setDescription("");
          console.log("result", json);
          getTransactions();
        })
      )
      .catch((err) => alert(err.message));
  }

  async function deleteAllRecords() {
    const url = "http://localhost:4000/api/transactions";
    await fetch(url, {
      method: "DELETE",
    });
    getTransactions();
  }

  async function deleteOneTransaction(id) {
    const url = "http://localhost:4000/api/transaction/" + id;
    await fetch(url, {
      method: "DELETE",
    });
    getTransactions();
  }

  let balance = 0;
  for (const transaction of transactions) {
    balance = balance + transaction.price;
  }

  return (
    <main>
      <h1>
        Money <span>Tracker</span>
      </h1>
      <h2>
        <span>Total: </span>Rs. {balance}
      </h2>
      {transactions.length > 0 && (
        <button className="deleteAll" onClick={deleteAllRecords}>
          Delete All
        </button>
      )}
      <form onSubmit={addNewTransaction}>
        <div className="basic">
          <input
            type="text"
            placeholder="+/- (Amount) Name "
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <input
            type="datetime-local"
            value={datetime}
            onChange={(ev) => setDateTime(ev.target.value)}
          />
        </div>
        <div className=" description">
          <input
            type="text"
            placeholder="Short Description"
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
          />
        </div>
        {!valid && <div className="validity">Please fill all the fields</div>}
        <button type="submit">Add new transaction</button>
      </form>

      <div className="transactions">
        {transactions.length > 0 &&
          transactions.map((transaction) => {
            return (
              <div className="transaction">
                <div className="left">
                  <div className="name">{transaction.name}</div>
                  <div className="description">{transaction.description}</div>
                </div>
                <div className="right">
                  <div className="rightTop">
                    <div
                      className={
                        "price" + (transaction.price < 0 ? " red" : " green")
                      }
                    >
                      {transaction.price}
                    </div>
                    <button
                      className="deleteTransaction"
                      onClick={() => deleteOneTransaction(transaction._id)}
                    >
                      <AiOutlineDelete />
                    </button>
                  </div>
                  <div className="datetime">{transaction.datetime}</div>
                </div>
              </div>
            );
          })}
        {transactions.length <= 0 && (
          <p className="message">No transactions available.</p>
        )}
      </div>
    </main>
  );
}

export default App;
