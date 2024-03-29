﻿namespace PregnancyDiary.WebApi.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using PregnancyDiary.Common;
    using PregnancyDiary.Services.Data.Dtos.Memories;
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
        public async Task<ActionResult> Create([FromBody] AllMemoriesInputModel input)
        {
            try
            {
                var memories = input.Memories
                    .Select(m => new CreateMemoryDto()
                    {
                        Date = m.Date,
                        Title = m.Title,
                        Content = m.Content,
                    });

                await this.memoriesService.CreateAsync(memories, input.WeekId);

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

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult> Delete(string id)
        {
            try
            {
                await this.memoriesService.DeleteAsync(id);

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

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult<UpdateMemoryInputModel>> Update(string id)
        {
            try
            {
                var diary = await this.memoriesService.GetDetailsAsync<UpdateMemoryInputModel>(id);

                return this.Ok(diary);
            }
            catch (Exception)
            {
                return this.BadRequest(new BadRequestViewModel
                {
                    Message = Messages.Error.Unknown,
                });
            }
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult> Update(UpdateMemoryInputModel input)
        {
            try
            {
                await this.memoriesService.UpdateAsync(input.Id, input.Date, input.Title, input.Content, null);

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
    }
}
