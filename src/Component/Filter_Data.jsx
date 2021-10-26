import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Filter_Data(props) {
    const [VenderNameList, setVenderNameList] = useState('')
    const [Search_Vender, setSearch_Vender] = useState('')
    function venderNameData() {
        axios.get('http://localhost:5050/api/vender', {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        }).then((result) => {
            setVenderNameList(result.data)
        })
    }
    const SearchData = (e) => {
        const userSerchData = props.data.filter((item) => {
            if (e.target.value === "") {
                return item;
            } else if (
                item.vender_name.toLowerCase().includes(e.target.value.toLowerCase())
            ) {
                return item;
            }
        });
        setSearch_Vender(userSerchData)
    };
    console.log(Search_Vender);
    useEffect(() => {
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
                    {/* <Button onClick={() => handlePrint()}>Print</Button> */}
                </nav>
            </div>
            <div >

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
                        {Search_Vender && Search_Vender
                            .map((item, id) => (
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

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Filter_Data
