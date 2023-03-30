var express = require("express");
const { ObjectId } = require("mongodb");
var router = express.Router();
var Contact = require("../model/contact");
var ContactService = require("../service/contactservice");


// return view homepage
router.get('/home',(req,res) => {
    res.render('home');
})
// return list of contact 
router.get("/contact-list", async function (req, res) {
  var contactService = new ContactService();
  var contacts = await contactService.getProductList();
  res.json(contacts);
});

// return view admin contact
router.get('/admin', (req, res) => {
    res.render('admin');
})


// return view edit contact
router.get('/edit', async (req, res) => {
  const id = req.query.id;
  var contact = await contactService.getProduct(id);
  res.render('edit',{contact});
})

//return view to insert contact
router.get('/contact', (req, res) => {
    res.render('contact');
})

//insert contact
router.post("/insert-contact", async function (req, res) {
  var contactService = new ContactService();
  var contact = new Contact();
  contact.Name = req.body.Name;
  contact.Phonenumber = req.body.Phonenumber;
  contact.Email = req.body.Email;
  contact.Message = req.body.Message;

  var result = await contactService.insertProduct(contact);
  res.json({ status: true, message: "add contact successfull" });
});

router.put("/update-contact", async function (req, res) {
  var contactService = new ContactService();
  var contact = new Contact();
  contact._id = new ObjectId(req.body.Id);
  contact.Name = req.body.Name;
  contact.Phonenumber = req.body.Phonenumber;
  contact.Email = req.body.Email;
  contact.Message = req.body.Message;
  
  await contactService.updateProduct(contact);
  res.json({ status: true, message: "update successfull" });
});

router.delete("/delete-contact", async function (req, res) {
  var contactService = new ContactService();
  await contactService.deleteProduct(req.query.id);
//   console.log(req.query.id);
  res.json({ status: true, message: "Delete Successfull" });
});
module.exports = router;
