import {
    Link, useLocation
} from "react-router-dom";
import { Navbar, Nav, Button, Container } from 'react-bootstrap'
import market from './logo.png'

const Navigation = ({ web3Handler, account }) => {
    const location = useLocation();
    return (
        <Navbar className="navcl" expand="lg" variant="dark" fixed="top">
            <Container>
                <Navbar.Brand href="/">
                    <img src={market} width="55" height="50" className="" alt="" />
                    &nbsp; ORDER_66 LIGHT SIDE 
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/" active={location.pathname==="/"}>Home</Nav.Link>
                        <Nav.Link as={Link} to="/create" active={location.pathname==="/create"}>Create</Nav.Link>
                        <Nav.Link as={Link} to="/my-listed-items" active={location.pathname==="/my-listed-items"}>My Listed Items</Nav.Link>
                        <Nav.Link as={Link} to="/my-purchases" active={location.pathname==="/my-purchases"}>My Purchases</Nav.Link>
                    </Nav>
                    <Nav>
                        {account ? (
                            <Nav.Link
                                href={`https://etherscan.io/address/${account}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="button nav-button btn-sm mx-4">
                                <Button variant="outline-dark">
                                    {account.slice(0, 6) + '...' + account.slice(39, 42)}
                                </Button>

                            </Nav.Link>
                        ) : (
                            <Button onClick={web3Handler} variant="outline-dark">Connect Wallet</Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )

}

export default Navigation;