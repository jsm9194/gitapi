import { AssignmentContext } from "../network/CallAPI";
import { useContext } from "react";
import styled from "styled-components";

const Header = () =>{
    const {headerTitle} = useContext(AssignmentContext);

    return(
        <>
        <HeaderContainer>
            <Headerfont>{headerTitle}</Headerfont>
        </HeaderContainer>
        <Padding></Padding>
        </>
    )
}

export default Header;

const HeaderContainer = styled.div`
    position: fixed;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    font-size: 15px;
    text-align: center;
    background-color: white;
    top:0;
`;

const Headerfont = styled.h1`
    font-size: 30px;
`;
const Padding = styled.div`
    padding-bottom: 80px;
`;