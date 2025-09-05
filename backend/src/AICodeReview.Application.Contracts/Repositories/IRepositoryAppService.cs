using System;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace AICodeReview.Repositories.Dtos;

public interface IRepositoryAppService : ICrudAppService<RepositoryDto, Guid, RepositoryGetListInput, RepositoryCreateDto, RepositoryUpdateDto>
{
}
