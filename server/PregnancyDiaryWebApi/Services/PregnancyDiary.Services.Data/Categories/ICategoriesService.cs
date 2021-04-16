namespace PregnancyDiary.Services.Data.Categories
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface ICategoriesService
    {
        Task<IEnumerable<T>> GetArticlesCountByCategoriesAsync<T>();

        Task<string> GetNameByIdAsync(string categoryId);

        Task<IEnumerable<T>> GetAllForAdminAsync<T>();

        Task DeleteAsync(string id);

        Task<T> GetDetailsAsync<T>(string id);

        Task UpdateAsync(string id, string name, string picture);

        Task<bool> IsCategoryAlreadyExistingAsync(string name);

        Task CreateAsync(string name, string picture);

        Task<IEnumerable<T>> GetAllNamesAsync<T>();
    }
}
