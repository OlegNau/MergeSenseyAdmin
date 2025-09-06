using System;
using Volo.Abp.Security.Encryption;

namespace AICodeReview.EntityFrameworkCore.Design;

public sealed class NoopStringEncryptionService : IStringEncryptionService
{
    public string Encrypt(string? plainText, string? passPhrase = null, byte[]? salt = null) => plainText ?? string.Empty;
    public string Decrypt(string? cipherText, string? passPhrase = null, byte[]? salt = null) => cipherText ?? string.Empty;
    public byte[] Encrypt(byte[] plainBytes, string? passPhrase = null, byte[]? salt = null) => plainBytes ?? Array.Empty<byte>();
    public byte[] Decrypt(byte[] cipherBytes, string? passPhrase = null, byte[]? salt = null) => cipherBytes ?? Array.Empty<byte>();
}
