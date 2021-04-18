namespace PregnancyDiary.Web.Models.Babies.InputModels
{
    using System;
    using System.ComponentModel.DataAnnotations;

    using PregnancyDiary.Common;

    public class CreateBabyInputModel
    {
        [Required]
        [StringLength(DataValidation.Baby.NameMaxLenght, ErrorMessage = Messages.Error.RequiredMinMaxLength, MinimumLength = DataValidation.Baby.NameMinLenght)]
        public string Name { get; set; }

        [Required]
        public string Gender { get; set; }

        public DateTime BirthDate { get; set; }

        [Required]
        public string BirthTime { get; set; }

        public double Height { get; set; }

        public double Weight { get; set; }

        [Required]
        public string Picture { get; set; }

        [Required]
        public string DiaryId { get; set; }
    }
}
