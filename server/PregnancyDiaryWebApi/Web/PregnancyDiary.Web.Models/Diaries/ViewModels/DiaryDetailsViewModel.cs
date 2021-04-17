namespace PregnancyDiary.Web.Models.Diaries.ViewModels
{
    using PregnancyDiary.Data.Models;
    using PregnancyDiary.Services.Mapping;

    public class DiaryDetailsViewModel : DiaryBaseViewModel, IMapFrom<Diary>
    {
        public bool IsBabyBorn { get; set; }
    }
}
