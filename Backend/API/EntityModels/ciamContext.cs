using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace API.EntityModels
{
    public partial class ciamContext : DbContext
    {
        public ciamContext()
        {
        }

        public ciamContext(DbContextOptions<ciamContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Users> Users { get; set; }
        public virtual DbSet<SocialUsers> SocialUsers { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=127.0.0.1,1433;Database=ciam;User ID=sa;Password=Password!;Trusted_Connection=True;Integrated Security=False");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Users>(entity =>
            {
                entity.ToTable("users");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("email")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnName("password")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.First_name)
                    .IsRequired()
                    .HasColumnName("first_name")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Last_name)
                    .IsRequired()
                    .HasColumnName("last_name")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                 entity.Property(e => e.Token)
                    .IsRequired()
                    .HasColumnName("Token")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Language)
                    .HasColumnName("language")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                 entity.Property(e => e.Created_at)
                    .IsRequired()
                    .HasColumnName("created_at")
                    .HasColumnType("datetime2");

                  entity.Property(e => e.Verified)
                    .IsRequired()
                    .HasColumnName("verified");

                 entity.Property(e => e.Resended_mail)
                    .IsRequired()
                    .HasColumnName("resended_mail");
            });

            modelBuilder.Entity<SocialUsers>(entity =>
            {
                entity.ToTable("social_users");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("email")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.First_name)
                    .IsRequired()
                    .HasColumnName("first_name")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Last_name)
                    .IsRequired()
                    .HasColumnName("last_name")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                 entity.Property(e => e.Language)
                    .HasColumnName("language")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Created_at)
                    .IsRequired()
                    .HasColumnName("created_at")
                    .HasColumnType("datetime2");
                
                entity.Property(e => e.Social_platform)
                    .IsRequired()
                    .HasColumnName("social_platform")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Social_id)
                    .IsRequired()
                    .HasColumnName("social_id")
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
