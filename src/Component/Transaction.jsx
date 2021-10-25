import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Button, Card, Col, Dropdown, Form, Row } from 'react-bootstrap'
import axios from 'axios'

function Transaction() {
    const [VenderNameList, setVenderNameList] = useState([])
    const [vender_name, setvender_name] = useState("")
    const [transaction_type, settransaction_type] = useState("")
    const [currency, setcurrency] = useState("")
    const [rate, setrate] = useState(0)
    const [amount, setamount] = useState("")
    const [discount, setdiscount] = useState(0)
    const [final_amount, setfinal_amount] = useState("")
    const [transaction_date, settransaction_date] = useState(new Date())
    const [note, setnote] = useState("")
    const data = { vender_name, transaction_type, currency, rate, amount, discount, final_amount, transaction_date, note }
    const create = () => {
        console.log(data);

        axios.post('http://localhost:5050/api/create', data, {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        }).then((result) => {
            console.log(result);
        })
    }
    function handelSubmit(e) {
        // e.preventDefault()

    }
    function venderNameData() {
        axios.get('http://localhost:5050/api/vender', {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        }).then((result) => {
            setVenderNameList(result.data)
        })
    }
    // console.log(VenderNameList);
    useEffect(() => {
        venderNameData()
    }, [])
    return (
        <div>
            <Navbar />
            <br />
            <Card style={{ width: "50rem", margin: "0px auto" }}>
                <br />
                <Form onSubmit={handelSubmit}>
                    {/* <Form.Label>Transaction ID</Form.Label>
                    <Form.Control type="email" placeholder="Transaction ID" /> */}
                    <br />
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Vender Name:</Form.Label>
                            <br />
                            <select style={{ width: "100%", height: "50%" }} value="" onChange={(e) => setvender_name(e.target.value)}>
                                <option>Please select vender ...</option>
                                {
                                    VenderNameList &&
                                    VenderNameList.map((item) => (
                                        <>
                                            <option>{item?.vender_name}</option>
                                        </>
                                    ))
                                }

                            </select>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Transaction Type:</Form.Label>
                            <select style={{ width: "100%", height: "50%" }} onChange={(e) => settransaction_type(e.target.value)}>
                                <option>Please select transaction type ...</option>
                                <option>Credit</option>
                                <option>Debit</option>
                                <option >Sale</option>
                                <option>Purchase</option>
                            </select>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Currency:</Form.Label>
                            <select style={{ width: "100%", height: "50%" }} onChange={(e) => setcurrency(e.target.value)}>
                                <option>Please select currency ...</option>
                                <option>INR(Cash)</option>
                                <option>INR(Bank)</option>
                                <option>USD</option>
                                <option>RMB/CNY</option>
                                
                            </select>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Rate:</Form.Label>
                            <Form.Control type="text" placeholder="Rate" onChange={(e) => setrate(e.target.value)} />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Amount:</Form.Label>
                            <Form.Control type="email" placeholder="Amount" onChange={(e) => setamount(e.target.value)} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Discount:</Form.Label>
                            <Form.Control type="text" placeholder="Discount" onChange={(e) => setdiscount(e.target.value)} />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Final Amount:</Form.Label>
                            <Form.Control type="email" placeholder="Final Amount" onChange={(e) => setfinal_amount(e.target.value)} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Transaction Date:</Form.Label>
                            <Form.Control type="date" placeholder="Transaction Date" onChange={(e) => settransaction_date(e.target.value)} />
                        </Form.Group>
                    </Row>
                    <Form.Label>Note:</Form.Label>
                    <Form.Control type="text" placeholder="Note" onChange={(e) => setnote(e.target.value)} />
                    <br />
                    <Button style={{ margin: "0px auto",display:"flex" }} onClick={() => create()}>Save</Button>
                </Form>
                <br />
            </Card>

        </div>
    )
}

export default Transaction
