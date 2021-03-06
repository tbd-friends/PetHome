﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using PetHome.Persistence;

namespace PetHome.Persistence.Migrations
{
    [DbContext(typeof(ApplicationContext))]
    partial class ApplicationContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("PetHome.Persistence.Models.Animal", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Breed");

                    b.Property<string>("Circumstances");

                    b.Property<string>("Color");

                    b.Property<DateTime>("Entered");

                    b.Property<string>("Gender");

                    b.Property<string>("Notes");

                    b.Property<string>("Species");

                    b.Property<string>("Tag");

                    b.Property<bool>("VetRequired");

                    b.Property<long>("Weight");

                    b.HasKey("Id");

                    b.ToTable("Animals");
                });
#pragma warning restore 612, 618
        }
    }
}
