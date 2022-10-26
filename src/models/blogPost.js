module.exports = (sequelize, DataTypes) => {
    const BlogPost = sequelize.define('BlogPost', {
        id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false},
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        userId: DataTypes.INTEGER,
        published: DataTypes.DATE,
        updated: DataTypes.DATE,
    },
    {
        tableName: 'blog_posts',
        underscored: true,
        timestamps: false
    })
    BlogPost.associate = (models) => {
        BlogPost.belongsTo(models.User, {
            as: 'blog_posts',
            foreingKey: 'user_id'
        })
    }

    return BlogPost;
}