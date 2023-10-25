import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { RootState } from '../../services/store'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const TermsAndConditions = () => {
    const navigation = useNavigation()

    const {
        data: currentUser,
        backgroundTheme,
        textTheme,
        landingPageTheme,
        loading,
      } = useSelector((state: RootState) => state.currentUserDetailsReducer)
    
      const theme = currentUser?.preferred_theme === 'light' ? true : false

  return (
    <SafeAreaView className='px-4 h-full pt-4 w-full' style={{backgroundColor: backgroundTheme}}>

        <View className='flex-row items-center mb-5'>
            <TouchableOpacity onPress={()=> navigation.goBack()}>
            <Text  style={{color: textTheme}} className='ml-2'> <AntDesign name="arrowleft" size={24} /> </Text>
            </TouchableOpacity>
            <Text style={{color: textTheme}} className='mx-auto text-lg font-bold'> Terms And Conditions</Text>
        </View>

    <ScrollView>
      <Text style={{color: textTheme}}>
Here are our terms and conditions. Country Specific Terms in Appendix B shall also apply to this Agreement. Please contact us here if you have any other questions. Thanks for connecting.
The SWAVE terms & conditions (updated September 2023) outline SWAVE's and Your obligations and responsibilities on the SWAVE Platform. In this update to our Terms and Conditions, SWAVE has updated information related to the implication for Users for cancelling Errands following formation of an Errand Contract and Fees (including Cancellation Fees).
User Agreement: www.swave.ng
SWAVE operates an online platform allowing Users to connect through the SWAVE Platform with other Users who provide Services.
Please read these terms and all Policies including the Community Guidelines and Privacy Policy carefully before using the SWAVE Platform. These Policies are incorporated into this Agreement by reference.
All defined terms in this Agreement have the meaning given to them in the SWAVE Glossary.

1. SCOPE OF SWAVE SERVICES
Basic Principles
1.1 SWAVE provides the SWAVE Platform to enable Senders to publish Posted Errands.
1.2 Runners may make a Bid in response to a Posted Errand. Some parts of Bid details may be made publicly available, including to internet users who are not Users.
1.3 A Senders may revoke or modify a Posted Errand at any time before he/she accepts a Bid. SWAVE reserves the right to cancel all Bids on a Posted Errand made prior to the modification.
1.4 If a Senders accepts a Bid on the SWAVE Platform, an Errand Contract is created between the Runner and the Senders.
1.5 Upon creation of an Errand Contract, the Senders must pay the Agreed Price into the Wallet.
1.6 Upon creation of the Errand Contract, SWAVE has rendered SWAVE Services, and the Connection Fee is due and payable.
1.7 Once the Errand Contract is created, the Runner and Senders may vary the Errand Contract on the SWAVE Platform. The Senders and Runner are encouraged to use SWAVE's private messaging system to amend or vary the Errand Contract (including the Agreed Price) or to otherwise communicate.
1.8 Once the Services are complete, the Runner must provide notice of that on the SWAVE Platform.
1.9 Once the Services are complete, the Senders must provide notice of that on the SWAVE Platform.
1.10 Once the Posted Errand has been completed and the Senders confirms the Services are completed, or if SWAVE is satisfied the Services have been completed, the Runner Service Fee will be payable, and the Runner Funds will be released by SWAVE from the Wallet to the Runner. However, this process does not apply to the payment of Recurring Services which is addressed in clause 1.20 below.
1.11 After the Errand Contract is completed, the parties are encouraged to review and provide feedback of the Services on the SWAVE Platform.
Search Assist
1.11 SWAVE may also provide a Search Assist feature enabling Senders to submit a Bid for Services.
1.12 A Bid submitted by a Senders using Search Assist may be notified to other Users and such Users may elect to make an Instant Claim of it.
1.13 When using Search Assist an Errand Contract is created when a Runner makes an Instant Claim (and in the case of Recurring Services an Errand Contract is created for the first Occurrence only). For Recurring Services, the next Errand Contract is created upon completion of the previous Occurrence.
1.14 A Senders may revoke or modify its Bid in using Search Assist, including for Recurring Services, at any time before a Runner makes an Instant Claim. SWAVE reserves the right to cancel all Posted Errands made prior to the revocation or modification.
Runner Listing
1.15 SWAVE may also provide a Runner Listing feature enabling Runners to publish Bids for Services.
1.16 SWAVE may publish Runner Listings from time to time in its absolute discretion.
1.18 A Senders may request to book a Runner Listing by clicking on the Request Booking button and completing the booking request. The Runner may then make a Bid to perform the Errand. When using Runner Listing, a Errand Contract is created when the Senders accepts the Bid made by the Runner.
1.19 A Runner may revoke or modify its Runner Listing at any time before a Senders accepts a Runner’s Bid.
Recurring Service
1.20 For Recurring Services and subject to clause 1.21, once the Occurrence has been completed and the Runner confirms the Occurrence is completed (or if SWAVE is satisfied the Occurrence is completed) then the Runner Funds for that Occurrence will automatically be released by SWAVE from the Wallet to the Runner.
1.21 The Senders may elect to pause automatic payment of Runner Funds for an Occurrence within 24 hours from when the Runner confirms the Occurrence is completed. If the Senders pauses such automatic payment in accordance with this clause, then the Runner Funds will not be released by SWAVE from the Wallet to the Runner until the Senders also confirms that the Occurrence is completed.
2. SWAVE'S ROLE AND OBLIGATIONS
2.1 SWAVE provides the SWAVE Platform only, enabling Users to publish and make Bids on Posted Errands or publish Bids for Services or make Instant Claims of Runner Listings.
2.2 SWAVE only permits individuals over 18 years of age to become Users.
2.3 Users must be natural people but can specify within their account description that they represent a business entity.
2.4 At its absolute discretion, SWAVE may refuse to allow any person to register or create an account with SWAVE or cancel or suspend or modify any existing account including if SWAVE reasonably forms the view that a user’s conduct (including a breach of this Agreement) is detrimental to the operation of the SWAVE Platform.
2.5 Registering and creating an account with SWAVE is free. There is no charge for a Senders to post Errands, or for other SWAVE Users to review content on the SWAVE Platform, including Posted Errands.
2.6 SWAVE accepts no liability for any aspect of the Senders and Runner interaction, including but not limited to the description, performance, or delivery of Services.
2.7 SWAVE has no responsibility and makes no warranty as to the truth or accuracy of any aspect of any information provided by Users, including, but not limited to, the ability of Runners to perform Errands or supply items, or the honesty or accuracy of any information provided by Sender or the Senders' ability to pay for the Services requested.
2.8 Except for liability in relation to any Non-excludable Condition, the SWAVE Service is provided on an "as is" basis, and without any warranty or condition, express or implied. To the extent permitted by law, we and our suppliers specifically disclaim any implied warranties of title, merchantability, fitness for a particular purpose and non-infringement.
2.9 SWAVE has no obligation to any User to assist or involve itself in any dispute between Users, although may do so to improve User experience.
2.10 You understand and agree that SWAVE does not undertake any investigation in relation to any Runner or third party service provider before they are admitted to the platform, including criminal checks, verification of qualification or license held, or any character or other checks of the suitability of a Runner or third party service provider to perform any Errand which they may claim to be able to provide on the platform. You understand and agree that you are solely responsible for conducting any appropriate background checks and obtaining references, licenses, certifications, or proof of insurance prior to engaging a Runner to perform services. You further understand and agree that you are solely responsible for making your own evaluations, decisions, and assessments about choosing a Runner. You agree to assume all risks and you agree to expressly release, indemnify, and hold harmless SWAVE from all loss, liability, injury, death, damage, or costs arising or in any way related to the services.
3. USER OBLIGATIONS
3.1 You will always:
(a) comply with this Agreement (including all Policies) and all applicable laws and regulations.
(b) only post accurate information on the SWAVE Platform.
(c) ensure that You are aware of any laws that apply to You as a Senders or Runner, or in relation to using the SWAVE Platform.
3.2 You agree that any content (whether provided by SWAVE, a User or a third party) on the SWAVE Platform may not be used on third party sites or for other business purposes without SWAVE's prior permission.
3.3 You must not use the SWAVE Platform for any illegal or immoral purpose.
3.4 You must always maintain control of Your SWAVE account. This includes not allowing others to use Your account, or by transferring or selling Your account or any of its content to another person.
3.5 You grant SWAVE an unrestricted, worldwide, royalty-free license to use, reproduce, modify, and adapt any content and information posted on the SWAVE Platform for the purpose of publishing material on the SWAVE Platform and as otherwise may be required to provide the SWAVE Service, for the general promotion of the SWAVE Service, and as permitted by this Agreement.
3.6 You agree that any information posted on the SWAVE Platform must not, in any way whatsoever, be potentially harmful to SWAVE or any other person. Harm includes, but is not limited to, economic loss that will or may be suffered by SWAVE.
3.7 Without limiting any provision of this Agreement, any information You supply to SWAVE or publish in a Bid, or a Posted Errand (including as part of a Bid) must be up to date and kept up to date and must not:
(a) be false, inaccurate, or misleading or deceptive.
(b) be fraudulent or involve the sale of counterfeit or stolen items.
(c) infringe any third party's copyright, patent, trademark, trade secret or other proprietary rights or intellectual property rights, rights of publicity, confidentiality, or privacy.
(d) violate any applicable law, statute, ordinance, or regulation (including, but not limited to, those governing export and import control, consumer protection, unfair competition, criminal law, antidiscrimination, and trade practices/fair trading laws).
(e) be defamatory, libelous, threatening or harassing.
(f) be obscene or contain any material that, in SWAVE's sole and absolute discretion, is in any way inappropriate or unlawful, including, but not limited to obscene, inappropriate, or unlawful images; or
(g) contain any malicious code, data or set of instructions that intentionally or unintentionally causes harm or subverts the intended function of any SWAVE Platform, including, but not limited to viruses, trojan horses, worms, time bombs, cancelbots, easter eggs or other computer programming routines that may damage, modify, delete, detrimentally interfere with, surreptitiously intercept, access without authority or expropriate any system, data or Personal Information.
3.8 SWAVE Platform may from time to time engage location-based or map-based functionality. The SWAVE Platform may display the location of Senders and Runners to persons browsing the SWAVE Platform. A User should never disclose personal details such as the Senders's full name, street number, phone number or email address in a Posted Errand or in any other public communication on the SWAVE Platform.
3.9 If You are a Runner, you must have the right to provide Services under an Errand Contract and to work in the jurisdiction where the Services are performed. You must comply with tax and regulatory obligations in relation to any payment (including Runner Funds) received under an Errand Contract.
3.10 You must not, when supplying Services, charge Senders any fees on top of the Runner Funds. However, the parties to an Errand Contract may agree to amend the Agreed Price through the SWAVE Platform.
3.11 You must not request payments outside of the SWAVE Platform from the Senders for the Services except to the extent permitted by clause 3.11 and only if the SWAVE Platform does not facilitate the reimbursement via the Wallet of costs considered in clause 3.11.
3.11 If a Runner agrees to pay some costs of completing the Services (such as equipment to complete the Services), the Runner is solely responsible for obtaining any reimbursement from the Senders. SWAVE advises Runners not to agree to incur costs in advance of receiving the payment for these costs, unless the Runner is confident the Senders will reimburse the costs promptly.
3.12 For the proper operation of the SWAVE Platform (including insurance, proper pricing, and compliance with Policies), the Runner must ensure that, if it subcontracts any part of the performance of the Services to a third party in accordance with an Errand Contract, then that third party must also be a registered User of the SWAVE Platform.
3.13 If SWAVE determines at its sole discretion that You have breached any obligation under this clause 3 or that You have breached one or more Errand Contracts, it reserves the rights to remove any content, Posted Errand or Bid You have submitted to the SWAVE Service or cancel or suspend Your account and/or any Errand Contracts.
4. FEES
4.1 A Connection Fee (service charge) is payable to SWAVE in respect of bookings made on the Platform. When a customer accepts a Runner's Bid, the Errand is assigned to that Runner and an Errand Contract is formed between the two parties. At this time the Customer (Runner) will be charged the Agreed Price plus the Connection Fee as consideration for the Senders’s use of the SWAVE Services.
4.2 Separate to the Connection Fee charged to the Senders, a Runner is charged a Runner Service Fee as consideration for the Runner’s use of the SWAVE Services.
4.3 When a customer releases the Errand Payment to the Runner, the Runner Service Fee and the Connection Fee will be retained by SWAVE.
4.4 The Connection Fee and the Runner Service Fee include GST (or equivalent tax on supplies, including VAT).
4.5 Subject to clause 5, all Fees and charges payable to SWAVE are non-cancellable and non-refundable, save for Your rights under any Non-Excludable Conditions.
4.6 If SWAVE introduces a new service on the SWAVE Platform, the Fees applying to that service will be payable from the launch of the service.
4.7 SWAVE reserves the right to amend any Fees and Cancellation Fees from time to time and any changes will be updated on SWAVE's website.
5. PAYMENTS, REFUNDS AND CANCELLATIONS
5.1 If the Errand Contract is cancelled for any reason (by a Senders, a Runner or under this Agreement) prior to the commencement of the Errand Contract, then if SWAVE is reasonably satisfied that the Agreed Price (and if applicable, the Connection Fee) should be returned to the Senders then those amounts (as applicable) will be refunded to the Senders as SWAVE Credits and a Cancellation Fee will be due to SWAVE by the User who the cancellation of the Errand Contract is attributable to under clause 5.7 or 5.8.
5.2 If the Senders is responsible for the cancellation of the Errand Contract (see clause 5.8), the Connection Fee will be retained by SWAVE.
5.3 If the Runner is responsible for the cancellation of the Errand Contract (see clause 5.7), SWAVE will deduct the Cancellation Fee from the Runner’s next payout request (or from multiple payout requests, until the Cancellation Fee is fully paid).
5.4 Upon request by the relevant Customer submitted to SWAVE Support, SWAVE may refund the Agreed Price (and Connection Fee, as applicable) to the Senders's wallet.
5.5 Any amount returned by SWAVE to a Senders on behalf of a Runner under clause 5.1 will be a debt owed by the Runner to SWAVE and may be offset by SWAVE against any other payments owed at any time to the Runner.
5.6 Any outstanding Cancellation Fee owed by a User under clause 5.1 will be a debt owed by that User to SWAVE and may also be offset by SWAVE against any other payments owed at any time to the User.
5.7 Cancellation of an Errand Contract will be attributable to the Runner where:
(a) the Senders and the Runner mutually agree to cancel the Errand Contract; or
(b) following reasonable but unsuccessful attempts by a Senders to contact a Runner to perform the Errand Contract, the Errand Contract is cancelled by the Senders; or
(c) the Runner cancels the Errand Contract; or
(d) an Errand Contract is cancelled in accordance with clause 3.13 because of the Runner’s actions or breach.
5.8 A Cancellation of an Errand Contract will be attributable to a Senders where:
(a) the Senders cancels the Errand Contract (other than in accordance with clause 5.7(b); or
(b) an Errand Contract is cancelled in accordance with clause 3.13 because of the Senders’s actions or breach.
5.9 If the parties agree to any additional cancellation fee payable under the Errand Contract, it is the responsibility of the party to claim any amount owed directly from the other.
5.10 SWAVE may take up to 5-7 business days to process the return of the Agreed Price to the Senders as SWAVE Credits or to process (following a request from a Senders) a refund to the Senders’s wallet.
5.11 If, for any reason, the Runner Funds cannot be transferred or otherwise made to the Runner or returned to the Senders (as the case may be) or no claim is otherwise made for the Runner Funds, the Runner Funds will remain in the Incoming Fund Account until paid or otherwise for up to three months from the date the Senders initially paid the Agreed Price into the Wallet.
5.11 Following the 3 months referred to in clause 5.11, and provided there is still no dispute in respect of the Runner Funds, the Runner Funds will be credited to the Senders as SWAVE Credits.
5.12 If the Errand Contract is cancelled and a User who is party to the Errand Contract can show that work under an Errand Contract was commenced, then the amount of the Agreed Price to be returned to the Senders will be conditional upon the mediation and dispute process in clause 18. However, the Cancellation Fee will always be due in accordance with clause 5.1.
5.13 SWAVE may suspend a User Account in its sole discretion for repeated Cancellations.
6. SWAVE CREDITS
6.1 SWAVE Credits:
(a) can be used by the credited User to pay for any new Services via the SWAVE Platform.
(b) are not refundable or redeemable for cash other than where the Senders has submitted a request for the return of SWAVE Credits to their wallet.
(c) cannot be replaced, exchanged, reloaded, or transferred to another card or account.
(d) are valid for 3 months from the date on which those SWAVE Credits are applied to a User's account, the date of issue or purchase or any expiry date applied by SWAVE (conditional upon any contrary specific jurisdictional legislative requirements).
(e) if the SWAVE Credits is acquired other than under this Agreement, it may also be conditional on compliance with additional, or different, terms and conditions, as specified in relation to SWAVE Credits, such as a restriction on when the SWAVE Credits is redeemable (for example only for a User's first Errand Contract), specify a minimum Services value, or specify a maximum credit or discount value; and
(f) must not be reproduced, copied, distributed, or published directly or indirectly in any form or by any means for use by an entity other than the credited User, or stored in a data retrieval system, without SWAVE's prior written permission.
6.2 The User credited with SWAVE Credits is solely responsible for the security of any SWAVE Credits. Save for the Non-Excludable Conditions, SWAVE will have no liability for any loss or damage to SWAVE Credits and does not have any obligation to replace SWAVE Credits.
6.3 SWAVE will not accept, and may refuse or cancel, any SWAVE Credits, which it reasonably determines in its discretion, have been used in breach of this Agreement or have been forged, tampered with, or are otherwise fraudulent and SWAVE reserves the right to refer any suspected fraudulent activity to relevant law enforcement authorities. SWAVE Credits, such as promotional coupons, vouchers or codes distributed or circulated without our approval, for example on an internet message board or on a "bargains" website, are not valid for use and may be refused or cancelled.
6.4 SWAVE is entitled to any value on SWAVE Credits which is not redeemed before the SWAVE Credits expires or is cancelled by SWAVE.
7. BUSINESS PARTNERS
7.1 SWAVE may enter into agreements with Business Partners and may seek to engage Runners in the provision of Business Services. Runners who agree to perform Business Services for Business Partners acknowledge and agree that SWAVE and the Business Partner may on-sell Services supplied to third parties for an increased fee.
7.2 Business Partners may require Runners providing Business Services to be approved or hold qualifications. SWAVE may assist Business Partners to locate suitably qualified Runners. SWAVE makes no warranty that it will promote any or all suitably qualified Runners to Business Partners.
7.3 Business Partners may require Runners to enter a Business Partner Contract before providing Business Services.
7.4 Where a Runner accepts a Posted Errand with a Business Partner:
(a) the Runner must provide Business Services to the Business Partner in accordance with the Errand Contract and any applicable Business Partner Contract; and
(b) the terms of the Business Partner Contract will prevail to the extent of any inconsistency.
8. PAYMENT FACILITY
8.1 SWAVE uses a Payment Provider to operate the Wallet.
8.2 In so far as it is relevant to the provision of the Wallet, the terms at https://www.paystack.com are incorporated into this Agreement and will prevail over this Agreement to the extent of any inconsistency in relation to the provision of the Wallet.
8.3 If SWAVE changes its Payment Provider You may be asked to agree to any further additional terms with those providers. If you do not agree to them, you will be given alternative means of payment.
9. THIRD PARTY SERVICES
9.1 SWAVE may from time to time include Third Party Services on the SWAVE Platform. These Third-Party Services are not provided by SWAVE.
9.2 Third Party Services are Bided to Users pursuant to the third party's terms and conditions. Third Party Services may be promoted on the SWAVE Platform as a convenience to our Users who may find the Third-Party Services of interest or of use.
9.3 If a User engages with any Third-Party Service provider, the agreement will be directly between the User and that Third Party Service provider.
9.4 SWAVE makes no representation or warranty as to the Third-Party Services. However, to help us continue to improve our SWAVE Platform, Users may inform SWAVE of their Third-Party Service experience here.
10. VERIFICATION & BADGES
10.1 SWAVE may use Identity Verification Services.
10.2 You agree that SWAVE Identity Verification Services may not be fully accurate as all SWAVE Services are dependent on User-supplied information and/or information or Verification Services provided by third parties.
10.3 You are solely responsible for identity verification and SWAVE accepts no responsibility for any use that is made of SWAVE Identity Verification Service.
10.4 SWAVE Identity Verification Services may be modified at any time.
10.5 The SWAVE Platform may also include a User-initiated feedback system to help evaluate Users.
10.6 SWAVE may make Badges available to Senders and Runners. The available Badge can be requested by the Runner via the SWAVE Platform and arranged on behalf of the Runner and issued by SWAVE, for a fee. Obtaining Badges may be conditional upon the provision of certain information or documentation by the Runner and determined by SWAVE or a third-party verifier which shall be governed by its terms.
10.7 You acknowledge that Badges are point in time checks and may not be accurate at the time it is displayed. You acknowledge that to the extent You relied on a Badge in entering an Errand Contract, you do so aware of this limitation. You should seek to verify any Badge with the Runner prior to commencing the Errand.
10.8 It remains the Runner's responsibility to ensure that information or documentation it provides in obtaining a Badge is true and accurate and must inform SWAVE immediately if a Badge is no longer valid.
10.9 SWAVE may, at its discretion, issue Badges to Runners for a fee.
10.10 The issue of a Badge to a Runner remains in the control of SWAVE and the display and use of a Badge is licensed to the Runner for use on the SWAVE Platform only. Any verification obtained because of the issue of a Badge may not be used for any other purpose outside of the SWAVE Platform.
10.11 SWAVE retains the discretion and right to not issue, or remove without notice, a Badge if You are in breach of any of the terms of this Agreement, the Badge has been issued incorrectly, obtained falsely, has expired, is no longer valid or for any other reason requiring its removal by SWAVE.
11. INSURANCE and SWAVE ADVANCE
11.1 SWAVE may Bid its Users an opportunity to obtain insurance or acquire SWAVE Advance for certain Errand Contracts. All such insurance and SWAVE Advance will be Bided by a third party. Any application and terms and conditions for such third-party insurance will be displayed on the SWAVE website when they are available. SWAVE confirms that all insurance policies are Third Party Services and governed by further terms set out for Third Party Services.
11.2 SWAVE does not represent that any insurance it acquires, or which is Bided via the SWAVE Platform is adequate or appropriate for any User.
11.3 Each User must make its own enquiries about whether any further insurance is required, and Runners remain responsible for ensuring that they have, and maintain, sufficient insurance to cover the Services provided to other Users of the SWAVE Platform.
11.4 SWAVE may also take out other insurance itself and that insurance may at SWAVE's option extend some types of cover to Users. SWAVE reserves the right to change the terms of its insurance policies with the third-party insurance providers at any time. A summary of the policies is available on the SWAVE website, and the policy details can be requested via SWAVE. Users are responsible for familiarizing themselves with these details.
11.5 You acknowledge and agree that if a claim is made relating to any services performed and/or goods provided by Runner, and the insurance taken out by SWAVE (if any) responds to that claim then this clause applies. If a claim is made against a Runner, SWAVE may (provided that the Runner consents) elect to make a claim under any applicable policy and if the claim is successful, SWAVE reserves its right to recover any excess or deductible payable in respect of the claim from the Runner. Where SWAVE makes a claim and the insurer assesses that the Runner is responsible, SWAVE is entitled to rely on that assessment. If You do not pay any excess due under this clause, SWAVE may also elect to set this amount off some or all the excess paid by it against future moneys it may owe to You.
11.6 You acknowledge and agree that if a claim is made relating to any services performed and/or goods provided by a Runner, and the insurance taken out by SWAVE (if any) does not respond to the claim or the claim is below the excess payable to the insurer, then this clause applies. SWAVE may elect to reject or pay an amount to settle a claim not covered by SWAVE's own insurance policies. To the extent that the Runner was or would be liable for the claim, if SWAVE elects to pay an amount to settle the claim the amount paid by SWAVE may be recovered by SWAVE from the Runner. SWAVE may also elect to set this amount off against future moneys it may owe to the Runner.
12. FEEDBACK
12.1 You can complain about any comment made on the SWAVE Platform using the 'Report' function of the SWAVE Platform or contact SWAVE via the SWAVE Platform.
12.2 SWAVE is entitled to suspend or terminate Your account at any time if SWAVE, in its sole and absolute discretion, is concerned by any feedback about You, or considers Your feedback rating to be problematic for other SWAVE Users.
13. LIMITATION OF LIABILITY
Please see Your Country Specific Terms for the applicable exclusions and limitations of liability.
14. PRIVACY
14.1 Third Party Service providers will provide their service pursuant to their own Privacy Policy. Prior to acceptance of any service from a third party, you must review and agree to their terms of service including their privacy policy.
14.2 SWAVE will endeavour to permit you to transact anonymously on the SWAVE Platform. However, to ensure SWAVE can reduce the incidence of fraud and other behaviour in breach of the Community Guidelines, SWAVE reserves the right to ask Users to verify themselves to remain a User.
15. MODIFICATIONS TO THE AGREEMENT
15.1 SWAVE may modify this Agreement or the Policies (and update the SWAVE pages on which they are displayed) from time to time. SWAVE will send notification of such modifications to Your SWAVE account or advise You the next time You login.
15.2 When You actively agree to amended terms (for example, by clicking a button saying "I accept") or use the SWAVE Platform in any manner, including engaging in any acts in connection with a Errand Contract, the amended terms will be effective immediately. In all other cases, the amended terms will automatically be effective 30 days after they are initially notified to You.
15.3 If You do not agree with any changes to this Agreement (or any of our Policies), You must either terminate your account or You must notify SWAVE who will terminate Your SWAVE account and stop using the SWAVE Service.
16. NO AGENCY
16.1 No agency, partnership, joint venture, employee-employer, or other similar relationship is created by this Agreement. You have no authority to bind SWAVE, its related entities or affiliates in any way whatsoever. SWAVE confirms that all Third-Party Services that may be promoted on the SWAVE Platform are provided solely by such Third-Party Service providers. To the extent permitted by law, SWAVE specifically disclaims all liability for any loss or damage incurred by You in any manner due to the performance or non-performance of such Third-Party Service.
17. NOTICES
17.1 Except as stated otherwise, any notices must be given by registered ordinary post or by email, either to SWAVE's contact address as displayed on the SWAVE Platform, or to SWAVE Users' contact address as provided at registration. Any notice shall be deemed given:
(a) if sent by email, 24 hours after email is sent, unless the User is notified that the email address is invalid or the email is undeliverable, and
(b) if sent by pre-paid post, three Business Days after the date of posting, or on the seventh Business Day after the date of posting if sent to or posted from outside the jurisdiction in which You have Your SWAVE Platform account.
17.2 Notices related to the performance of any Third-Party Service must be delivered to such third party as set out in the Third-Party Service provider's terms and conditions.
18. MEDIATION AND DISPUTE RESOLUTION
18.1 SWAVE encourages You to try and resolve disputes (including claims for returns or refunds) with other Users directly. Accordingly, you acknowledge and agree that SWAVE may, in its absolute discretion, provide Your information as it decides is suitable to other parties involved in the dispute.
18.2 If a dispute arises with another User, you must co-operate with the other User and make a genuine attempt to resolve the dispute.
18.3 SWAVE may elect to assist Users resolve disputes. Any User may refer a dispute to SWAVE. You must co-operate with any investigation undertaken by SWAVE. SWAVE reserves the right to make a final determination (acting reasonably) based on the information supplied by the Users and direct the Payment Provider to make payment accordingly. You may raise your dispute with the other User or SWAVE's determination in an applicable court or tribunal.
18.4 SWAVE has the right to hold any Agreed Price that is the subject of a dispute in the Wallet, until the dispute has been resolved.
18.5 SWAVE may provide access to a Third-Party Dispute Service. If such a service is provided, either party may request the other party to submit to the Third-Party Dispute Service if the parties have failed to resolve the dispute directly. Terms and conditions for the Third-Party Dispute Service will be available on request. The Third-Party Dispute Service is a Third-Party Service and Users are responsible for paying any costs associated with the Third-Party Dispute Service in accordance with the Third-Party Dispute Service terms and conditions.
18.6 Disputes with any Third-Party Service provider must proceed pursuant to any dispute resolution process set out in the terms of service of the Third-Party Service provider.
18.7 If You have a complaint about the SWAVE Service please contact us here.
18.8 If SWAVE provides information about other Users to You for the purposes of resolving disputes under this clause, You acknowledge and agree that such information will be used only for the purpose of resolving the dispute (and no other purpose) and that you will be responsible and liable to SWAVE for any costs, losses or liabilities incurred by SWAVE in relation to any claims relating to any other use of information not permitted by this Agreement.
19. TERMINATION
19.1 Either You or SWAVE may terminate your account and this Agreement at any time for any reason.
19.2 Termination of this Agreement does not affect any Errand Contract that has been formed between SWAVE Users.
19.3 Third Party Services are conditional upon, and governed by, Third Party Service provider terms and conditions.
19.4 Sections 4 (Fees), 12 (Limitation of Liability) and 17 (Mediation and Dispute Resolution) and any other terms which by their nature should continue to apply, will survive any termination or expiration of this Agreement.
19.5 If Your account or this Agreement are terminated for any reason then You may not without SWAVE's consent (in its absolute discretion) create any further accounts with SWAVE and we may terminate any other accounts You operate.
20. GENERAL
20.1 This Agreement is governed by the laws specified in Your Country Specific Terms.
20.2 The provisions of this Agreement are severable, and if any provision of this Agreement is held to be invalid or unenforceable, such provision may be removed and the remaining provisions will be enforceable.
20.3 This Agreement may be assigned or novated by SWAVE to a third party without your consent. In the event of an assignment or novation the User will remain bound by this Agreement.
20.4 This Agreement sets out the entire understanding and agreement between the User and SWAVE with respect to its subject matter.

</Text>
</ScrollView>
    </SafeAreaView>
  )
}

export default TermsAndConditions