// imports
const http = require("http");
const express = require('express');
const app = express ();
const port = 3000;


//Static Files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/img'));

//Set views
app.set('views', './views');
app.set('view engine','ejs');

app.get('',(req,res) => {
    res.render('index', {text: 'This is EJS'});
    // res.render('paymentAmount', {text: '5000'});
})

app.get('/about',(req,res) => {
    res.render('about', {text: 'This is EJS too'});
})


//listen in on port 3000
// app.listen(port,() => console.info('Listening on port '+port));


//razorpay instance
const Razorpay = require('razorpay');
const request = require('request');
var instance = new Razorpay({
    key_id: 'rzp_test_rZxLZHEKkJ7BWZ',
    key_secret: 'af8ajaYQLBkRqq9up3UxCtTt',
  });

//razorpay order create

var instance = new Razorpay({ key_id: 'rzp_test_rZxLZHEKkJ7BWZ', key_secret: 'af8ajaYQLBkRqq9up3UxCtTt' })

var options = {
  amount: "100",  // amount in the smallest currency unit
  currency: "INR",
  receipt: "order_rcptid_11"
};
instance.orders.create(options, function(err, order) {
  console.log(order);
//   res.send({orderId:order.id});
});

//verifying order signatures
app.post("/api/payment/verify",(req,res)=>{

    let body=req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;
   
     var crypto = require("crypto");
     var expectedSignature = crypto.createHmac('sha256', 'af8ajaYQLBkRqq9up3UxCtTt')
                                     .update(body.toString())
                                     .digest('hex');
                                     console.log("sig received " ,req.body.response.razorpay_signature);
                                     console.log("sig generated " ,expectedSignature);
     var response = {"signatureIsValid":"false"}
     if(expectedSignature === req.body.response.razorpay_signature)
      response={"signatureIsValid":"true"}
         res.send(response);
     });
   
   app.listen(port, () => {
     console.log(`Example app listening at http://localhost:${port}`)
   })