namespace PregnancyDiary.Data.Configurations
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;
    using PregnancyDiary.Data.Models;

    public class DiaryConfiguration : IEntityTypeConfiguration<Diary>
    {
        public void Configure(EntityTypeBuilder<Diary> diary)
        {
            diary
               .HasOne(d => d.Baby)
               .WithOne(b => b.Diary)
               .HasForeignKey<Diary>(d => d.BabyId);
        }
    }
}
