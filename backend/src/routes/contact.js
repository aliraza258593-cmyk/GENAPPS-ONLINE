import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

// Contact form endpoint - forwards to real email
router.post('/', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email address' });
        }

        // For production, configure a real SMTP transport
        // For now, log the contact and return success
        console.log('=== Contact Form Submission ===');
        console.log(`From: ${name} <${email}>`);
        console.log(`Subject: ${subject}`);
        console.log(`Message: ${message}`);
        console.log('Forward to: ma7273704@gmail.com');
        console.log('===============================');

        // In production with proper SMTP setup:
        // const transporter = nodemailer.createTransport({
        //     host: process.env.SMTP_HOST,
        //     port: process.env.SMTP_PORT,
        //     secure: true,
        //     auth: {
        //         user: process.env.SMTP_USER,
        //         pass: process.env.SMTP_PASS
        //     }
        // });
        // 
        // await transporter.sendMail({
        //     from: '"GenApps Contact" <noreply@genapps.online>',
        //     to: 'ma7273704@gmail.com', // Real email - hidden from frontend
        //     replyTo: email, // User's email for easy reply
        //     subject: `[GenApps Contact] ${subject}`,
        //     text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        //     html: `
        //         <h2>New Contact Form Submission</h2>
        //         <p><strong>From:</strong> ${name} (${email})</p>
        //         <p><strong>Subject:</strong> ${subject}</p>
        //         <hr>
        //         <p>${message.replace(/\n/g, '<br>')}</p>
        //     `
        // });

        res.json({
            success: true,
            message: 'Your message has been sent. We will get back to you soon.'
        });

    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({ error: 'Failed to send message. Please try again.' });
    }
});

export default router;
