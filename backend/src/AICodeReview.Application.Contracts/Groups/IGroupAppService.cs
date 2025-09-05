using System;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace AICodeReview.Groups.Dtos;

public interface IGroupAppService : ICrudAppService<GroupDto, Guid, PagedAndSortedResultRequestDto, GroupCreateDto, GroupUpdateDto>
{
}
