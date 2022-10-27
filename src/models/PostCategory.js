module.exports = (sequelize, DataTypes) => {
    const PostCategory = sequelize.define('PostCategory', {
        postId: DataTypes.INTEGER,
        categoryId: DataTypes.INTEGER
    },
    {
        tableName: 'posts_categories',
        underscored: true,
        timestamps: false
    });

    PostCategory.associate = ({ Category, BlogPost}) => {
        Category.belongsToMany(BlogPost, {
            as: 'blog_posts',
            through: PostCategory,
            foreignKey: 'category_id',
            otherKey: 'post_id'
        })
        BlogPost.belongsToMany(Category, {
            as: 'categories',
            through: PostCategory,
            foreignKey: 'post_id',
            otherKey: 'category_id'  
        })
    }
    return PostCategory;
}