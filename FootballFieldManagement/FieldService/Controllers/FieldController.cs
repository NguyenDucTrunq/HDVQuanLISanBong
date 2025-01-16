    using FieldService.Data;
    using FieldService.Models;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;

    namespace FieldService.Controllers
    {
        [Route("api/[controller]")]
        [ApiController]
        public class FieldController : ControllerBase
        {
            private readonly AppDbContext _context;

            public FieldController(AppDbContext context)
            {
                _context = context;
            }

        // GET: api/Field
         [HttpGet]
        public async Task<ActionResult<IEnumerable<Field>>> GetFields()
        {
            var fields = await _context.Fields.ToListAsync();
            if (fields == null)
            {
                return NotFound();
            }

            return Ok(fields);  // Make sure to return Ok() for successful data retrieval
        }


        // GET: api/Field/5
        [HttpGet("{id}")]
            public async Task<ActionResult<Field>> GetField(int id)
            {
                var field = await _context.Fields.FindAsync(id);

                if (field == null)
                {
                    return NotFound();
                }

                return field;
            }

            // POST: api/Field
            [HttpPost]
           // [Authorize(Roles = "ADMIN")]
            public async Task<ActionResult<Field>> CreateField(Field field)
            {
                _context.Fields.Add(field);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetField), new { id = field.Id }, field);
            }

            // PUT: api/Field/5
            [HttpPut("{id}")]
           // [Authorize(Roles = "ADMIN")]
            public async Task<IActionResult> UpdateField(int id, Field field)
            {
                if (id != field.Id)
                {
                    return BadRequest();
                }

                _context.Entry(field).State = EntityState.Modified;

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!_context.Fields.Any(e => e.Id == id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }

                return NoContent();
            }

            // DELETE: api/Field/5
            [HttpDelete("{id}")]
           // [Authorize(Roles = "ADMIN")]
            public async Task<IActionResult> DeleteField(int id)
            {
                var field = await _context.Fields.FindAsync(id);
                if (field == null)
                {
                    return NotFound();
                }

                _context.Fields.Remove(field);
                await _context.SaveChangesAsync();

                return NoContent();
            }
        }
    }
