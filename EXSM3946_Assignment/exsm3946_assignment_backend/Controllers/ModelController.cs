using API_Assignment.Data;
using API_Assignment.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace API_Assignment.Controllers
{
    [Route("[controller]")]  //VehicleModels
    [ApiController]
    public class ModelController : ControllerBase
    {
        private readonly DatabaseContext _context;
        public ModelController(DatabaseContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("list")]
        public IEnumerable<VehicleModel> Get()
        {
            //return _context.Dealerships.ToArray();
            return _context.VehicleModels.ToList();
        }

        [HttpGet]
        [Route("count")]
        public int Count()
        {
            return _context.VehicleModels.Count();
        }

        // GET api/<CustomerController>/5
        [HttpGet]
        public ActionResult<VehicleModel> Get(string id)
        {
            int providedID;
            try
            {
                providedID = int.Parse(id);
            }
            catch
            {
                return BadRequest();
            }
            try
            {
                VehicleModel found = _context.VehicleModels.Where(x => x.ID == providedID).Single();
                return found;
            }
            catch
            {
                return NotFound();
            }
        }

        // POST api/<CustomerController>
        [HttpPost]
        public ActionResult Post(int manufacturerID, string name)
        {
            Manufacturer found;
            if (string.IsNullOrWhiteSpace(name))
            {
                return BadRequest();
            }
            try
            {
                found = _context.Manufacturers.Where(x => x.ID == manufacturerID).Single();
            }
            catch
            {
                return NotFound("It appears you have entered the wrong model informations, please reenter the correct informations! ");
            }

            try
            {
                _context.VehicleModels.Add(new VehicleModel() { Name = name, ManufacturerID = manufacturerID});
                _context.SaveChanges();
                return Ok();
            }
            catch
            {
                return StatusCode(400);
            }
        }

        // PUT api/<CustomerController>/5
        [HttpPut]
        public ActionResult Put(string id, string name)
        {
            int providedID;
            VehicleModel found;
            try
            {
                providedID = int.Parse(id);
            }
            catch
            {
                return BadRequest();
            }
            try
            {
                found = _context.VehicleModels.Where(x => x.ID == providedID).Single();
            }
            catch
            {
                return NotFound();
            }
            try
            {
                found.Name = name ?? found.Name;
                _context.SaveChanges();
                return Ok();
            }
            catch
            {
                return StatusCode(404, "It appears something is missing from your data, please try again! ");
            }
        }


        // DELETE api/<CustomerController>/5
        [HttpDelete]
        public ActionResult Delete(string id)
        {
            int providedID;
            VehicleModel found;
            try
            {
                providedID = int.Parse(id);
            }
            catch
            {
                return BadRequest();
            }
            try
            {
                found = _context.VehicleModels.Where(x => x.ID == providedID).Single();
            }
            catch
            {
                return NotFound();
            }
            try
            {
                _context.VehicleModels.Remove(found);
                _context.SaveChanges();
                return Ok();
            }
            catch
            {
                return StatusCode(400, "Cannot find the id, Are you sure your using the correct ones? ");
            }
        }
    }
}
