import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hootsuite Alternative | Shoutly AI – AI Social Media Automation",
  description: "Looking for a Hootsuite alternative? Compare Hootsuite and Shoutly AI for AI content creation, social media scheduling, publishing, analytics, inbox management and automation.",
};

const PAGE_STYLES = `
.hootsuite-alternative-content { font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; line-height: 1.6; }
.hootsuite-alternative-content a { color: inherit; text-decoration: none; }
:root {
      --primary: #f97316;
      --primary-dark: #ea580c;
      --text: #171717;
      --muted: #666;
      --border: #e8e8ee;
      --bg: #ffffff;
      --soft: #f7f7fb;
      --dark: #111118;
      --radius: 18px;
      --shadow: 0 15px 45px rgba(20, 20, 50, 0.08);
    }

    .container {
      width: min(1160px, calc(100% - 40px));
      margin: auto;
    }

    /* NAV */

    .nav {
      height: 76px;
      border-bottom: 1px solid var(--border);
      display: flex;
      align-items: center;
      background: rgba(255,255,255,.95);
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
      gap: 27px;
      font-size: 14px;
      color: #444;
    }

    .nav-links a:hover {
      color: var(--primary);
    }

    .nav-cta {
      background: var(--dark);
      color: #fff !important;
      padding: 11px 18px;
      border-radius: 10px;
      font-weight: 700;
    }

    /* HERO */

    .hero {
      padding: 92px 0 82px;
      background:
        radial-gradient(
          circle at 12% 15%,
          rgba(249,115,22,.14),
          transparent 33%
        ),
        radial-gradient(
          circle at 88% 5%,
          rgba(249,115,22,.10),
          transparent 30%
        ),
        #fff;
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
      max-width: 920px;
      font-size: clamp(43px, 6vw, 72px);
      line-height: 1.02;
      letter-spacing: -3px;
      margin-bottom: 25px;
    }

    .hero h1 span {
      color: var(--primary);
    }

    .hero p {
      max-width: 790px;
      font-size: 19px;
      line-height: 1.7;
      color: var(--muted);
      margin-bottom: 34px;
    }

    .hero-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }

    .btn {
      display: inline-flex;
      justify-content: center;
      align-items: center;
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

    /* QUICK SUMMARY */

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

    /* COMMON */

    section {
      padding: 90px 0;
    }

    .section-heading {
      max-width: 790px;
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

    /* COMPARISON TABLE */

    .comparison-wrapper {
      overflow-x: auto;
      border: 1px solid var(--border);
      border-radius: 18px;
      box-shadow: var(--shadow);
    }

    table {
      width: 100%;
      min-width: 820px;
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

    /* DIFFERENCE */

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

    /* SOFT SECTION */

    .soft-section {
      background: var(--soft);
    }

    /* TWO COLUMNS */

    .two-column {
      display: grid;
      grid-template-columns: 1fr 1fr;
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
      max-width: 680px;
      margin: 0 auto 28px;
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

const PAGE_BODY = `<!-- NAVIGATION -->

  <!-- HERO -->

  <section class="hero">

    <div class="container">

      <div class="eyebrow">
        HOOTSUITE ALTERNATIVE
      </div>

      <h1>
        Looking for a
        <span>Hootsuite alternative?</span>
      </h1>

      <p>
        Hootsuite is a mature social media management platform that brings
        publishing, engagement, analytics, social listening and AI-powered
        tools together. Shoutly AI takes a more focused approach: start
        with your business, generate social content with AI, organize it
        into a content calendar and schedule it across your connected
        platforms.
      </p>

      <div class="hero-buttons">

        <a
          href="https://shoutlyai.com"
          class="btn btn-primary"
        >
          Try Shoutly AI
        </a>

        <a
          href="/compare/hootsuite-vs-shoutly-ai"
          class="btn btn-secondary"
        >
          Compare Hootsuite vs Shoutly AI
        </a>

      </div>

    </div>

  </section>


  <!-- QUICK COMPARISON -->

  <section class="summary">

    <div class="container">

      <div class="summary-card">

        <div class="summary-column">

          <h3>
            Hootsuite
          </h3>

          <p>
            A broad social media management platform covering publishing,
            scheduling, analytics, social listening, engagement, inbox
            management, AI-powered tools and collaboration workflows.
          </p>

        </div>

        <div class="summary-column">

          <h3>
            Shoutly AI
          </h3>

          <p>
            An AI-powered social media automation platform focused on
            generating business-specific content, creating social media
            calendars, scheduling and publishing across supported
            platforms.
          </p>

        </div>

      </div>

    </div>

  </section>


  <!-- DIFFERENCE INTRO -->

  <section>

    <div class="container">

      <div class="section-heading">

        <h2>
          Hootsuite is powerful. Shoutly AI takes a different route.
        </h2>

        <p>
          Hootsuite has expanded well beyond scheduling. It now combines
          publishing, analytics, listening, inbox management, AI and
          automation. The reason to consider Shoutly AI is therefore not
          because Hootsuite cannot do these things. The difference is the
          workflow and product focus.
        </p>

      </div>

      <div class="workflow">

        <div class="workflow-step">

          <div class="step-number">
            1
          </div>

          <h3>
            Tell Shoutly about your business
          </h3>

          <p>
            Start with your industry, business type and description rather
            than beginning with an empty social publishing queue.
          </p>

        </div>

        <div class="workflow-step">

          <div class="step-number">
            2
          </div>

          <h3>
            Generate social content
          </h3>

          <p>
            Shoutly AI generates posts with professionally designed
            visuals, captions and hashtags around the business.
          </p>

        </div>

        <div class="workflow-step">

          <div class="step-number">
            3
          </div>

          <h3>
            Build the calendar
          </h3>

          <p>
            Organize generated posts into a longer-term social media
            publishing calendar.
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
            Schedule and publish content across supported social platforms
            from one dashboard.
          </p>

        </div>

      </div>

    </div>

  </section>


  <!-- MAIN COMPARISON -->

  <section class="soft-section">

    <div class="container">

      <div class="section-heading">

        <h2>
          Hootsuite vs Shoutly AI
        </h2>

        <p>
          A practical comparison based on the capabilities currently
          published by both companies.
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
                Hootsuite
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
                Yes. Scheduling and publishing are core parts of Hootsuite.
                Standard currently includes unlimited post scheduling.
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
                Yes. Hootsuite provides AI-powered content creation,
                including ideas, captions and images.
              </td>

              <td>
                Yes. AI content generation is central to Shoutly AI,
                including posts, captions, hashtags and branded visuals.
              </td>

            </tr>

            <tr>

              <td>
                Content calendar
              </td>

              <td>
                Yes. Hootsuite provides a multi-platform content calendar
                for planning scheduled and published content.
              </td>

              <td>
                Yes. Shoutly AI generates and organizes content into a
                social media calendar.
              </td>

            </tr>

            <tr>

              <td>
                Social media analytics
              </td>

              <td>
                Yes. Hootsuite provides analytics, reporting and
                competitive benchmarking, with capabilities varying by
                plan.
              </td>

              <td>
                Yes. Shoutly AI promotes unified cross-channel analytics
                and reporting.
              </td>

            </tr>

            <tr>

              <td>
                Social listening
              </td>

              <td>
                Yes. Hootsuite offers social listening, mentions,
                sentiment analysis, trends and broader social intelligence.
              </td>

              <td>
                Shoutly AI's current core positioning focuses on content
                generation, scheduling, publishing and monitoring rather
                than Hootsuite's broader social-listening ecosystem.
              </td>

            </tr>

            <tr>

              <td>
                Unified social inbox
              </td>

              <td>
                Yes. Hootsuite provides a centralized inbox for supported
                social conversations, messages and comments.
              </td>

              <td>
                Yes. Shoutly AI currently promotes a comments inbox for
                managing social interactions from the platform.
              </td>

            </tr>

            <tr>

              <td>
                Automated replies
              </td>

              <td>
                Yes. Hootsuite provides automated replies, DM automation
                and other customer-engagement workflows, depending on
                plan.
              </td>

              <td>
                Shoutly AI currently focuses more heavily on automating
                content creation, scheduling and publishing.
              </td>

            </tr>

            <tr>

              <td>
                Competitor benchmarking
              </td>

              <td>
                Yes. Hootsuite includes competitor benchmarking, with the
                number of competitors depending on the plan.
              </td>

              <td>
                Not positioned as a primary Shoutly AI feature on its
                current public product page.
              </td>

            </tr>

            <tr>

              <td>
                Trend monitoring
              </td>

              <td>
                Yes. Hootsuite includes trend discovery and social
                listening capabilities.
              </td>

              <td>
                Shoutly AI's primary workflow centers on generating
                business-specific social content rather than enterprise
                social intelligence.
              </td>

            </tr>

            <tr>

              <td>
                Team approval workflows
              </td>

              <td>
                Yes. Hootsuite Advanced adds structured approval,
                collaboration and message-routing workflows.
              </td>

              <td>
                Shoutly AI is positioned around a simpler all-in-one
                content automation workflow.
              </td>

            </tr>

            <tr>

              <td>
                Supported social platforms
              </td>

              <td>
                Hootsuite currently supports major networks including
                Facebook, Instagram, TikTok, YouTube, X, LinkedIn,
                Threads, Pinterest, WhatsApp and Bluesky, with additional
                listening coverage beyond publishing networks.
              </td>

              <td>
                Shoutly AI currently promotes 10 platforms: X, LinkedIn,
                Instagram, TikTok, Facebook, Threads, Bluesky, YouTube,
                Pinterest and Google Business Profile.
              </td>

            </tr>

            <tr>

              <td>
                Pricing structure
              </td>

              <td>
                Hootsuite uses multiple plan tiers and prices plans around
                users and included capabilities.
              </td>

              <td>
                Shoutly AI currently promotes one all-in-one plan with
                access to its supported platforms and unlimited posting
                and scheduling.
              </td>

            </tr>

            <tr>

              <td>
                Primary product focus
              </td>

              <td>
                Broad social media management, publishing, engagement,
                analytics, listening, AI and team workflows.
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


  <!-- WHY CONSIDER SHOUTLY -->

  <section class="difference">

    <div class="container">

      <div class="section-heading">

        <h2>
          Why consider Shoutly AI instead of Hootsuite?
        </h2>

        <p>
          The strongest case for Shoutly AI is not that Hootsuite lacks
          features. It is that some businesses want a simpler,
          content-first workflow.
        </p>

      </div>

      <div class="difference-grid">

        <div class="difference-card">

          <div class="difference-number">
            01
          </div>

          <h3>
            Content starts with your business
          </h3>

          <p>
            Shoutly AI begins with your business context and turns it into
            social media content rather than requiring you to build the
            content pipeline manually before scheduling.
          </p>

        </div>

        <div class="difference-card">

          <div class="difference-number">
            02
          </div>

          <h3>
            Creation and publishing are connected
          </h3>

          <p>
            Shoutly AI brings AI content generation, calendar planning,
            scheduling and publishing into a single workflow designed for
            businesses that want to reduce repetitive social media work.
          </p>

        </div>

        <div class="difference-card">

          <div class="difference-number">
            03
          </div>

          <h3>
            One straightforward plan
          </h3>

          <p>
            Shoutly AI currently presents one all-in-one plan rather than
            asking customers to select between multiple feature tiers.
          </p>

        </div>

      </div>

    </div>

  </section>


  <!-- HONEST HOOTSUITE SECTION -->

  <section>

    <div class="container">

      <div class="section-heading">

        <h2>
          Hootsuite may still be the better choice for some teams
        </h2>

        <p>
          Choosing an alternative should depend on what your business
          actually needs. Hootsuite has capabilities that may make it a
          better fit for sophisticated social media operations.
        </p>

      </div>

      <div class="two-column">

        <div class="info-card">

          <h3>
            Choose Hootsuite if...
          </h3>

          <p>
            Your organization needs a broad social media management and
            intelligence platform rather than primarily an automated
            content-generation workflow.
          </p>

          <ul>

            <li>
              ✓ You need advanced social listening
            </li>

            <li>
              ✓ Competitor benchmarking is important
            </li>

            <li>
              ✓ You need sophisticated analytics and reporting
            </li>

            <li>
              ✓ You manage large customer-service inbox volumes
            </li>

            <li>
              ✓ You need approval and team workflows
            </li>

            <li>
              ✓ You need enterprise governance or integrations
            </li>

          </ul>

        </div>


        <div class="info-card">

          <h3>
            Consider Shoutly AI if...
          </h3>

          <p>
            Your biggest problem is consistently producing social content
            and keeping your business active across multiple platforms.
          </p>

          <ul>

            <li>
              ✓ You want AI-generated social content
            </li>

            <li>
              ✓ You want branded visuals, captions and hashtags together
            </li>

            <li>
              ✓ You want your content calendar generated around your business
            </li>

            <li>
              ✓ You want content creation and scheduling in one workflow
            </li>

            <li>
              ✓ You prefer one straightforward plan
            </li>

            <li>
              ✓ You want to automate repetitive content-production work
            </li>

          </ul>

        </div>

      </div>

    </div>

  </section>


  <!-- CONTENT-FIRST WORKFLOW -->

  <section class="soft-section">

    <div class="container">

      <div class="section-heading">

        <h2>
          Shoutly AI is built around the content-production problem
        </h2>

        <p>
          Social scheduling only solves the final part of the workflow.
          Shoutly AI is designed to automate more of what happens before
          the post reaches the scheduler.
        </p>

      </div>

      <div class="workflow">

        <div class="workflow-step">

          <div class="step-number">
            01
          </div>

          <h3>
            Business information
          </h3>

          <p>
            Describe your business, industry and what you want your
            audience to know.
          </p>

        </div>

        <div class="workflow-step">

          <div class="step-number">
            02
          </div>

          <h3>
            AI content
          </h3>

          <p>
            Generate social posts with captions, hashtags and visual
            content designed around the business.
          </p>

        </div>

        <div class="workflow-step">

          <div class="step-number">
            03
          </div>

          <h3>
            Content calendar
          </h3>

          <p>
            Organize content into a publishing schedule so your social
            channels have a consistent pipeline.
          </p>

        </div>

        <div class="workflow-step">

          <div class="step-number">
            04
          </div>

          <h3>
            Publishing
          </h3>

          <p>
            Schedule and publish across supported social media platforms
            from the same dashboard.
          </p>

        </div>

      </div>

    </div>

  </section>


  <!-- PRICING -->

  <section>

    <div class="container">

      <div class="section-heading">

        <h2>
          Hootsuite pricing vs Shoutly AI pricing
        </h2>

        <p>
          These products use different pricing structures, so the most
          useful comparison is not simply the advertised monthly price.
        </p>

      </div>

      <div class="two-column">

        <div class="info-card">

          <h3>
            Hootsuite
          </h3>

          <p>
            Hootsuite currently offers Standard, Professional, Advanced
            and Enterprise plans. Standard is designed for up to 10
            social accounts, Professional adds unlimited social accounts
            and more automation, Advanced adds structured collaboration
            and approval workflows, and Enterprise uses custom pricing.
          </p>

          <p>
            Hootsuite's pricing varies by plan, user and billing
            arrangement, so visitors should check Hootsuite's current
            pricing page for the latest amount before purchasing.
          </p>

          <a
            href="https://www.hootsuite.com/plans"
            target="_blank"
            rel="noopener"
            class="btn btn-secondary"
          >
            View Hootsuite Plans
          </a>

        </div>


        <div class="info-card">

          <h3>
            Shoutly AI
          </h3>

          <p>
            Shoutly AI currently presents one all-in-one plan rather than
            separating core functionality into multiple feature tiers.
          </p>

          <p>
            The current Shoutly AI website lists the monthly plan at
            ₹10,000/month and includes all 10 supported platforms,
            unlimited posting and scheduling, analytics and reporting,
            media library and comments inbox.
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


  <!-- WHO IT IS FOR -->

  <section class="soft-section">

    <div class="container">

      <div class="section-heading">

        <h2>
          Who is Shoutly AI a Hootsuite alternative for?
        </h2>

        <p>
          Shoutly AI is most relevant to organizations where content
          creation and consistency are bigger problems than enterprise
          social intelligence.
        </p>

      </div>

      <div class="use-cases">

        <div class="use-case">

          <h3>
            Small Businesses
          </h3>

          <p>
            Generate consistent social content without building a large
            in-house social media team.
          </p>

        </div>

        <div class="use-case">

          <h3>
            Founders
          </h3>

          <p>
            Turn your business knowledge, announcements and expertise into
            a repeatable social publishing workflow.
          </p>

        </div>

        <div class="use-case">

          <h3>
            Agencies
          </h3>

          <p>
            Reduce repetitive content-production work across social
            accounts and clients.
          </p>

        </div>

        <div class="use-case">

          <h3>
            Local Businesses
          </h3>

          <p>
            Create social content around services, promotions, occasions,
            festivals and business-specific topics.
          </p>

        </div>

        <div class="use-case">

          <h3>
            Lean Marketing Teams
          </h3>

          <p>
            Automate more of the content-generation process before it
            reaches the publishing calendar.
          </p>

        </div>

        <div class="use-case">

          <h3>
            Creators
          </h3>

          <p>
            Build a consistent publishing pipeline without manually
            preparing every social post from scratch.
          </p>

        </div>

      </div>

    </div>

  </section>


  <!-- FEATURE COMPARISON -->

  <section>

    <div class="container">

      <div class="section-heading">

        <h2>
          Where each platform stands out
        </h2>

        <p>
          Hootsuite and Shoutly AI overlap in publishing and AI-assisted
          content, but their strongest product emphasis is different.
        </p>

      </div>

      <div class="comparison-wrapper">

        <table>

          <thead>

            <tr>

              <th>
                If you need...
              </th>

              <th>
                Strong fit
              </th>

              <th>
                Reason
              </th>

            </tr>

          </thead>

          <tbody>

            <tr>

              <td>
                Broad social media management
              </td>

              <td>
                Hootsuite
              </td>

              <td>
                Hootsuite combines publishing, engagement, analytics,
                listening and social intelligence.
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
                Both platforms provide AI-assisted content capabilities,
                although the overall workflows differ.
              </td>

            </tr>

            <tr>

              <td>
                Advanced social listening
              </td>

              <td>
                Hootsuite
              </td>

              <td>
                Hootsuite has dedicated listening and social intelligence
                capabilities.
              </td>

            </tr>

            <tr>

              <td>
                Competitor benchmarking
              </td>

              <td>
                Hootsuite
              </td>

              <td>
                Hootsuite provides competitor benchmarking as part of its
                analytics capabilities.
              </td>

            </tr>

            <tr>

              <td>
                Business-specific AI content generation
              </td>

              <td>
                Shoutly AI
              </td>

              <td>
                Shoutly AI's product workflow starts with business
                information and generates social content around it.
              </td>

            </tr>

            <tr>

              <td>
                Content + calendar + publishing workflow
              </td>

              <td>
                Shoutly AI
              </td>

              <td>
                Shoutly AI is positioned around connecting these steps into
                one content automation workflow.
              </td>

            </tr>

            <tr>

              <td>
                Enterprise approvals and governance
              </td>

              <td>
                Hootsuite
              </td>

              <td>
                Hootsuite Advanced and Enterprise are designed for more
                sophisticated team and organizational workflows.
              </td>

            </tr>

            <tr>

              <td>
                One straightforward plan
              </td>

              <td>
                Shoutly AI
              </td>

              <td>
                Shoutly AI currently presents one all-in-one plan rather
                than multiple product tiers.
              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>

  </section>


  <!-- HONEST LIMITATIONS -->

  <section class="soft-section">

    <div class="container">

      <div class="section-heading">

        <h2>
          Where Hootsuite has an advantage
        </h2>

        <p>
          A credible Hootsuite alternative page should acknowledge the
          capabilities that make Hootsuite attractive to larger or more
          sophisticated social teams.
        </p>

      </div>

      <div class="two-column">

        <div class="info-card">

          <h3>
            Social intelligence
          </h3>

          <p>
            Hootsuite has invested heavily in social listening,
            sentiment analysis, trend discovery and competitive
            intelligence. These capabilities are important for brands
            that need to monitor large volumes of conversations.
          </p>

        </div>

        <div class="info-card">

          <h3>
            Advanced reporting
          </h3>

          <p>
            Hootsuite provides analytics, customizable reports,
            competitive benchmarking and reporting workflows that can be
            valuable to larger marketing organizations.
          </p>

        </div>

        <div class="info-card">

          <h3>
            Customer engagement
          </h3>

          <p>
            Hootsuite's unified inbox and automation capabilities are
            designed to help teams manage comments, messages and customer
            conversations across supported networks.
          </p>

        </div>

        <div class="info-card">

          <h3>
            Enterprise workflows
          </h3>

          <p>
            Hootsuite Advanced and Enterprise offer approval workflows,
            collaboration, routing, governance and other capabilities
            aimed at larger organizations.
          </p>

        </div>

      </div>

    </div>

  </section>


  <!-- SHOUTLY DIFFERENTIATION -->

  <section>

    <div class="container">

      <div class="section-heading">

        <h2>
          Where Shoutly AI focuses
        </h2>

        <p>
          Shoutly AI is not trying to reproduce every enterprise social
          management capability. Its core proposition is to automate more
          of the content-production workflow.
        </p>

      </div>

      <div class="difference-grid">

        <div class="difference-card"
             style="background:#f7f7fb;color:#171717;border:1px solid #e8e8ee;">

          <div class="difference-number">
            01
          </div>

          <h3>
            Generate
          </h3>

          <p style="color:#666;">
            Give Shoutly AI your business context and generate social
            posts with visuals, captions and hashtags.
          </p>

        </div>

        <div class="difference-card"
             style="background:#f7f7fb;color:#171717;border:1px solid #e8e8ee;">

          <div class="difference-number">
            02
          </div>

          <h3>
            Plan
          </h3>

          <p style="color:#666;">
            Build a longer content calendar around your business rather
            than creating individual posts every time you need to publish.
          </p>

        </div>

        <div class="difference-card"
             style="background:#f7f7fb;color:#171717;border:1px solid #e8e8ee;">

          <div class="difference-number">
            03
          </div>

          <h3>
            Publish
          </h3>

          <p style="color:#666;">
            Schedule and publish content across the supported social
            platforms from one dashboard.
          </p>

        </div>

      </div>

    </div>

  </section>


  <!-- FAQ -->

  <section class="soft-section">

    <div class="container">

      <div class="section-heading">

        <h2>
          Frequently asked questions
        </h2>

        <p>
          Common questions about using Shoutly AI as a Hootsuite
          alternative.
        </p>

      </div>

      <div class="faq">

        <details>

          <summary>
            Is Shoutly AI a Hootsuite alternative?
          </summary>

          <p>
            Yes. Shoutly AI can be considered a Hootsuite alternative for
            businesses that want AI-assisted content creation, social
            media scheduling, publishing, analytics and automation in one
            workflow.
          </p>

        </details>


        <details>

          <summary>
            Does Hootsuite have AI?
          </summary>

          <p>
            Yes. Hootsuite currently offers AI capabilities for content
            creation, social insights, engagement, listening and workflow
            automation.
          </p>

        </details>


        <details>

          <summary>
            Does Hootsuite schedule social media posts?
          </summary>

          <p>
            Yes. Hootsuite provides scheduling and publishing across its
            supported social networks.
          </p>

        </details>


        <details>

          <summary>
            What is the biggest difference between Hootsuite and Shoutly AI?
          </summary>

          <p>
            Hootsuite is a broad social media management and intelligence
            platform. Shoutly AI places greater emphasis on generating
            business-specific social content and connecting content
            creation with calendar planning, scheduling and publishing.
          </p>

        </details>


        <details>

          <summary>
            Who should consider Shoutly AI instead of Hootsuite?
          </summary>

          <p>
            Businesses, founders, creators, agencies and lean marketing
            teams may consider Shoutly AI when their biggest challenge is
            consistently producing social content and keeping their
            publishing calendar active.
          </p>

        </details>


        <details>

          <summary>
            How many social platforms does Shoutly AI support?
          </summary>

          <p>
            Shoutly AI currently promotes 10 platforms: X, LinkedIn,
            Instagram, TikTok, Facebook, Threads, Bluesky, YouTube,
            Pinterest and Google Business Profile.
          </p>

        </details>


        <details>

          <summary>
            Is Hootsuite better than Shoutly AI?
          </summary>

          <p>
            Neither platform is universally better. Hootsuite may be the
            stronger choice for organizations that need advanced social
            listening, competitive intelligence, complex reporting,
            customer engagement workflows or enterprise collaboration.
            Shoutly AI may be a better fit for businesses primarily
            looking to automate content creation and publishing.
          </p>

        </details>


        <details>

          <summary>
            Does Shoutly AI replace Hootsuite?
          </summary>

          <p>
            Shoutly AI can replace a social media management workflow for
            some businesses, particularly those focused on content
            generation, scheduling and publishing. Businesses that depend
            heavily on advanced Hootsuite capabilities such as enterprise
            social listening, complex approvals or advanced customer-care
            workflows should evaluate those requirements before switching.
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
          Your business already has content ideas.
          Shoutly AI turns them into social content.
        </h2>

        <p>
          Tell Shoutly AI what your business does. Generate social posts,
          build your content calendar, schedule your content and publish
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


  <!-- FOOTER -->`;

export default function HootsuiteAlternativePage() {
  return (
    <main className="bg-white text-slate-900">
      <style dangerouslySetInnerHTML={{ __html: PAGE_STYLES }} />
      <div className="hootsuite-alternative-content" dangerouslySetInnerHTML={{ __html: PAGE_BODY }} />
    </main>
  );
}
