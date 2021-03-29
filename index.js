var reader = require('readline-sync');
var parse = require('json-parse')

const specials = {
    "DB": 50,
    "SB": 25
}

const get_name_player =  players_count => reader.question(`Jugador ${players_count} cual es tu nombre? `)

const init_player = () => {
    const name = get_name_player(players_count)
    const number = players_count
    const player = {
      name, 
      number,
      'points': 501
    }
    return player
}

const check_specials = (shot) => {
    return shot in specials? true : false
}
    
const get_points = (shot) => {
    return check_specials(shot)? specials[shot]: shot[0] * shot[1]
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
    players_count = 1
    players = []

    while(reader.question('Desea agregar un jugador (1 Si; 0 No): ') == 1 ? true : false) {
      const player = init_player()
      players.push(player)
      players_count += 1
    }
    return play_game
}

const get_play = name => reader.question(`Jugador ${name} es tu turno. Ingresa tu jugada`)

const play_game = () => {
    let winner_found = false
    let winner;
    while (!winner_found){
        players.forEach((player) => {
            const shots = get_play(player.name)
            let veamos = insert_play(player, shots)
            winner_found = veamos == true ? true : false
            winner = winner_found == true ? player : null
        })
    }
    return console.log(`Felicidades ${winner.name} haz ganado esta partida`)
}

init_game()()




