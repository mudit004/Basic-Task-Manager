using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<TaskService>();

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000", "http://localhost:5173")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowReactApp");
app.UseAuthorization();
app.MapControllers();

app.Run();

// TaskItem Model
public class TaskItem
{
    public Guid Id { get; set; }
    public string Description { get; set; } = string.Empty;
    public bool IsCompleted { get; set; }
}

// TaskService for in-memory storage
public class TaskService
{
    private readonly List<TaskItem> _tasks = new();
    private readonly object _lock = new();

    public TaskService()
    {
        // Add some initial tasks
        _tasks.Add(new TaskItem { Id = Guid.NewGuid(), Description = "Complete the assignment", IsCompleted = false });
        _tasks.Add(new TaskItem { Id = Guid.NewGuid(), Description = "Review the code", IsCompleted = true });
    }

    public List<TaskItem> GetAll()
    {
        lock (_lock)
        {
            return _tasks.ToList();
        }
    }

    public TaskItem? GetById(Guid id)
    {
        lock (_lock)
        {
            return _tasks.FirstOrDefault(t => t.Id == id);
        }
    }

    public TaskItem Create(TaskItem task)
    {
        lock (_lock)
        {
            task.Id = Guid.NewGuid();
            _tasks.Add(task);
            return task;
        }
    }

    public TaskItem? Update(Guid id, TaskItem updatedTask)
    {
        lock (_lock)
        {
            var task = _tasks.FirstOrDefault(t => t.Id == id);
            if (task == null) return null;

            task.Description = updatedTask.Description;
            task.IsCompleted = updatedTask.IsCompleted;
            return task;
        }
    }

    public bool Delete(Guid id)
    {
        lock (_lock)
        {
            var task = _tasks.FirstOrDefault(t => t.Id == id);
            if (task == null) return false;

            _tasks.Remove(task);
            return true;
        }
    }
}

// TasksController
[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private readonly TaskService _taskService;

    public TasksController(TaskService taskService)
    {
        _taskService = taskService;
    }

    [HttpGet]
    public ActionResult<List<TaskItem>> GetTasks()
    {
        return Ok(_taskService.GetAll());
    }

    [HttpGet("{id}")]
    public ActionResult<TaskItem> GetTask(Guid id)
    {
        var task = _taskService.GetById(id);
        if (task == null)
            return NotFound();

        return Ok(task);
    }

    [HttpPost]
    public ActionResult<TaskItem> CreateTask([FromBody] TaskItem task)
    {
        if (string.IsNullOrWhiteSpace(task.Description))
            return BadRequest("Description is required");

        var createdTask = _taskService.Create(task);
        return CreatedAtAction(nameof(GetTask), new { id = createdTask.Id }, createdTask);
    }

    [HttpPut("{id}")]
    public ActionResult<TaskItem> UpdateTask(Guid id, [FromBody] TaskItem task)
    {
        if (string.IsNullOrWhiteSpace(task.Description))
            return BadRequest("Description is required");

        var updatedTask = _taskService.Update(id, task);
        if (updatedTask == null)
            return NotFound();

        return Ok(updatedTask);
    }

    [HttpDelete("{id}")]
    public ActionResult DeleteTask(Guid id)
    {
        var result = _taskService.Delete(id);
        if (!result)
            return NotFound();

        return NoContent();
    }
}
