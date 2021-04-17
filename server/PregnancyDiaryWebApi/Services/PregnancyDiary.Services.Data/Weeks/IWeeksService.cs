namespace PregnancyDiary.Services.Data.Weeks
{
    using System.Threading.Tasks;

    public interface IWeeksService
    {
        Task CreateAsync(byte number, double weight, double bellySize, string mood, double babyHeight, double babyWeight, string diaryId);

        Task<bool> IsWeekNumberAlreadyExistingAsync(byte number, string diaryId);
    }
}
