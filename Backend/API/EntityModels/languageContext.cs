using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace API.EntityModels
{
    public partial class languageContext : DbContext
    {
        public languageContext()
        {
        }

        public languageContext(DbContextOptions<languageContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Text> Text { get; set; }
        public virtual DbSet<Collection> Collection { get; set; }
        public virtual DbSet<CollectionText> CollectionText { get; set; }
        public virtual DbSet<Language> Language { get; set; }
        public virtual DbSet<LanguageText> LanguageText { get; set; }

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
            
            modelBuilder.Entity<Text>(entity =>
            {
                entity.ToTable("Text");

                entity.Property(e => e.id)
                .HasColumnName("ID");

                entity.Property(e => e.text)
                .IsRequired()
                .HasColumnName("Text")
                .HasMaxLength(500)
                .IsUnicode(false);
                
                entity.Property(e => e.comment)
                .HasColumnName("Comments")
                .HasMaxLength(500)
                .IsUnicode(false);

                entity.Property(e => e.createDate)
                .HasColumnName("CreateDate")
                .HasColumnType("datetime2");

                entity.Property(e => e.modifyDate)
                .HasColumnName("ModifyDate")
                .HasColumnType("datetime2");

            });



            
            modelBuilder.Entity<Collection>(entity =>
            {
                entity.ToTable("Collection");

                entity.Property(e => e.id)
                .HasColumnName("ID");

                entity.Property(e => e.name)
                .HasColumnName("Name")
                .HasMaxLength(50)
                .IsUnicode(false);

                entity.Property(e => e.description)
                .HasColumnName("Description")
                .HasMaxLength(500)
                .IsUnicode(false);

                entity.Property(e => e.createDate)
                .HasColumnName("Createdate")
                .HasColumnType("datetime2");

                entity.Property(e => e.modifyDate)
                .HasColumnName("Modifydate")
                .HasColumnType("datetime2");

            });


            modelBuilder.Entity<CollectionText>(entity =>
            {
                entity.ToTable("Collection_Text");

                entity.Property(e => e.id)
                .HasColumnName("ID");

                entity.Property(e => e.textId)
                .HasColumnName("TextID");

                entity.Property(e => e.CollectionID)
                .HasColumnName("CollectionID");

                entity.Property(e => e.createDate)
                .HasColumnName("Createdate")
                .HasColumnType("datetime2");

            });

            modelBuilder.Entity<Language>(entity =>
            {
                entity.ToTable("Language");

                entity.Property(e => e.Id)
                .HasColumnName("ID");

                entity.Property(e => e.LanguageShort)
                    .HasColumnName("LanguageShort")
                    .HasMaxLength(4)
                    .IsUnicode(false);

                entity.Property(e => e.LanguageValue)
                    .HasColumnName("Language")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CountryShort)
                    .HasColumnName("CountryShort")
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.Country)
                    .HasColumnName("Country")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.CreateDate)
                    .HasColumnName("Createdate")
                    .HasColumnType("datetime2");

                entity.Property(e => e.ModifyDate)
                    .HasColumnName("Modifydate")
                    .HasColumnType("datetime2");

            });
            
            
            modelBuilder.Entity<LanguageText>(entity =>
            {
                entity.ToTable("Language_Text");

                entity.Property(e => e.id)
                .HasColumnName("ID");

                entity.Property(e => e.languageId)
                .IsRequired()
                .HasColumnName("LanguageID");

                entity.Property(e => e.textId)
                .IsRequired()
                .HasColumnName("TextID");

                entity.Property(e => e.languageText)
                .HasColumnName("LanguageText")
                .HasMaxLength(500)
                .IsUnicode(false);

                entity.Property(e => e.createDate)
                .HasColumnName("Createdate")
                .HasColumnType("datetime2");

                entity.Property(e => e.modifyDate)
                .HasColumnName("Modifydate")
                .HasColumnType("datetime2");
            });
            
            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
