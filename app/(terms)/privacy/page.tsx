// components/ui/PrivacyPolicy.tsx

import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-6 text-center">Privacy Policy</h1>
      <p className="mb-6 text-lg">
        Your privacy is important to us. This policy outlines how we collect, use, and protect your information.
      </p>
      
      <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
      <p className="mb-6 text-base">
        We collect information to provide better services to our users, including basic account details and usage data.
      </p>
      
      <h2 className="text-2xl font-semibold mb-4">2. How We Use Information</h2>
      <p className="mb-6 text-base">
        Information is used to improve our services, personalize user experience, and communicate with you.
      </p>
      
      <h2 className="text-2xl font-semibold mb-4">3. Information Sharing</h2>
      <p className="mb-6 text-base">
        We do not share your personal information with companies, organizations, or individuals outside of MeetAVA except as required by law.
      </p>
      
      <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
      <p className="mb-6 text-base">
        We implement robust security measures to protect your information against unauthorized access or disclosure.
      </p>
      
      <h2 className="text-2xl font-semibold mb-4">5. Cookies</h2>
      <p className="mb-6 text-base">
        Our service uses cookies to enhance user experience. You can choose to accept or decline cookies.
      </p>
      
      <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
      <p className="mb-6 text-base">
        You have the right to access, update, or delete your personal information. Contact us for assistance.
      </p>
      
      <h2 className="text-2xl font-semibold mb-4">7. Changes to This Policy</h2>
      <p className="mb-6 text-base">
        We may update this Privacy Policy periodically. We will notify you of any changes by posting the new policy on this page.
      </p>
      
      <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
      <p className="mb-6 text-base">
        If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@meetava.io" className="text-blue-600 hover:underline">privacy@meetava.io</a>.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
