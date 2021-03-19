//라이브러리
const React = require('react');
const { useState,useRef } = React;

const WordRelay = () => {
    const [word,setWord] = useState('송강');
    const [value,setValue] = useState('');
    const [result,setResult] = useState('');
    const inputRef = useRef(null);

    const onSubmitForm = (e) => {
        e.preventDefault();
        if(word[word.length - 1] === value[0]){
            setResult('딩동댕');
            setWord(value);
            setValue('');
            inputRef.current.focus()
        }else{
            setResult('땡');
            setValue('');
            inputRef.current.focus()
        }
    }
    const onChangeInput = (e) => {
        setValue(e.target.value)
    }
    return (
        <>
        <h1>{word}</h1>
        <form onSubmit={onSubmitForm}>
            <input type="text" ref={inputRef} value={value} onChange={onChangeInput}/>
            <button>입력!</button>
            <div>{result}</div>
        </form>
        </>
    )
}
/*
class WordRelay extends Component{
    state = {
        word:'송강',
        value:'',
        result:''
    }
    onSubmitForm = (e) => {
        e.preventDefault();
        if(this.state.word[this.state.word.length - 1] === this.state.value[0]){
            this.setState({
                result:'딩동댕',
                word:this.state.value,
                value:''
            })
            this.input.focus()
        }else{
            this.setState({
                result:'떙',
                value:''
            })
        }
    }
    onChangeInput = (e) => {
        this.setState({value:e.target.value})
    }
    input;
    onRefInput = (c) => {
        this.input = c;
    }
    render(){
        return (
            <>
            <h1>{this.state.word}</h1>
            <form onSubmit={this.onSubmitForm}>
                <input type="text" ref={this.onRefInput} value={this.state.value} onChange={this.onChangeInput}/>
                <button>입력!</button>
                <div>{this.state.result}</div>
            </form>
            </>
        )
            
    }
}
*/
//외부에서도 사용할수 있게
module.exports = WordRelay;