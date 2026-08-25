import{j as e,r as l,R as d,g as u,S as p}from"./index-H_TyhneZ.js";import{F as h,V as y}from"./VelocityMarquee-B9uoEBAl.js";import{M as m}from"./MainFooter-D6xfmSRR.js";u.registerPlugin(p);function s({title:t,content:a,customCard:n}){l.useEffect(()=>{window.scrollTo(0,0)},[]);const c=()=>a.split(`
`).map((o,r)=>{if(o.trim()==="[CUSTOM_CARD]"&&n)return e.jsx(d.Fragment,{children:n},r);const i=o.match(/^(\d+\.\s+)(.*)$/);return i?e.jsx("span",{className:"block mt-10 mb-2 text-lg md:text-xl font-bold text-white",children:i[2]},r):e.jsxs("span",{children:[o,`
`]},r)});return e.jsxs("div",{className:"relative min-h-screen bg-elevate-black font-display text-elevate-paper md:overflow-x-hidden selection:bg-elevate-orange selection:text-white flex flex-col",children:[e.jsx(h,{centerText:t}),e.jsxs("div",{className:"relative z-10 mx-auto max-w-none px-6 pt-32 pb-20 md:px-12 lg:px-20",children:[e.jsx("h1",{className:"text-3xl md:text-5xl font-black text-white mb-10 tracking-tight",children:t}),e.jsx("div",{className:"whitespace-pre-wrap break-words text-xs md:text-sm leading-relaxed opacity-80 font-medium",style:{fontFamily:"'NeueHaasGrotesk', sans-serif"},children:c()})]}),e.jsxs("div",{className:"w-full shrink-0 mt-auto",children:[e.jsx("div",{className:"h-px w-full bg-elevate-orange"}),e.jsx(y,{}),e.jsx("div",{className:"h-px w-full bg-elevate-orange"})]}),e.jsx(m,{})]})}function b(){const t=`Version: 2026-08-14 Last updated: August 14, 2026

This Privacy Policy explains how Elevate handles personal data when you use the Elevate Android app. It applies to the app’s fitness, workout, focus, wellness, app-blocking, launcher, calendar, weather, backup, and subscription features.
Please read this policy together with the Elevate Terms of Use. Elevate does not sell personal data and does not use personal data for advertising.

1. Who operates Elevate
Elevate is operated by Brihit Nath.
Privacy and support: theduskdynamicsproductions@gmail.com
Grievance contact: Brihit Nath, brihitnath@gmail.com

2. Data we handle
The data we handle depends on the features and permissions you choose to use.

Account and profile data: When you sign in with Google, we handle your email address, Firebase user ID, sign-in provider, account status, last-login information, and records of the legal-policy versions you accepted. We also handle profile information you enter, such as your name, age, height, weight, goal bodyweight, preferences, and settings.

Workout, fitness, focus, and wellness data: We handle the information you create while using Elevate, including workout sessions, exercises, sets, repetitions, weights, timers, templates, goals, progress analytics, focus sessions, app limits, selected blocked or monitored apps, distraction and blocked-launch history, discipline scores, and related feature settings.

Installed-app and usage data: If you use app-limit, focus, launcher, or wellness features, Elevate may handle the launchable apps on your device, including package names, app labels, icons, and category information, so that you can select apps to monitor or block. If you grant Android Usage Access, Elevate may handle app-usage duration, app launches, foreground-app information, and selected-app limit activity. We use this only for the app-limit, focus, and discipline features you enable.

Accessibility data and Sexual Detox: If you enable Elevate’s Accessibility Service, the service may observe foreground-app and window events and retrieve visible accessibility content from the active screen. Depending on the enabled feature, this can include visible text, content descriptions, view identifiers, and scroll events. That content can incidentally include content from another app, including notifications or messages shown on screen. If you enable Sexual Detox, Elevate may also take screen-image samples and analyze visible screen content on your device to detect blocked domains or potentially explicit visual content. The raw screenshots and raw on-screen text used for this analysis are processed in memory, are not sent to Elevate, Firebase, Google, or another recipient by this feature, and are not saved as an image or text history. Elevate stores only feature outcomes and aggregate records, such as a block count, reason category, and time of the block. Accessibility is optional. Turning it off stops the related enforcement, reels-counting, and Sexual Detox features.

Notification content: If you enable Elevate Notification Filter and choose apps whose notifications should be suppressed, Elevate accesses those notifications’ package name, app label, title, body text, conversation title, and timestamp. Elevate uses this information to suppress the notification and show it in the app’s filtered-notification inbox. Notification titles and body text may contain private messages or other sensitive content. The filtered inbox is kept locally in encrypted preferences, is limited to the most recent 50 entries, and can be cleared in the app. Elevate does not upload filtered-notification content to Firebase, Google Drive, or another third party.

Approximate location and weather: If you choose to use the launcher weather feature and grant Android approximate-location permission, Elevate obtains your device’s last known approximate location. It sends latitude and longitude to Open-Meteo to retrieve current temperature and weather-code information. Elevate stores the returned temperature and weather code locally for a limited cache period; it does not intentionally store your raw latitude or longitude after the weather request.

Google Calendar data: If you connect Google Calendar, Elevate accesses your Google account email and Calendar event data needed for synchronization. This can include event titles, start and end dates or times, recurrence rules, event identifiers, event status, and synchronization tokens. Elevate may read, create, update, and delete events in your primary Google Calendar as part of the Calendar-sync feature. Disconnecting Calendar or revoking its Google permission stops future Calendar access. It does not automatically remove events already created in your Google Calendar; you can delete those events in Google Calendar.

Google Drive backups: If you connect Google Drive, Elevate creates, reads, updates, restores, and deletes Elevate backup files in your Google Drive. A backup can contain selected local app data, including profile, workout, focus, wellness, preferences, and analytics data. Automatic Drive backup starts only after you complete the Drive-permission and first-backup flow.

Subscription data: If you start a trial or buy a subscription, Google Play processes the transaction. Elevate does not receive or store your payment-card number. Elevate may store your subscription status, plan or entitlement status, trial status, and related account metadata locally and in Firebase so it can provide subscription-gated features.

3. How we use data
We use the data above to:
- create and secure your account;
- provide profile, workout, fitness, focus, wellness, launcher, app-limit, notification-filter, and Sexual Detox features;
- calculate user-visible progress and discipline analytics;
- maintain backups, restore data, and synchronize with Google Drive or Google Calendar when you choose those features;
- show local weather when you choose that feature;
- manage trials, subscriptions, and feature access;
- protect against abuse, troubleshoot, respond to support requests, and comply with applicable law.

4. Where data is stored and who receives it
Storage: Depending on the feature, data may be stored:
- locally on your device in app storage and databases;
- in Firebase Authentication and Firebase Realtime Database for account, synchronization, account-status, and related service features;
- in your Google Drive if you enable Drive backup; and
- in your Google Calendar if you enable Calendar synchronization. Elevate uses Android encrypted preferences for many local settings and records. Other local data may be kept in Android app storage or local databases. You should protect your device with an operating-system lock and keep it up to date.

Recipients and service providers: We disclose data only as needed to provide the feature you choose, to meet a legal obligation, or to protect Elevate and its users. Relevant recipients may include:
- Google and Firebase: Google Sign-In, Firebase Authentication, Firebase Realtime Database, Firebase Functions, Firebase App Check, Google Play services, and Play Integrity help provide sign-in, account, cloud, and security features.
- Google Drive: receives Elevate backup files only after you connect Drive.
- Google Calendar: receives and returns Calendar event data only after you connect Calendar.
- Google Play: processes purchases and subscription transactions. Google Play’s own terms and privacy policy apply to those transactions.
- Open-Meteo: receives location coordinates when you use the weather feature described above.
- Authorities or other parties: where disclosure is required by law or reasonably necessary to protect rights, safety, or security. Google and Firebase may process data on infrastructure outside India. We do not sell, rent, or disclose personal data to advertising networks, data brokers, or marketers for their own marketing purposes. Firebase Analytics collection and advertising-ID collection are disabled in the current app build; if that changes, we will update this policy and the Google Play Data Safety disclosure before release.

5. Your choices and controls
You can decline or revoke optional Android permissions through Android Settings. You can turn off related features in Elevate. Doing so may stop or reduce the feature that needs that permission. You can disconnect Google Drive or Google Calendar through the app where available, or revoke Elevate’s access in your Google Account settings. You can manage or cancel subscriptions through Google Play.

6. Retention and deletion
We retain account, profile, workout, focus, wellness, and subscription-status data while it is needed to provide Elevate, until you delete it, or as otherwise required for security, legal compliance, or dispute resolution.
Local data remains on your device until it is deleted in the app, cleared from Android settings, or removed by uninstalling the app.
Filtered notifications are kept locally until you clear them or they are replaced after the 50-entry limit.
Firebase account-linked data is removed from active systems when a completed account-deletion request is processed, subject to provider backup and retention cycles and any lawful retention need.
Google Drive backups remain in your Google Drive until deleted. When you delete your account, Elevate may attempt to delete Elevate-managed Drive backups when it has the required authorization; you should also review and delete backup files directly in Google Drive.
Google Calendar events remain in Google Calendar until you delete them there. To delete your Elevate account and associated data, use Privacy & Terms > Delete Account & Data in the app. If you cannot access the app, submit a request through the account-deletion page or email the privacy/support contact from the address associated with your Elevate account. We may ask for reasonable verification before acting on a request. Firebase may require you to sign in again before account deletion can complete.

[CUSTOM_CARD]

7. Your privacy rights and grievances
You may ask us to access, correct, update, complete, erase, or export your personal data; withdraw consent for optional processing; or raise a grievance. Contact theduskdynamicsproductions@gmail.com for privacy and support requests or brihitnath@gmail.com for grievances. We will verify the request where reasonably necessary, respond within the period required by applicable law, and explain any lawful reason for retaining data or declining a request. If you are in India and are dissatisfied with our response, you may use the grievance or complaint route available under applicable data-protection law, including the Data Protection Board of India process when available to you.

8. Security
We use reasonable technical and organizational measures designed to protect data, including Android encrypted preferences, provider security controls, and encryption in transit where supported by our service providers. No system is completely secure. Please keep your device and Google account secure and contact us promptly if you believe your account has been compromised. If we become aware of a personal-data breach that requires notice, we will take reasonable steps to investigate, reduce harm, and notify affected users and authorities as required by applicable law.

9. Children
Elevate is not intended for anyone under 18. We do not knowingly collect personal data from children. If you believe a child has provided personal data to Elevate, contact us and we will take appropriate steps to address it.

10. Changes to this policy
We may update this policy as Elevate changes or as the law requires. For material changes, we will update the version and date and provide notice in the app or by another appropriate method before the change takes effect where required. The current version is available in the app and at the public policy URL above.

11. Sources of personal data
We receive personal data directly from you when you sign in, create or update a profile, log workouts, configure focus or wellness settings, select apps, connect Google services, start a subscription, use an app feature, or contact us. We also receive limited data through the device, Android system services, Google, Firebase, Google Play, Google Drive, Google Calendar, and Open-Meteo when you choose the associated feature. We do not buy personal data from data brokers or obtain personal data from unrelated third-party advertising or marketing sources.

12. Consent, optional permissions, and feature impact
Some processing is necessary to create and secure your account and provide the core features you request. Other processing depends on a separate optional choice, such as enabling Usage Access, Accessibility, Notification Filter, notifications, approximate location, Google Drive, or Google Calendar. You can refuse or withdraw an optional permission or connection through Android Settings, Google Account settings, Google Play, or the relevant Elevate setting. Withdrawing it does not affect the lawfulness of earlier processing, but the related feature may become unavailable or work with reduced functionality.

13. Data minimization and accuracy
Elevate is designed to use the categories of data needed for the feature you choose. We ask you to keep information you enter reasonably accurate and current. You can update most profile and feature information in the app; contact us if an account-linked record needs correction and cannot be changed through the app. We do not intentionally use personal data for a purpose materially different from the purpose explained in this policy without updating the notice and obtaining any consent required by law.

14. Data portability and request verification
Where technically feasible and required by applicable law, you may request a copy of personal data held by Elevate in a structured, commonly used format. Existing backup or export features may already provide some of this data. A portability request does not require us to disclose another person’s data, security-sensitive information, or information we cannot lawfully disclose. Before acting on an access, deletion, correction, export, or grievance request, we may ask for reasonable verification that you control the relevant account. Do not send passwords, payment-card details, or unnecessary sensitive information by email.

15. Support records and service communications
When you contact Elevate, we may handle the contact information, account information, and message content you provide to investigate, respond, process a request, or keep a limited request record. We retain these records only as long as needed for support, verification, security, legal compliance, or dispute resolution. If you permit device notifications, Elevate may send service-related communications such as account, backup, workout, focus, app-limit, or subscription alerts. You can manage most notifications in Android Settings.

16. Automated on-device feature decisions
Elevate uses some automated, on-device logic to provide features such as app-limit enforcement, reels counting, and Sexual Detox detection. Those features can change what Elevate displays or redirect you away from selected content, but they do not make decisions that produce legal effects concerning you. You can turn these features off through their settings or by revoking the related permission.

17. Lost devices and account protection
You are responsible for securing your device, Google account, and connected services. If a device or account is lost, stolen, shared, or compromised, use Android and Google security controls to protect it, change your Google password where appropriate, and revoke connected-service access if needed. Elevate cannot prevent someone who has access to an unlocked device or your Google account from accessing data available through that device or account.

18. Third-party links and language
Elevate may link to third-party services, including Google, Firebase, Google Play, and Open-Meteo. Their content, availability, privacy practices, and terms are controlled by those providers. Review their policies before using their services. This policy is written in English. A translation may be provided for convenience, but the English version controls to the extent permitted by law.`,a=e.jsxs("a",{href:"https://docs.google.com/forms/d/e/1FAIpQLSegU_lWKNTOvBCEcjsoTRrlJoesqzDq2sF_TCTT8SPWWPzjQQ/viewform?usp=header",target:"_blank",rel:"noreferrer",className:"my-8 block w-full md:w-3/4 rounded-xl border border-red-500/30 bg-red-500/10 p-6 transition-all hover:bg-red-500/20 group",children:[e.jsx("div",{className:"flex items-center gap-3 mb-2",children:e.jsx("span",{className:"text-red-500 font-bold text-lg md:text-xl uppercase tracking-wider group-hover:text-red-400 transition-colors",children:"Delete request to wipe data from server side"})}),e.jsx("p",{className:"text-red-400/80 text-sm normal-case font-medium",children:"Click here to fill out the form and submit your request securely."})]});return e.jsx(s,{title:"Privacy Policy",content:t,customCard:a})}function w(){return e.jsx(s,{title:"Terms of Use",content:`Version: 2026-08-14 Last updated: August 14, 2026

These Terms of Use govern your use of the Elevate Android app. By downloading, accessing, or using Elevate, you agree to these terms and the Elevate Privacy Policy.

1. Using Elevate
Elevate is provided for personal fitness tracking, workout planning, productivity, focus, wellness, app-limiting, and related features. Use it lawfully and only on devices and accounts you are authorized to use. Do not use Elevate to monitor, control, or interfere with another person’s device, apps, notifications, account, or personal information without a lawful basis and that person’s clear consent. Do not attempt to bypass, disable, reverse engineer, interfere with, or misuse Elevate’s security, app-blocking, backup, synchronization, subscription, Usage Access, Accessibility, or Notification Filter features.

2. Accounts and connected services
You are responsible for keeping your Google account, device, and Elevate account information secure and accurate. You are also responsible for activity that occurs through your account or device to the extent allowed by law. Some features require optional Android permissions or access to Google Drive, Google Calendar, or Google Play. You can revoke those permissions or disconnect those services, but the related features may stop working. You remain responsible for managing data and events that remain in your Google Drive or Google Calendar after you disconnect the service.

3. Subscriptions, trials, and payments
Elevate may offer trials and paid subscription plans. Prices, billing periods, trial terms, renewal details, and any applicable taxes are shown in Google Play before you confirm a purchase. Google Play processes purchases and recurring subscription payments. You can manage or cancel a subscription through your Google Play account. Cancellation normally prevents a future renewal; access may continue until the end of the current paid or trial period. Refunds are handled according to Google Play’s policies and any rights that apply to you by law. We do not receive or store your payment-card number. Elevate may store subscription or entitlement status to provide access to subscription-gated features.

4. Your content and our intellectual property
You retain your rights in the data and content you enter into Elevate. You give us the limited permission needed to store, process, back up, synchronize, and display that content to provide the app features you select. Elevate, its code, design, graphics, trademarks, and other app materials are owned by Brihit Nath or the relevant licensors. Subject to these terms, we grant you a limited, personal, non-exclusive, non-transferable, revocable right to use Elevate on a device you control. Open-source components remain subject to their applicable licenses.

5. Backups and availability
Google Drive backup is optional. Automatic backup begins only after you complete the Drive permission and first-backup flow. Backups and restores can fail because of device settings, permissions, storage, connectivity, provider outages, incompatible versions, or other causes. Keep any additional copies you consider important. Elevate is provided on an “as available” basis. We may modify, suspend, or discontinue features where reasonably necessary, including for maintenance, security, legal compliance, or product changes. We will make reasonable efforts to give notice of material changes that significantly affect access to account data when practicable.

6. Fitness, wellness, and safety notice
Elevate is not medical advice, diagnosis, treatment, physical therapy, nutrition advice, professional coaching, or a medical device. You are responsible for choosing appropriate exercises, weights, intensity, technique, and rest. Stop exercising and seek appropriate professional advice if you experience pain, dizziness, faintness, chest discomfort, unusual shortness of breath, or another concerning symptom. Elevate does not guarantee fitness, health, weight, strength, productivity, focus, wellness, backup, or discipline outcomes. Individual results vary.

7. Disclaimers and liability
To the maximum extent permitted by law, Elevate is provided without warranties of uninterrupted availability, error-free operation, suitability for a particular purpose, or accuracy of all content or results. Nothing in these terms limits rights or remedies that cannot lawfully be excluded, including applicable consumer-protection rights. To the maximum extent permitted by law, Brihit Nath is not liable for indirect, incidental, special, consequential, or punitive damages, or for loss of data, profits, goodwill, productivity, or opportunity arising from your use of Elevate. Where liability cannot lawfully be excluded, it is limited only to the extent permitted by applicable law.

8. Suspension or termination
We may suspend or restrict access where we reasonably believe you have materially breached these terms, misused Elevate, created a security or legal risk, or where required by law. You may stop using Elevate and request account deletion at any time. Sections that by their nature should continue after termination, including those on payments, intellectual property, disclaimers, liability, and disputes, continue to apply.

9. Changes to these terms
We may update these terms as Elevate changes or as the law requires. For material changes, we will update the version and date and provide notice in the app or by another appropriate method before the change takes effect where required. Continuing to use Elevate after the effective date means you accept the updated terms, except where the law requires another form of consent.

10. Governing law, disputes, and contact
These terms are governed by the laws of India. Courts in Kolkata have jurisdiction, subject to any mandatory consumer-protection or other rights that apply to you. For support or privacy requests, contact theduskdynamicsproductions@gmail.com. For grievances, contact Brihit Nath at brihitnath@gmail.com.

11. Device, account, and data responsibility
You are responsible for keeping your device, Google account, Elevate credentials, connected services, and information you enter reasonably secure and accurate. Use Android and Google security controls to protect a lost, stolen, shared, or compromised device or account. You are responsible for reviewing Drive backups and Google Calendar events that you create or synchronize through Elevate. Deleting, disconnecting, or uninstalling Elevate may not remove copies that remain in a connected third-party service.

12. Feedback
If you voluntarily send Elevate an idea, suggestion, enhancement request, or bug report, you grant us a non-exclusive, worldwide, royalty-free permission to use that feedback to improve Elevate without an obligation of compensation or attribution. Do not send confidential information that you do not want us to review or use for this purpose.

13. Third-party services
Google, Firebase, Google Play, Google Drive, Google Calendar, Open-Meteo, Android, and other third-party providers control their own services, availability, and policies. Elevate is not responsible for their independent actions, outages, changes, or terms. Your use of a connected service is also subject to that provider’s applicable terms and privacy policy.

14. Suspension and termination
We may suspend or restrict access to Elevate where we reasonably believe there is a material breach of these terms, misuse, fraud, a security or legal risk, or a legal requirement. You can stop using Elevate and request account deletion at any time. Provisions that by their nature should continue after use ends—including provisions about privacy requests, intellectual property, disclaimers, liability, and disputes—continue to apply to the extent permitted by law.

15. General terms
If a provision of these terms is invalid or unenforceable, the remainder remains effective to the maximum extent permitted by law. A delay or failure to enforce a right does not waive that right. These terms and the Privacy Policy are the agreement governing your use of Elevate, except for mandatory rights that apply to you or additional terms imposed by a connected third-party service. These terms are written in English. A translation may be provided for convenience, but the English version controls to the extent permitted by law.`})}export{b as PrivacyPage,w as TermsPage};
