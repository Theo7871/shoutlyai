"use client";

import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="bg-white min-h-screen text-slate-800 antialiased selection:bg-indigo-100">
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        
        {/* Document Header */}
        <header className="border-b border-slate-200 pb-8 mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
            Shoutly AI — Data Security &amp; Privacy Policy
          </h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500 font-medium">
            <p>Effective date: August 20, 2026</p>
            <span className="hidden sm:inline text-slate-300">•</span>
            <p>Last updated: August 20, 2026</p>
          </div>
        </header>

        {/* Corporate Identity & Notice */}
        <div className="bg-slate-50 rounded-2xl p-6 md:p-8 border border-slate-100 mb-12">
          <p className="text-base leading-relaxed text-slate-600 mb-4">
            Shoutly AI is operated by <strong className="text-slate-900 font-semibold">Qubixel Technologies Private Limited</strong> (&quot;Shoutly AI,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), a company incorporated under the Companies Act, 2013, with its registered office at:
          </p>
          <address className="not-italic text-sm leading-normal text-slate-600 bg-white p-4 rounded-xl border border-slate-200/60 font-medium mb-4">
            371 Royal County Kothnoor, JP Nagar 8th Phase, Gottigere, Bangalore South, Bangalore – 560083, Karnataka, India.
          </address>
          <p className="text-sm leading-relaxed text-slate-500">
            This Policy explains what information we collect, how we use it, how we protect it, and the choices you have — including the specific rules that apply when you connect a third-party social media account to our platform.
          </p>
        </div>

        {/* Core Policy Body — All 13 Sections */}
        <div className="space-y-12">
          
          {/* Section 1 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. Scope</h2>
            <p className="text-slate-600 leading-relaxed mb-3">This Policy applies to:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 leading-relaxed mb-3">
              <li>The Shoutly AI website (shoutlyai.com) and web application</li>
              <li>Our API and any integrations built on it</li>
              <li>Data obtained through third-party platform APIs when you connect a social media account (Google/YouTube, Meta/Facebook/Instagram/Threads, TikTok, LinkedIn, Pinterest, X, Bluesky, and Google Business Profile) to Shoutly AI</li>
            </ul>
            <p className="text-sm text-slate-500">It does not apply to the privacy practices of the third-party platforms themselves (Google, Meta, TikTok, etc.), which are governed by their own privacy policies.</p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. Information We Collect</h2>
            <div className="space-y-5 text-slate-600 leading-relaxed">
              <div>
                <p className="font-semibold text-slate-800 mb-1">2.1 Information you provide directly</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Account information</strong>: name, email address, password (hashed, never stored in plain text), business/organization name, billing address, phone number.</li>
                  <li><strong>Business profile information</strong>: industry, brand voice preferences, logos, brand assets you upload.</li>
                  <li><strong>Content</strong>: text prompts, drafts, images, and videos you create, upload, or generate using Shoutly AI, and the captions/hashtags/schedules you configure.</li>
                  <li><strong>Payment information</strong>: processed by our payment processor; we do not store full card numbers on our own servers.</li>
                  <li><strong>Support communications</strong>: anything you send us via email, chat, or contact forms.</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-slate-800 mb-1">2.2 Information we collect automatically</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Log data (IP address, browser type, device identifiers, pages visited, timestamps)</li>
                  <li>Usage analytics (features used, posts created, error events) for product improvement</li>
                  <li>Cookies and similar technologies (see Section 11)</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-slate-800 mb-1">2.3 Information from connected social media accounts</p>
                <p className="mb-2">When you connect a third-party social account, we request only the access needed to provide the specific features described in Sections 3 and 5 below — we do not request broader access &quot;for future use.&quot; Depending on the platform, this may include:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Basic profile information (name, username, avatar, profile link)</li>
                  <li>The ability to publish, schedule, or draft posts on your behalf</li>
                  <li>Read-only access to metrics needed to power your analytics dashboard (impressions, reach, engagement, follower counts, comment counts)</li>
                  <li>Media you explicitly choose to upload or generate through Shoutly AI for publishing</li>
                </ul>
                <p className="mt-2">We never request access to your private messages, contacts, or any data unrelated to content publishing and performance reporting.</p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. How We Use Your Information</h2>
            <p className="text-slate-600 leading-relaxed mb-3">We use the information described above to:</p>
            <ol className="list-decimal pl-5 space-y-1 text-slate-600 leading-relaxed mb-4">
              <li>Provide the core service: generate content, schedule posts, and publish to the social accounts you&apos;ve connected, on your instruction.</li>
              <li>Display connected-account identity (name, avatar) so you can confirm which account is linked before publishing.</li>
              <li>Show analytics and reporting for your own connected accounts inside your Shoutly AI dashboard.</li>
              <li>Operate, maintain, secure, and improve the platform (debugging, fraud prevention, performance monitoring).</li>
              <li>Communicate with you about your account, billing, support requests, and material changes to our service or this Policy.</li>
              <li>Comply with legal obligations.</li>
            </ol>
            <p className="text-sm font-semibold text-indigo-950 bg-indigo-50 p-4 rounded-xl border border-indigo-100">We do not use data obtained through connected social accounts to serve ads, build advertising profiles, sell to data brokers, determine creditworthiness, or train general-purpose AI models on your connected-platform data without your explicit, separate consent.</p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. How We Share Your Information</h2>
            <p className="text-slate-600 leading-relaxed mb-3">We do not sell your personal data or the data obtained through connected social platforms. We share data only in the following circumstances:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 leading-relaxed mb-3">
              <li><strong>Service providers</strong>: infrastructure, hosting, and API providers that process data on our behalf under contractual confidentiality and security obligations (for example, our hosting providers and the Outstand unified social API, which we use to route publishing requests to social networks).</li>
              <li><strong>With your direction</strong>: when you instruct us to publish content to a connected account.</li>
              <li><strong>Legal requirements</strong>: to comply with applicable law, regulation, legal process, or governmental request.</li>
              <li><strong>Business transfers</strong>: in connection with a merger, acquisition, or sale of assets, with prior notice to you and continued protection of your data under an equivalent policy.</li>
              <li><strong>Security and abuse prevention</strong>: to investigate and prevent fraud, abuse, or security incidents.</li>
            </ul>
            <p className="text-slate-600 leading-relaxed">We do not permit humans to read your connected-platform content or data except where necessary for security investigation, legal compliance, or with your affirmative, specific consent.</p>
          </section>

          {/* Section 5 */}
          <section className="bg-slate-50 p-6 rounded-xl border border-slate-100 space-y-4">
            <h2 className="text-xl font-bold text-slate-900">5. Platform-Specific Disclosures</h2>
            <p className="text-sm text-slate-500 -mt-1">The sections below describe exactly how each connected platform&apos;s data is used, in line with each platform&apos;s developer policies.</p>
            <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
              <div>
                <p className="font-semibold text-slate-800 mb-1">5.1 Google (YouTube Data API, Google Business Profile API)</p>
                <p className="mb-1"><strong>Scopes requested:</strong> <code className="bg-slate-200 px-1 rounded">youtube.upload</code>, <code className="bg-slate-200 px-1 rounded">youtube.readonly</code>, <code className="bg-slate-200 px-1 rounded">business.manage</code>.</p>
                <ul className="list-disc pl-5 space-y-1 mb-2">
                  <li><code className="bg-slate-200 px-1 rounded">youtube.upload</code> is used solely to publish a scheduled video directly to the YouTube channel you connected, at the time you scheduled it.</li>
                  <li><code className="bg-slate-200 px-1 rounded">youtube.readonly</code> is used solely to (a) display the connected channel&apos;s name and thumbnail back to you after authorization, and (b) check the processing/publish status of a video you uploaded so we can show accurate status in your dashboard.</li>
                  <li><code className="bg-slate-200 px-1 rounded">business.manage</code> is used solely to publish updates, posts, and respond to information on the Google Business Profile listing(s) you connect, on your instruction.</li>
                </ul>
                <p><strong>Google API Services User Data Policy — Limited Use disclosure:</strong> Shoutly AI&apos;s use and transfer of information received from Google APIs adheres to the Google API Services User Data Policy, including the Limited Use requirements. We do not use Google user data for serving advertisements, and we do not allow humans to read this data except: (1) with your affirmative consent for specific messages, files, or data; (2) for security purposes such as investigating abuse; (3) to comply with applicable law; or (4) where the data has been aggregated and anonymized for internal operations.</p>
              </div>
              <div>
                <p className="font-semibold text-slate-800 mb-1">5.2 Meta (Facebook, Instagram, Threads)</p>
                <p className="mb-1"><strong>Scopes requested:</strong> <code className="bg-slate-200 px-1 rounded">pages_read_user_content</code>, <code className="bg-slate-200 px-1 rounded">business_management</code>, <code className="bg-slate-200 px-1 rounded">pages_show_list</code>, <code className="bg-slate-200 px-1 rounded">pages_manage_posts</code>, <code className="bg-slate-200 px-1 rounded">pages_read_engagement</code>, <code className="bg-slate-200 px-1 rounded">pages_manage_engagement</code>, <code className="bg-slate-200 px-1 rounded">read_insights</code>, plus Instagram- and Threads-equivalent publishing and insight scopes.</p>
                <p>These scopes are used exclusively to let you publish and schedule content to Pages, Instagram professional accounts, and Threads profiles you manage, and to display engagement and reach metrics for those same accounts inside your dashboard. We comply with the Meta Platform Terms and Developer Policies.</p>
              </div>
              <div>
                <p className="font-semibold text-slate-800 mb-1">5.3 TikTok</p>
                <p className="mb-1"><strong>Scopes requested:</strong> <code className="bg-slate-200 px-1 rounded">user.info.basic</code>, <code className="bg-slate-200 px-1 rounded">user.info.profile</code>, <code className="bg-slate-200 px-1 rounded">user.info.stats</code>, <code className="bg-slate-200 px-1 rounded">video.publish</code>, <code className="bg-slate-200 px-1 rounded">video.upload</code>, <code className="bg-slate-200 px-1 rounded">video.list</code>.</p>
                <p>Used to authenticate your TikTok account, publish or draft videos you create in Shoutly AI to your connected account, and display your follower/engagement statistics and recently published videos inside your analytics dashboard. We comply with TikTok&apos;s Developer Terms of Service and Content Posting API policies.</p>
              </div>
              <div>
                <p className="font-semibold text-slate-800 mb-1">5.4 LinkedIn</p>
                <p>Used to publish content on your behalf to the personal profile or organization Page you connect, and to retrieve basic profile/organization identity to confirm the connection.</p>
              </div>
              <div>
                <p className="font-semibold text-slate-800 mb-1">5.5 Pinterest</p>
                <p>Used to publish pins to boards you select, and to list/create boards on your connected Pinterest account.</p>
              </div>
              <div>
                <p className="font-semibold text-slate-800 mb-1">5.6 X (Twitter)</p>
                <p>Used to publish posts to your connected X account and retrieve basic account identity and engagement metrics.</p>
              </div>
              <div>
                <p className="font-semibold text-slate-800 mb-1">5.7 Bluesky</p>
                <p>Bluesky does not use OAuth. You provide an app-specific password (generated separately in your Bluesky settings, never your main account password) directly into our connection form. It is transmitted once to establish a session and is not stored by Shoutly AI in plain text.</p>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">6. Data Security</h2>
            <p className="text-slate-600 leading-relaxed mb-3">We take the following technical and organizational measures to protect your information, including data obtained through connected platform APIs:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 leading-relaxed mb-3">
              <li><strong>Encryption in transit</strong>: all data transmitted between your browser, our servers, and connected platform APIs is encrypted using TLS/HTTPS.</li>
              <li><strong>Encryption at rest</strong>: stored credentials (OAuth tokens, API keys) and personal data are encrypted at rest.</li>
              <li><strong>Access controls</strong>: access to production systems and user data is restricted to authorized personnel on a need-to-know basis, protected by authentication and role-based permissions.</li>
              <li><strong>Credential isolation</strong>: connected-platform OAuth tokens are stored server-side only and are never exposed to the browser or to third parties outside the scope of publishing your content.</li>
              <li><strong>Monitoring &amp; logging</strong>: we monitor for unauthorized access attempts and unusual account activity.</li>
              <li><strong>Vendor security</strong>: infrastructure providers we rely on maintain independent security certifications (e.g., SOC 2, ISO 27001 as applicable to each provider).</li>
              <li><strong>Incident response</strong>: in the event of a data breach affecting your personal information, we will notify affected users and relevant authorities in accordance with applicable law, without undue delay.</li>
              <li><strong>Least-privilege scope requests</strong>: we request only the narrowest set of platform permissions required for the specific features described above and do not request scopes for hypothetical future functionality.</li>
            </ul>
            <p className="text-slate-600 leading-relaxed">No method of transmission or storage is 100% secure; we cannot guarantee absolute security, but we continuously work to protect your information using industry-standard practices.</p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">7. Data Retention &amp; Deletion</h2>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 leading-relaxed">
              <li>We retain account information for as long as your account is active and for a reasonable period afterward to comply with legal, accounting, and dispute-resolution obligations.</li>
              <li>Connected-platform OAuth tokens and cached platform data are retained only for as long as the connection remains active. If you disconnect an account, we delete the associated access tokens and cached profile/metrics data within <strong className="text-slate-900">30 days</strong>, except where retention is required by law.</li>
              <li>Content you generate but never publish is retained in your account until you delete it or close your account.</li>
              <li>You may request deletion of your account and associated data at any time by contacting us (Section 13) or, where available, using in-app account deletion.</li>
              <li>Upon account deletion, we delete or anonymize your personal data within <strong className="text-slate-900">30 days</strong>, except data we are legally required to retain (e.g., billing records for tax purposes).</li>
            </ul>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">8. Your Rights &amp; Choices</h2>
            <p className="text-slate-600 leading-relaxed mb-3">Depending on your location, you may have the right to:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 leading-relaxed mb-4">
              <li>Access the personal data we hold about you</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to or restrict certain processing</li>
              <li>Data portability</li>
              <li>Withdraw consent for a connected platform at any time by disconnecting it in your dashboard or revoking access directly from the platform&apos;s own settings (e.g., Google Account permissions, Facebook Business Integrations)</li>
            </ul>
            <p className="text-slate-600 leading-relaxed mb-4">To exercise these rights, contact us using the details in Section 13. Region-specific rights are detailed further below:</p>
            <div className="grid grid-cols-3 gap-3 text-center text-xs font-semibold">
              <Link href="/gdpr" className="p-3 bg-slate-50 hover:bg-slate-100 rounded-lg border">GDPR</Link>
              <Link href="/ccpa" className="p-3 bg-slate-50 hover:bg-slate-100 rounded-lg border">CCPA</Link>
              <Link href="/dpdp" className="p-3 bg-slate-50 hover:bg-slate-100 rounded-lg border">DPDP Act</Link>
            </div>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">9. Children&apos;s Privacy</h2>
            <p className="text-slate-600 leading-relaxed">Our platform workspace does not engage with variables or profiles relating to individuals under the age of 18. Suspect profiles are deleted instantly.</p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">10. International Data Transfers</h2>
            <p className="text-slate-600 leading-relaxed">As an India-incorporated company serving customers globally, your data may be processed in India and in the jurisdictions where our infrastructure and service providers operate. Where required, we rely on appropriate safeguards (such as standard contractual clauses) for cross-border transfers.</p>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">11. Cookies &amp; Similar Technologies</h2>
            <p className="text-slate-600 leading-relaxed">We employ simple system storage flags to cache local interface settings and stay signed in across active browser loops. Check our <Link href="/cookie" className="text-indigo-600 hover:underline">Cookie Policy</Link>.</p>
          </section>

          {/* Section 12 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">12. Changes to This Policy</h2>
            <p className="text-slate-600 leading-relaxed">We may update this Policy from time to time. If we make material changes, we will notify you via email or an in-product notice before the changes take effect. The &quot;Last updated&quot; date at the top of this page reflects the most recent revision.</p>
          </section>

          {/* Section 13 */}
          <section className="pt-6 border-t border-slate-200">
            <div className="bg-orange-600 text-white rounded-xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-white font-bold mb-1">13. Contact Us</h3>
                <p className="text-white text-sm leading-relaxed mb-1">
                  If you have questions about this Policy or wish to exercise your data rights, contact:
                </p>
                <p className="text-white text-sm font-semibold leading-relaxed">
                  Qubixel Technologies Private Limited
                </p>
                <p className="text-white text-sm leading-relaxed">
                  371 Royal County Kothnoor, JP Nagar 8th Phase, Gottigere, Bangalore South, Bangalore – 560083, Karnataka, India
                </p>
              </div>
              <a
                href="mailto:privacy@shoutlyai.com"
                className="shrink-0 bg-white text-indigo-900 font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-indigo-50 transition-colors"
              >
                privacy@shoutlyai.com
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}