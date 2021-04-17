namespace PregnancyDiary.Services.Data.Memories
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Microsoft.EntityFrameworkCore;
    using PregnancyDiary.Data.Common.Repositories;
    using PregnancyDiary.Data.Models;
    using PregnancyDiary.Services.Mapping;

    public class MemoriesService : IMemoriesService
    {
        private readonly IRepository<Moment> momentsRepository;

        public MemoriesService(IRepository<Moment> momentsRepository)
        {
            this.momentsRepository = momentsRepository;
        }

        public async Task CreateAsync(DateTime date, string title, string content, string weekId)
        {
            var moment = new Moment()
            {
                Date = date,
                Title = title,
                Content = content,
                WeekId = weekId,
            };

            await this.momentsRepository.AddAsync(moment);
            await this.momentsRepository.SaveChangesAsync();
        }

        public async Task DeleteAsync(string id)
        {
            var memory = await this.momentsRepository
                .All()
                .FirstOrDefaultAsync(m => m.Id == id);

            memory.IsDeleted = true;

            this.momentsRepository.Update(memory);
            await this.momentsRepository.SaveChangesAsync();
        }

        public async Task<IEnumerable<T>> GetAllCurrentWeekAsync<T>(string weekId)
        {
            var memories = await this.momentsRepository
                .All()
                .Where(m => m.WeekId == weekId)
                .OrderBy(m => m.Date)
                .ThenBy(m => m.Title)
                .To<T>()
                .ToListAsync();

            return memories;
        }
    }
}
