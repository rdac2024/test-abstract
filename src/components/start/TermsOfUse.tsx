'use client';

import React from "react";
import BackIcon from "@/assets/images/common/back.svg";

interface Props {
  visible: boolean;
  setVisible: (v: boolean) => void
}

function TermsOfUse(props: Props) {
  const { visible, setVisible } = props

  return (
    <>
      {visible && (
        <section className="fixed inset-[0] z-[100] bg-[#0A0415] flex-col">
          <div className="vw-px-24 vw-py-8">
            <div onClick={() => setVisible(false)} className="w-[fit-content] relative vw-h-32 flex items-center vw-gap-8">
              <BackIcon className='vw-size-32' />
              <span className="text-white vw-text-18 font-semibold">Back</span>
            </div>
          </div>
          <div className="vw-px-24 vw-pt-16 vw-pb-24">
            <div className="vw-text-24 leading-[120%] purple-text">Terms & Conditions</div>
            <div className="vw-text-12 leading-[120%] text-white text-opacity-[0.6] vw-mt-8">Last updated: November 28, 2024</div>
          </div>
          <div className="flex-1 overflow-y-auto hideScrollbar vw-pb-24 vw-px-24">
            <div className="vw-text-18 leading-[120%] vw-mb-16 text-white">Interpretation and Definitions</div>
            <div className="vw-text-14 leading-[120%] vw-mb-8 text-white">Interpretation</div>
            <div className="vw-text-12 leading-[150%] text-white text-opacity-[0.6] vw-mb-24">The words with initial capital letters have specific meanings defined under these conditions. These definitions shall apply whether they appear in singular or plural form.</div>
            <div className="vw-text-14 leading-[120%] vw-mb-8 text-white">Definitions</div>
            <div className="vw-text-12 leading-[150%] text-white text-opacity-[0.6] vw-mb-8">For the purposes of these Terms and Conditions:</div>
            <ul className="vw-text-12 leading-[150%] text-white text-opacity-[0.6] vw-pl-18 vw-mb-24 list-disc">
              <li>Affiliate: An entity that controls, is controlled by, or is under common control with a party, where "control" refers to ownership of 50% or more of the shares, equity interest, or other securities entitled to vote for election of directors or managing authority.</li>
              <li>Country: Refers to Panama</li>
              <li>Company: (referred to as "We," "Us," or "Our" in this Agreement) refers to Swipooor, <span className="font-[600] text-white text-opacity-[0.8]">Redacted Studios Inc., Via España, Delta Bank Building, 6th Floor, Suite 604D, Panama City, Republic of Panama</span></li>
              <li>Device: Any device that can access the Service, such as a computer, smartphone, or tablet.</li>
              <li>Service: Refers to the Swipooor platform, including the mobile app and website.</li>
              <li>Terms: These Terms and Conditions, forming the entire agreement between You and the Company regarding the use of the Service.</li>
              <li>Third-party Services: Any services, content, or products provided by third parties that may be displayed or made available through the Service.</li>
              <li>Website: Refers to Swipooor, accessible from <span className="font-[600] text-white text-opacity-[0.8]">swipooor.io</span></li>
              <li>You: The individual or entity accessing or using the Service.</li>
            </ul>
            <div className="vw-text-18 leading-[120%] vw-mb-16 text-white">Acknowledgment</div>
            <div className="vw-text-12 leading-[150%] text-white text-opacity-[0.6] vw-mb-24">
              <div className="vw-mb-8">These Terms govern Your use of the Service and form the agreement between You and the Company. They define the rights and obligations of all users regarding the Service.</div>
              <div className="vw-mb-8">By accessing or using the Service, You agree to be bound by these Terms. If You do not agree to any part of these Terms, You must stop using the Service.</div>
              <div className="vw-mb-8">You confirm that You are over the age of 18. The Company does not permit anyone under 18 to use the Service.</div>
              <div>Your use of the Service is also governed by Our Privacy Policy, which describes how We collect, use, and protect Your personal information. Please read it carefully before using the Service.</div>
            </div>
            <div className="vw-text-18 leading-[120%] vw-mb-16 text-white">Use of the Service</div>
            <div className="vw-text-12 leading-[150%] text-white text-opacity-[0.6] vw-mb-16">Swipooor provides tools for memecoin trading, event predictions, and cryptocurrency price predictions. By using the Service, You agree to the following terms:</div>
            <div className="vw-text-14 leading-[120%] vw-mb-8 text-white">Memecoin Trading</div>
            <ul className="vw-text-12 leading-[150%] text-white text-opacity-[0.6] vw-pl-18 vw-mb-16 list-disc">
              <li>The Service offers a simplified interface for trading memecoins, allowing You to make transactions through an integrated wallet.</li>
              <li>Trading decisions are made at Your own risk. The Company does not guarantee any profits or outcomes.</li>
            </ul>
            <div className="vw-text-14 leading-[120%] vw-mb-8 text-white">Event Predictions</div>
            <ul className="vw-text-12 leading-[150%] text-white text-opacity-[0.6] vw-pl-18 vw-mb-16 list-disc">
              <li>Users can predict the outcomes of market-related or real-world events using Swipooor's event cards.</li>
              <li>Predictions are for informational and entertainment purposes only, and outcomes depend on external factors beyond the Company's control.</li>
            </ul>
            <div className="vw-text-14 leading-[120%] vw-mb-8 text-white">Cryptocurrency Price Predictions</div>
            <ul className="vw-text-12 leading-[150%] text-white text-opacity-[0.6] vw-pl-18 vw-mb-16 list-disc">
              <li>The Service provides a platform for forecasting cryptocurrency price movements using a swipe-based prediction interface.</li>
              <li>Predictions are based on market conditions and are not a substitute for independent research or advice.</li>
            </ul>
            <div className="vw-text-14 leading-[120%] vw-mb-8 text-white">User Conduct</div>
            <div className="vw-text-12 leading-[150%] text-white text-opacity-[0.6] vw-mb-8">You agree to:</div>
            <ul className="vw-text-12 leading-[150%] text-white text-opacity-[0.6] vw-pl-18 vw-mb-16 list-decimal">
              <li>Use the Service only for its intended purposes.</li>
              <li>Avoid using the Service for any fraudulent, illegal, or prohibited activities.</li>
              <li>Protect Your account credentials and ensure the security of Your connected wallet(s).</li>
            </ul>
            <div className="vw-text-14 leading-[120%] vw-mb-8 text-white">Prohibited Activities</div>
            <div className="vw-text-12 leading-[150%] text-white text-opacity-[0.6] vw-mb-8">You shall not:</div>
            <ul className="vw-text-12 leading-[150%] text-white text-opacity-[0.6] vw-pl-18 vw-mb-24 list-disc">
              <li>Use unauthorized tools, bots, or scripts to interact with the Service.</li>
              <li>Reverse-engineer, modify, or tamper with Swipooor's technology.</li>
              <li>Exploit vulnerabilities or engage in activities that harm the platform or its users.</li>
            </ul>
            <div className="vw-text-18 leading-[120%] vw-mb-16 text-white">Links to Third-party Websites</div>
            <div className="vw-text-12 leading-[150%] text-white text-opacity-[0.6] vw-mb-24">The Service may include links to third-party websites or services. These links are provided for convenience and do not imply endorsement or control by the Company. We are not responsible for the content, privacy policies, or practices of these third-party services.</div>
            <div className="vw-text-18 leading-[120%] vw-mb-16 text-white">Termination</div>
            <div className="vw-text-12 leading-[150%] text-white text-opacity-[0.6] vw-mb-24">We reserve the right to terminate or suspend Your access to the Service immediately, without prior notice, if You breach these Terms or engage in prohibited activities. Upon termination, Your right to use the Service will cease.</div>
            <div className="vw-text-18 leading-[120%] vw-mb-16 text-white">Limitation of Liability</div>
            <div className="vw-text-12 leading-[150%] text-white text-opacity-[0.6] vw-mb-8">To the fullest extent permitted by law:</div>
            <ul className="vw-text-12 leading-[150%] text-white text-opacity-[0.6] vw-pl-18 vw-mb-16 list-decimal">
              <li>The Company and its suppliers are not liable for any indirect, incidental, or consequential damages, including loss of profits, data, or use.</li>
              <li>The Company's total liability is limited to 100 USD or the amount You paid for the Service, whichever is greater.</li>
            </ul>
            <div className="vw-text-18 leading-[120%] vw-mb-16 text-white">Disclaimer of Warranties</div>
            <div className="vw-text-12 leading-[150%] text-white text-opacity-[0.6] vw-mb-24">The Service is provided "AS IS" and "AS AVAILABLE." The Company makes no warranties regarding the reliability, accuracy, or completeness of the Service. You use the Service at Your own risk.</div>
            <div className="vw-text-18 leading-[120%] vw-mb-16 text-white">Governing Law</div>
            <div className="vw-text-12 leading-[150%] text-white text-opacity-[0.6] vw-mb-24">These Terms are governed by the laws of Panama. Any disputes arising from the Service will be resolved exclusively under the jurisdiction of these laws.</div>
            <div className="vw-text-18 leading-[120%] vw-mb-16 text-white">Dispute Resolution</div>
            <div className="vw-text-12 leading-[150%] text-white text-opacity-[0.6] vw-mb-24">If You have any disputes or concerns about the Service, You agree to first contact Us to resolve the issue informally.</div>
            <div className="vw-text-18 leading-[120%] vw-mb-16 text-white">Severability and Waiver</div>
            <div className="vw-text-14 leading-[120%] vw-mb-8 text-white">Severability</div>
            <div className="vw-text-12 leading-[150%] text-white text-opacity-[0.6] vw-mb-16">If any provision of these Terms is deemed invalid, the remaining provisions shall remain in effect.</div>
            <div className="vw-text-14 leading-[120%] vw-mb-8 text-white">Waiver</div>
            <div className="vw-text-12 leading-[150%] text-white text-opacity-[0.6] vw-mb-24">Failure to enforce any provision of these Terms does not constitute a waiver of that provision.</div>
            <div className="vw-text-18 leading-[120%] vw-mb-16 text-white">Changes to These Terms and Conditions</div>
            <div className="vw-text-12 leading-[150%] text-white text-opacity-[0.6] vw-mb-24">The Company may update these Terms from time to time. Material changes will be communicated to users at least 30 days before taking effect. Continued use of the Service after changes constitutes acceptance of the revised Terms.</div>
            <div className="vw-text-18 leading-[120%] vw-mb-16 text-white">Contact Us</div>
            <div className="vw-text-12 leading-[150%] text-white text-opacity-[0.6] vw-mb-24">If You have any questions or concerns about these Terms and Conditions, You can contact Us in our Telegram group at: https://t.me/redacted_coin/168</div>
          </div>
        </section>
      )}
    </>
  );
}

export default TermsOfUse;
