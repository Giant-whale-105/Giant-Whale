import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { ArrowRight } from 'react-bootstrap-icons';

function TransactionList() {
    
    const history = useHistory()
    const [TransactionData, setTransactionData] = useState('')
    const [Total, setTotal] = useState('')
    let sum = 0
    const userTransaction = () => {
        axios.get('http://localhost:5050/api/transactiondata', {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        }).then((result) => {
            setTransactionData(result.data)
            result.data.forEach((x) => {
                sum = sum + x.amount
                setTotal(sum)
                console.log(x.transaction_type == "Debit" && x.amount, "Debit");
                console.log(x.transaction_type == "Credit" && x.amount, "Credit");
            })
        })
    }
    useEffect(() => {
        userTransaction()
    }, [])
    return (
        <div>
            <div style={{padding:'15px'}}>
                
                <table className="table-bordered">
                    <thead>
                        <tr style={{ textAlign: "center" }}>
                            <th style={{ width: "2%" }}>#</th>
                            <th style={{ width: "5%" }}>Vender Name</th>
                            <th style={{ width: "5%" }}>Transaction Type</th>
                            <th style={{ width: "5%" }}>Currency</th>
                            <th style={{ width: "5%" }}>Rate</th>
                            <th style={{ width: "5%" }}>Amount(Credit)</th>
                            <th style={{ width: "5%" }}>Amount(Debit)</th>
                            <th style={{ width: "5%" }}>Discount</th>
                            <th style={{ width: "5%" }}>Final Amount</th>
                            <th style={{ width: "5%" }}>Transaction Data</th>
                            <th style={{ width: "10%" }}>Note</th>
                            <th style={{ width: "4%" }}>Print</th>
                        </tr>
                    </thead>
                    <tbody>
                        {TransactionData ?
                            (
                                <>

                                    {TransactionData && TransactionData.map((item, id) => (
                                        <tr key={id}>
                                            <td>{id}</td>
                                            <td>{item.vender_name}</td>
                                            <td>{item.transaction_type}</td>
                                            <td>{item.currency}</td>
                                            <td>{item.rate}</td>
                                            <td>{item.amount}</td>
                                            <td>{item.amount}</td>
                                            <td>{item.discount}</td>
                                            <td>{item.final_amount}</td>
                                            <td>{item.transaction_date}</td>
                                            <td>{item.note}</td>
                                            <td><ArrowRight onClick={() =>
                                                history.push({
                                                    pathname: '/print',
                                                    state: {
                                                        vender_name: item.vender_name,
                                                        transaction_type: item.transaction_type,
                                                        currency: item.currency,
                                                        rate: item.rate,
                                                        amount: item.amount,
                                                        discount: item.discount,
                                                        final_amount: item.final_amount,
                                                        transaction_date: item.transaction_date,
                                                        note: item.note
                                                    }
                                                })}></ArrowRight></td>
                                        </tr>
                                    ))}
                                </>) : (
                                <div>
                                    <br />
                                    <button class="btn btn-primary" type="button" disabled>
                                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        Loading...
                                    </button>
                                </div>

                            )}
                    </tbody>
                </table>
            </div>
            <div style={{ bottom: "0%", position: "fixed", width: "100%" }}>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand"></a>
                    <h5 style={{ margin: "0px auto" }}>Total Amount :  {Total}</h5>

                </nav>
            </div>

        </div>
    )
}

export default TransactionList
