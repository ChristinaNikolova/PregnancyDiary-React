namespace PregnancyDiary.Services.Data.Categories
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface ICategoriesService
    {
        Task<IEnumerable<T>> GetArticlesCountByCategoriesAsync<T>();
    }
}
