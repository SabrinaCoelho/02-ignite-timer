import { HeaderContainer } from "./styles";
import LogoIgnite from "../../assets/Logo-ignite.svg";
import {Scroll, Timer} from "@phosphor-icons/react"
import { NavLink } from "react-router-dom";

export function Header(){
    return(
        <HeaderContainer>
            <span>
                <img src={LogoIgnite} alt=""/>
            </span>
            <nav>
                <NavLink to="/" title="Timer"> 
                    <Timer size={24} />
                </NavLink>
                <NavLink to="/history" title="Histórico">
                    <Scroll size={24} />
                    </NavLink>
            </nav>
        </HeaderContainer>
    )
}