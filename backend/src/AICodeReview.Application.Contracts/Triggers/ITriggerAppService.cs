using System;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace AICodeReview.Triggers.Dtos;

public interface ITriggerAppService : ICrudAppService<TriggerDto, Guid, TriggerGetListInput, TriggerCreateDto, TriggerUpdateDto>
{
}
