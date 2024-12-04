const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
    // Create the transporter object using SMTP transport
    const transporter = nodeMailer.createTransport({
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        service: process.env.SMPT_SERVICE,
        auth: {
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD,
        },
        debug: true,  // Enable debugging (for development)
        logger: true, // Log output to the console (for development)
    });

    // Define the mail options
    const mailOptions = {
        from: process.env.SMPT_MAIL, // Sender address
        to: options.email, // List of recipients
        subject: options.subject, // Subject line
        text: options.message, // Plain text body

    };

    try {
        // Send email using the transporter
        const info = await transporter.sendMail(mailOptions);

        // Log success
        console.log(`Email sent: ${info.messageId}`);
        return { success: true, message: `Email sent to ${options.email} successfully!` };
        
    } catch (error) {
        // Log the error and send a detailed response
        console.error("Error sending email:", error);
        let errorMessage = "Failed to send email";

        if (error.response) {
            // If there’s a response from the SMTP server, include it in the error
            errorMessage = `SMTP Error: ${error.response}`;
        }

        // Return a detailed error response
        return { success: false, message: errorMessage };
    }
};

module.exports = sendEmail;
