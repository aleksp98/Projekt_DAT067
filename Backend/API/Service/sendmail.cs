using System;
using System.IO;
using System.Net;
using System.Net.Mail;
//byt till en rikitg SMTP server som kan användas
class Mail{
    //private const string Path = @"\Backend\API\Service\test.html";

    public static void sendMail(string email, string firstName, string lastName, string token) {

 Console.WriteLine("Inne i sendMail Email: {0}      FirstName: {1}   LastName: {2}\n \n \n \n",email,firstName,lastName);

var fromAddress = new MailAddress("untzSten@gmail.com", "From Name");
var fromAddress2 = new MailAddress("Sigma@testmail.com", "From Name");

var toAddress = new MailAddress(email, firstName+"" +lastName);
const string fromPassword = "Testarmail";
const string subject = "testar mail";


string activateLink = "http://localhost:3000/confirmation/"+token;

string FullName = firstName+ " " + lastName;


 Console.WriteLine(activateLink);

string html = File.ReadAllText("test.html");

html = html.Replace("~ActivationLink~",activateLink);

html = html.Replace("~FullName~",FullName);

string body = html;
var smtp = new SmtpClient      {     
   Host = "smtp.gmail.com",  
     Port = 587,  
      EnableSsl = true,  
     DeliveryMethod = SmtpDeliveryMethod.Network,      
        Credentials = new NetworkCredential(fromAddress.Address, fromPassword)      };
using (var message = new MailMessage(fromAddress2, toAddress)     
      {             Subject = subject,             
                     Body = body, 
                     IsBodyHtml=true         })
         { smtp.Send(message);}







}







}