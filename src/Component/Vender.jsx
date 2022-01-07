import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Navbar from "./Navbar"
function Vender() {
    const [vender_name, setvender_name] = useState("")
    const [allData, setallData] = useState([])
    function VenderData() {

        const data = { vender_name }
        console.log(vender_name);
        console.log(data);
        if (!vender_name) {
            return toast.warning("Fill the detail")
        }
        else {
            axios.post('http://localhost:5050/vender', data, {
                headers: {
                    'x-access-token': localStorage.getItem('token')
                }
            }).then((result) => {
                console.log(result.data);
                vendernamedata()
            })
        }
    }
    function vendernamedata() {
        axios.get('http://localhost:5050/api/vender', {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        }).then((result) => {
            setallData(result.data)
        })
    }
    useEffect(() => {
        vendernamedata()
    }, [])

    function deleteVender(id) {
        axios.delete(`http://localhost:5050/api/delete/${id}`, {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })
        vendernamedata()
    }
    return (
        <div><main id="main" class="main">
            

            <input type="name" placeholder="Vender Name" onChange={(e) => {
                setvender_name(e.target.value);
            }} />
            <button onClick={() => VenderData()}>Save</button>

            <Table striped bordered hover size="sm" style={{ width: "20rem", margin: '0px auto' }}>

                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allData ? (
                            <>
                                {
                                    allData && allData.map((item, id) => (
                                        <tr key={id}>
                                            <td>{id}</td>
                                            <td>{item?.vender_name}</td>
                                            <td> <button
                                                type="button"
                                                onClick={() => deleteVender(item._id)}
                                                className="btn btn-sm btn-danger"
                                            >
                                                Delete
                                            </button></td>
                                        </tr>
                                    ))
                                }
                            </>
                        ) : "Add Vender"
                    }

                </tbody>
            </Table>

        </main></div>
    )
}

export default Vender
