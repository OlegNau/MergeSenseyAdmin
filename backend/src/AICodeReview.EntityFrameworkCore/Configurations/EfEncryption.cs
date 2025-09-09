namespace AICodeReview.EntityFrameworkCore.Configurations;

using System;
using Volo.Abp.Security.Encryption;

internal static class EfEncryption
{
    
    public static IStringEncryptionService? Service { get; set; }

    public static string? Encrypt(string? plain)
        => plain == null ? null : (Service?.Encrypt(plain) ?? plain);

    public static string? Decrypt(string? cipher)
        => cipher == null ? null : (Service?.Decrypt(cipher) ?? cipher);
}
