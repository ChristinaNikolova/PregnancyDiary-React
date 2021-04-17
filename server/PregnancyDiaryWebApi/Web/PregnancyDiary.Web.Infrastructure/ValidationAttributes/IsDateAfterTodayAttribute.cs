namespace PregnancyDiary.Web.Infrastructure.ValidationAttributes
{
    using System;
    using System.ComponentModel.DataAnnotations;

    public class IsDateAfterTodayAttribute : ValidationAttribute
    {
        private readonly DateTime currentDate;

        public IsDateAfterTodayAttribute()
        {
            this.currentDate = DateTime.UtcNow.AddDays(+1);
            this.ErrorMessage = $"Date must be before {this.currentDate:dd/MM/yyyy}!";
        }

        public override bool IsValid(object value)
        {
            bool isDateValid = true;

            if (value is DateTime dateInput)
            {
                if (dateInput < this.currentDate)
                {
                    return isDateValid;
                }
            }

            return !isDateValid;
        }
    }
}
