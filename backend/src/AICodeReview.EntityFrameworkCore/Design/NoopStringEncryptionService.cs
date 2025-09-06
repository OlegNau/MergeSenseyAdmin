using Volo.Abp.Security.Encryption;

namespace AICodeReview.EntityFrameworkCore.Design;

/// <summary>
/// No-op реализация для EF-миграций (чтобы не требовать реальный IStringEncryptionService).
/// </summary>
public sealed class NoopStringEncryptionService : IStringEncryptionService
{
    public string? Encrypt(string? plainText, string? passPhrase = null, byte[]? salt = null)
        => plainText;

    public string? Decrypt(string? cipherText, string? passPhrase = null, byte[]? salt = null)
        => cipherText;
}