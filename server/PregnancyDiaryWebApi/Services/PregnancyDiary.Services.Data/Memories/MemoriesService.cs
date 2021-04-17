namespace PregnancyDiary.Services.Data.Memories
{
    using System;
    using System.Threading.Tasks;

    using PregnancyDiary.Data.Common.Repositories;
    using PregnancyDiary.Data.Models;

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
    }
}
