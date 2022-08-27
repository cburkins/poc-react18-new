import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
    // Define state
    const [api_data, set_api_data] = useState();

    // Get data
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios("/getdata");
            return result;
        };
        fetchData().then((result) => {
            set_api_data(result.data);
        });
    });

    console.log("process.env:", process.env);

    return (
        <div className="App">
            <header className="App-header">
                <p>
                    <div>The Output from API:</div> <kbd>{api_data || "NULL"}</kbd>
                </p>
                <p>
                    REACT_APP_ENV within React:
                    <div>
                        {/* This comes from server's package.json */}
                        <kbd>{process.env.REACT_APP_ENV || "NULL"}</kbd>
                    </div>
                </p>
                <p>
                    Version:
                    <div>
                        {/* Comes from client/package.json combined with client/.env */}
                        <kbd>{process.env.REACT_APP_VERSION || "NULL"}</kbd>
                    </div>
                </p>
            </header>
        </div>
    );
}

export default App;
