namespace AICodeReview;

using System;
using Volo.Abp.Data;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.MultiTenancy;

public abstract class CiCdAggregateRoot<T>
    : FullAuditedAggregateRoot<T>, IMultiTenant, IHasExtraProperties, IHasConcurrencyStamp
{
    public virtual Guid? TenantId { get; set; }
}

public abstract class CiCdAggregateRoot : CiCdAggregateRoot<Guid> { }
