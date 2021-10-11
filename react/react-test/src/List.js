import { memo } from "react";

//클래스는 purecomponent
const List = memo(({ text }) => {
    return <li>{text}</li>;
});
export default List;
