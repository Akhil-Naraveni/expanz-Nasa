import React,{ReactDOM} from "react";
import "./Header.css"

const Header = () =>{

    return(
        <div className="headercontainer">
            <div>
                <img className="navImage" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/2449px-NASA_logo.svg.png" />
                <p className="nameNav">AKhil Naraveni</p>
            </div>
            <div>
                <h3>Astronomy Picture of the Day</h3>
            </div>
        </div>
    )
}

export default Header;