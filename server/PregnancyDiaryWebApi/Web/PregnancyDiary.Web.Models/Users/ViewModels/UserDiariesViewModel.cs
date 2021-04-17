namespace PregnancyDiary.Web.Models.Users.ViewModels
{
    using PregnancyDiary.Data.Models;
    using PregnancyDiary.Services.Mapping;
    using PregnancyDiary.Web.Models.Diaries.ViewModels;

    public class UserDiariesViewModel : DiaryBaseViewModel, IMapFrom<Diary>
    {
        public string Id { get; set; }

        public int WeeksCount { get; set; }
    }
}
