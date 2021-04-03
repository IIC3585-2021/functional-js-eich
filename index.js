/* PROGRAMACION FUNCIONAL 

Observación: Todas las funciones estan definidas como de primera clase

*/

//Importamos librerias
var reader = require('readline-sync');
var parse = require('json-parse');
var compose = require('lodash/fp/compose');
const { find } = require('lodash');

// Tiros especiales
const specials = {
    "DB": 50,
    "SB": 25
}

//Obtiene nombre de jugador
const get_name_player =  () => reader.question(`Cual es el nombre del jugador? `);

//Retorna true si tiro es especial, false en caso contrario
const check_specials = shot => shot in specials? true : false;
  
//Calcula puntos de cierto tiro
const get_points = shot => check_specials(shot)? specials[shot]: shot[0] * shot[1];

//Obtiene jugada
const get_play = name => reader.question(`Jugador ${name} es tu turno. Ingresa tu jugada `);

//Funcion que crea un jugador
const init_player = () => {
    const name = get_name_player()
    const player = {
      name, 
      'points': 501
    }
    return player
}

// Utiliza curring -> Dado un argumento "shots" (definido previamente) retorna una función con argumento "player"
// Se utiliza para verificar si el jugador ha ganado debido a una jugada especifica.
const insert_play = (player) => {
    let result = 0;
    const parsed = parse.bind(console, []);
    const compute_values = (shots) => {
        // Uso de Compose y funcion de Orden superior (forEach)
        compose((shots_array) => shots_array.forEach(shot => result +=  get_points(shot)), parsed)(shots)
        player.points = Math.abs(player.points - result)
        console.log(`Ahora tienes ${player.points} puntos`)
        return player.points === 0
    }
    return compute_values
}

// Da bienvenida al juego y se agregan jugadores. Una vez finalizada se ejecuta función play_game
const init_game = () => {
    console.log('Bienvenidos al juego\n')
    players = []
    const new_player = () => reader.question('Desea agregar un jugador (1 Si; 0 No): ') === "1"
    // Funcion Compose y Recursividad para agregar jugadores
    const new_players = () => new_player() ?  (compose((player) => players.push(player),init_player)(), new_players()): play_game
    return new_players
}

// Simula una jugada para cada jugador. Retorna si existe ganador o no.
const play_game = () => {
    let winner_found = null
    const is_there_winner = () => {
        // Funcion de orden superior forEach
        players.forEach((player) => {
            const insert_play_of_player = insert_play(player)
            // Funcion que evalua si existe ganador. Retorna el ganador si es que hay sino null.
            // Utiliza Funcion Compose y Recursividad para busqueda de ganador (flujo juego)
            winner_found = compose((shots) => insert_play_of_player(shots), get_play)(player.name) == true ? player : winner_found
        })
        return winner_found ? true : false
    }

    // Recursividad para ejecución juego. Retorna mensaje cuando gana jugador.
    const find_winner = () => !is_there_winner() ? find_winner() : undefined;
    if (!players) {
        find_winner()
        return console.log(`Felicidades ${winner_found.name} haz ganado esta partida`)
    }
    console.log("No habían jugadores para esta partida")
}

init_game()()()