import React, { useState } from 'react';
import './App.css';
import ItemsData from './ItemsData'
import Logo from './Assets/Images/logo.png'
import Add from './Assets/Images/plus.png';
import Minus from './Assets/Images/minus-button.png'

function App() {
  const [data, setData] = useState({items: ItemsData, totalcost: 0});

  const handleAdd = (e) => {
    setData({items: data.items.map(x => (x.sr == e.target.className) ? {...x, quantity: x.quantity+1, cost: (x.cost + x.price)} : x), totalcost: data.totalcost + data.items[e.target.className].price});
  }

  const handleRemove = (e) => {
    setData({items: data.items.map(x => ((x.sr == e.target.className)&&(x.quantity != 0)) ? {...x, quantity: x.quantity-1, cost: (x.cost - x.price)} : x), totalcost: (data.items[e.target.className].quantity != 0) ? (data.totalcost - data.items[e.target.className].price) : (data.totalcost)});
  }

  const handleReset = (e) => {
    setData({items: ItemsData, totalcost: 0});
  }

  return (
    <div className="App">
      <header>
        <div id='heading'>
          <img src={Logo} alt="Logo" id='logo' />
          <h2>Rajeshahi</h2>
          <p>Foods and Hospitality Pvt. Ltd</p>
        </div>
      </header>

      <section>
        <span id='menu' className='column'>
          <table className='table'>
            <thead>
              <tr>
                <th>Sr</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Cost</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                data.items.slice(0, 20).map((value, key) => {
                  return (
                    <tr id='q' key={key}>
                      <td>{value.sr}</td>
                      <td>{value.name}</td>
                      <td>{value.price}</td>
                      <td>{value.quantity}</td>
                      <td>{value.cost}</td>
                      <td><img src={Add} alt="addIcon" name={value.name} className={value.sr} onClick={handleAdd}/><img src={Minus} alt="minusIcon" name={value.name} className={value.sr} onClick={handleRemove}/></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>

          <table id='second_column' className='table'>
            <thead>
              <tr>
                <th>Sr</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Cost</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                data.items.slice(20, 40).map((value, key) => {
                  return (
                    <tr key={key}>
                      <td>{value.sr}</td>
                      <td>{value.name}</td>
                      <td>{value.price}</td>
                      <td>{value.quantity}</td>
                      <td>{value.cost}</td>
                      <td><img src={Add} alt="addIcon" name={value.name} className={value.sr} onClick={handleAdd}/><img src={Minus} alt="minusIcon" name={value.name} className={value.sr} onClick={handleRemove}/></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>

          <span className='column'>
            <table className='last_col_table table'>
              <thead>
                <tr>
                  <th>Sr</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Cost</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  data.items.slice(40, 46).map((value, key) => {
                    return (
                      <tr key={key}>
                        <td>{value.sr}</td>
                        <td>{value.name}</td>
                        <td>{value.price}</td>
                        <td>{value.quantity}</td>
                        <td>{value.cost}</td>
                        <td><img src={Add} alt="addIcon" name={value.name} className={value.sr} onClick={handleAdd}/><img src={Minus} alt="minusIcon" name={value.name} className={value.sr} onClick={handleRemove}/></td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>

            <table id='bill' className='last_col_table table'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Cost</th>
                </tr>
              </thead>
              <tbody>
                {
                  data.items.map((value, key) => {
                    return (
                      (value.quantity != 0) ? 
                      (<tr key={key}>
                        <td>{value.name}</td>
                        <td>{value.price}</td>
                        <td>{value.quantity}</td>
                        <td>{value.cost}</td>
                      </tr>) :
                      (<></>)
                    )
                  })
                }
              </tbody>
            </table>
            <h3>Total Cost : {data.totalcost}</h3>

            <span id='buttons'>
              <button className='btn' onClick={handleReset}>Reset</button>
              <button className='btn'>Print</button>
            </span>
          </span>
        </span>
      </section>
      

    </div>
  );
}

export default App;
