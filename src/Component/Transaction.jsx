import React, { useEffect, useState } from 'react'
import { Button, Col, Dropdown, Form, Row } from 'react-bootstrap'
import axios from 'axios'
import { useHistory } from 'react-router'
import { toast } from 'react-toastify'

function Transaction() {
    const history = useHistory()
    const [VenderNameList, setVenderNameList] = useState([])
    const [vender_name, setvender_name] = useState("")
    const [transaction_type, settransaction_type] = useState("")
    const [currency, setcurrency] = useState("")
    const [rate, setrate] = useState("")
    const [amount, setamount] = useState("")
    const [discount, setdiscount] = useState('')
    const [final_amount, setfinal_amount] = useState("")
    const [transaction_date, settransaction_date] = useState("")
    const [note, setnote] = useState("")
    const data = { vender_name, transaction_type, currency, rate, amount, discount, final_amount, transaction_date, note }
    const create = () => {
        console.log(data);
        if (!vender_name || !transaction_type || !currency || !rate || !amount || !discount || !final_amount || !transaction_date || !note) {
            return toast.warning('Fill the details ')
        } else {
            axios.post('http://localhost:5050/api/create', data, {
                headers: {
                    'x-access-token': localStorage.getItem('token')
                }
            }).then((result) => {
                console.log(result);
                toast.success('Save Succesfully')
                setvender_name("")
                settransaction_type("") 
                setcurrency("") 
                setrate("")
                setamount("") 
                setdiscount("") 
                setfinal_amount("") 
                settransaction_date("") 
                setnote("")
            })
        }
    }
    function venderName() {
        axios.get('http://localhost:5050/api/vender', {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        }).then((result) => {
            setVenderNameList(result.data)
        })
    }
    useEffect(() => {
        venderName()
    }, [])
    return (
        <div>
            <br />
            <div className="table-bordered" style={{ width: "50rem", margin: "0px auto", padding: "10px" }}>
                <br />
                <Form >
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Vender Name</Form.Label>
                            <br />
                            <select style={{ width: "100%", height: "50%" }} value={vender_name} onChange={(e) => setvender_name(e.target.value)}>
                                <option>Please select ...</option>
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
                            <Form.Label>Transaction Type</Form.Label>
                            <select style={{ width: "100%", height: "50%" }}value={transaction_type} onChange={(e) => settransaction_type(e.target.value)}>
                                <option>Please select ...</option>
                                <option>Credit</option>
                                <option>Debit</option>
                            </select>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Currency</Form.Label>
                            <select style={{ width: "100%", height: "50%" }} value={currency} onChange={(e) => setcurrency(e.target.value)}>
                                <option>Please select ...</option>
                                <option>INR(Cash)</option>
                                <option>INR(Bank)</option>
                                <option>USD</option>
                                <option>RMB/CNY</option>
                                <option >Sele</option>
                                <option>Pares</option>

                            </select>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Rate</Form.Label>
                            <Form.Control type="text" value={rate} placeholder="Rate" onChange={(e) => setrate(e.target.value)} />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control type="text" value={amount} placeholder="Amount" onChange={(e) => setamount(e.target.value)} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Discount</Form.Label>
                            <Form.Control type="text" value={discount} placeholder="Discount" onChange={(e) => setdiscount(e.target.value)} />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Final Amount</Form.Label>
                            <Form.Control type="text" value={final_amount} placeholder="Final Amount" onChange={(e) => setfinal_amount(e.target.value)} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Transaction Date</Form.Label>
                            <Form.Control type="date" value={transaction_date} placeholder="Transaction Date" onChange={(e) => settransaction_date(e.target.value)} />
                        </Form.Group>
                    </Row>
                    <Form.Label>Note</Form.Label>
                    <Form.Control type="text" value={note} placeholder="Note" onChange={(e) => setnote(e.target.value)} />
                    <br />
                    <div style={{ justifyContent: "center", display: "flex" }}>
                        <Button style={{ margin: "10px" }} onClick={() => create()}>Save</Button>
                        <Button onClick={() => history.push({ pathname: '/Home' })}>Cancel</Button>
                    </div>
                </Form>
                <br />
            </div>

        </div>
    )
}

export default Transaction
