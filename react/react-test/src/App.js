import { useState } from "react";
import List from "./List";

const App = () => {
    const [value, setValue] = useState("");
    const [list, setList] = useState([]);

    const onChangeValue = (e) => {
        setValue(e.target.value);
    };
    const onSubmit = (e) => {
        e.preventDefault();

        setList([...list, value]);
    };

    return (
        <form onSubmit={onSubmit}>
            <input type="input" value={value} onChange={onChangeValue} />
            {list.map((v) => {
                return (
                    <ul>
                        <List text={v} />
                    </ul>
                );
            })}
            <button type="submit">입력</button>
        </form>
    );
};

export default App;
