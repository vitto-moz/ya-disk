import React from 'react';
import { Route, Link } from 'react-router-dom'
import Main from '../../containers/main/index'

const App = () => (
    <div>
        <main>
            <Route exact path="/" component={Main} />
        </main>
    </div>
);

export default App