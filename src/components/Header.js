import React from "react";

import './Header.css';
class Header extends React.Component {
    constructor(props) {


        super(props);
        this.state = {
        }
    }

    handleClick(e) {
        e.preventDefault();
        
        window.close();
    }
    render() {
        return (
            <React.Fragment>
                <header>
                    <div className="logo">Elektra Bot</div>

                    <nav>
                        <div onClick={this.handleClick}>
                            <span>

                                Finalizar Chat
                            </span>
                        </div>
                    </nav>
                </header>
            </React.Fragment>
        );
    }

}
export default Header;
