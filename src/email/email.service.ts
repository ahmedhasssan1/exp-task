import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { SendEmail } from './dto/sendEmail.dto';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(private readonly configService: ConfigService) {}

  // Create and return email transporter
  private emailTransport() {
    return nodemailer.createTransport({
      host: this.configService.get<string>('EmailHost'),
      port: this.configService.get<number>('emailPort'),
      secure: false,
      auth: {
        user: this.configService.get<string>('emailUser'),
        pass: this.configService.get<string>('emailPassword'),
      },
    });
  }

  /**
   * Send email notification when a new match is generated
   * @param email - Recipient's email address
   * @param name - Recipient's name
   * @param projectName - The project name
   * @param vendorName
   **/
  async sendMatchNotification(emailDto: SendEmail): Promise<string> {
    const transporter = this.emailTransport();

    const mailOptions: nodemailer.SendMailOptions = {
      from: `"${this.configService.get<string>('Match System')}" <${this.configService.get<string>('emailUser')}>`,
      to: emailDto.email,
      subject: '🎉 New Match Found for Your Project!',
      html: `
        <div style="font-family:sans-serif; padding:15px; background:#f9f9f9; border-radius:8px;">
          <h2 style="color:#007bff;">Hello ${emailDto.name || 'User'},</h2>
          <p>We are excited to inform you that a <b>new match</b> has been found for your project: <b>${emailDto.projectName}</b>.</p>
          <p>The matched vendor is: <b>${emailDto.vendorName}</b>.</p>
          <p>Log in to your dashboard to review the vendor details and proceed.</p>
          <br />
          <a href="https://your-platform.com/dashboard" style="display:inline-block;padding:10px 20px;background:#007bff;color:#fff;border-radius:5px;text-decoration:none;">
            View Match
          </a>
          <br /><br />
          <small style="color:#666;">This is an automated message. Please do not reply.</small>
        </div>
      `,
      text: `Hello ${emailDto.name},\n\nA new match has been found for your project "${emailDto.projectName}".\nMatched Vendor: ${emailDto.vendorName}\n\nVisit your dashboard to view details.`,
    };

    try {
      await transporter.sendMail(mailOptions);
      this.logger.log(` Match email sent successfully to ${emailDto.email}`);
      return 'Match email sent successfully';
    } catch (error) {
      this.logger.error(` Failed to  send match email: ${error.message}`);
      throw error;
    }
  }
}
