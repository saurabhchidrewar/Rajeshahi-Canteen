import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom"
import './App.css';
import Layout from "./Layout";
import ItemsData from './ItemsData'
import Add from './Assets/Images/plus.png';
import Minus from './Assets/Images/minus-button.png'

function Home() {
    const [data, setData] = useState({ items: ItemsData, totalcost: 0 });

    const handleAdd = (e) => {
        setData({ items: data.items.map(x => (x.sr == e.target.name) ? { ...x, quantity: x.quantity + 1, cost: (x.cost + x.price) } : x), totalcost: data.totalcost + data.items[e.target.name].price });
    }

    const handleRemove = (e) => {
        setData({ items: data.items.map(x => ((x.sr == e.target.name) && (x.quantity != 0)) ? { ...x, quantity: x.quantity - 1, cost: (x.cost - x.price) } : x), totalcost: (data.items[e.target.name].quantity != 0) ? (data.totalcost - data.items[e.target.name].price) : (data.totalcost) });
    }

    const handleReset = () => {
        setData({ items: ItemsData, totalcost: 0 });
    }

    const navigate = useNavigate();

    const handlePrint = () => {
        navigate("/printbill", { state: data })
        const report = JSON.parse(localStorage.getItem("Report"));
        let reportItems = (report) ? (report.reportItems) : (data.items);
        let reportTotal = (report) ? (0) : (data.totalcost);
        let reportBillNo = (report) ? (report.reportBillNo + 1) : (1);

        if (report) {
            for (let i = 0; i < 45; i++) {
                reportItems[i].quantity += data.items[i].quantity;
                reportItems[i].cost += data.items[i].cost;
                reportTotal += reportItems[i].cost;
            }
        }

        localStorage.setItem("Report", JSON.stringify({ reportItems: reportItems, reportTotalCost: reportTotal, reportBillNo: reportBillNo }));
        handleReset();
    }

    return (
        <Layout className="Home">
            <section id='menu'>
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
                                    <tr key={key}>
                                        <td>{value.sr + 1}</td>
                                        <td>{value.name}</td>
                                        <td>{value.price}</td>
                                        <td>{value.quantity}</td>
                                        <td>{value.cost}</td>
                                        <td><img src={Add} alt="addIcon" name={value.sr} className="modify" onClick={handleAdd} /><img src={Minus} alt="minusIcon" name={value.sr} className="modify" onClick={handleRemove} /></td>
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
                                        <td>{value.sr + 1}</td>
                                        <td>{value.name}</td>
                                        <td>{value.price}</td>
                                        <td>{value.quantity}</td>
                                        <td>{value.cost}</td>
                                        <td><img src={Add} alt="addIcon" name={value.sr} className="modify" onClick={handleAdd} /><img src={Minus} alt="minusIcon" name={value.sr} className="modify" onClick={handleRemove} /></td>
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
                                            <td>{value.sr + 1}</td>
                                            <td>{value.name}</td>
                                            <td>{value.price}</td>
                                            <td>{value.quantity}</td>
                                            <td>{value.cost}</td>
                                            <td><img src={Add} alt="addIcon" name={value.sr} className="modify" onClick={handleAdd} /><img src={Minus} alt="minusIcon" name={value.sr} className="modify" onClick={handleRemove} /></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>

                    <h3 id="billHeading">Bill</h3>
                    <table id='bill' className='last_col_table table'>
                        <thead>
                            <tr>
                                <th>Sr</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.items.filter(function (element) {
                                    return element.quantity != 0;
                                }).map((value, key) => {
                                    return (
                                        (value.quantity != 0) ?
                                            (<tr key={key}>
                                                <td>{key+1}</td>
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
                    <h3 id='totalOnHomePage'>Total Cost : ₹ {data.totalcost}</h3>

                    <span id='buttons'>
                        <button className='btn' onClick={handleReset}>Reset</button>
                        <button className='btn' onClick={handlePrint}>Print</button>
                    </span>
                </span>
            </section>

        </Layout>
    );
}

export default Home;
