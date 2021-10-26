import React, { useRef, useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router'
import { useReactToPrint } from 'react-to-print'
import { Button } from 'react-bootstrap'

function Print_ledger() {
    const location = useLocation()
    const history = useHistory()
    const componentRef = useRef()
    const [Total, setTotal] = useState('')
    const [TotalDebit, setTotalDebit] = useState(0)
    const [TotalCredit, setTotalCredit] = useState(0)

    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    })
    const sum = () => {

        let sumOfDebit = 0, sumOfCredit = 0
        location.state.data.forEach((x) => {
            if (x.transaction_type === "Debit") {
                sumOfDebit += x.final_amount;
            } else {
                sumOfCredit += x.final_amount;
            }
        })
        setTotal(sumOfCredit - sumOfDebit)
        setTotalCredit(sumOfCredit)
        setTotalDebit(sumOfDebit)
    }
    useEffect(() => {
        sum();
    }, [])
    // console.log(location.state.data)
    return (
        <div>
            <Button onClick={() => handlePrint()}>Print</Button>
            <div ref={componentRef}>
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
                        {location.state.data ?
                            (
                                <>

                                    {location.state.data && location.state.data.map((item, id) => (
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
        </div>
    )
}

export default Print_ledger
