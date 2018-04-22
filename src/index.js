import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props){
    return (
        <button className = "square" onClick = {props.onClick}>
        {props.value}
        </button>
    )
}
  
  class Board extends React.Component { 
    renderSquare(i) {
      return <Square value = {this.props.squares[i]} onClick = {() => this.props.onClick(i)}/>;
    }
  
    render() { 
      return (
        <div className ="board">
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>  
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            history : [{squares: Array(9).fill(null)}],
            xIsNext:true , 
            isEnded:false , 
            step: 0
        }
    }
    handleClick(i){
        const history = this.state.history.slice(0 , this.state.step + 1);
        const curent = this.state.history[history.length  - 1];
        const squares = curent.squares.slice();
        if (!this.state.isEnded) {
            if (squares[i] == null) {
                (this.state.xIsNext ? squares[i] = 'X' : squares[i] = 'O');
                let winner  = calculateWinner(squares);
                if(winner){
                  this.setState({ history:history.concat([{squares: squares}]), xIsNext: !this.state.xIsNext  ,
                   isEnded: true , step: history.length});
                }
              else{
                  this.setState({  history:history.concat([{squares: squares}]) , xIsNext: !this.state.xIsNext  , isEnded: false
                  , step: history.length});
              }
            }
        }
    }
    jumpTo(newStep){
        this.setState({
            step:newStep , 
            xIsNext:(newStep % 2 === 0)
        });
    }
    
    render() {
    const history = this.state.history ; 
    const curent = history[this.state.step];
    const winner = calculateWinner(curent.squares);
    const moves = history.map((step , move) => {
        const desc = move ? "Go to move" + move : "Go to Game Start";
        return (
            <li key = {move}><button onClick ={()=>this.jumpTo(move)} > {desc} </button></li>
        )
    });
    let status;
    if(winner){
        status = "Winner : " + winner;
    }
    else status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    return (
        <div className="game">
          <div className="game-board">
            <Board
            squares = {curent.squares}
            onClick = {(i) => this.handleClick(i)} />
          </div>  
          <div className="game-info">
            <div>{ status }</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if ((squares[a] != null) && (squares[a] === squares[b]) && (squares[a] === squares[c])) {
        return squares[a];
      }
    }
    return null;
  }