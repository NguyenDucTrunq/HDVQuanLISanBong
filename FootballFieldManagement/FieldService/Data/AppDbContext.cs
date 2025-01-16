using Microsoft.EntityFrameworkCore;
using FieldService.Models;
using System.Collections.Generic;

namespace FieldService.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Field> Fields { get; set; }
    }
}
