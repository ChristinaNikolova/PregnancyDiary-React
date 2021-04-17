namespace PregnancyDiary.Web.Models.Diaries.InputModels
{
    using System;
    using System.ComponentModel.DataAnnotations;

    using PregnancyDiary.Web.Infrastructure.ValidationAttributes;

    public class CreateDiaryInputModel
    {
        [IsDateAfterTodayAttribute]
        public DateTime PositiveTest { get; set; }

        [IsDateBeforeTodayAttribute]
        public DateTime DueDate { get; set; }

        [Required]
        public string Gender { get; set; }
    }
}
