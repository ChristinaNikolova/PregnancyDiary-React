namespace PregnancyDiary.WebApi.Areas.Admin.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using PregnancyDiary.Common;
    using PregnancyDiary.Services.Data.Categories;
    using PregnancyDiary.Web.Models.Admin.Categories.InputModels;
    using PregnancyDiary.Web.Models.Admin.Categories.ViewModels;
    using PregnancyDiary.Web.Models.Common.ViewModels;
    using PregnancyDiary.WebApi.Controllers;

    [Route("api/admin/[controller]/[action]")]
    public class CategoriesController : ApiController
    {
        private readonly ICategoriesService categoriesService;

        public CategoriesController(ICategoriesService categoriesService)
        {
            this.categoriesService = categoriesService;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult> Create([FromBody] CategoryInputModel input)
        {
            if (this.User.Identity.Name == GlobalConstants.Roles.Admin)
            {
                var isCategoryAlreadyExisting = await this.categoriesService.IsCategoryAlreadyExistingAsync(input.Name);

                if (isCategoryAlreadyExisting)
                {
                    return this.BadRequest(new BadRequestViewModel
                    {
                        Message = Messages.Error.AlreadyExistsCategory,
                    });
                }

                try
                {
                    await this.categoriesService.CreateAsync(input.Name, input.Picture);

                    return this.Ok(new
                    {
                        Message = Messages.Success.Added,
                    });
                }
                catch (Exception)
                {
                    return this.BadRequest(new BadRequestViewModel
                    {
                        Message = Messages.Error.Unknown,
                    });
                }
            }

            return this.Unauthorized();
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult<IEnumerable<CategoryAdminViewModel>>> All()
        {
            if (this.User.Identity.Name == GlobalConstants.Roles.Admin)
            {
                try
                {
                    var categories = await this.categoriesService.GetAllForAdminAsync<CategoryAdminViewModel>();

                    return this.Ok(categories);
                }
                catch (Exception ex)
                {
                    return this.BadRequest(new BadRequestViewModel
                    {
                        Message = ex.Message,
                    });
                }
            }

            return this.Unauthorized();
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult> Delete(string id)
        {
            if (this.User.Identity.Name == GlobalConstants.Roles.Admin)
            {
                try
                {
                    await this.categoriesService.DeleteAsync(id);

                    return this.Ok(new
                    {
                        Message = Messages.Success.Deleted,
                    });
                }
                catch (Exception)
                {
                    return this.BadRequest(new BadRequestViewModel
                    {
                        Message = Messages.Error.Unknown,
                    });
                }
            }

            return this.Unauthorized();
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult<CategoryUpdateInputModel>> CategoryForUpdate(string id)
        {
            if (this.User.Identity.Name == GlobalConstants.Roles.Admin)
            {
                try
                {
                    var category = await this.categoriesService.GetDetailsAsync<CategoryUpdateInputModel>(id);

                    return this.Ok(category);
                }
                catch (Exception)
                {
                    return this.BadRequest(new BadRequestViewModel
                    {
                        Message = Messages.Error.Unknown,
                    });
                }
            }

            return this.Unauthorized();
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult> Update(CategoryUpdateInputModel input)
        {
            if (this.User.Identity.Name == GlobalConstants.Roles.Admin)
            {
                try
                {
                    await this.categoriesService.UpdateAsync(input.Id, input.Name, input.Picture);

                    return this.Ok(new
                    {
                        Message = Messages.Success.Updated,
                    });
                }
                catch (Exception)
                {
                    return this.BadRequest(new BadRequestViewModel
                    {
                        Message = Messages.Error.Unknown,
                    });
                }
            }

            return this.Unauthorized();
        }
    }
}
