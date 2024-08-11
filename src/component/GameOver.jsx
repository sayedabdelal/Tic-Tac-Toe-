export default  function GameOver({winner, onRestart}) {
    return (
        <div id="game-over">
        <h2>Game Over</h2>
        {winner && <p>The winner is {winner}!</p>}
        {!winner && <p>It is a draw</p>}
        <p>
            <button onClick={onRestart}>Rematch</button>
        </p>
        </div>
    )
}