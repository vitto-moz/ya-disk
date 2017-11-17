import React from "react";
import {Nav, Navbar, NavItem} from "react-bootstrap";

const Navigation = (props) => {
    return (
        <Navbar>
            <Nav>
                {props.path !== 'disk:/'
                    ? <NavItem eventKey={1} onClick={props.stepBack}>Back</NavItem>
                    : null}
            </Nav>
        </Navbar>
    );
};



export default Navigation;