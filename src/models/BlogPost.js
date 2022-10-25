module.exports = (sequelize, DataTypes) => {
    const BlogPost = sequelize.define('BlogPost', {
        id: DataTypes.INTEGER,
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        userId: DataTypes.INTEGER,
        published: DataTypes.DATA,
        updated: DataTypes.DATA,
    },
    {
        tableName: 'blog_posts',
        underscored: true
    })
    BlogPost.associate = (models) => {
        BlogPost.belongsTo(models.User, {
            as: 'blog_posts',
            foreingKey: 'user_id'
        })
    }

    return BlogPost;
}