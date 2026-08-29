import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buffer Alternative | Shoutly AI – AI Social Media Automation",
  description: "Looking for a Buffer alternative? Compare Buffer and Shoutly AI for social media content creation, scheduling, publishing, analytics, AI assistance, and automation.",
};

const PAGE_STYLES = `
.buffer-alternative-content { font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; line-height: 1.6; }
.buffer-alternative-content a { color: inherit; text-decoration: none; }
:root {
      --primary: #f97316;
      --primary-dark: #ea580c;
      --text: #171717;
      --muted: #666;
      --border: #e8e8ee;
      --bg: #ffffff;
      --soft: #f7f7fb;
      --dark: #111118;
      --success: #16834b;
      --radius: 18px;
      --shadow: 0 15px 45px rgba(20, 20, 50, 0.08);
    }

    .container {
      width: min(1160px, calc(100% - 40px));
      margin: auto;
    }

    /* NAVIGATION */

    .nav {
      height: 76px;
      border-bottom: 1px solid var(--border);
      display: flex;
      align-items: center;
      background: rgba(255,255,255,.94);
      position: sticky;
      top: 0;
      z-index: 100;
      backdrop-filter: blur(14px);
    }

    .nav-inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }

    .logo {
      font-size: 22px;
      font-weight: 800;
      letter-spacing: -0.8px;
    }

    .logo span {
      color: var(--primary);
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 28px;
      font-size: 14px;
      color: #444;
    }

    .nav-links a:hover {
      color: var(--primary);
    }

    .nav-cta {
      background: var(--dark);
      color: #fff;
      padding: 11px 18px;
      border-radius: 10px;
      font-weight: 600;
    }

    /* HERO */

    .hero {
      padding: 92px 0 78px;
      background:
        radial-gradient(circle at 15% 20%, rgba(249,115,22,.13), transparent 32%),
        radial-gradient(circle at 85% 10%, rgba(123,97,255,.10), transparent 30%),
        #fff;
    }

    .eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      border: 1px solid #fed7aa;
      background: #fff7ed;
      color: var(--primary);
      padding: 7px 12px;
      border-radius: 999px;
      font-size: 13px;
      font-weight: 700;
      margin-bottom: 22px;
    }

    .hero h1 {
      max-width: 900px;
      font-size: clamp(42px, 6vw, 72px);
      line-height: 1.02;
      letter-spacing: -3px;
      margin-bottom: 24px;
    }

    .hero h1 span {
      color: var(--primary);
    }

    .hero p {
      max-width: 760px;
      color: var(--muted);
      font-size: 19px;
      line-height: 1.7;
      margin-bottom: 34px;
    }

    .hero-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 14px 22px;
      border-radius: 11px;
      font-weight: 700;
      border: 1px solid transparent;
    }

    .btn-primary {
      background: var(--primary);
      color: white;
    }

    .btn-primary:hover {
      background: var(--primary-dark);
    }

    .btn-secondary {
      border-color: var(--border);
      background: white;
    }

    /* SUMMARY */

    .summary {
      margin-top: -30px;
      position: relative;
      z-index: 2;
    }

    .summary-card {
      background: white;
      border: 1px solid var(--border);
      box-shadow: var(--shadow);
      border-radius: 22px;
      padding: 30px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
    }

    .summary-column {
      padding: 22px;
      border-radius: 15px;
      background: var(--soft);
    }

    .summary-column h3 {
      margin-bottom: 8px;
      font-size: 21px;
    }

    .summary-column p {
      color: var(--muted);
    }

    /* SECTIONS */

    section {
      padding: 90px 0;
    }

    .section-heading {
      max-width: 760px;
      margin-bottom: 46px;
    }

    .section-heading h2 {
      font-size: clamp(32px, 4vw, 48px);
      line-height: 1.1;
      letter-spacing: -1.8px;
      margin-bottom: 15px;
    }

    .section-heading p {
      color: var(--muted);
      font-size: 17px;
    }

    /* COMPARISON */

    .comparison-wrapper {
      overflow-x: auto;
      border: 1px solid var(--border);
      border-radius: 18px;
      box-shadow: var(--shadow);
    }

    table {
      width: 100%;
      border-collapse: collapse;
      min-width: 760px;
      background: white;
    }

    th,
    td {
      padding: 19px 20px;
      border-bottom: 1px solid var(--border);
      text-align: left;
      vertical-align: top;
    }

    th {
      background: #fafafa;
      font-size: 15px;
    }

    th:nth-child(2) {
      color: #444;
    }

    th:nth-child(3) {
      color: var(--primary);
    }

    td:first-child {
      font-weight: 700;
      width: 27%;
    }

    td {
      color: #555;
      font-size: 15px;
    }

    tr:last-child td {
      border-bottom: 0;
    }

    /* DIFFERENTIATION */

    .difference {
      background: var(--dark);
      color: white;
    }

    .difference .section-heading p {
      color: #aaa;
    }

    .difference-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }

    .difference-card {
      border: 1px solid rgba(255,255,255,.1);
      background: rgba(255,255,255,.045);
      padding: 30px;
      border-radius: 18px;
    }

    .difference-number {
      color: #fdba74;
      font-weight: 800;
      font-size: 14px;
      margin-bottom: 22px;
    }

    .difference-card h3 {
      font-size: 22px;
      margin-bottom: 10px;
    }

    .difference-card p {
      color: #b8b8c3;
    }

    /* WORKFLOW */

    .workflow {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 18px;
    }

    .workflow-step {
      border: 1px solid var(--border);
      border-radius: 17px;
      padding: 27px;
      background: white;
    }

    .step-number {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      background: #fff7ed;
      color: var(--primary);
      font-weight: 800;
      margin-bottom: 20px;
    }

    .workflow-step h3 {
      margin-bottom: 8px;
    }

    .workflow-step p {
      color: var(--muted);
      font-size: 14px;
    }

    /* BUFFER SECTION */

    .buffer-section {
      background: var(--soft);
    }

    .two-column {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
    }

    .info-card {
      background: white;
      border: 1px solid var(--border);
      padding: 30px;
      border-radius: 18px;
    }

    .info-card h3 {
      font-size: 23px;
      margin-bottom: 13px;
    }

    .info-card p {
      color: var(--muted);
      margin-bottom: 18px;
    }

    .info-card ul {
      list-style: none;
    }

    .info-card li {
      padding: 9px 0;
      border-bottom: 1px solid #eee;
      color: #444;
    }

    .info-card li:last-child {
      border-bottom: 0;
    }

    /* USE CASES */

    .use-cases {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 18px;
    }

    .use-case {
      border: 1px solid var(--border);
      border-radius: 17px;
      padding: 28px;
    }

    .use-case h3 {
      margin-bottom: 9px;
    }

    .use-case p {
      color: var(--muted);
      font-size: 15px;
    }

    /* FAQ */

    .faq {
      max-width: 850px;
    }

    details {
      border-bottom: 1px solid var(--border);
      padding: 22px 0;
    }

    summary {
      cursor: pointer;
      font-weight: 700;
      font-size: 17px;
    }

    details p {
      color: var(--muted);
      margin-top: 13px;
      max-width: 780px;
    }

    /* CTA */

    .cta {
      padding: 90px 0;
    }

    .cta-card {
      background:
        radial-gradient(circle at 85% 10%, rgba(249,115,22,.28), transparent 30%),
        #111118;
      color: white;
      border-radius: 25px;
      padding: 65px;
      text-align: center;
    }

    .cta-card h2 {
      font-size: clamp(34px, 5vw, 55px);
      line-height: 1.05;
      letter-spacing: -2px;
      margin-bottom: 18px;
    }

    .cta-card p {
      max-width: 650px;
      margin: auto auto 28px;
      color: #bbb;
      font-size: 17px;
    }

    /* FOOTER */

    footer {
      border-top: 1px solid var(--border);
      padding: 40px 0;
      color: #777;
      font-size: 14px;
    }

    .footer-inner {
      display: flex;
      justify-content: space-between;
      gap: 20px;
      flex-wrap: wrap;
    }

    .footer-links {
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
    }

    /* MOBILE */

    @media (max-width: 850px) {
      .nav-links {
        display: none;
      }

      .summary-card,
      .two-column {
        grid-template-columns: 1fr;
      }

      .difference-grid,
      .use-cases {
        grid-template-columns: 1fr;
      }

      .workflow {
        grid-template-columns: 1fr 1fr;
      }

      .hero {
        padding-top: 65px;
      }

      .hero h1 {
        letter-spacing: -2px;
      }

      .cta-card {
        padding: 42px 25px;
      }
    }

    @media (max-width: 560px) {
      .container {
        width: min(100% - 28px, 1160px);
      }

      section {
        padding: 65px 0;
      }

      .workflow {
        grid-template-columns: 1fr;
      }

      .summary-card {
        padding: 16px;
      }
    }
`;

const PAGE_BODY = `<!-- NAV -->

  <!-- HERO -->

  <section class="hero">
    <div class="container">

      <div class="eyebrow">
        BUFFER ALTERNATIVE
      </div>

      <h1>
        Looking for a
        <span>Buffer alternative?</span>
      </h1>

      <p>
        Buffer is a well-established social media publishing platform
        built around scheduling, publishing, analytics and collaboration.
        Shoutly AI takes a different approach: it combines AI-assisted
        content creation with scheduling and social media automation,
        so the workflow starts before the post is ready to publish.
      </p>

      <div class="hero-buttons">
        <a href="https://shoutlyai.com" class="btn btn-primary">
          Try Shoutly AI
        </a>

        <a
          href="/compare/buffer-vs-shoutly-ai"
          class="btn btn-secondary"
        >
          Compare Buffer vs Shoutly AI
        </a>
      </div>

    </div>
  </section>


  <!-- SUMMARY -->

  <section class="summary">
    <div class="container">

      <div class="summary-card">

        <div class="summary-column">
          <h3>Buffer</h3>

          <p>
            A social media management platform focused on publishing,
            scheduling, analytics, community engagement, content
            collaboration and AI-assisted content creation.
          </p>
        </div>

        <div class="summary-column">
          <h3>Shoutly AI</h3>

          <p>
            An AI-powered social media automation platform designed to
            generate business-specific social content and combine content
            creation, scheduling and publishing in one workflow.
          </p>
        </div>

      </div>

    </div>
  </section>


  <!-- INTRO -->

  <section>
    <div class="container">

      <div class="section-heading">

        <h2>
          The real difference isn't just scheduling
        </h2>

        <p>
          Both platforms can help businesses publish consistently.
          The bigger difference is where each workflow starts.
        </p>

      </div>

      <div class="workflow">

        <div class="workflow-step">
          <div class="step-number">1</div>
          <h3>Define your business</h3>
          <p>
            Tell Shoutly AI what your business does and what kind of
            social presence you want to build.
          </p>
        </div>

        <div class="workflow-step">
          <div class="step-number">2</div>
          <h3>Generate content</h3>
          <p>
            Shoutly AI generates social content around your business,
            including captions, hashtags and visual content.
          </p>
        </div>

        <div class="workflow-step">
          <div class="step-number">3</div>
          <h3>Plan your calendar</h3>
          <p>
            Organize content into a social media calendar rather than
            creating every post from scratch.
          </p>
        </div>

        <div class="workflow-step">
          <div class="step-number">4</div>
          <h3>Schedule & publish</h3>
          <p>
            Schedule and publish content across supported social
            platforms from one dashboard.
          </p>
        </div>

      </div>

    </div>
  </section>


  <!-- COMPARISON -->

  <section class="buffer-section">

    <div class="container">

      <div class="section-heading">

        <h2>
          Buffer vs Shoutly AI
        </h2>

        <p>
          A straightforward comparison based on the current publicly
          available product capabilities.
        </p>

      </div>

      <div class="comparison-wrapper">

        <table>

          <thead>
            <tr>
              <th>Capability</th>
              <th>Buffer</th>
              <th>Shoutly AI</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td>Social media scheduling</td>

              <td>
                Yes. Scheduling and publishing are core Buffer features.
              </td>

              <td>
                Yes. Scheduling and publishing are part of the Shoutly AI
                workflow.
              </td>
            </tr>

            <tr>
              <td>AI-assisted content creation</td>

              <td>
                Yes. Buffer provides an AI Assistant for generating and
                refining content.
              </td>

              <td>
                Yes. AI content generation is a central part of the
                product workflow.
              </td>
            </tr>

            <tr>
              <td>Content calendar</td>

              <td>
                Yes. Buffer provides calendar and planning functionality.
              </td>

              <td>
                Yes. Shoutly AI provides a content calendar designed
                around generated social content.
              </td>
            </tr>

            <tr>
              <td>Analytics</td>

              <td>
                Yes. Buffer provides Insights and additional analytics
                capabilities on paid plans.
              </td>

              <td>
                Yes. Shoutly AI provides cross-channel analytics and
                reporting.
              </td>
            </tr>

            <tr>
              <td>Community management</td>

              <td>
                Yes. Buffer includes a community inbox for supported
                networks.
              </td>

              <td>
                Shoutly AI includes a comments inbox for managing social
                interactions from the platform.
              </td>
            </tr>

            <tr>
              <td>Team collaboration</td>

              <td>
                Yes. Team features include collaboration and content
                approval workflows.
              </td>

              <td>
                Designed for businesses and agencies that want content
                creation and publishing in one workflow.
              </td>
            </tr>

            <tr>
              <td>Number of supported platforms</td>

              <td>
                Supports a broad range of networks including Facebook,
                Instagram, LinkedIn, TikTok, Threads, X, YouTube,
                Pinterest, Bluesky, Mastodon and Google Business Profile.
              </td>

              <td>
                Shoutly AI currently promotes publishing across 10
                platforms including Facebook, Instagram, LinkedIn,
                TikTok, Threads, X, YouTube, Pinterest, Bluesky and
                Google Business Profile.
              </td>
            </tr>

            <tr>
              <td>Pricing model</td>

              <td>
                Free plan available. Paid plans use channel-based pricing.
              </td>

              <td>
                Shoutly AI currently promotes an all-in-one plan with
                platform access and unlimited posting/scheduling.
              </td>
            </tr>

            <tr>
              <td>Primary positioning</td>

              <td>
                Social media management, publishing and scheduling.
              </td>

              <td>
                AI-first social media content creation and automation.
              </td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>

  </section>


  <!-- WHY SWITCH -->

  <section class="difference">

    <div class="container">

      <div class="section-heading">

        <h2>
          Why businesses look beyond a scheduler
        </h2>

        <p>
          A scheduler solves an important problem. But creating enough
          useful content to fill the scheduler can still take significant
          time.
        </p>

      </div>

      <div class="difference-grid">

        <div class="difference-card">

          <div class="difference-number">01</div>

          <h3>
            Start with the business
          </h3>

          <p>
            Instead of beginning with an empty publishing queue, Shoutly
            AI starts with information about the business and turns that
            input into social content.
          </p>

        </div>

        <div class="difference-card">

          <div class="difference-number">02</div>

          <h3>
            Create more of the workflow in one place
          </h3>

          <p>
            The goal is to reduce the handoff between deciding what to
            post, writing the post, preparing the creative and scheduling
            it.
          </p>

        </div>

        <div class="difference-card">

          <div class="difference-number">03</div>

          <h3>
            Build a longer content runway
          </h3>

          <p>
            Shoutly AI is designed around generating structured social
            content for businesses instead of treating scheduling as the
            only automation problem.
          </p>

        </div>

      </div>

    </div>

  </section>


  <!-- BUFFER IS STILL A GOOD CHOICE -->

  <section>

    <div class="container">

      <div class="section-heading">

        <h2>
          Buffer is still a good choice for some teams
        </h2>

        <p>
          An honest alternative page should make the trade-offs clear.
          Buffer may be the better fit when publishing and scheduling are
          the primary requirements.
        </p>

      </div>

      <div class="two-column">

        <div class="info-card">

          <h3>
            Choose Buffer if...
          </h3>

          <p>
            Your content pipeline is already established and you mainly
            need a dependable publishing and social management workspace.
          </p>

          <ul>
            <li>✓ You already have content ready to publish</li>
            <li>✓ Scheduling is your primary requirement</li>
            <li>✓ You want Buffer's established publishing workflow</li>
            <li>✓ You need its analytics and community features</li>
            <li>✓ You want its team collaboration workflow</li>
          </ul>

        </div>

        <div class="info-card">

          <h3>
            Consider Shoutly AI if...
          </h3>

          <p>
            Your bigger problem is creating enough relevant social content
            before you can schedule it.
          </p>

          <ul>
            <li>✓ You want AI-generated social content</li>
            <li>✓ You want branded visuals and captions together</li>
            <li>✓ You want a longer content calendar generated from your business</li>
            <li>✓ You want content creation and scheduling in one workflow</li>
            <li>✓ You want to automate more of the content-production process</li>
          </ul>

        </div>

      </div>

    </div>

  </section>


  <!-- WHO IT IS FOR -->

  <section class="buffer-section">

    <div class="container">

      <div class="section-heading">

        <h2>
          Who is Shoutly AI a Buffer alternative for?
        </h2>

        <p>
          Shoutly AI is particularly relevant when the challenge is not
          simply publishing content, but producing enough useful content
          consistently.
        </p>

      </div>

      <div class="use-cases">

        <div class="use-case">
          <h3>Small Businesses</h3>
          <p>
            Create and schedule social content without building a large
            internal content team.
          </p>
        </div>

        <div class="use-case">
          <h3>Founders</h3>
          <p>
            Turn business ideas, announcements and expertise into a
            repeatable social publishing workflow.
          </p>
        </div>

        <div class="use-case">
          <h3>Agencies</h3>
          <p>
            Reduce repetitive content-production work across multiple
            client accounts.
          </p>
        </div>

        <div class="use-case">
          <h3>Creators</h3>
          <p>
            Build a more consistent publishing pipeline without manually
            preparing every post from scratch.
          </p>
        </div>

        <div class="use-case">
          <h3>Local Businesses</h3>
          <p>
            Generate content around services, promotions, occasions and
            business-specific topics.
          </p>
        </div>

        <div class="use-case">
          <h3>Lean Marketing Teams</h3>
          <p>
            Combine more of the planning, creation and publishing workflow
            inside one platform.
          </p>
        </div>

      </div>

    </div>

  </section>


  <!-- CONTENT CREATION -->

  <section>

    <div class="container">

      <div class="section-heading">

        <h2>
          From empty calendar to ready-to-publish content
        </h2>

        <p>
          The fundamental Shoutly AI proposition is to automate more than
          the final scheduling step.
        </p>

      </div>

      <div class="workflow">

        <div class="workflow-step">
          <div class="step-number">01</div>

          <h3>Business context</h3>

          <p>
            Provide information about the business, industry and content
            needs.
          </p>
        </div>

        <div class="workflow-step">
          <div class="step-number">02</div>

          <h3>AI generation</h3>

          <p>
            Generate social posts with captions, hashtags and visual
            content.
          </p>
        </div>

        <div class="workflow-step">
          <div class="step-number">03</div>

          <h3>Content calendar</h3>

          <p>
            Organize the generated content into a structured publishing
            schedule.
          </p>
        </div>

        <div class="workflow-step">
          <div class="step-number">04</div>

          <h3>Auto publishing</h3>

          <p>
            Schedule and publish across connected social channels.
          </p>
        </div>

      </div>

    </div>

  </section>


  <!-- PRICING CONTEXT -->

  <section class="buffer-section">

    <div class="container">

      <div class="section-heading">

        <h2>
          Buffer pricing vs Shoutly AI pricing
        </h2>

        <p>
          Pricing structures are different, so comparing only the headline
          monthly number can be misleading.
        </p>

      </div>

      <div class="two-column">

        <div class="info-card">

          <h3>Buffer</h3>

          <p>
            Buffer currently offers a free plan for up to three connected
            channels. Its paid Essentials and Team plans are priced per
            channel, with pricing depending on the number of channels and
            billing period.
          </p>

          <p>
            Buffer's current published pricing shows Essentials starting
            at $6 per channel per month for the first ten channels on
            monthly billing, while Team starts at $12 per channel per
            month for the first ten channels.
          </p>

          <a
            href="https://buffer.com/pricing"
            target="_blank"
            rel="noopener"
            class="btn btn-secondary"
          >
            View Buffer Pricing
          </a>

        </div>

        <div class="info-card">

          <h3>Shoutly AI</h3>

          <p>
            Shoutly AI currently presents an all-in-one pricing model
            rather than charging separately for each connected social
            channel.
          </p>

          <p>
            The current Shoutly AI website lists a monthly plan of
            ₹10,000/month and promotes unlimited posting and scheduling
            across its supported platforms.
          </p>

          <a
            href="/pricing"
            class="btn btn-primary"
          >
            View Shoutly AI Pricing
          </a>

        </div>

      </div>

    </div>

  </section>


  <!-- DECISION -->

  <section>

    <div class="container">

      <div class="section-heading">

        <h2>
          Which one should you choose?
        </h2>

        <p>
          There is no universal winner. Choose based on the bottleneck in
          your social media workflow.
        </p>

      </div>

      <div class="comparison-wrapper">

        <table>

          <thead>
            <tr>
              <th>If your priority is...</th>
              <th>Consider</th>
              <th>Why</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td>Simple social scheduling</td>
              <td>Buffer</td>
              <td>
                Buffer has a mature publishing and scheduling workflow.
              </td>
            </tr>

            <tr>
              <td>Managing an existing content pipeline</td>
              <td>Buffer</td>
              <td>
                Its workflow is well suited to teams that already create
                their content elsewhere.
              </td>
            </tr>

            <tr>
              <td>AI-assisted content creation</td>
              <td>Both</td>
              <td>
                Both products now offer AI-assisted content capabilities,
                but they approach the workflow differently.
              </td>
            </tr>

            <tr>
              <td>Generating business-specific content</td>
              <td>Shoutly AI</td>
              <td>
                Content generation is central to Shoutly AI's product
                positioning.
              </td>
            </tr>

            <tr>
              <td>Combining content creation and scheduling</td>
              <td>Shoutly AI</td>
              <td>
                Shoutly AI is designed to connect these steps in one
                automation workflow.
              </td>
            </tr>

            <tr>
              <td>Channel-based pricing</td>
              <td>Buffer</td>
              <td>
                Buffer's paid plans let customers add or remove channel
                capacity as their needs change.
              </td>
            </tr>

            <tr>
              <td>One all-in-one social automation plan</td>
              <td>Shoutly AI</td>
              <td>
                Shoutly AI currently promotes an all-in-one plan covering
                its supported platforms.
              </td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>

  </section>


  <!-- FAQ -->

  <section class="buffer-section">

    <div class="container">

      <div class="section-heading">

        <h2>
          Frequently asked questions
        </h2>

        <p>
          Common questions about switching from Buffer to Shoutly AI.
        </p>

      </div>

      <div class="faq">

        <details>
          <summary>
            Is Shoutly AI a Buffer alternative?
          </summary>

          <p>
            Yes. Shoutly AI can be used as a Buffer alternative for
            businesses that want social media content generation,
            scheduling and publishing in one workflow.
          </p>
        </details>

        <details>
          <summary>
            Is Buffer better than Shoutly AI?
          </summary>

          <p>
            It depends on your needs. Buffer is a strong choice for
            scheduling, publishing, analytics, community management and
            collaboration. Shoutly AI is designed for businesses that
            want to automate more of the content-generation process.
          </p>
        </details>

        <details>
          <summary>
            Does Buffer have AI?
          </summary>

          <p>
            Yes. Buffer currently provides an AI Assistant that can help
            generate and refine social media content.
          </p>
        </details>

        <details>
          <summary>
            Does Shoutly AI schedule social media posts?
          </summary>

          <p>
            Yes. Shoutly AI combines AI-assisted content creation with
            social media scheduling and publishing.
          </p>
        </details>

        <details>
          <summary>
            Why switch from Buffer to Shoutly AI?
          </summary>

          <p>
            Businesses may consider Shoutly AI when the main bottleneck is
            creating enough content rather than simply scheduling content
            that has already been created.
          </p>
        </details>

        <details>
          <summary>
            Is Buffer free?
          </summary>

          <p>
            Buffer currently offers a Free plan that supports up to three
            connected channels, with limits on scheduled posts and other
            capabilities.
          </p>
        </details>

        <details>
          <summary>
            Does Shoutly AI replace a social media scheduler?
          </summary>

          <p>
            Shoutly AI includes scheduling and publishing, but its
            positioning goes beyond scheduling by focusing on AI-assisted
            content creation and social media automation.
          </p>
        </details>

      </div>

    </div>

  </section>


  <!-- CTA -->

  <section class="cta">

    <div class="container">

      <div class="cta-card">

        <h2>
          Your social media should create itself.
        </h2>

        <p>
          Stop starting every month with an empty content calendar.
          Give Shoutly AI your business context and build a more automated
          workflow for creating, planning and publishing social content.
        </p>

        <a
          href="https://shoutlyai.com"
          class="btn btn-primary"
        >
          Start with Shoutly AI
        </a>

      </div>

    </div>

  </section>


  <!-- FOOTER -->`;

export default function BufferAlternativePage() {
  return (
    <main className="bg-white text-slate-900">
      <style dangerouslySetInnerHTML={{ __html: PAGE_STYLES }} />
      <div className="buffer-alternative-content" dangerouslySetInnerHTML={{ __html: PAGE_BODY }} />
    </main>
  );
}
