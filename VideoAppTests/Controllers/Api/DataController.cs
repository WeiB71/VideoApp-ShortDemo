using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VideoAppTests.Models;
using VideoAppTests.Services;

namespace VideoAppTests.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataController : ControllerBase
    {
        private readonly VideoService _videoService;
        private readonly CategoryService _categoryService;
        private readonly IWebHostEnvironment _env;

        public DataController(VideoService videoService, CategoryService categoryService, IWebHostEnvironment env)
        {
            _videoService = videoService;
            _categoryService = categoryService;
            _env = env;
        }

        [HttpGet("videos")]
        public async Task<ActionResult<List<Video>>> GetVideos()
        {
            var videos = await _videoService.GetAllVideosAsync();
            return Ok(videos);
        }

        [HttpGet("videos/{id}")]
        public async Task<ActionResult<Video>> GetVideo(int id)
        {
            var video = await _videoService.GetVideoByIdAsync(id);
            if (video == null)
            {
                return NotFound();
            }
            return Ok(video);
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadVideo([FromForm] IFormFile file, [FromForm] string title, [FromForm] string description, [FromForm] int categoryId)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            var allowedExtensions = new[] { ".mp4", ".avi", ".mov" };
            var extension = Path.GetExtension(file.FileName).ToLower();

            if (!allowedExtensions.Contains(extension))
            {
                return BadRequest("Unsupported file type.");
            }

            if (file.Length > 100 * 1024 * 1024)
            {
                return BadRequest("File size exceeds 100MB.");
            }

            var fileName = Path.GetRandomFileName() + extension;
            var filePath = Path.Combine(_env.WebRootPath, "uploads", fileName);

            Directory.CreateDirectory(Path.Combine(_env.WebRootPath, "uploads"));

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var categoryData = await _categoryService.GetCategoryByIdAsync(categoryId);

            var video = new Video
            {
                Title = title,
                Description = description,
                Category = categoryData,
                FilePath = filePath,
                ThumbnailPath = GenerateThumbnail(filePath) // Assume you have a method to generate thumbnail
            };

            await _videoService.AddVideoAsync(video);

            return Ok(new { id = video.Id });
        }

        private string GenerateThumbnail(string videoPath)
        {
            // Implement thumbnail generation logic here using a library like FFmpeg
            // For now, let's just return a placeholder path
            return Path.Combine("uploads", "thumbnails", Path.GetFileNameWithoutExtension(videoPath) + ".jpg");
        }
    }
}
