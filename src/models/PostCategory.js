module.exports = (sequelize, DataTypes) => {
    const PostCategory = sequelize.define('PostCategory', {
        postId: DataTypes.INTEGER,
        categoryId: DataTypes.INTEGER
    },
    {
        tableName: 'posts_categories',
        underscored: true
    });

    PostCategory.associate = ({ Category, BlogPost}) => {
        Category.belongsToMany(BlogPost, {
            as: 'blog_posts',
            through: PostCategory,
            foreingKey: 'category_id',
            otherKey: 'post_id'
        })
        BlogPost.belongsToMany(Category, {
            as: 'categories',
            through: PostCategory,
            foreingKey: 'post_id',
            otherKey: 'category_id'  
        })
    }

    return PostCategory;
}