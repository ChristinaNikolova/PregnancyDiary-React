namespace PregnancyDiary.Services.Data.Memories
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IMemoriesService
    {
        Task CreateAsync(DateTime date, string title, string content, string weekId);

        Task<IEnumerable<T>> GetAllCurrentWeekAsync<T>(string weekId);

        Task DeleteAsync(string id);
    }
}
