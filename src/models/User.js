
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: DataTypes.INTEGER,
        display_name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        image: DataTypes.STRING,
    },
    {
        tableName: 'users',
        uderscored: true, 
    });
    User.associate = (models) => {
        User.hasMany(models.blogPost, {
            as: 'blog_posts',
            foreingKey: 'user_id'
        })
    }
    return User;
}