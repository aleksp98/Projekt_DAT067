
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
       //ändra lite mera så att det blir mer skillnad mellan olika typer av mail
        public static async Task sendMail(string email, string firstName, string lastName, string token, int option)
        {
                     string activateLink; 
                     var subject = " ";
                
              if(option == 1){ //send activation link
                 activateLink = "http://localhost:3000/confirmation/" + token;
                  subject = "Activation Link";

              }if(option == 2){ // resend email

                  activateLink = "http://localhost:3000/confirmation/" + token;
                 subject = "Don't forget to activate";
              }else //option 3 reset passsword
              {
                 activateLink = "http://localhost:3000/resetPassword/" + email;
                  subject = "Reset Password";
              }

            Console.WriteLine("Inne i sendMail Email: {0}      FirstName: {1}   LastName: {2}\n \n \n \n", email, firstName, lastName);

           

                              //satta upp er egna windows Environment
            var apiKey = Environment.GetEnvironmentVariable("SENDGRID_API_KEY");
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("VolvoTest@chalmers.se", "Admin");
          
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