namespace PregnancyDiary.Web.Models.Admin.Categories.ViewModels
{
    using PregnancyDiary.Data.Models;
    using PregnancyDiary.Services.Mapping;

    public class CategoryAdminViewModel : IMapFrom<Category>
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string Picture { get; set; }

        public int ArticlesCount { get; set; }
    }
}
