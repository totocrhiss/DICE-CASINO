let modalName = `<!-- MODALS -->     
<div class="fixed">

        <h2>New game</h2>

        <div class="container_player">
            <h1 class="alert1" style="opacity: 0;"></h1>
            <div class="player1">
                <label class="label" for="player1">Player 1 :</label>
                <input class="input" type="text" id="player_name1" name="player1" placeholder="Nom">
            </div>
            <div class="player2">
                <label class="label" for="player2">Player 2 :</label>
                <input class="input" type="text" id="player_name2" name="player2" placeholder="Nom">
            </div>
        </div>
        <button class="button"><span class="start_button">Start</span></button> 

    </div>
`;

// injecte modal player start
function name_play_start() {
    document.querySelector(".new-game-modal").innerHTML = modalName;
}
// injecte modal player start