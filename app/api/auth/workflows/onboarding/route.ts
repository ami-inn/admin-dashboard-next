

import { serve } from "@upstash/workflow/nextjs"
import emailjs from '@emailjs/browser';
import config from "@/lib/config";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";

type USERSTATE = "non-active" | "active"

type InitialData = {
  email: string
}

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000
const THREE_DAYS_IN_MS = 3 * ONE_DAY_IN_MS
const ONE_MONTH_IN_MS = 30 * ONE_DAY_IN_MS

const getUserState = async(email:string): Promise<USERSTATE> => {

     const user = await db
       .select()
       .from(users)
       .where(eq(users.email, email!))
       .limit(1);

       if(user.length === 0){
            return "non-active"
        }

        const lastActivityDate = new Date(user[0]?.lastActivityDate!) 
        const now = new Date()
        const diff = now.getTime() - lastActivityDate.getTime()

        if(diff > THREE_DAYS_IN_MS && diff <= ONE_MONTH_IN_MS){
            return "non-active"
        }

        return "active"
}

export const { POST } = serve<InitialData>(async (context) => {
  const { email } = context.requestPayload

//   initialy send this email
  await context.run("new-signup", async () => {
    await sendEmail("Welcome to the platform", email)
  })

//   wait for the user to interact with the platform
  await context.sleep("wait-for-3-days", 60 * 60 * 24 * 3)

  while (true) {
    const state = await context.run("check-user-state", async () => {
      return await getUserState(email)
    })

    if (state === "non-active") {
      await context.run("send-email-non-active", async () => {
        await sendEmail("you still there", email)
      })
    } else if (state === "active") {
      await context.run("send-email-active", async () => {
        await sendEmail("Send newsletter to active users", email)
      })
    }

    await context.sleep("wait-for-1-month", 60 * 60 * 24 * 30)
  }
})

async function sendEmail(message: string, email: string) {
  // Implement email sending logic here
  console.log(`Sending ${message} email to ${email}`)

  const serviceID = config.env.emailjs.serviceId;
  const templateID = config.env.emailjs.templateId;
  const publicKey = config.env.emailjs.publicKey;

  const templateParams = {
    message,
    email,
  };


  emailjs
    .send(serviceID, templateID, templateParams, {
      publicKey: publicKey,
    })
    .then(
      (response) => {
        console.log('SUCCESS!', response.status, response.text);
      },
      (err) => {
        console.log('FAILED...', err);
      },
    );


 
}

// Removed duplicate getUserState function