namespace PregnancyDiary.WebApi.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using PregnancyDiary.Common;
    using PregnancyDiary.Services.Data.Memories;
    using PregnancyDiary.Web.Models.Common.ViewModels;
    using PregnancyDiary.Web.Models.Memories.InputModels;
    using PregnancyDiary.Web.Models.Memories.ViewModels;

    [Route("api/[controller]/[action]")]
    public class MemoriesController : ApiController
    {
        private readonly IMemoriesService memoriesService;

        public MemoriesController(IMemoriesService memoriesService)
        {
            this.memoriesService = memoriesService;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult> Create([FromBody] CreateMemoryInputModel input)
        {
            try
            {
                await this.memoriesService.CreateAsync(input.Date, input.Title, input.Content, input.WeekId);

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

        [HttpGet("{weekId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult<IEnumerable<MemoryViewModel>>> All(string weekId)
        {
            try
            {
                var comments = await this.memoriesService.GetAllCurrentWeekAsync<MemoryViewModel>(weekId);

                return this.Ok(comments);
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
