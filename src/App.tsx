import React from 'react';
import './App.css';
import Field from './game/field/Field'


function App() {
    return (
        <div className="App">
            <Field height={22} width={10} />
        </div>
    );
}

export default App;
