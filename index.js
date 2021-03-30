var reader = require('readline-sync');
var parse = require('json-parse');
var compose = require('lodash/fp/compose');

const specials = {
    "DB": 50,
    "SB": 25
}

const get_name_player =  () => reader.question(`Cual es el nombre del jugador? `);

const check_specials = (shot) => shot in specials? true : false;
    
const get_points = (shot) => check_specials(shot)? specials[shot]: shot[0] * shot[1];

const get_play = name => reader.question(`Jugador ${name} es tu turno. Ingresa tu jugada`);

const init_player = () => {
    const name = get_name_player()
    const player = {
      name, 
      'points': 501
    }
    return player
}

const insert_play = (player, shots) => {
    let result = 0;
    let shots_array = parse([], shots)
    shots_array.forEach(shot => result +=  get_points(shot))
    player.points = Math.abs(player.points - result)
    return player.points === 0
}
const init_game = () => {
    console.log('Bienvenidos al juego\n')
    players = []
    while(reader.question('Desea agregar un jugador (1 Si; 0 No): ') == 1 ? true : false) {
        compose((player) => players.push(player),init_player)()
    }
    return play_game
}

const play_game = () => {
    let winner_found = null
    while (!winner_found){
        players.forEach((player) => {
            const insert_play_of_player = insert_play.bind(console, player)
            winner_found = compose((shots) => insert_play_of_player(shots), get_play)(player.name) == true ? player : false
        })
    }
    return console.log(`Felicidades ${winner_found.name} haz ganado esta partida`)
}

init_game()()




