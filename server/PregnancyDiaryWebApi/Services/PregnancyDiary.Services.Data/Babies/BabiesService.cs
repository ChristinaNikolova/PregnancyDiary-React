namespace PregnancyDiary.Services.Data.Babies
{
    using System;
    using System.Linq;
    using System.Threading.Tasks;

    using Microsoft.EntityFrameworkCore;
    using PregnancyDiary.Data.Common.Repositories;
    using PregnancyDiary.Data.Models;
    using PregnancyDiary.Data.Models.Enums;
    using PregnancyDiary.Services.Data.Diaries;
    using PregnancyDiary.Services.Mapping;

    public class BabiesService : IBabiesService
    {
        private readonly IRepository<Baby> babiesRepository;
        private readonly IDiariesService diariesService;

        public BabiesService(
            IRepository<Baby> babiesRepository,
            IDiariesService diariesService)
        {
            this.babiesRepository = babiesRepository;
            this.diariesService = diariesService;
        }

        public async Task CreateAsync(string name, DateTime birthDate, string birthTime, string gender, double height, double weight, string picture, string diaryId)
        {
            var baby = new Baby()
            {
                Name = name,
                BirthDate = birthDate,
                BirthTime = birthTime,
                Gender = Enum.Parse<Gender>(gender),
                Height = height,
                Weight = weight,
                Picture = picture,
                DiaryId = diaryId,
            };

            await this.diariesService.ChangeBabyBornAsync(diaryId);

            await this.babiesRepository.AddAsync(baby);
            await this.babiesRepository.SaveChangesAsync();
        }

        public async Task DeleteAsync(string id)
        {
            var baby = await this.GetByIdAsync(id);

            baby.IsDeleted = true;

            var diaryId = baby.DiaryId;
            await this.diariesService.ChangeBabyBornAsync(diaryId);

            this.babiesRepository.Update(baby);
            await this.babiesRepository.SaveChangesAsync();
        }

        public async Task<T> GetDetailsAsync<T>(string diaryId)
        {
            var baby = await this.babiesRepository
                .All()
                .Where(b => b.DiaryId == diaryId)
                .To<T>()
                .FirstOrDefaultAsync();

            return baby;
        }

        public async Task UpdateAsync(string id, string name, DateTime birthDate, string birthTime, string gender, double height, double weight, string picture, string diaryId)
        {
            var baby = await this.GetByIdAsync(id);

            baby.Name = name;
            baby.BirthDate = birthDate;
            baby.BirthTime = birthTime;
            baby.Gender = Enum.Parse<Gender>(gender);
            baby.Height = height;
            baby.Weight = weight;
            baby.Picture = picture;

            this.babiesRepository.Update(baby);
            await this.babiesRepository.SaveChangesAsync();
        }

        private async Task<Baby> GetByIdAsync(string id)
        {
            return await this.babiesRepository
                .All()
                .FirstOrDefaultAsync(b => b.Id == id);
        }
    }
}
