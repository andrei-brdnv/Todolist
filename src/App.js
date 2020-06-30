import React from 'react';
import {Home} from "./pages/Home";
import {FirebaseState} from "./firebase/state";

function App() {
    return (
        <FirebaseState>
            <Home/>
        </FirebaseState>
    );
}

export default App;
