namespace VideoAppTests.Models;

public class Video {
    public int Id { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public Category? Category { get; set; }
    public string? FilePath { get; set; }
    public string? ThumbnailPath { get; set; }
}
