namespace PregnancyDiary.WebApi.Controllers
{
    using System;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using PregnancyDiary.Common;
    using PregnancyDiary.Data.Models;
    using PregnancyDiary.Services.Data.Diaries;
    using PregnancyDiary.Web.Models.Common.ViewModels;
    using PregnancyDiary.Web.Models.Diaries.InputModels;

    [Route("api/[controller]/[action]")]
    public class DiariesController : ApiController
    {
        private readonly IDiariesService diariesService;
        private readonly UserManager<ApplicationUser> userManager;

        public DiariesController(
            IDiariesService diariesService,
            UserManager<ApplicationUser> userManager)
        {
            this.diariesService = diariesService;
            this.userManager = userManager;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult> Create([FromBody] DiaryInputModel input)
        {
            try
            {
                var user = await this.userManager.FindByNameAsync(this.User.Identity.Name);

                await this.diariesService.CreateAsync(input.PositiveTest, input.DueDate, input.Gender, user.Id);

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
    }
}
