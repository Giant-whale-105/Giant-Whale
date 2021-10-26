import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useHistory, useLocation } from 'react-router'
import Print_ledger from './Print_ledger'

function Ledger() {
    const history = useHistory()
    const [TransactionData, setTransactionData] = useState('')
    const [FilterData, setFilterData] = useState('')
    const [VenderNameList, setVenderNameList] = useState([])
    const [Vender_Search, setVender_Search] = useState([])
    const [Total, setTotal] = useState('')
    const [TotalDebit, setTotalDebit] = useState(0)
    const [TotalCredit, setTotalCredit] = useState(0)

    //get transaction
    const userTransaction = async () => {
        await axios.get('http://localhost:5050/api/transactiondata', {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        }).then((result) => {
            setTransactionData(result.data)
            let sumOfDebit = 0, sumOfCredit = 0
            result.data.forEach((x) => {
                if (x.transaction_type === "Debit") {
                    sumOfDebit += x.final_amount;
                } else {
                    sumOfCredit += x.final_amount;
                }
            })
            setTotal(sumOfCredit - sumOfDebit)
            setTotalCredit(sumOfCredit)
            setTotalDebit(sumOfDebit)

        })
    }
    //get vender
    function venderNameData() {
        axios.get('http://localhost:5050/api/vender', {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        }).then((result) => {
            setVenderNameList(result.data)
        })
    }
    //Serch Function
    const SearchData = (e) => {
        setFilterData(e.target.value)
        // const userSerchData = TransactionData.filter((item) => {
        //     if (e.target.value === "") {
        //         return item;
        //     } else if (
        //         item.vender_name.toLowerCase().includes(e.target.value.toLowerCase())
        //     ) {
        //         return item;
        //     }
        // });
        // setFilterData(userSerchData)
    };
    //print Function
    const handlePrint = () => {
        history.push({
            pathname: "/printAllData", state: {
                data: TransactionData
            }
        })
    }
    console.log(TransactionData)

    useEffect(() => {
        userTransaction()
        venderNameData()
    }, [])
    return (
        <div>
            <div style={{ top: "0%", position: "fixed", width: "100%" }}>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand"></a>
                    <div style={{ display: "flex", border: "1px solid", padding: "5px" }} >
                        <div style={{ marginInline: "5px" }}>
                            <span>Start Date : </span>
                            <input type="date" />
                        </div>
                        <div style={{ marginInline: "5px" }}>
                            <span>End Date : </span>
                            <input type="date" />
                        </div>
                    </div>
                    <div style={{ border: "1px solid", padding: "5px", marginInline: "5px" }}>
                        <span>Vender Name : </span>
                        <select name="vender_name" onChange={SearchData}>
                            <option value="">Please select vender ...</option>
                            {
                                VenderNameList &&
                                VenderNameList.map((item) => (
                                    <>
                                        <option>{item?.vender_name}</option>
                                    </>
                                ))
                            }
                        </select>
                    </div>
                    <Button onClick={() => handlePrint()}>Print</Button>
                </nav>
            </div>
            <div>

                <table className="table-bordered">
                    <thead>
                        <tr style={{ textAlign: "center" }}>
                            <th style={{ width: "2%" }}>#</th>
                            <th style={{ width: "5%" }}>Vender Name</th>
                            {/* <th style={{ width: "5%" }}>Transaction Type</th> */}
                            <th style={{ width: "5%" }}>Currency</th>
                            <th style={{ width: "5%" }}>Rate</th>
                            <th style={{ width: "5%" }}>Amount</th>
                            <th style={{ width: "5%" }}>Discount</th>
                            <th style={{ width: "5%" }}>Credit</th>
                            <th style={{ width: "5%" }}>Debit</th>
                            <th style={{ width: "5%" }}>Transaction Data</th>
                            <th style={{ width: "10%" }}>Note</th>
                        </tr>
                    </thead>
                    <tbody>
                        {TransactionData ?
                            (
                                <>

                                    {TransactionData && TransactionData.filter((item) => {
                                        if (FilterData == "") {
                                            return item
                                        } else if (item.vender_name.toLowerCase().includes(FilterData.toLowerCase())) {
                                            return item
                                        }
                                    }).map((item, id) => (
                                        <tr key={id}>
                                            <td>{id}</td>
                                            <td>{item.vender_name}</td>
                                            {/* <td>{item.transaction_type}</td> */}
                                            <td>{item.currency}</td>
                                            <td>{item.amount}</td>
                                            <td>{item.rate}</td><td>{item.discount}</td>
                                            <td>{item.transaction_type === "Debit" || item.transaction_type === "Sale" ? "" : item.final_amount}</td>
                                            <td>{item.transaction_type === "Debit" || item.transaction_type === "Sale" ? item.final_amount : ""}</td>
                                            <td>{item.transaction_date}</td>
                                            <td>{item.note}</td>
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
                    <div style={{ display: "flex", margin: "0px auto" }} >
                        <h5 style={{ border: "1px solid", padding: "5px", margin: "5px" }}>Total Credit: {TotalCredit}</h5>
                        <h5 style={{ border: "1px solid", padding: "5px", margin: "5px" }}>Total Debit: {TotalDebit}</h5>
                        <h5 style={{ border: "1px solid", padding: "5px", margin: "5px" }}>Total Amount : {Total}</h5>
                        {/* <h5 >Total Credit: {TotalCredit} | Total Debit: {TotalDebit} | Total Amount : {Total}</h5> */}
                    </div>
                </nav>
            </div>

        </div>
    )
}

export default Ledger
