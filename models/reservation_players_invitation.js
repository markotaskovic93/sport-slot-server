const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Reservation_players_invitation extends Model {
        
        

    };
    Reservation_players_invitation.init({
        id: {
        primaryKey: true,
        type: DataTypes.BIGINT
        },
        slot_id: DataTypes.BIGINT,
        reservation_id: DataTypes.BIGINT,
        player_id: DataTypes.BIGINT
    }, {
        sequelize,
        modelName: 'Reservation_players_invitation',
    });
    return Reservation_players_invitation;
};