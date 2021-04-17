namespace PregnancyDiary.Web.Models.Diaries.InputModels
{
    using System;
    using System.ComponentModel.DataAnnotations;

    public class DiaryInputModel
    {
        //validate date
        public DateTime PositiveTest { get; set; }

        public DateTime DueDate { get; set; }

        [Required]
        public string Gender { get; set; }
    }
}
