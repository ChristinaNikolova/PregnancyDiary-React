namespace PregnancyDiary.Services.Data.Weeks
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IWeeksService
    {
        Task CreateAsync(byte number, double weight, double bellySize, string mood, double babyHeight, double babyWeight, string diaryId);

        Task<bool> IsWeekNumberAlreadyExistingAsync(byte number, string diaryId);

        Task<IEnumerable<T>> GetAllCurrentDiaryAsync<T>(string diaryId);

        Task DeleteAsync(string id);

        Task<T> GetDetailsAsync<T>(string id);

        Task<string> GetIdByNumberAsync(byte number, string diaryId);

        Task UpdateAsync(string id, byte number, double weight, double bellySize, string mood, double babyHeight, double babyWeight, string diaryId);
    }
}
