using System;
using System.IO;
using System.Net;
using System.Net.Mail;

class Mail{
    private const string Path = @"Backend\API\Service\test.html";

    public static void sendMail(string email, string firstName, string lastName) {

 Console.WriteLine("Inne i sendMail Email: {0}      FirstName: {1}   LastName: {2}\n \n \n \n",email,firstName,lastName);

var fromAddress = new MailAddress("untzSten@gmail.com", "From Name");
var fromAddress2 = new MailAddress("Sigma@testmail.com", "From Name");

var toAddress = new MailAddress(email, firstName+"" +lastName);
const string fromPassword = "Klusina123";
const string subject = "testar mail";
//string text = "Hi "+ firstName +" "+ lastName+ " this is your confirmation mail";
string html = File.ReadAllText(Path);

string body = html;
var smtp = new SmtpClient      {     
   Host = "smtp.gmail.com",   
     Port = 587,  
      EnableSsl = true,  
     DeliveryMethod = SmtpDeliveryMethod.Network,      
        Credentials = new NetworkCredential(fromAddress.Address, fromPassword)      };
using (var message = new MailMessage(fromAddress2, toAddress)     
      {             Subject = subject,             Body = body  , IsBodyHtml=true         })
{  smtp.Send(message);}







}







}