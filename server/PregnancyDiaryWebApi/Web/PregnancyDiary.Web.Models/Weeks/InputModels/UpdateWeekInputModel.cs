namespace PregnancyDiary.Web.Models.Weeks.InputModels
{
    using System.ComponentModel.DataAnnotations;

    using PregnancyDiary.Data.Models;
    using PregnancyDiary.Services.Mapping;

    public class UpdateWeekInputModel : CreateWeekInputModel, IMapFrom<Week>
    {
        [Required]
        public string Id { get; set; }
    }
}
