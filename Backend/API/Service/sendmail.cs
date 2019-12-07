
// using SendGrid's C# Library
// https://github.com/sendgrid/sendgrid-csharp
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.IO;
using System.Threading.Tasks;


//dotnet add package SendGrid


//Tror ni maste skapa er egna API environment
//howTo https://github.com/sendgrid/sendgrid-csharp#setup-environment-variables
public class Mail
{
 
       
          //  Execute().Wait();
     
        public static async Task sendMail(string email, string firstName, string lastName, string token)
        {

            Console.WriteLine("Inne i sendMail Email: {0}      FirstName: {1}   LastName: {2}\n \n \n \n", email, firstName, lastName);

            string activateLink = "http://localhost:3000/confirmation/" + token;

                              //satta upp er egna windows Environment
            var apiKey = Environment.GetEnvironmentVariable("SENDGRID_API_KEY");
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("VolvoTest@chalmers.se", "Admin");
            var subject = "Sending with SendGrid is Fun";
            var to = new EmailAddress(email, firstName+ " "+ lastName);
            var plainTextContent = "";
            string html = File.ReadAllText("test.html");
            html = html.Replace("~ActivationLink~", activateLink);
            html = html.Replace("~FullName~", firstName+ " "+ lastName);

            var htmlContent = html;
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);

            Console.WriteLine(""+ response.StatusCode);
        }
}