namespace PregnancyDiary.Common
{
    public static class DataValidation
    {
        public static class Article
        {
            public const int TitleMinLenght = 5;

            public const int TitleMaxLenght = 100;

            public const int ContentMinLenght = 10;

            public const int ContentMaxLenght = 6000;

            public const int AuthorNameMaxLenght = 10;
        }

        public static class Baby
        {
            public const int NameMinLenght = 2;

            public const int NameMaxLenght = 50;
        }

        public static class Category
        {
            public const int NameMaxLenght = 50;
        }

        public static class Comment
        {
            public const int ContentMinLenght = 3;

            public const int ContentMaxLenght = 1000;
        }
    }
}
