const reservation_status_types = Object.freeze({
    open: 'open',
    close: 'close'
})

const reservation_payment_types = Object.freeze({
    admin_player: 'admin_player',
    players: 'players'
})

module.exports = {
    reservation_status_types,
    reservation_payment_types
}