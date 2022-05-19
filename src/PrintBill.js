import React, { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useReactToPrint } from "react-to-print";
import Layout from './Layout';

const PrintBill = React.forwardRef(() => {

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;

    const location = useLocation();
    const data = location.state;

    const componentRef = useRef();

    const Print = useReactToPrint({
        content: () => componentRef.current
    });

    return (
        <Layout>
            <div id='printbillPage'>
                <div id='printbill' ref={componentRef}>
                    <h1 className='billHeading'>Rajeshahi Foods & Hospitality</h1>
                    <h3 className='billHeading'>PICT Canteen, Pune</h3>
                    <hr />
                    <div id='billDetails'>
                        <h4>Date : {today}</h4>
                        <h4>Bill No. : {JSON.parse(localStorage.getItem("Report")).reportBillNo}</h4>
                    </div>
                    <hr />
                    <table className='billTable'>
                        <thead>
                            <tr>
                                <th className='billTableth'>Sr</th>
                                <th className='billTableth'>Name</th>
                                <th className='billTableth'>Price</th>
                                <th className='billTableth'>Quantity</th>
                                <th className='billTableth'>Cost</th>
                            </tr>
                        </thead>
                        <tbody className='billTabletbody'>
                            {
                                data.items.filter(function (element) {
                                    return element.quantity != 0;
                                }).map((value, key) => {
                                    return (
                                        (value.quantity != 0) ?
                                            (<tr key={key} className='billTabletr'>
                                                <td className='billTabletd'>{key + 1}</td>
                                                <td className='billTabletd'>{value.name}</td>
                                                <td className='billTabletd'>{value.price}</td>
                                                <td className='billTabletd'>{value.quantity}</td>
                                                <td className='billTabletd'>{value.cost}</td>
                                            </tr>) :
                                            (<></>)
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    <h3 id='billTotal'>Total: ₹ {data.totalcost}</h3>
                    <h3 id='billGreets'>Thank You!</h3>
                </div>
                <button id='billButton' className='btn' onClick={Print}>Print</button>
            </div>
        </Layout>
    );
});

export default PrintBill;
