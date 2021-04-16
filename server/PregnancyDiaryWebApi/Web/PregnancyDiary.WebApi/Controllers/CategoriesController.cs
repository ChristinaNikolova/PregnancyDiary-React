namespace PregnancyDiary.WebApi.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using PregnancyDiary.Common;
    using PregnancyDiary.Services.Data.Categories;
    using PregnancyDiary.Web.Models.Articles.ViewModels;
    using PregnancyDiary.Web.Models.Categories.ViewModels;
    using PregnancyDiary.Web.Models.Common.ViewModels;

    [Route("api/[controller]/[action]")]
    public class CategoriesController : ApiController
    {
        private readonly ICategoriesService categoriesService;

        public CategoriesController(ICategoriesService categoriesService)
        {
            this.categoriesService = categoriesService;
        }

        [HttpGet]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult<IEnumerable<ArticleCategoryViewModel>>> GetArticlesCountByCategories()
        {
            try
            {
                var categories = await this.categoriesService.GetArticlesCountByCategoriesAsync<ArticleCategoryViewModel>();

                return this.Ok(categories);
            }
            catch (Exception)
            {
                return this.BadRequest(new BadRequestViewModel
                {
                    Message = Messages.Error.Unknown,
                });
            }
        }

        [HttpGet("{categoryId}")]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesDefaultResponseType]
        public async Task<IActionResult> GetNameById(string categoryId)
        {
            try
            {
                var name = await this.categoriesService.GetNameByIdAsync(categoryId);

                return this.Ok(name);
            }
            catch (Exception)
            {
                return this.BadRequest(new BadRequestViewModel
                {
                    Message = Messages.Error.Unknown,
                });
            }
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult<IEnumerable<CategoryNameViewModel>>> AllNames()
        {
            try
            {
                var categories = await this.categoriesService.GetAllNamesAsync<CategoryNameViewModel>();

                return this.Ok(categories);
            }
            catch (Exception)
            {
                return this.BadRequest(new BadRequestViewModel
                {
                    Message = Messages.Error.Unknown,
                });
            }
        }
    }
}
