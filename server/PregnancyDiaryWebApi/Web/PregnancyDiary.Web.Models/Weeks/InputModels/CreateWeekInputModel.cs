namespace PregnancyDiary.Web.Models.Weeks.InputModels
{
    using System;
    using System.ComponentModel.DataAnnotations;

    using PregnancyDiary.Common;

    public class CreateWeekInputModel
    {
        [Range(typeof(byte), DataValidation.Week.MinNumber, DataValidation.Week.MaxNumber)]
        public byte Number { get; set; }

        [Required]
        public string Mood { get; set; }

        public double MyWeight { get; set; }

        public double MyBellySize { get; set; }

        public double BabyWeight { get; set; }

        public double BabyHeight { get; set; }

        [Required]
        public string DiaryId { get; set; }
    }
}
