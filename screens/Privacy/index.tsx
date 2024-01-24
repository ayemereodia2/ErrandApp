import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { RootState } from '../../services/store'

const PrivacyPolicy = () => {

    const navigation = useNavigation()

    const {
        data: currentUser,
        backgroundTheme,
        textTheme,
        landingPageTheme,
        loading,
      } = useSelector((state: RootState) => state.currentUserDetailsReducer)
    
      const theme = currentUser?.preferred_theme === 'light' ? true : false

  // https://tools.google.com/dlpage/gaoptout

  return (
    <SafeAreaView style={{backgroundColor: backgroundTheme}} className='px-4 pt-4 h-full'>

         <View className='flex-row items-center mb-5'>
            <TouchableOpacity onPress={()=> navigation.goBack()}>
            <Text  style={{color: textTheme}} className='ml-2'> <AntDesign name="arrowleft" size={24} /> </Text>
            </TouchableOpacity>
            <Text style={{color: textTheme}} className=' mx-auto text-lg font-bold'> Privacy Policy</Text>
        </View>

        <ScrollView>
      <Text style={{color: textTheme}}className='mb-2 text-base leading-6'>
SWAVE manages the information that we collect from you in accordance with applicable international privacy laws for data protection 2021. In this Policy, "SWAVE", "we", "our" and/or "us" means.</Text>
 <Text style={{color: textTheme}} className='mb-2 text-base leading-6'> (i) where you reside in any country Africa or other country you are using the SWAVE platform</Text>
  <Text style={{ color: textTheme }} className='mb-2 text-base leading-6'>(ii) where you reside anywhere outside the African region Exemplar Projects Group Pty Limited, an Australian company.</Text>
  <Text className='text-blue-600 py-2 text-base' onPress={() => Linking.openURL('http://www.swave.ng/privacy-policy')}> Read More at http://www.swave.ng/privacy-policy</Text>
 <Text style={{color: textTheme}} className='mb-2 text-base leading-6'> This Privacy Policy describes how SWAVE collects, uses, shares, and handles your personal data, and sets out the rights and obligations that both you and SWAVE have in relation to your personal data.
By accessing www.swave.com or our mobile application (together, the "Services") you accept and agree to the Terms and Conditions of SWAVE's user agreement ("User Agreement"), and acknowledge that your personal data may be collected, used and disclosed in accordance with this Privacy Policy. Except for any terms that are defined in this Privacy Policy then all other defined terms shall have the same meaning as that defined in the User Agreement. Note that under SWAVE's Terms and Conditions, you must not use the Services if you are under 18 years old.
SWAVE may, from time to time, modify this Privacy Policy (and update the web page on which it is displayed). If we materially change the ways in which SWAVE uses or shares your personal data previously collected from you through the Services, SWAVE will notify you through your SWAVE account, your registered email address or other communication. You should check that account regularly.</Text>
  <Text style={{color: textTheme}} className='mb-2 text-base leading-6'>1. Collection of Your Personal Data
Information we collect directly from you.
SWAVE collects personal data when you pre-register with SWAVE. This includes your full name, email address and location. In circumstances where the below information is not provided to us, we may be unable to provide the Services to you and carry out our contractual obligations with you.</Text>
 <Text style={{color: textTheme}} className='mb-2 text-base leading-6'>SWAVE collects personal data when you register with SWAVE. This includes:</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>i. your name, address, email address, phone number and other contact details.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>ii. your birth date and gender.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>iii. your credit card and account details, which are processed by a third-party service provider that handles payments for us.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>iv. your location and the location where you are interested in performing errands; and</Text>
 <Text style={{color: textTheme}} className='mb-2 text-base leading-6'>v. your occupation, work experience, resume, qualifications, education, post errands, earn money preferences, skillset, interests, and other information relevant for your fitness for errands.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>If you register in certain countries, we also give you the option of providing a photo or video to be associated with your SWAVE user ID. If your personal details change, it is your responsibility to update your SWAVE account with those changes, so that we can keep our records complete, accurate and up to date.
To enable us to improve our existing services, to create new service features, and to serve you and others with targeted marketing communications, SWAVE collects information about the way you use the Services, including the transactions you enter into on the Services, your feedback rating (including any references requested using our 'Reference' feature), the bids you make, the comments you post, and the transactions you enter into with our valued affiliate service providers.
You may apply through our job application submission form provided by a third-party service provider. If you do so, we collect the information you make available to us through your application submission, such as your resume, links to other online profiles, and other information you choose to provide.
Information we collect automatically when you use the Services.</Text>
 <Text style={{color: textTheme}} className='mb-2 text-base leading-6'>SWAVE may also receive and record the following information from your internet browser and computer, including through cookies and similar technologies, when you use the Services:</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>i. Computer and connection information such as statistics on page views, traffic to and from the Services, referral URL, IP address, unique device ID, browsing history and web log information; and</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>ii. Information about your use of the Services, including the date and time you visit the Services, the areas, or pages that you visit, the amount of time you spend viewing or using the Services, the number of times you return to the Services, other clickstream or website usage information, and emails that you open, forward or click-through to the Services.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>If you use a location enabled SWAVE service, if you allow us, we receive and process information about your precise location (for example, through GPS signals sent by your mobile device). We may also collect the precise location of your device when the app is running in the foreground or background or when the app is closed. We may also use a range of different technologies to confirm your location. When you use the Services, we also infer the general location of your device and the geographic regions our users come from. For example, your IP address may indicate your general geographic region.
Information we obtain from other sources.
In addition to data collected from your submissions, we also receive data from certain third parties, such as social media sites that you connect to your account (including Facebook, Instagram, LinkedIn, Twitter, and any other site you which you enable from time to time) as well as from identity verification service providers and other SWAVE group companies.
We may work with third party verification providers to perform police history checks or background checks on Runners and receive publicly available information such as court decisions.
We may also receive additional information about you from third parties such as data or marketing partners and combine it with other information we have about you.</Text>

 <Text style={{color: textTheme}} className='mb-2 text-base leading-6'>Information about you available to others
You are not anonymous to us when you log into the Services or post any content (including errands, items to be supplied, bids, comments, or feedback) on the Services or any associated forum.
When you:
use the Services to post a task or item to be supplied, or make a bid, or comment on a bid, or provide feedback on other users; or
otherwise communicate in a public forum on the Services,
your user ID and all the material that you post is visible and searchable to us, other SWAVE users and is also publicly available to other internet users. We strongly encourage you to use caution and discretion when posting and carefully consider whether and what to post or how you identify yourself on the Services.
SWAVE does not in any way control and does not accept any responsibility or liability whatsoever for the disclosure or use of personal data which is voluntarily posted by you in a publicly accessible area of the Services.</Text>

 <Text style={{color: textTheme}} className='mb-2 text-base leading-6'>2. How We Use Your Personal Data</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>SWAVE may use the information we collect for the following purposes:</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>i. Identification and authentication</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>ii. To protect SWAVE and the users of the Services</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>iii. To customize the content and any advertising displayed on the Services and permit content on the Services (such as postings, marketing or third-party advertisements) to be targeted, on an aggregate basis, to the users for whom it is most likely to be relevant.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>iv. To improve the Services and develop new service features.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>v. To provide, maintain and protect the Services and to verify the identity of authorized users of the Services.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>vi. Providing your information to a user with whom you have or had a contract facilitated by SWAVE.</Text>
 <Text style={{color: textTheme}} className='mb-2 text-base leading-6'>vii. As required by law, order of a court, tribunal, or regulator or if SWAVE reasonably believes that the use or disclosure of the information is reasonably necessary for enforcement related activities.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>viii. To ensure that SWAVE receives payment of the fees due to it.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>ix. To contact you to inform you about promotions or upcoming changes or improvements to the Services.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>We take this information as specified for the following legal reasons:</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>i. We need to perform this function to allow you to access the Services.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>ii. it is in our (and users) legitimate interests to ensure that the Services are secure.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>iii. It is in our legal interest to provide you with content and advertisements that are tailored to your interests.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>iv. We need some of your personal data to provide the services to you; it is in our legitimate interests to provide you with the best possible services.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>v. We need to perform this function to provide a safe and secure environment for our users and we have legitimate interests in protecting the integrity of the Services we offer.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>vi. We need to use your personal data in this way to provide the Services you request.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>vii. On such occasions, we are required by law to process your personal data.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>viii. We need to use your personal data in this way to fulfil a contract between you and us.</Text>

 <Text style={{color: textTheme}} className='mb-2 text-base leading-6'>We only contact you for marketing purposes with your consent; we may contact you regarding changes in the Services because it is in our legitimate interests to keep you informed about service changes that may affect you. See section below for further detail about marketing.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>To contact you to administer our User Agreement
Legal ground(s) for use: For example, we may notify you of a breach, or act on a request for a takedown notice in response to a claim of copyright infringement.
To conduct research</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>Legal ground(s) for use: It is in our legitimate interests to improve the Services through user questionnaires and feedback requests via the Services.
To expand our user base, including marketing communications to be targeted to potential users.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>Legal ground(s) for use: It is in our legitimate interest to inform potential users about the Services we offer.
To develop our relationships with affiliate service providers and provide or arrange internal or external verification services obtained by you via the Services
Legal ground(s) for use: It is in our legitimate interests to engage service providers and verification services.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>i. To generate data reports on an aggregated, non-personally identifiable basis, for both internal and third party use, but subject to any applicable laws (for example, we may show advertisers or investors trends relating to the general use of the Services); and
Legal reason(s) for use: It is in our legitimate interests (and the interests of our partners and affiliates) to understand how you and other users engage with the Services.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>ii. Your contact information may also be used for accounting, invoicing, and billing purposes, marketing purposes, by third party service providers to SWAVE, and to respond to any enquiry you make.
Legal reason(s) for use: It is in our legitimate interests to engage service providers to assist us in delivering the Services you request.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>iii. When you contact SWAVE, we may keep a record of the communication(s) between you and SWAVE to help resolve any issues you might have.
Legal reason(s) for use: We retain information when we are required to do so by law and because it is in our legitimate interests to protect our legal rights.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>iv. If other user(s) of the Services already have your user ID (or other information identifying you), and you have chosen to upload a photo or other personal data to your SWAVE account, we may show those user(s) that personal data.
Legal reason(s) for use: We display your photo to other users who have your user ID only with your consent, which you supply by uploading your photo.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>The Services allow you to review your experience dealing with others on the Services, who may in turn leave reviews about you. We compile these reviews to provide an aggregate rating for each user, which will publicly appear along with your profile. Please be aware that other users may rely on this rating when deciding whether to engage with you.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>Profiling and data analytics
We (or our service providers on our behalf) may collate information about you and your preferences, to identify market segments and use that information for data analytics and direct marketing.
We (or our service providers on our behalf) may use your name, street address, email address, phone number, and data collected from cookies and similar technologies about how you use the Services (including errands created and certain actions taken on the site) to conduct data analytics, including the creation of look-alike audiences. We use the results of data analytics for marketing, product and service development, and policy development.
We do not use sensitive information for data analytics.</Text>
 <Text style={{color: textTheme}} className='mb-2 text-base leading-6'>3. Cookies and Similar Technologies</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>SWAVE uses cookies and similar tracking technologies for several purposes including to access your information when you sign in, keep track of your preferences, direct specific content to you, report on SWAVE's user base, and to improve SWAVE's services. We also use cookies or anonymous identifiers when you interact with our affiliate service providers (for example, when you integrate your SWAVE account with your Facebook profile) and as further described below.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>We use the following types of cookies and similar technologies:</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>Strictly Necessary Cookies</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>We use cookies and similar technologies that are necessary to the operation of the Services. This includes technologies that allow you access to our website, services, mobile app or that are required to identify irregular site behaviour, prevent fraudulent activity and improve security, or that allow you to make use of our functions such as saved search or similar functions.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>If you change the settings on your internet browser to block or restrict cookies (including cookies associated with the Services), or to indicate when a cookie is being set by SWAVE, the Services may not work as intended. You should remember that, while you may still be able to use the Services if your cookies are disabled, the Services may not function properly on your device, and you may not be able to take advantage of certain SWAVE features.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>Functionality Cookies</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>We use cookies and similar technologies that allow us to offer you enhanced functionality when accessing or using the Services. This may include identifying you when you sign into our website, keeping you signed in as you browse or keeping track of your specified preferences, interests, or past items viewed so that we may enhance the presentation of content on our website and mobile app.</Text>

<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>3. Performance Analytics Cookies
We use cookies and similar technologies to assess the performance of the Services. We use this information to analyse and help us understand how you and other visitors use the Services so we can improve the content or layout of the Services. We also use this information to track the number of our visitors and analyse the popularity of the features we offer.
Advertising Cookies
We may use first-party or third-party cookies and similar technologies to deliver content, including ads relevant to your interests. This includes using technologies to understand the usefulness to you of the advertisements and content that has been delivered to you, such as whether you have clicked on an advertisement.
You may reject first-party advertising cookies and similar technologies through your browser settings (as described below). To learn more about the use of cookies or other technologies to deliver more relevant advertising and to control or opt out of the collection and use of the data by these third-party tools, visit here.
Browser and System Controls
You may set your browser or operating system to limit certain tracking or to decline cookies, but you may not be able to use certain features on the Services which require such cookies. Each browser and operating system are a little different, so please check your browser or operating system's settings or help section to learn more about how to delete or disable cookies and tracking.
If you wish to prevent your data from being used by Google Analytics, Google has developed the Google Analytics opt-out browser add-on available here, and you can manage your Google accounts here.</Text>
 <Text style={{color: textTheme}} className='mb-2 text-base leading-6'>4. How We Share Your Personal Data
SWAVE may disclose the information We collect from you as follows:
SWAVE Affiliates. We may share your personal data with our affiliated companies.
Service Providers. We share your personal data with third party service providers that provide business, verification, professional or technical support functions for us, help us operate our business and the Services, or administer activities on our behalf.
Analytics Partners. We use analytics services such as Google Analytics to collect and process certain analytics data. These services may also collect information about your use of other websites, apps, and online resources. You can learn about Google’s practices by going to <Text className='text-blue-600 py-2' onPress={() => Linking.openURL('https://www.google.com/policies/privacy/partners/')}>https://www.google.com/policies/privacy/partners/.</Text>   , and opt-out of them by downloading the Google Analytics opt-out browser add-on, available at <Text className='text-blue-600 py-2' onPress={() => Linking.openURL('https://tools.google.com/dlpage/gaoptout')}>https://tools.google.com/dlpage/gaoptout.</Text> 
Advertising Partners. We may work with third party advertising partners to show you ads that we think may interest you. If you do not wish to receive personalized ads, please opt-out by going to the 'Setting' link, then 'Notification Settings' and update your preferences.
Other Third Parties. We may share your personal data with other third parties who participate in SWAVE marketing initiatives, as authorised by you or on an aggregate basis, and with consultants, advisors, and analytics providers as necessary to measure and improve the Services we provide to you. We do not rent, sell, or share information about you with nonaffiliated third parties for their direct marketing purposes, unless we have your permission.
Sharing Between Users. We may share information, such as ratings and reviews about you, with other users who are looking for Runners on the Services.
Legal Matters & Safety. We may share your personal data to respond to judicial process or provide information to law enforcement or regulatory agencies or in connection with an investigation on matters related to public safety, as permitted, or required by law. We may also share your personal data if we believe there has been a violation of our Terms and Conditions, our rights, or the rights of any third party.
Sale or Transfer of Business or Assets. If we, or any of our businesses, are sold or disposed of, whether by merger, sale of assets or otherwise, or in the event of insolvency, bankruptcy or receivership, your personal data may be one of the assets sold or merged in connection with the transaction.
With Your Permission. We may share your personal data with any other third party with your consent or as necessary to deliver a service you requested.</Text>
 <Text style={{color: textTheme}} className='mb-2 text-base leading-6'>5. Security
Your account is protected by a password for your privacy and security. We take reasonable steps to protect your personal data from unauthorized access, use and disclosure, however we cannot guarantee the absolute security of that information, or that our systems will be completely free from third party interception or are incorruptible from viruses. We cannot and do not guarantee that information you send from your computer to us over the Internet will be protected by any form of encryption (encoding software). Considering this, we cannot and do not ensure or warrant the security or privacy of your personal data, including payment and account details. You transmit your personal data to us at your own risk. You are entirely responsible for maintaining the security of your passwords and/or account information.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>6. Third Parties
The Services may contain links to third party websites including the networks of our valued affiliate service providers, advertisers, and PayPal, or make available services obtained from third parties, including verification services by third party verification providers. If you follow a link to any of these websites, for instance PayPal payment system, or use any services obtained from third party service providers via the Services that requires you to provide personal data directly to such third parties (for instance third party verification providers), note that they have their own privacy policies. If you use the Services to link to another site, or use a service obtained from a third-party service provider via the Services, you will be subject to that site's or third party's terms and conditions of use, privacy policy and security statement. We strongly encourage you to view these before disclosing any of your personal data on such sites. SWAVE does not control, and does not accept any responsibility or liability for, the privacy policy of, and use of personal data by, any party other than SWAVE, including any user of the Services, the operators of any website to which the Services link, or third-party service providers to whom you directly provide your personal data (including sensitive information if relevant) to.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>7. International Transfers
When you use SWAVE Services, some of your personal data may be transferred to other SWAVE group companies (such as our headquarters in Queensland, Australia) outside the African region that do not have equivalent data protection laws to what is obtainable in Nigeria or other African countries where SWAVE operates. We may also engage service providers for the purposes detailed above that are located outside Africa. We take steps to ensure your personal data is safe and secure when transferring it outside of your country of residence. For more information, please contact us as provided below. If the recipient is in a country that is not subject to an adequacy decision, we may enter the 'standard contractual clauses' with the recipient.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>8. Marketing
When you register on the Services you may be given the opportunity to elect ("opt-in") or decline (“opt-out”) to receive updates on our latest services, news, and special offers, and those of our valued affiliate service providers ("Marketing Information"), via your SWAVE account, personal e-mail address, post, or telephone. If you conclude a transaction with the Services, you may also be given the opportunity to opt- in to receive Marketing Material from SWAVE and our valued affiliate service providers.
Once you opt-in to receive Marketing information, you may, at any time, opt-out of receiving it. To opt-out go to the 'Setting' link, then 'Notification Settings' and update your preferences. You can also click on the "unsubscribe" link in any email containing Marketing Material that we send you, or you can request an opt-out by emailing SWAVE using the contact information provided on the Services. If you no longer consent to receiving Marketing information, then you must opt-out in one of these ways.
SWAVE may contact you as the result of a referral by another user of the Services who has provided us with contact information, such as your name and email address. The use of contact information received in connection with a referral will be governed by this Privacy Policy. You may, at any time, opt-out of SWAVE's referral system by emailing SWAVE using the contact information provided on the Services.
SWAVE reserves the right to send you administrative and account-related messages even if you opt out of receiving Marketing Material.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>9. Your Rights and Choices you can make
Rights in Certain Countries. In the European Economic Area and certain countries, users have the right to access, edit, update, restrict processing and/ or delete the personal data that we hold about you or to receive a copy of it in a portable format by contacting us here. Where we process your personal data with your consent, you may withdraw it at any time. You also have a right to object to processing based on legitimate interests. These rights may be limited in some circumstances, for example, if:
We are legally permitted or required to deny you access to, and/ or to retain, the information because we are subject to a legal requirement or have a compelling legitimate interest; or
You make a request that is unreasonably repetitive, requires SWAVE to make a disproportionate effort, risks the privacy of others, or there are other valid reasons why we cannot comply.
We need to prevent information in our systems from being accidentally or maliciously destroyed. This means that, where you delete information from the Services, residual copies of that information on our active servers, as well as any corresponding information on our back-up systems, may not be immediately deleted.
If you have concerns about how we handle your personal data or require further information, please email SWAVE using the contact form provided on the Services. If you have unresolved complaints, you have the right to complain to a data protection authority.
Location Information. You can prevent your device from sharing precise location information at any time through your device’s operating system settings.
There is no accepted standard on how to respond to Do Not Track signals, and we do not respond to such signals.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>10. Retention
We retain your personal data for as long as is necessary regarding the purposes for which it was collected or lawfully further processed, or for as long as may be necessary considering our legal obligations or to allow us to pursue, defend or exercise legal claims.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>11. Children’s Privacy
We do not knowingly collect, maintain, or use personal data from children under 18 years of age, and no part of the Services are directed to children. If you learn that a child has provided us with personal data in violation of this Privacy Policy, please alert us using our contact information below.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>12. Contact us
If you have any questions about this Privacy Policy or about the way we process your personal data, please contact us: <Text className='text-blue-600 font-semibold'>support@swaveafrica.com, contactline@exemplarproject.org </Text></Text>

<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>SWAVE Data Retention Policy</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>1. Introduction
This Data Retention Policy outlines the principles and procedures governing the retention and deletion of user data collected by SWAVE. SWAVE is committed to ensuring that user data is handled in a secure and responsible manner, and that data retention is carried out in compliance with applicable laws and regulations.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>2. Data Categories
SWAVE collects and processes various categories of data, including personal information and sensitive user data. The data may encompass but is not limited to user profiles, transaction history, communication records, location data, and identification documents.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>3. Purpose of Data Retention
The primary purpose of retaining user data is to facilitate the delivery of services and ensure legal compliance. Data retention is necessary for:</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>i. Fulfilling service requests, including matching users with service providers.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>ii. Complying with legal obligations, such as tax and financial regulations.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>iii. Resolving disputes and conflicts, including transaction-related issues.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>iv. Investigating and preventing fraud, security breaches, and misconduct.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>v. Ensuring historical records for transparency, user support, and improvement of our platform.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>4. Data Retention Periods</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>SWAVE establishes specific data retention periods based on the type and purpose of the data. Below are general guidelines for data retention:</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>4.1. Personal Information:
Personal information, such as user profiles and contact details, is retained for as long as the user maintains an active account or as required by applicable laws in the relevant country where SWAVE is operational.
Data related to past transactions is generally retained for a period of [six months] from the date of the transaction.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>4.2. Sensitive User Data:
Sensitive user data, including identification numbers, is retained only for the duration necessary to meet legal and regulatory requirements.
Deletion of sensitive user data is carried out promptly upon the completion of legal obligations.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>4.3. Communication Records:
Records of communications between users and between users and SWAVE are retained for [12 months] to resolve disputes, support investigations, and improve our platform.
After the specified retention period, communication records are securely deleted.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>4.4. Location Data:
Location data is retained for as long as the user's location services are enabled within the app.
Users have the option to disable location services at any time, after which no new location data is collected.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>5. Data Deletion Procedures
SWAVE has implemented data deletion procedures to ensure secure and irreversible removal of user data. When data reaches the end of its retention period, it is promptly deleted from all active databases, archives, and backups. SWAVE takes the following steps to delete data:</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>i. Identification of data eligible for deletion based on the retention policy.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>ii. Secure deletion from all active databases and systems.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>iii. Removal from backups during regular data backup cycles.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>iv. Verification of successful data deletion.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>6. User Control
Users have control over some aspects of their data retention. This includes the ability to update or delete their account information. Users may also revoke consent for certain data processing activities, as outlined in our Privacy Policy.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>7. Compliance with Regulations
SWAVE is committed to adhering to data protection laws and regulations that may require specific data retention periods or procedures. We continuously review and update our data retention practices, remaining compliant with evolving legal requirements.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>8. Contact Information
If you have questions or concerns about our Data Retention Policy, or if you wish to request the deletion of specific data, please contact us at <Text className='text-blue-600 font-semibold'>support@swaveafrica.com, contactline@exemplarproject.org </Text>
        </Text>
        
<Text className='pb-2 text-base'> SWAVE Data Disclosure Policy</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>1. Introduction
This Data Disclosure Policy outlines SWAVE's approach to the disclosure of user data and the circumstances under which user data may be shared with third parties. We are committed to ensuring the privacy and security of user data and to being transparent about our data sharing practices.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6' >2. Data Categories
SWAVE collects and processes various categories of data, including personal information and sensitive user data. The data may encompass but is not limited to user profiles, transaction history, communication records, location data, and identification documents.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6' >3. Purpose of Data Disclosure
User data may be disclosed for specific purposes in line with our commitment to providing services, legal compliance, and the improvement of our platform. Data disclosure may be necessary for:</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>3.1. Service Delivery:
To connect users with service providers and facilitate requested services.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6' >3.2. Legal Compliance: className='mb-2 text-base leading-6' className='mb-2 text-base leading-6'
To comply with legal and regulatory requirements, including tax, financial, and reporting obligations.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6' >3.3. Dispute Resolution:
To investigate and resolve disputes or conflicts between users.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6' >3.4. Fraud Prevention and Security:</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6' >To prevent and address fraud, security breaches, and misconduct on our platform.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6' >3.5. Platform Improvement:
To analyze user interactions and behavior to improve our platform and services.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6' >4. Types of Data Disclosure</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6' >4.1. Disclosure to Service Providers:
User data may be shared with service providers who are directly involved in providing services to users.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6' >4.2. Disclosure to Users:
Certain user data, such as profiles and reviews, is visible to other users on the platform.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6' >4.3. Disclosure to Third-Party Partners:
Data may be shared with trusted third-party partners for purposes such as marketing, analytics, or improving user experience.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'  >4.4. Legal Disclosure:
Data may be disclosed to comply with legal obligations, respond to law enforcement or government requests, or protect the rights and safety of our users and SWAVE.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6' > 5. Data Anonymization
To protect user privacy, SWAVE may use data anonymization techniques to ensure that disclosed data cannot be traced back to individual users.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6' >6. Consent for Data Disclosure
SWAVE may obtain user consent for certain data processing and disclosure activities, as outlined in our privacy policy.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6' >7. Data Security
We take data security seriously and have implemented measures to protect user data against unauthorized access, disclosure, or alteration.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>8. Compliance with Regulations
SWAVE is committed to adhering to data protection laws and regulations related to data disclosure. We continuously review and update our data disclosure practices, remaining compliant with evolving legal requirements.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>9. Contact Information
If you have questions or concerns about our Data Disclosure Policy or the disclosure of specific data, please contact us at <Text className='text-blue-600 font-semibold'>support@swaveafrica.com, contactline@exemplarproject.org </Text></Text>

<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>Secure Data Handling Policy for SWAVE</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>1. Introduction
This Secure Data Handling Policy outlines SWAVE's commitment to ensuring the security, confidentiality, and integrity of user data. Secure data handling is fundamental to maintaining user trust and complying with data protection regulations.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>2. Data Classification
Data at SWAVE is classified into the following categories:</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>2.1. Personal Data:
Information that can be used to identify an individual, including user profiles, contact information, and transaction history.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>2.2. Sensitive User Data:
Highly confidential data, such as identification numbers, is treated with special care and access restrictions.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>2.3. Communication Records:
Records of communications between users and between users and SWAVE, including messages and chat logs.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>2.4. Location Data:
Data related to user location, collected to facilitate service requests.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>3. Data Handling Procedures</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>3.1. Data Access and Usage:</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>Data access is granted on a need-to-know basis. Employees and contractors are only provided access to data required for their job responsibilities.
Data should not be shared or used for personal purposes, and employees must adhere to a strict code of confidentiality.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>3.2. Data Transmission:
Data transmitted over internal and external networks should be encrypted to protect it from interception or unauthorized access.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>3.3. Password Protection:
Passwords should be complex, unique, and changed regularly.
Passwords must not be shared or written down in an accessible location.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6' >3.4. Data Storage:
Data should be stored securely, with access restricted to authorized personnel.
Hard copies of data should be stored securely and disposed of through secure shredding.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6' >3.5. Data Encryption:
Data in transit and at rest should be encrypted to protect it from unauthorized access.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6' >3.6. Training:
Employees and contractors should receive regular training in data handling best practices and security procedures.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6' >4. Data Breach Response
In the event of a data breach, SWAVE will follow a pre-established response plan that includes notifying affected parties, investigating the breach, and taking corrective action to prevent similar incidents in the future. Data breach response procedures comply with applicable data protection laws and regulations.</Text>

<Text style={{color: textTheme}} className='mb-2 text-base leading-6' >Data Deletion Policy for SWAVE</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6' >1. Introduction
This Data Deletion Policy outlines SWAVE's procedures for the secure and irreversible deletion of user data. Data deletion is essential to comply with data protection regulations and to ensure that user data is not retained beyond the necessary period.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6' >2. Data Categories
User data collected by SWAVE falls into the following categories:</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6' >2.1. Personal Data:
Information that can be used to identify an individual, such as user profiles, contact information, and transaction history.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6' >2.2. Sensitive User Data:
Highly confidential data, including identification numbers.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6' >2.3. Communication Records:
Records of communications between users and SWAVE, including messages and chat logs.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6' >3. Data Deletion Procedures</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6' >3.1. Data Identification:
Data eligible for deletion is identified based on the data retention policy.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6' >3.2. Secure Deletion:
Data is securely deleted from all active databases, systems, and locations where it is stored.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6' >3.3. Removal from Backups:
Data is removed from backups during regular data backup cycles.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6' >3.4. Verification:
Successful data deletion is verified to ensure data is irreversibly removed.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6' >4. Legal and Regulatory Compliance
SWAVE complies with data protection regulations that may require specific data deletion periods or procedures. We continuously review and update our data deletion practices remaining compliant with evolving legal requirements.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>5. User Control
Users can update or delete their account information through the SWAVE app. They may also revoke consent for certain data processing activities, as outlined in our Privacy Policy.</Text>
<Text style={{color: textTheme}} className='mb-2 text-base leading-6'>6. Contact Information
If you have questions or concerns about our Data Deletion Policy or the deletion of specific data, please contact us at <Text className='text-blue-600 font-semibold'>support@swaveafrica.com, contactline@exemplarproject.org </Text> </Text>
    
</ScrollView>
    </SafeAreaView>
  )
}

export default PrivacyPolicy