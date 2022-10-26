
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false},
        display_name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        image: DataTypes.STRING,
    },
    {
        tableName: 'users',
        underscored: true,
        timestamps: false
    });
    User.associate = (models) => {
        User.hasMany(models.BlogPost, {
            as: 'blog_posts',
            foreingKey: 'user_id'
        })
    }
    return User;
}