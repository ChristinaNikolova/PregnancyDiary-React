namespace PregnancyDiary.Services.Data.Diaries
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IDiariesService
    {
        Task CreateAsync(DateTime positiveTest, DateTime dueDate, string gender, string userId);

        Task<IEnumerable<T>> GetDiariesAsync<T>(string userId);

        Task DeleteAsync(string id);

        Task<T> GetDetailsAsync<T>(string id);

        Task UpdateAsync(string id, DateTime positiveTest, DateTime dueDate, string gender);

        Task ChangeBabyBornAsync(string id);
    }
}
