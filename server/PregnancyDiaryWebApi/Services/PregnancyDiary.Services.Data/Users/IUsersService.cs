namespace PregnancyDiary.Services.Data.Users
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IUsersService
    {
        Task<IEnumerable<T>> GetFavouriteArticlesAsync<T>(string userId);
    }
}
