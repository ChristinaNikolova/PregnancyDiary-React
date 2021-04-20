namespace PregnancyDiary.Services.Data.Memories
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using PregnancyDiary.Services.Data.Dtos.Memories;

    public interface IMemoriesService
    {
        Task CreateAsync(IEnumerable<CreateMemoryDto> memories, string weekId);

        Task<IEnumerable<T>> GetAllCurrentWeekAsync<T>(string weekId);

        Task DeleteAsync(string id);

        Task<T> GetDetailsAsync<T>(string id);

        Task UpdateAsync(string id, DateTime date, string title, string content, string weekId);
    }
}
