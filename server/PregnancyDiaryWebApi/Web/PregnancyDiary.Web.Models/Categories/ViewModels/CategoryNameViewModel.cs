namespace PregnancyDiary.Web.Models.Categories.ViewModels
{
    using PregnancyDiary.Data.Models;
    using PregnancyDiary.Services.Mapping;

    public class CategoryNameViewModel : IMapFrom<Category>
    {
        public string Id { get; set; }

        public string Name { get; set; }
    }
}
