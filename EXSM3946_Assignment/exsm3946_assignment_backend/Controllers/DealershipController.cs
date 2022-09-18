﻿using API_Assignment.Data;
using API_Assignment.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Xml.Linq;



namespace API_Assignment.Controllers
{
    [Route("[controller]")] //Dealership
    [ApiController]
    public class DealershipController : ControllerBase
    {
        private readonly DatabaseContext _context;
        public DealershipController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/<CustomerController>
        [HttpGet]
        [Route("list")]
        public IEnumerable<Dealership> Get()
        {
            //return _context.Dealerships.ToArray();
            return  _context.Dealerships.ToList();
        }

        [HttpGet]
        [Route("count")]
        public int Count()
        {
            return _context.Dealerships.Count();
        }


        // GET api/<CustomerController>/5
        [HttpGet("{id}")]
        public ActionResult<Dealership> Get(string id)
        {
            int providedID;
            try
            {
                providedID = int.Parse(id);
            }
            catch
            {
                return BadRequest("*Error 404* Not proper dealship ID!");
            }
            try
            {
                Dealership found = _context.Dealerships.Where(x => x.ID == providedID).Single();
                return found;
            }
            catch
            {
                return NotFound();
            }
        }

        // POST api/<CustomerController>
        [HttpPost]
        public ActionResult Post(string name, int manufacturerID, string address, string phonenumber)
        {
            Manufacturer found;
            if (string.IsNullOrWhiteSpace(name) || string.IsNullOrWhiteSpace(address) || string.IsNullOrWhiteSpace(phonenumber))
            {
                return BadRequest();
            }
            try
            {
                found =_context.Manufacturers.Where(x => x.ID == manufacturerID).Single();
            }
            catch
            {
                return NotFound("It appears you have entered the wrong informations, please reenter the correct informations! ");
            }
            try
            {
                _context.Dealerships.Add(new Dealership() { Name = name, ManufacturerID = manufacturerID, Address = address, PhoneNumber = phonenumber});
                _context.SaveChanges();
                return Ok();
            }
            catch
            {
                return StatusCode(400, "It appears you have entered the wrong informations, please reenter the correct informations! ");
            }

        }

        // PUT api/<CustomerController>/5
        [HttpPut]
        public ActionResult Put(string id, string name, string address, string phonenumber)
        {
            int providedID;
            Dealership found;
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
                found = _context.Dealerships.Where(x => x.ID == providedID).Single();
            }
            catch
            {
                return NotFound();
            }
            try
            {
                found.Name = name ?? found.Name;
                found.Address = address ?? found.Address;
                found.PhoneNumber = phonenumber ?? found.PhoneNumber;
                _context.SaveChanges();
                return Ok();
            }
            catch
            {
                return StatusCode(404, "Incorrect informations used.");
            }
        }


        // DELETE api/<CustomerController>/5
        [HttpDelete]
        public ActionResult Delete(string id)
        {
            int providedID;
            Dealership found;
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
                found = _context.Dealerships.Where(x => x.ID == providedID).Single();
            }
            catch
            {
                return NotFound();
            }
            try
            {
                _context.Dealerships.Remove(found);
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
