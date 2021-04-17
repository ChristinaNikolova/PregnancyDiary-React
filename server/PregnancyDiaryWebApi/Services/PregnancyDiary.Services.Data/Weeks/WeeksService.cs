namespace PregnancyDiary.Services.Data.Weeks
{
    using System;
    using System.Threading.Tasks;

    using Microsoft.EntityFrameworkCore;
    using PregnancyDiary.Data.Common.Repositories;
    using PregnancyDiary.Data.Models;
    using PregnancyDiary.Data.Models.Enums;

    public class WeeksService : IWeeksService
    {
        private readonly IRepository<Week> weeksRepository;

        public WeeksService(IRepository<Week> weeksRepository)
        {
            this.weeksRepository = weeksRepository;
        }

        public async Task CreateAsync(byte number, double weight, double bellySize, string mood, double babyHeight, double babyWeight, string diaryId)
        {
            var week = new Week()
            {
                Number = number,
                MyWeight = weight,
                MyBellySize = bellySize,
                Mood = Enum.Parse<Mood>(mood),
                BabyHeight = babyHeight,
                BabyWeight = babyWeight,
                DiaryId = diaryId,
            };

            await this.weeksRepository.AddAsync(week);
            await this.weeksRepository.SaveChangesAsync();
        }

        public async Task<bool> IsWeekNumberAlreadyExistingAsync(byte number, string diaryId)
        {
            var isAlreadyExisting = await this.weeksRepository
                .All()
                .AnyAsync(w => w.DiaryId == diaryId && w.Number == number);

            return isAlreadyExisting;
        }
    }
}
