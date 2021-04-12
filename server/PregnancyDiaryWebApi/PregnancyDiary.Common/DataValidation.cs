namespace PregnancyDiary.Common
{
    public static class DataValidation
    {
        public static class Article
        {
            public const int ArticleTitleMinLenght = 5;

            public const int ArticleTitleMaxLenght = 100;

            public const int ArticleContentMinLenght = 10;

            public const int ArticleContentMaxLenght = 6000;

            public const int ArticleAuthorNameMaxLenght = 10;
        }

        public static class Category
        {
            public const int CategoryNameMaxLenght = 50;
        }

        public static class Comment
        {
            public const int CommentContentMinLenght = 3;

            public const int CommentContentMaxLenght = 1000;
        }
    }
}
