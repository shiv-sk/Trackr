const nodemailer = require("nodemailer");
const TaskAssign = async(duedate , assignedBy , assignedTo , taskTitle , assignedByEmail)=>{
    const transport = nodemailer.createTransport({
        host: 'smtp.resend.com',
        secure: true,
        port: 465,
        auth:{
            user: process.env.RESEND_USER,
            pass: process.env.RESEND_API_KEY,
        }
    })

    const userOptions = {
        from:'Acme <onboarding@resend.dev>',
        to:assignedTo,
        subject:`new Task Assigned from ${assignedBy}`,
        html:`
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <h3>Task Assigned!</h3>
        <p>Dear User,</p>
        <p>We are pleased to inform you that a new task titled <strong>${taskTitle}</strong> has been assigned to you by <strong>${assignedBy}</strong>.</p>
        <p>Please review the task details and ensure it is completed before the due date: <strong>${duedate}</strong>.</p>
        <p>If you have any questions or need further clarification, feel free to reach out to ${assignedByEmail}.</p>
        <p>Thank you for your contribution and dedication!</p>
        </div>
        `
    }
    let sentMessage;
    try {
        sentMessage = await transport.sendMail(userOptions);
    } catch (error) {
        console.error("Error while sending task assign notification email! " , error);
        return { success: false, error: error.message };
    }
    return sentMessage;
}
module.exports = TaskAssign