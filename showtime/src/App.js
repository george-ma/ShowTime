import React, {Component} from 'react';
import Table from './Table';
import NavBar from './NavBar';
import { Button } from 'react-bootstrap';


class App extends Component {
    render() {
        return (
            <div className="App">
                <h1>ShowTime</h1>
                <NavBar/>
                {/* Provides extra visual weight and identifies the primary action in a set of buttons */}
                <Button bsStyle="primary">Primary</Button>
                <Table/>
            </div>
        );
    }
}

export default App;