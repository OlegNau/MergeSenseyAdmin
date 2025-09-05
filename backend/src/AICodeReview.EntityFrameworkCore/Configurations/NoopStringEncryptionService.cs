namespace AICodeReview.EntityFrameworkCore.Configurations;

using Volo.Abp.Security.Encryption;

internal sealed class NoopStringEncryptionService : IStringEncryptionService
{
    public string? Encrypt(string? plainText) => plainText;
    public string? Decrypt(string? cipherText) => cipherText;
    public string? Encrypt(string? plainText, string? passPhrase, byte[]? salt = null) => plainText;
    public string? Decrypt(string? cipherText, string? passPhrase, byte[]? salt = null) => cipherText;
}
