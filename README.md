# buycoins test
1. clone the repository
2.npm install
3.configure the env files
4.npm run build-ts
5.npm start
6.goto to play ground
7. register a user
8. test with the sandbox
9. mutation{
   createPayment(data:{number:"4757140000000001",cvv:"123",expYear:2022,expMonth:5,users_email:"sample@gmail.com",billing_details_name:"Aknde is", billing_details_city:"LA",billing_details_country:"NG",billing_details_postal_code:"233456",billing_details_address_line1:"some data", amount:"50.6",currency:"USD" }){
    status,
    payment_id
  }
}
10. the payment id confirmed payment
11. verifyPayment mutations will be used
