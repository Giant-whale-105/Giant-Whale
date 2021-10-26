import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
function Nav_bar() {
    return (
        <div>

            <Navbar bg="light" expand="lg">
                <a className="navbar-brand" href="/list">Giant Whale</a>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <nav className="me-auto">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <a className="nav-link" href="/tran">Transaction</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/ledger">Ledger</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/vender">Vender</a>
                            </li>
                        </ul>
                    </nav>
                </Navbar.Collapse>
            </Navbar>
        </div>

    )
}

export default Nav_bar
