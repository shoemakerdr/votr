import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Nav from './components/Nav';
import Footer from './components/Footer'
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom'

const Root = () => {
    return (
        <div className='Root'>
            <Router>
                <div>
                    <Nav />
                    <Route exact path='/' component={App} />
                    <Footer />
                </div>
            </Router>
        </div>
    )
}

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
