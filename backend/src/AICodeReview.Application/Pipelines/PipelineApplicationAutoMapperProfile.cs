using AutoMapper;
using Volo.Abp.AutoMapper;
using AICodeReview.Pipelines;
using AICodeReview.Pipelines.Dtos;

namespace AICodeReview.Pipelines;

public class PipelineApplicationAutoMapperProfile : Profile
{
    public PipelineApplicationAutoMapperProfile()
    {
        CreateMap<Pipeline, PipelineDto>();

        // Не вызываем IgnoreExtraProperties() у источника, т.к. DTO не IHasExtraProperties
        CreateMap<CreateUpdatePipelineDto, Pipeline>()
            .IgnoreFullAuditedObjectProperties()
            .ForMember(x => x.Id,               opt => opt.Ignore())
            .ForMember(x => x.TenantId,         opt => opt.Ignore())
            .ForMember(x => x.ConcurrencyStamp, opt => opt.Ignore())
            .ForMember(x => x.Project,          opt => opt.Ignore())
            .ForMember(x => x.Status,           opt => opt.Ignore())
            .ForMember(x => x.StartedAt,        opt => opt.Ignore())
            .ForMember(x => x.FinishedAt,       opt => opt.Ignore())
            .ForMember(x => x.DurationSeconds,  opt => opt.Ignore());
    }
}
