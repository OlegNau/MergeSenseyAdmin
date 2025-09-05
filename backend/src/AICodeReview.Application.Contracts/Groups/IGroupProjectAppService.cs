using System;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace AICodeReview.Groups.Dtos;

public interface IGroupProjectAppService : ICrudAppService<GroupProjectDto, Guid, GroupProjectGetListInput, GroupProjectCreateDto, GroupProjectUpdateDto>
{
}
