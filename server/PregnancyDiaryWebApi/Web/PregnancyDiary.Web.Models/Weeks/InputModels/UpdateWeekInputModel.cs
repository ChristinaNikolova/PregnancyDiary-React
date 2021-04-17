namespace PregnancyDiary.Web.Models.Weeks.InputModels
{
    using PregnancyDiary.Data.Models;
    using PregnancyDiary.Services.Mapping;

    public class UpdateWeekInputModel : CreateWeekInputModel, IMapFrom<Week>
    {
        public string Id { get; set; }
    }
}
