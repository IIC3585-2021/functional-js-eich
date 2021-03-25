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

// const init_game = (name_1, name_2) => {
//     player_1 = {
//         "name": name_1,
//         "points": 501
//     }
//     player_2 = {
//         "name": name_2,
//         "points": 501
//     }
//     return play_game
//     }

// const play_game = () => {
//     console.log(`Juego inicializado con ${player_1.name} y ${player_2.name}. Ingrese lanzamiento de ${player_1}`)
// }
