using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Reflection.Emit;
using VideoAppTests.Models;

namespace VideoAppTests.Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Video> Videos { get; set; }
        public DbSet<Category> Categories { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Video>().ToTable("Videos");
            modelBuilder.Entity<Category>().ToTable("Categories");

            // Ensure Category.Name is unique
            modelBuilder.Entity<Category>()
                .HasIndex(c => c.Name)
                .IsUnique();

            // Additional configurations can go here
        }
    }

}
