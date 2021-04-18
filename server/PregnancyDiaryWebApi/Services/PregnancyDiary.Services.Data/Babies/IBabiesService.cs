namespace PregnancyDiary.Services.Data.Babies
{
    using System;
    using System.Threading.Tasks;

    public interface IBabiesService
    {
        Task CreateAsync(string name, DateTime birthDate, string birthTime, string gender, double height, double weight, string picture, string diaryId);

        Task<T> GetDetailsAsync<T>(string diaryId);
    }
}
