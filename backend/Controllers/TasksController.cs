using Microsoft.AspNetCore.Mvc;
using TaskManager.Models;

namespace TaskManager.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private static readonly List<TaskItem> _tasks = new List<TaskItem>();

    [HttpGet]
    public ActionResult<IEnumerable<TaskItem>> Get() => Ok(_tasks);

    [HttpPost]
    public ActionResult<TaskItem> Create(TaskItem newTask)
    {
        if (string.IsNullOrWhiteSpace(newTask.Description))
            return BadRequest("Description required");

        var task = new TaskItem
        {
            Id = Guid.NewGuid(),
            Description = newTask.Description,
            IsCompleted = newTask.IsCompleted
        };
        _tasks.Add(task);
        return CreatedAtAction(nameof(GetById), new { id = task.Id }, task);
    }

    [HttpGet("{id}")]
    public ActionResult<TaskItem> GetById(Guid id)
    {
        var t = _tasks.FirstOrDefault(x => x.Id == id);
        return t is null ? NotFound() : Ok(t);
    }

    [HttpPut("{id}")]
    public ActionResult<TaskItem> Update(Guid id, TaskItem update)
    {
        var t = _tasks.FirstOrDefault(x => x.Id == id);
        if (t is null) return NotFound();
        t.Description = update.Description;
        t.IsCompleted = update.IsCompleted;
        return Ok(t);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(Guid id)
    {
        var t = _tasks.FirstOrDefault(x => x.Id == id);
        if (t is null) return NotFound();
        _tasks.Remove(t);
        return NoContent();
    }
}
