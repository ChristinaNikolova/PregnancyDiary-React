namespace PregnancyDiary.Services.Data.Memories
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Microsoft.EntityFrameworkCore;
    using PregnancyDiary.Data.Common.Repositories;
    using PregnancyDiary.Data.Models;
    using PregnancyDiary.Services.Data.Dtos.Memories;
    using PregnancyDiary.Services.Mapping;

    public class MemoriesService : IMemoriesService
    {
        private readonly IRepository<Moment> momentsRepository;

        public MemoriesService(IRepository<Moment> momentsRepository)
        {
            this.momentsRepository = momentsRepository;
        }

        public async Task CreateAsync(IEnumerable<CreateMemoryDto> memories, string weekId)
        {
            foreach (var current in memories)
            {
                var moment = new Moment()
                {
                    Date = current.Date,
                    Title = current.Title,
                    Content = current.Content,
                    WeekId = weekId,
                };

                await this.momentsRepository.AddAsync(moment);
            }

            await this.momentsRepository.SaveChangesAsync();
        }

        public async Task UpdateAsync(string id, DateTime date, string title, string content, string weekId)
        {
            var memory = await this.GetByIdAsync(id);

            memory.Date = date;
            memory.Title = title;
            memory.Content = content;

            this.momentsRepository.Update(memory);
            await this.momentsRepository.SaveChangesAsync();
        }

        public async Task DeleteAsync(string id)
        {
            var memory = await this.GetByIdAsync(id);

            memory.IsDeleted = true;

            this.momentsRepository.Update(memory);
            await this.momentsRepository.SaveChangesAsync();
        }

        public async Task<T> GetDetailsAsync<T>(string id)
        {
            var memory = await this.momentsRepository
                .All()
                .Where(m => m.Id == id)
                .To<T>()
                .FirstOrDefaultAsync();

            return memory;
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

        private async Task<Moment> GetByIdAsync(string id)
        {
            return await this.momentsRepository
                .All()
                .FirstOrDefaultAsync(m => m.Id == id);
        }
    }
}
