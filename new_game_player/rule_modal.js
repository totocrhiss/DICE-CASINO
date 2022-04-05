let rule_modal = `<!-- modal_regle -->
<div class="fixed_rule">



    <h2 class="titre">Règles du jeu</h2>

    <p class="welcome_text">Bienvenue à DICE CASINO</p>

    <div class="text">
        <p>Ce jeu contient deux joueurs sur le même écran.<br> Chaque joueur a : un score temporaire et un score global.
        </p>
        <p>A chaque tour, le score temporaire du joueur est initialisé à 0 et le joueur actuel peut lancer le dé autant de fois qu’il le souhaite.<br> Le résultat du lancer est ajouté au score temporaire.
        </p>
        <p>Pendant le tour du joueur, le joueur peut décider de :</p>
        <ul>
            <li>Enregistrez son score temporaire en cliquant sur l'image du jackpot : cette action sera automatiquement passée au tour de l’autre joueur.</li>
            <li>Continuer à lancer le dé : si le nombre du dé est 1, le score temporaire est initialisé à 0 et le joueur passe son tour.</li>
        </ul>

        <p class="text_winner">Le premier joueur qui atteint 100 points gagne le match</p>



        <p class="text_good_luck">Bonne chance!</p>


    </div>

    <button class="btn">continuer !</button>

</div>`;

// injecte modal player start
function function_rule_modal() {
    document.querySelector(".rule-game-modal").innerHTML = rule_modal;
}
// injecte modal player start