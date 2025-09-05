# MergeSensey Admin

## Команды

```
npm ci
npm start
npm run build
```

## Админка/прокси

1. Запустите Host и откройте Swagger.
2. Сгенерируйте Angular proxies:

```
abp generate-proxy -t ng --with-typescript --url https://localhost:44300/swagger/v1/swagger.json --output src/app/proxy
```

## Backend

```
dotnet build .\backend\AICodeReview.sln
dotnet run --project .\backend\src\AICodeReview.DbMigrator\AICodeReview.DbMigrator.csproj
dotnet run --project .\backend\src\AICodeReview.HttpApi.Host\AICodeReview.HttpApi.Host.csproj
```

## Быстрые проверки

```
GET https://localhost:44300/api/app/projects?SkipCount=0&MaxResultCount=20&Sorting=Name
GET https://localhost:44300/api/app/projects/{id}
GET https://localhost:44300/api/app/projects/{id}/pipelines
GET https://localhost:44300/api/app/pipelines/all?SkipCount=0&MaxResultCount=20&Sorting=StartedAt%20desc
POST https://localhost:44300/api/app/pipelines
# body = PipelineCreateDto
GET https://localhost:44300/api/app/pipelines/{pipelineId}/nodes
POST https://localhost:44300/api/app/pipelines/{pipelineId}/nodes/reorder
```
