import logo from "./logo.svg";
import "./App.css";
import { useDispatch } from "react-redux";
import { ADD_NUM } from "./reducer";
import { useState } from "react";

function App() {
    const [value, setValue] = useState(0);
    const dispatch = useDispatch();

    const onClickAddNum = () => {
        setValue((prev) => prev + 1);
        dispatch({
            type: ADD_NUM,
            data: value,
        });
    };

    return (
        <div className="App">
            <p>{value}</p>
            <button type="button" onClick={onClickAddNum}>
                클릭
            </button>
        </div>
    );
}

export default App;
