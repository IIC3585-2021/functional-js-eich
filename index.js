var reader = require('readline-sync');

const specials = {
    "DB": 50,
    "SB": 25
}

const check_specials = (shot) => {
    return shot in specials? true : false
}
    
const get_points = (shot) => {
    return check_specials(shot)? specials[shot]: shot[0] * shot[1]
}

const ingresar_jugada = (player, points, shots) => {
    let result = 0;
    shots.forEach(shot => result +=  get_points(shot))
    // Podriamos guardar aca en el objeto su puntaje
    // player.points = Math.abs(points - result)
    return Math.abs(points - result)
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

const init_game = () => {
    console.log('\nBienvenidos al juego')
    players_count = 1
    players = []

    while(reader.question('Desea agregar un jugador (1 Si; 0 No): ') == 1 ? true : false) {
      const player = init_player()
      players.push(player)
      players_count += 1
    }
    return play_game
}

const play_game = () => {
}

init_game()()




