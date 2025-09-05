using System;
using Volo.Abp.Application.Dtos;

namespace AICodeReview.Nodes.Dtos;

public class NodeDto : EntityDto<Guid>
{
    public long TypeId { get; set; }
    public DateTime CreationTime { get; set; }
}

public class NodeCreateDto
{
    public long TypeId { get; set; }
}

public class PipelineNodeDto : EntityDto<Guid>
{
    public Guid PipelineId { get; set; }
    public Guid NodeId { get; set; }
    public int Order { get; set; }
}

public class PipelineNodeCreateDto
{
    public Guid PipelineId { get; set; }
    public Guid NodeId { get; set; }
    public int Order { get; set; }
}