import React from 'react';
import './App.css';
import AutoComplete from './components/AutoComplete';

function App() {
  return (
    <div className="App">
      <AutoComplete data-testid="auto-complete" />
    </div>
  );
}

export default App;
