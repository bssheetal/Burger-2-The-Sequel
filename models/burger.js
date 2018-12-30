module.exports = function (sequelize, DataTypes) {
    var Burger = sequelize.define("Burger", {
        name: DataTypes.STRING,
        devoured_state: DataTypes.STRING
    });
    return Burger;
}