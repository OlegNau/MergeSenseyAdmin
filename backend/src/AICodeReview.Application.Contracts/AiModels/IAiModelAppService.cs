using System;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace AICodeReview.AiModels.Dtos;

public interface IAiModelAppService : ICrudAppService<AiModelDto, Guid, AiModelGetListInput, AiModelCreateDto, AiModelUpdateDto>
{
}
