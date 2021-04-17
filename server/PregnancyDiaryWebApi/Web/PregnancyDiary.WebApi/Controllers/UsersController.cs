namespace PregnancyDiary.WebApi.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using PregnancyDiary.Common;
    using PregnancyDiary.Data.Models;
    using PregnancyDiary.Services.Data.Diaries;
    using PregnancyDiary.Services.Data.Users;
    using PregnancyDiary.Web.Models.Common.ViewModels;
    using PregnancyDiary.Web.Models.Users.ViewModels;

    [Route("api/[controller]/[action]")]
    public class UsersController : ApiController
    {
        private readonly IUsersService usersService;
        private readonly IDiariesService diariesService;
        private readonly UserManager<ApplicationUser> userManager;

        public UsersController(
            IUsersService usersService,
            IDiariesService diariesService,
            UserManager<ApplicationUser> userManager)
        {
            this.usersService = usersService;
            this.diariesService = diariesService;
            this.userManager = userManager;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult<IEnumerable<UserFavouriteArticlesViewModel>>> Favourite()
        {
            try
            {
                var user = await this.userManager.FindByNameAsync(this.User.Identity.Name);

                var articles = await this.usersService.GetFavouriteArticlesAsync<UserFavouriteArticlesViewModel>(user.Id);

                return this.Ok(articles);
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
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult<IEnumerable<UserDiariesViewModel>>> Diaries()
        {
            try
            {
                var user = await this.userManager.FindByNameAsync(this.User.Identity.Name);

                var diaries = await this.diariesService.GetDiariesAsync<UserDiariesViewModel>(user.Id);

                return this.Ok(diaries);
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
