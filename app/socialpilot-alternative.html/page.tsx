import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SocialPilot Alternative | Shoutly AI – AI Social Media Automation",
  description: "Looking for a SocialPilot alternative? Compare SocialPilot and Shoutly AI for AI content creation, social media scheduling, publishing, analytics, collaboration and automation.",
};

const PAGE_STYLES = `
.socialpilot-alternative-content { font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; line-height: 1.6; }
.socialpilot-alternative-content a { color: inherit; text-decoration: none; }
:root {
      --primary: #f97316;
      --primary-dark: #ea580c;
      --text: #171717;
      --muted: #666;
      --border: #e8e8ee;
      --soft: #f7f7fb;
      --dark: #111118;
      --white: #ffffff;
      --radius: 18px;
      --shadow: 0 15px 45px rgba(20, 20, 50, 0.08);
    }

    .container {
      width: min(1160px, calc(100% - 40px));
      margin: auto;
    }

    /* =========================
       NAVIGATION
    ========================== */

    .nav {
      height: 76px;
      display: flex;
      align-items: center;

      border-bottom: 1px solid var(--border);

      background: rgba(255,255,255,.96);

      position: sticky;
      top: 0;
      z-index: 100;

      backdrop-filter: blur(14px);
    }

    .nav-inner {
      width: 100%;

      display: flex;
      align-items: center;
      justify-content: space-between;
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
      gap: 27px;

      font-size: 14px;
      color: #444;
    }

    .nav-links a:hover {
      color: var(--primary);
    }

    .nav-cta {
      background: var(--dark);
      color: white !important;

      padding: 11px 18px;

      border-radius: 10px;

      font-weight: 700;
    }

    /* =========================
       HERO
    ========================== */

    .hero {
      padding: 94px 0 84px;

      background:
        radial-gradient(
          circle at 10% 15%,
          rgba(249,115,22,.14),
          transparent 33%
        ),
        radial-gradient(
          circle at 90% 5%,
          rgba(249,115,22,.09),
          transparent 30%
        ),
        #ffffff;
    }

    .eyebrow {
      display: inline-flex;

      padding: 7px 13px;

      border-radius: 999px;

      border: 1px solid #fed7aa;

      background: #fff7ed;

      color: var(--primary);

      font-size: 13px;
      font-weight: 800;

      margin-bottom: 23px;
    }

    .hero h1 {
      max-width: 900px;

      font-size: clamp(43px, 6vw, 72px);

      line-height: 1.02;

      letter-spacing: -3px;

      margin-bottom: 25px;
    }

    .hero h1 span {
      color: var(--primary);
    }

    .hero p {
      max-width: 800px;

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
      background: white;
      border-color: var(--border);
    }

    /* =========================
       SUMMARY
    ========================== */

    .summary {
      margin-top: -35px;

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
      background: var(--soft);

      padding: 24px;

      border-radius: 16px;
    }

    .summary-column h3 {
      font-size: 21px;

      margin-bottom: 8px;
    }

    .summary-column p {
      color: var(--muted);
    }

    /* =========================
       GENERAL
    ========================== */

    section {
      padding: 90px 0;
    }

    .section-heading {
      max-width: 800px;

      margin-bottom: 45px;
    }

    .section-heading h2 {
      font-size: clamp(32px, 4vw, 48px);

      line-height: 1.1;

      letter-spacing: -1.8px;

      margin-bottom: 15px;
    }

    .section-heading p {
      font-size: 17px;

      color: var(--muted);
    }

    /* =========================
       WORKFLOW
    ========================== */

    .workflow {
      display: grid;

      grid-template-columns:
        repeat(4, 1fr);

      gap: 18px;
    }

    .workflow-step {
      border: 1px solid var(--border);

      border-radius: 17px;

      padding: 27px;

      background: white;
    }

    .step-number {
      width: 36px;
      height: 36px;

      display: grid;
      place-items: center;

      border-radius: 50%;

      background: #fff7ed;

      color: var(--primary);

      font-weight: 800;

      margin-bottom: 20px;
    }

    .workflow-step h3 {
      margin-bottom: 9px;
    }

    .workflow-step p {
      color: var(--muted);

      font-size: 14px;
    }

    /* =========================
       SOFT SECTION
    ========================== */

    .soft-section {
      background: var(--soft);
    }

    /* =========================
       COMPARISON
    ========================== */

    .comparison-wrapper {
      overflow-x: auto;

      border: 1px solid var(--border);

      border-radius: 18px;

      box-shadow: var(--shadow);
    }

    table {
      width: 100%;

      min-width: 840px;

      border-collapse: collapse;

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

    th:nth-child(3) {
      color: var(--primary);
    }

    td:first-child {
      width: 25%;

      font-weight: 700;

      color: #222;
    }

    td {
      color: #555;

      font-size: 15px;
    }

    tr:last-child td {
      border-bottom: 0;
    }

    /* =========================
       DIFFERENTIATION
    ========================== */

    .difference {
      background: var(--dark);

      color: white;
    }

    .difference .section-heading p {
      color: #aaa;
    }

    .difference-grid {
      display: grid;

      grid-template-columns:
        repeat(3, 1fr);

      gap: 20px;
    }

    .difference-card {
      padding: 30px;

      border-radius: 18px;

      border: 1px solid rgba(255,255,255,.1);

      background: rgba(255,255,255,.045);
    }

    .difference-number {
      color: #fdba74;

      font-size: 14px;

      font-weight: 800;

      margin-bottom: 20px;
    }

    .difference-card h3 {
      font-size: 22px;

      margin-bottom: 10px;
    }

    .difference-card p {
      color: #b8b8c3;
    }

    /* =========================
       TWO COLUMNS
    ========================== */

    .two-column {
      display: grid;

      grid-template-columns:
        1fr 1fr;

      gap: 24px;
    }

    .info-card {
      background: white;

      border: 1px solid var(--border);

      border-radius: 18px;

      padding: 30px;
    }

    .info-card h3 {
      font-size: 24px;

      margin-bottom: 12px;
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

    /* =========================
       USE CASES
    ========================== */

    .use-cases {
      display: grid;

      grid-template-columns:
        repeat(3, 1fr);

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

    /* =========================
       FAQ
    ========================== */

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

    /* =========================
       CTA
    ========================== */

    .cta {
      padding: 90px 0;
    }

    .cta-card {
      background:
        radial-gradient(
          circle at 85% 10%,
          rgba(249,115,22,.28),
          transparent 30%
        ),
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
      max-width: 690px;

      margin: 0 auto 28px;

      color: #bbb;

      font-size: 17px;
    }

    /* =========================
       FOOTER
    ========================== */

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

    /* =========================
       MOBILE
    ========================== */

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

const PAGE_BODY = `<!-- =========================
       NAVIGATION
  ========================== -->

  <!-- =========================
       HERO
  ========================== -->

  <section class="hero">

    <div class="container">

      <div class="eyebrow">
        SOCIALPILOT ALTERNATIVE
      </div>


      <h1>
        Looking for a
        <span>SocialPilot alternative?</span>
      </h1>


      <p>
        SocialPilot is a full social media management platform with
        scheduling, publishing, analytics, AI content tools, collaboration,
        inbox management and agency features. Shoutly AI takes a more
        content-first approach: tell it about your business, generate
        social content, build your calendar and schedule it across your
        connected platforms.
      </p>


      <div class="hero-buttons">

        <a
          href="https://shoutlyai.com"
          class="btn btn-primary"
        >
          Try Shoutly AI
        </a>


        <a
          href="/compare/socialpilot-vs-shoutly-ai"
          class="btn btn-secondary"
        >
          Compare SocialPilot vs Shoutly AI
        </a>

      </div>

    </div>

  </section>


  <!-- =========================
       SUMMARY
  ========================== -->

  <section class="summary">

    <div class="container">

      <div class="summary-card">


        <div class="summary-column">

          <h3>
            SocialPilot
          </h3>

          <p>
            A social media management platform covering publishing,
            scheduling, analytics, AI-assisted content creation,
            collaboration, social inbox, client management, white-label
            reporting and agency workflows.
          </p>

        </div>


        <div class="summary-column">

          <h3>
            Shoutly AI
          </h3>

          <p>
            An AI-powered social media automation platform focused on
            turning business information into ready-to-publish social
            content, calendars, visuals, captions and scheduled posts.
          </p>

        </div>


      </div>

    </div>

  </section>


  <!-- =========================
       INTRO
  ========================== -->

  <section>

    <div class="container">


      <div class="section-heading">

        <h2>
          The difference starts before scheduling
        </h2>

        <p>
          SocialPilot already provides AI, scheduling and content
          management. The stronger reason to evaluate Shoutly AI is the
          way the entire content workflow is structured around the
          business itself.
        </p>

      </div>


      <div class="workflow">


        <div class="workflow-step">

          <div class="step-number">
            1
          </div>

          <h3>
            Define your business
          </h3>

          <p>
            Tell Shoutly AI what your business does, what industry you are
            in and what kind of content you need.
          </p>

        </div>


        <div class="workflow-step">

          <div class="step-number">
            2
          </div>

          <h3>
            Generate content
          </h3>

          <p>
            Generate social posts with professionally designed visuals,
            captions and hashtags.
          </p>

        </div>


        <div class="workflow-step">

          <div class="step-number">
            3
          </div>

          <h3>
            Build your calendar
          </h3>

          <p>
            Organize generated content into a planned social media
            calendar instead of creating every post individually.
          </p>

        </div>


        <div class="workflow-step">

          <div class="step-number">
            4
          </div>

          <h3>
            Schedule and publish
          </h3>

          <p>
            Schedule and publish content across supported social
            platforms from one dashboard.
          </p>

        </div>


      </div>

    </div>

  </section>


  <!-- =========================
       COMPARISON
  ========================== -->

  <section class="soft-section">

    <div class="container">


      <div class="section-heading">

        <h2>
          SocialPilot vs Shoutly AI
        </h2>

        <p>
          A practical comparison based on the current capabilities
          publicly documented by both platforms.
        </p>

      </div>


      <div class="comparison-wrapper">

        <table>

          <thead>

            <tr>

              <th>
                Capability
              </th>

              <th>
                SocialPilot
              </th>

              <th>
                Shoutly AI
              </th>

            </tr>

          </thead>


          <tbody>


            <tr>

              <td>
                Social media scheduling
              </td>

              <td>
                Yes. Scheduling and publishing are core SocialPilot
                capabilities.
              </td>

              <td>
                Yes. Scheduling and publishing are core parts of the
                Shoutly AI workflow.
              </td>

            </tr>


            <tr>

              <td>
                AI content creation
              </td>

              <td>
                Yes. SocialPilot's AI Pilot can ideate, generate and
                rewrite social media content.
              </td>

              <td>
                Yes. AI content generation is central to Shoutly AI,
                including captions, hashtags and visual content.
              </td>

            </tr>


            <tr>

              <td>
                AI scheduling
              </td>

              <td>
                Yes. SocialPilot provides AI-suggested posting times and
                its AI Scheduler can schedule content from AI workflows.
              </td>

              <td>
                Shoutly AI combines generated content with its scheduling
                and publishing workflow.
              </td>

            </tr>


            <tr>

              <td>
                Content calendar
              </td>

              <td>
                Yes. SocialPilot provides a social media calendar for
                planning and scheduling.
              </td>

              <td>
                Yes. Shoutly AI creates and organizes content into a
                social media calendar.
              </td>

            </tr>


            <tr>

              <td>
                Bulk scheduling
              </td>

              <td>
                Yes. SocialPilot supports bulk scheduling, including
                large batches of posts.
              </td>

              <td>
                Shoutly AI focuses on generating a longer content pipeline
                and scheduling content from the generated calendar.
              </td>

            </tr>


            <tr>

              <td>
                Social media analytics
              </td>

              <td>
                Yes. SocialPilot provides analytics and advanced reporting,
                depending on plan.
              </td>

              <td>
                Yes. Shoutly AI promotes unified cross-channel analytics
                and reporting.
              </td>

            </tr>


            <tr>

              <td>
                Social media inbox
              </td>

              <td>
                Yes. SocialPilot Standard and higher plans include a
                social media inbox.
              </td>

              <td>
                Yes. Shoutly AI currently promotes a comments inbox for
                managing social interactions.
              </td>

            </tr>


            <tr>

              <td>
                Team collaboration
              </td>

              <td>
                Yes. Team collaboration and approval capabilities are
                included in higher SocialPilot plans.
              </td>

              <td>
                Shoutly AI is designed around an all-in-one content
                automation workflow.
              </td>

            </tr>


            <tr>

              <td>
                Client approvals
              </td>

              <td>
                Yes. Client approval functionality is available in
                SocialPilot's Premium and higher agency-oriented plans.
              </td>

              <td>
                Not positioned as a primary feature of Shoutly AI's
                current public product offering.
              </td>

            </tr>


            <tr>

              <td>
                White-label reports
              </td>

              <td>
                Yes. SocialPilot Premium and Ultimate include white-label
                reporting capabilities.
              </td>

              <td>
                Shoutly AI's current public positioning focuses on
                content creation, scheduling, publishing and analytics
                rather than agency white-label reporting.
              </td>

            </tr>


            <tr>

              <td>
                Content library
              </td>

              <td>
                Yes. Content Library is available across SocialPilot's
                main social media plans.
              </td>

              <td>
                Yes. Shoutly AI includes a media library as part of its
                all-in-one product.
              </td>

            </tr>


            <tr>

              <td>
                Supported social networks
              </td>

              <td>
                SocialPilot currently lists Facebook, Instagram, TikTok,
                X, LinkedIn, Threads, YouTube, Pinterest, Google Business
                Profile and Bluesky among its supported platforms.
              </td>

              <td>
                Shoutly AI currently promotes 10 platforms including X,
                LinkedIn, Instagram, TikTok, Facebook, Threads, Bluesky,
                YouTube, Pinterest and Google Business Profile.
              </td>

            </tr>


            <tr>

              <td>
                Agency features
              </td>

              <td>
                Strong agency focus including client management,
                approvals, white-label reporting and higher account
                limits on higher plans.
              </td>

              <td>
                Shoutly AI supports agencies but its primary product
                positioning is AI-powered content automation.
              </td>

            </tr>


            <tr>

              <td>
                Review management
              </td>

              <td>
                Yes. SocialPilot has a separate Reviews product covering
                review management and AI-powered replies.
              </td>

              <td>
                Shoutly AI's core product is focused on social media
                content and publishing rather than dedicated review
                management.
              </td>

            </tr>


            <tr>

              <td>
                Primary product focus
              </td>

              <td>
                Social media management, scheduling, publishing,
                analytics, AI, collaboration and agency workflows.
              </td>

              <td>
                AI-first social media content creation, planning,
                scheduling and publishing automation.
              </td>

            </tr>


          </tbody>

        </table>

      </div>

    </div>

  </section>


  <!-- =========================
       DIFFERENTIATION
  ========================== -->

  <section class="difference">

    <div class="container">


      <div class="section-heading">

        <h2>
          Why consider Shoutly AI?
        </h2>

        <p>
          SocialPilot is already capable of AI-assisted content creation.
          Shoutly AI differentiates by making content generation the
          starting point of the social media workflow.
        </p>

      </div>


      <div class="difference-grid">


        <div class="difference-card">

          <div class="difference-number">
            01
          </div>

          <h3>
            Start with the business
          </h3>

          <p>
            Instead of beginning with a content queue, Shoutly AI starts
            with information about your business and uses that context
            to build social content.
          </p>

        </div>


        <div class="difference-card">

          <div class="difference-number">
            02
          </div>

          <h3>
            Create before you schedule
          </h3>

          <p>
            Shoutly AI connects business context, AI content generation,
            visual creation, calendar planning and scheduling in one
            workflow.
          </p>

        </div>


        <div class="difference-card">

          <div class="difference-number">
            03
          </div>

          <h3>
            One all-in-one plan
          </h3>

          <p>
            Shoutly AI currently uses a single all-in-one plan rather than
            separating its main product capabilities across multiple
            subscription tiers.
          </p>

        </div>


      </div>

    </div>

  </section>


  <!-- =========================
       WHO SHOULD CHOOSE WHAT
  ========================== -->

  <section>

    <div class="container">


      <div class="section-heading">

        <h2>
          SocialPilot or Shoutly AI?
        </h2>

        <p>
          The right option depends on whether your primary problem is
          managing a sophisticated social operation or generating
          consistent content for your business.
        </p>

      </div>


      <div class="two-column">


        <div class="info-card">

          <h3>
            Choose SocialPilot if...
          </h3>

          <p>
            You need a mature social media management platform with
            scheduling, analytics, collaboration and agency-oriented
            capabilities.
          </p>

          <ul>

            <li>
              ✓ You manage multiple clients or brands
            </li>

            <li>
              ✓ You need bulk scheduling
            </li>

            <li>
              ✓ You need client approval workflows
            </li>

            <li>
              ✓ You need white-label reporting
            </li>

            <li>
              ✓ You need advanced analytics
            </li>

            <li>
              ✓ You want a social media inbox
            </li>

            <li>
              ✓ You need an established agency workflow
            </li>

          </ul>

        </div>


        <div class="info-card">

          <h3>
            Consider Shoutly AI if...
          </h3>

          <p>
            Your biggest challenge is consistently producing social
            content rather than simply managing content that already
            exists.
          </p>

          <ul>

            <li>
              ✓ You want AI-generated social posts
            </li>

            <li>
              ✓ You want business-specific content generation
            </li>

            <li>
              ✓ You want branded visuals with captions and hashtags
            </li>

            <li>
              ✓ You want a content calendar generated around your business
            </li>

            <li>
              ✓ You want creation and scheduling in one workflow
            </li>

            <li>
              ✓ You prefer one all-in-one plan
            </li>

            <li>
              ✓ You want to automate repetitive content-production work
            </li>

          </ul>

        </div>


      </div>

    </div>

  </section>


  <!-- =========================
       CONTENT WORKFLOW
  ========================== -->

  <section class="soft-section">

    <div class="container">


      <div class="section-heading">

        <h2>
          From business description to scheduled content
        </h2>

        <p>
          Shoutly AI is designed around the idea that businesses should
          not have to start every month with an empty social media
          calendar.
        </p>

      </div>


      <div class="workflow">


        <div class="workflow-step">

          <div class="step-number">
            01
          </div>

          <h3>
            Select your business
          </h3>

          <p>
            Choose your industry and business type so the system has
            relevant context for the content it creates.
          </p>

        </div>


        <div class="workflow-step">

          <div class="step-number">
            02
          </div>

          <h3>
            Describe what you do
          </h3>

          <p>
            Provide your business information and content requirements.
          </p>

        </div>


        <div class="workflow-step">

          <div class="step-number">
            03
          </div>

          <h3>
            AI creates posts
          </h3>

          <p>
            Generate social posts with visuals, captions, hashtags,
            promotions and other business-relevant content.
          </p>

        </div>


        <div class="workflow-step">

          <div class="step-number">
            04
          </div>

          <h3>
            Schedule automatically
          </h3>

          <p>
            Organize the generated content into your calendar and
            schedule it across connected social platforms.
          </p>

        </div>


      </div>

    </div>

  </section>


  <!-- =========================
       PRICING
  ========================== -->

  <section>

    <div class="container">


      <div class="section-heading">

        <h2>
          SocialPilot pricing vs Shoutly AI pricing
        </h2>

        <p>
          The pricing structures are fundamentally different, so compare
          the included capabilities and account limits rather than only
          the headline monthly price.
        </p>

      </div>


      <div class="two-column">


        <div class="info-card">

          <h3>
            SocialPilot
          </h3>

          <p>
            SocialPilot currently offers multiple plans for different
            users and teams. Its main pricing page lists Essentials at
            $17/month, Standard at $34/month, Premium at $85/month and
            Ultimate at $170/month when billed annually.
          </p>

          <p>
            The plans differ in social account limits, users, AI credits,
            analytics, bulk scheduling, approvals, white-label reporting
            and other capabilities.
          </p>

          <a
            href="https://www.socialpilot.co/pricing"
            target="_blank"
            rel="noopener"
            class="btn btn-secondary"
          >
            View SocialPilot Pricing
          </a>

        </div>


        <div class="info-card">

          <h3>
            Shoutly AI
          </h3>

          <p>
            Shoutly AI currently presents a single all-in-one plan rather
            than separating the core product into multiple feature tiers.
          </p>

          <p>
            The current Shoutly AI website lists the monthly plan at
            ₹10,000/month and promotes access to all 10 supported
            platforms, unlimited posting and scheduling, analytics,
            reporting, media library and comments inbox.
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


  <!-- =========================
       SOCIALPILOT ADVANTAGES
  ========================== -->

  <section class="soft-section">

    <div class="container">


      <div class="section-heading">

        <h2>
          Where SocialPilot has an advantage
        </h2>

        <p>
          An honest alternative page should make it clear where
          SocialPilot may be the better product for certain teams.
        </p>

      </div>


      <div class="two-column">


        <div class="info-card">

          <h3>
            Agency management
          </h3>

          <p>
            SocialPilot has a strong agency-oriented feature set,
            including client management, approvals, white-label reports
            and higher account limits on higher plans.
          </p>

        </div>


        <div class="info-card">

          <h3>
            Bulk scheduling
          </h3>

          <p>
            SocialPilot supports bulk scheduling and positions the
            platform for teams managing large publishing calendars.
          </p>

        </div>


        <div class="info-card">

          <h3>
            Advanced analytics
          </h3>

          <p>
            Higher SocialPilot plans include advanced analytics and
            reporting capabilities designed for teams and agencies.
          </p>

        </div>


        <div class="info-card">

          <h3>
            White-label reporting
          </h3>

          <p>
            SocialPilot Premium and Ultimate include white-label
            reporting features, which can be important for agencies
            delivering reports to clients.
          </p>

        </div>


      </div>

    </div>

  </section>


  <!-- =========================
       SHOUTLY FOCUS
  ========================== -->

  <section>

    <div class="container">


      <div class="section-heading">

        <h2>
          Where Shoutly AI focuses
        </h2>

        <p>
          Shoutly AI is designed around reducing the amount of manual
          work required to go from business information to a consistent
          stream of social media content.
        </p>

      </div>


      <div class="difference-grid">


        <div
          class="difference-card"
          style="
            background:#f7f7fb;
            color:#171717;
            border:1px solid #e8e8ee;
          "
        >

          <div class="difference-number">
            01
          </div>

          <h3>
            Generate
          </h3>

          <p style="color:#666;">
            Turn your business information into social posts with
            visuals, captions and hashtags.
          </p>

        </div>


        <div
          class="difference-card"
          style="
            background:#f7f7fb;
            color:#171717;
            border:1px solid #e8e8ee;
          "
        >

          <div class="difference-number">
            02
          </div>

          <h3>
            Plan
          </h3>

          <p style="color:#666;">
            Organize generated content into a structured content calendar
            for ongoing publishing.
          </p>

        </div>


        <div
          class="difference-card"
          style="
            background:#f7f7fb;
            color:#171717;
            border:1px solid #e8e8ee;
          "
        >

          <div class="difference-number">
            03
          </div>

          <h3>
            Publish
          </h3>

          <p style="color:#666;">
            Schedule and publish the generated content across supported
            social platforms from one dashboard.
          </p>

        </div>


      </div>

    </div>

  </section>


  <!-- =========================
       USE CASES
  ========================== -->

  <section class="soft-section">

    <div class="container">


      <div class="section-heading">

        <h2>
          Who is Shoutly AI a SocialPilot alternative for?
        </h2>

        <p>
          Shoutly AI is particularly relevant for businesses where the
          biggest social media problem is producing enough relevant
          content consistently.
        </p>

      </div>


      <div class="use-cases">


        <div class="use-case">

          <h3>
            Small Businesses
          </h3>

          <p>
            Create a consistent social presence without requiring a large
            internal content team.
          </p>

        </div>


        <div class="use-case">

          <h3>
            Founders
          </h3>

          <p>
            Turn business knowledge, announcements and expertise into
            repeatable social content.
          </p>

        </div>


        <div class="use-case">

          <h3>
            Local Businesses
          </h3>

          <p>
            Generate content around services, offers, occasions,
            festivals and business-specific topics.
          </p>

        </div>


        <div class="use-case">

          <h3>
            Agencies
          </h3>

          <p>
            Use AI-assisted generation to reduce repetitive content
            creation work across client accounts.
          </p>

        </div>


        <div class="use-case">

          <h3>
            Lean Marketing Teams
          </h3>

          <p>
            Automate more of the content-production workflow before posts
            reach the publishing calendar.
          </p>

        </div>


        <div class="use-case">

          <h3>
            Creators
          </h3>

          <p>
            Maintain a consistent publishing pipeline without manually
            preparing every social post.
          </p>

        </div>


      </div>

    </div>

  </section>


  <!-- =========================
       DECISION TABLE
  ========================== -->

  <section>

    <div class="container">


      <div class="section-heading">

        <h2>
          Which platform fits your workflow?
        </h2>

        <p>
          Instead of asking which product is universally better, start
          with the problem you are trying to solve.
        </p>

      </div>


      <div class="comparison-wrapper">

        <table>

          <thead>

            <tr>

              <th>
                If your priority is...
              </th>

              <th>
                Consider
              </th>

              <th>
                Why
              </th>

            </tr>

          </thead>


          <tbody>


            <tr>

              <td>
                Social media scheduling
              </td>

              <td>
                Both
              </td>

              <td>
                Both platforms provide scheduling and publishing.
              </td>

            </tr>


            <tr>

              <td>
                AI content generation
              </td>

              <td>
                Both
              </td>

              <td>
                Both SocialPilot and Shoutly AI have AI-assisted content
                capabilities.
              </td>

            </tr>


            <tr>

              <td>
                Bulk scheduling
              </td>

              <td>
                SocialPilot
              </td>

              <td>
                SocialPilot explicitly provides bulk scheduling for
                managing large batches of posts.
              </td>

            </tr>


            <tr>

              <td>
                Agency approvals
              </td>

              <td>
                SocialPilot
              </td>

              <td>
                SocialPilot provides approval and collaboration features
                designed for teams and agencies.
              </td>

            </tr>


            <tr>

              <td>
                White-label reports
              </td>

              <td>
                SocialPilot
              </td>

              <td>
                White-label reporting is available on higher SocialPilot
                plans.
              </td>

            </tr>


            <tr>

              <td>
                Business-specific AI content
              </td>

              <td>
                Shoutly AI
              </td>

              <td>
                Shoutly AI starts its workflow with business information
                and generates content around that context.
              </td>

            </tr>


            <tr>

              <td>
                Content creation + scheduling
              </td>

              <td>
                Shoutly AI
              </td>

              <td>
                Shoutly AI is designed around connecting generation,
                calendar planning and publishing.
              </td>

            </tr>


            <tr>

              <td>
                One all-in-one plan
              </td>

              <td>
                Shoutly AI
              </td>

              <td>
                Shoutly AI currently presents one primary all-in-one
                subscription.
              </td>

            </tr>


          </tbody>

        </table>

      </div>

    </div>

  </section>


  <!-- =========================
       FAQ
  ========================== -->

  <section class="soft-section">

    <div class="container">


      <div class="section-heading">

        <h2>
          Frequently asked questions
        </h2>

        <p>
          Common questions about using Shoutly AI as a SocialPilot
          alternative.
        </p>

      </div>


      <div class="faq">


        <details>

          <summary>
            Is Shoutly AI a SocialPilot alternative?
          </summary>

          <p>
            Yes. Shoutly AI can be considered a SocialPilot alternative
            for businesses that want AI-assisted social content creation,
            scheduling, publishing and automation.
          </p>

        </details>


        <details>

          <summary>
            Does SocialPilot have AI?
          </summary>

          <p>
            Yes. SocialPilot currently offers AI Pilot for content
            ideation, generation and rewriting, as well as AI-assisted
            scheduling capabilities.
          </p>

        </details>


        <details>

          <summary>
            Does SocialPilot schedule social media posts?
          </summary>

          <p>
            Yes. Scheduling and publishing are core SocialPilot features,
            including bulk scheduling.
          </p>

        </details>


        <details>

          <summary>
            What is the main difference between SocialPilot and Shoutly AI?
          </summary>

          <p>
            SocialPilot is a broad social media management platform with
            strong publishing, analytics, collaboration and agency
            capabilities. Shoutly AI focuses more heavily on generating
            business-specific content and connecting content creation,
            calendar planning and publishing in one workflow.
          </p>

        </details>


        <details>

          <summary>
            Who should consider Shoutly AI instead of SocialPilot?
          </summary>

          <p>
            Businesses, founders, creators, local businesses and lean
            marketing teams may consider Shoutly AI when their biggest
            challenge is consistently generating social content rather
            than managing a complex agency publishing operation.
          </p>

        </details>


        <details>

          <summary>
            Does SocialPilot support multiple social networks?
          </summary>

          <p>
            Yes. SocialPilot currently lists Facebook, Instagram, TikTok,
            X, LinkedIn, Threads, YouTube, Pinterest, Google Business
            Profile and Bluesky among its supported social platforms.
          </p>

        </details>


        <details>

          <summary>
            Does Shoutly AI support multiple social networks?
          </summary>

          <p>
            Yes. Shoutly AI currently promotes publishing across 10
            platforms including X, LinkedIn, Instagram, TikTok, Facebook,
            Threads, Bluesky, YouTube, Pinterest and Google Business
            Profile.
          </p>

        </details>


        <details>

          <summary>
            Is SocialPilot better than Shoutly AI?
          </summary>

          <p>
            Neither is universally better. SocialPilot may be a stronger
            fit for agencies and teams that need bulk scheduling,
            approvals, advanced analytics, client management and
            white-label reporting. Shoutly AI is more focused on
            AI-generated business-specific content and an automated
            content-to-publishing workflow.
          </p>

        </details>


        <details>

          <summary>
            Does Shoutly AI replace SocialPilot?
          </summary>

          <p>
            Shoutly AI can replace a social media management workflow for
            some businesses, particularly those focused on AI content
            generation, scheduling and publishing. Organizations that
            depend heavily on SocialPilot's agency-specific capabilities
            should evaluate those requirements before switching.
          </p>

        </details>


      </div>

    </div>

  </section>


  <!-- =========================
       CTA
  ========================== -->

  <section class="cta">

    <div class="container">


      <div class="cta-card">

        <h2>
          Your business shouldn't start every month with an empty
          content calendar.
        </h2>


        <p>
          Tell Shoutly AI what your business does. Generate social posts,
          create your content calendar, schedule your content and publish
          across your connected platforms from one dashboard.
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


  <!-- =========================
       FOOTER
  ========================== -->`;

export default function SocialPilotAlternativePage() {
  return (
    <main className="bg-white text-slate-900">
      <style dangerouslySetInnerHTML={{ __html: PAGE_STYLES }} />
      <div className="socialpilot-alternative-content" dangerouslySetInnerHTML={{ __html: PAGE_BODY }} />
    </main>
  );
}
