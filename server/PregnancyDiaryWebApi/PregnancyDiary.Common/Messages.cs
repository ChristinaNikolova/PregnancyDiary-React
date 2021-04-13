namespace PregnancyDiary.Common
{
    public static class Messages
    {
        public static class Success
        {
            public const string Login = "You have successfully logged in.";

            public const string Register = "You have successfully registered.";

            public const string Added = "Successfully added.";

            public const string Updated = "Successfully updated.";

            public const string Deleted = "Successfully deleted.";
        }

        public static class Error
        {
            public const string InvalidCredentials = "Incorrect e-mail or password.";

            public const string AlreadyTakenEmail = "This e-mail is already taken. Please try with another one.";

            public const string AlreadyTakenUsername = "This username is already taken. Please try with another one.";

            public const string Unknown = "Something went wrong.";

            public const string InvalidEmail = "Please enter valid e-mail address.";

            public const string UsernameMinLength = "Username should be at least 3 symbols long.";

            public const string PasswordMinLength = "Password should be at least 5 symbols long.";

            public const string RequiredMinMaxLength = "The {0} must be at least {2} and at max {1} characters long.";
        }
    }
}
