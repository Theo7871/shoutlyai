import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Canva Alternative | Shoutly AI – AI Social Media Automation",
  description: "Looking for a Canva alternative for social media automation? Compare Canva and Shoutly AI for AI content creation, social scheduling, publishing, analytics and automation.",
};

const PAGE_STYLES = `
.canva-alternative-content { font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; line-height: 1.6; }
.canva-alternative-content a { color: inherit; text-decoration: none; }
:root {
      --primary: #f97316;
      --primary-dark: #ea580c;
      --text: #171717;
      --muted: #666;
      --border: #e7e7ed;
      --soft: #f7f7fb;
      --dark: #111118;
      --white: #fff;
      --radius: 18px;
      --shadow: 0 15px 45px rgba(20,20,50,.08);
    }

    .container {
      width: min(1160px, calc(100% - 40px));
      margin: auto;
    }

    /* NAV */

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
      letter-spacing: -.8px;
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

    /* HERO */

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
      max-width: 850px;
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

    /* SUMMARY */

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

    /* GENERAL */

    section {
      padding: 90px 0;
    }

    .section-heading {
      max-width: 850px;
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

    /* SOFT */

    .soft-section {
      background: var(--soft);
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
      min-width: 900px;
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
      width: 23%;
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

    /* DARK DIFFERENCE */

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

    /* TWO COLUMN */

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
      max-width: 720px;
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
        CANVA ALTERNATIVE
      </div>


      <h1>
        Looking for a
        <span>Canva alternative?</span>
      </h1>


      <p>
        Canva is a powerful visual communication platform for designing
        social posts, presentations, videos, brand assets and much more.
        It also includes AI tools, content planning, social scheduling,
        publishing and analytics. Shoutly AI takes a narrower,
        social-media-first approach: use AI to create business-specific
        content, organize it into a publishing calendar and automate
        social posting.
      </p>


      <div class="hero-buttons">

        <a
          href="https://shoutlyai.com"
          class="btn btn-primary"
        >
          Try Shoutly AI
        </a>


        <a
          href="/compare/canva-vs-shoutly-ai"
          class="btn btn-secondary"
        >
          Compare Canva vs Shoutly AI
        </a>

      </div>

    </div>

  </section>


  <!-- SUMMARY -->

  <section class="summary">

    <div class="container">

      <div class="summary-card">


        <div class="summary-column">

          <h3>
            Canva
          </h3>

          <p>
            A broad visual communication and design platform with
            templates, AI-powered creation, photo and video tools,
            Brand Kit, collaboration, content planning, social
            scheduling and publishing.
          </p>

        </div>


        <div class="summary-column">

          <h3>
            Shoutly AI
          </h3>

          <p>
            An AI-powered social media automation platform focused on
            generating social content, organizing it into a calendar,
            scheduling posts and publishing across connected social
            platforms.
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
          Canva and Shoutly AI solve different parts of the content problem
        </h2>

        <p>
          Canva is fundamentally a visual creation platform that has
          expanded into marketing and social media management. Shoutly
          AI is designed around the social media publishing workflow,
          with AI content generation as the starting point.
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
            Provide Shoutly AI with information about your business,
            industry and content requirements.
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
            Generate social posts, captions, hashtags and visual
            content using AI.
          </p>

        </div>


        <div class="workflow-step">

          <div class="step-number">
            3
          </div>

          <h3>
            Plan your calendar
          </h3>

          <p>
            Organize generated content into a structured publishing
            calendar.
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
            Schedule and publish content across connected social
            platforms from one dashboard.
          </p>

        </div>


      </div>

    </div>

  </section>


  <!-- COMPARISON -->

  <section class="soft-section">

    <div class="container">


      <div class="section-heading">

        <h2>
          Canva vs Shoutly AI
        </h2>

        <p>
          A practical comparison based on capabilities publicly
          documented by Canva and Shoutly AI.
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
                Canva
              </th>

              <th>
                Shoutly AI
              </th>

            </tr>

          </thead>


          <tbody>


            <tr>

              <td>
                Graphic design
              </td>

              <td>
                Yes. Graphic design is one of Canva's core product
                capabilities, with templates and an editor for many
                content types.
              </td>

              <td>
                Shoutly AI is primarily focused on social media content
                creation rather than being a general-purpose design
                editor.
              </td>

            </tr>


            <tr>

              <td>
                Social media post creation
              </td>

              <td>
                Yes. Canva provides social media templates, design
                tools and AI-powered creation features.
              </td>

              <td>
                Yes. Social post generation is a core Shoutly AI
                workflow.
              </td>

            </tr>


            <tr>

              <td>
                AI content creation
              </td>

              <td>
                Yes. Canva offers AI-powered creation tools including
                Canva AI and Magic Studio capabilities.
              </td>

              <td>
                Yes. AI content generation is central to Shoutly AI's
                social media workflow.
              </td>

            </tr>


            <tr>

              <td>
                AI writing
              </td>

              <td>
                Yes. Canva provides Magic Write and other AI-assisted
                content creation capabilities.
              </td>

              <td>
                Yes. Shoutly AI generates social captions, post copy and
                related social content.
              </td>

            </tr>


            <tr>

              <td>
                AI image / visual creation
              </td>

              <td>
                Yes. Canva provides AI-powered visual creation and
                editing tools.
              </td>

              <td>
                Yes. Shoutly AI includes AI-generated visual content as
                part of its social media workflow.
              </td>

            </tr>


            <tr>

              <td>
                Social media scheduling
              </td>

              <td>
                Yes. Canva Content Planner lets users schedule social
                posts across supported platforms.
              </td>

              <td>
                Yes. Scheduling is a core Shoutly AI capability.
              </td>

            </tr>


            <tr>

              <td>
                Direct social publishing
              </td>

              <td>
                Yes. Canva allows users to publish supported content
                directly from Canva.
              </td>

              <td>
                Yes. Shoutly AI supports scheduling and publishing from
                its social media dashboard.
              </td>

            </tr>


            <tr>

              <td>
                Social media calendar
              </td>

              <td>
                Yes. Canva provides a built-in content calendar through
                Content Planner.
              </td>

              <td>
                Yes. Shoutly AI provides a social media content calendar.
              </td>

            </tr>


            <tr>

              <td>
                Social media analytics
              </td>

              <td>
                Yes. Canva's Content Planner provides insights including
                impressions, clicks, likes and comments.
              </td>

              <td>
                Yes. Shoutly AI provides unified social media analytics
                and reporting.
              </td>

            </tr>


            <tr>

              <td>
                Brand management
              </td>

              <td>
                Yes. Canva provides Brand Kit and broader brand
                management capabilities.
              </td>

              <td>
                Shoutly AI supports branded social content, but its
                primary focus is social media automation rather than
                comprehensive brand asset management.
              </td>

            </tr>


            <tr>

              <td>
                Templates
              </td>

              <td>
                Yes. Templates are one of Canva's major strengths across
                social media, presentations, video and many other
                formats.
              </td>

              <td>
                Shoutly AI focuses on AI-generated content rather than a
                broad template marketplace.
              </td>

            </tr>


            <tr>

              <td>
                Video creation
              </td>

              <td>
                Yes. Canva provides video creation and editing tools.
              </td>

              <td>
                Shoutly AI focuses on generating social media content
                and supports social video/reel workflows.
              </td>

            </tr>


            <tr>

              <td>
                Collaboration
              </td>

              <td>
                Yes. Canva provides real-time collaboration, comments,
                approvals and team workflows.
              </td>

              <td>
                Shoutly AI's primary positioning is social content
                automation rather than a full visual-design
                collaboration suite.
              </td>

            </tr>


            <tr>

              <td>
                Digital asset management
              </td>

              <td>
                Yes. Canva provides folders, cloud storage, brand assets
                and team asset management.
              </td>

              <td>
                Shoutly AI provides a media library for social content,
                rather than a full enterprise DAM platform.
              </td>

            </tr>


            <tr>

              <td>
                Presentations
              </td>

              <td>
                Yes. Presentations are a major Canva content category.
              </td>

              <td>
                Not a primary Shoutly AI use case.
              </td>

            </tr>


            <tr>

              <td>
                Print design
              </td>

              <td>
                Yes. Canva supports many print-oriented designs and
                print-related workflows.
              </td>

              <td>
                Not a primary Shoutly AI use case.
              </td>

            </tr>


            <tr>

              <td>
                Primary product focus
              </td>

              <td>
                Visual communication, design, AI creation, brand
                management, collaboration and marketing.
              </td>

              <td>
                AI-first social media content generation, planning,
                scheduling and publishing.
              </td>

            </tr>


          </tbody>

        </table>

      </div>

    </div>

  </section>


  <!-- DIFFERENTIATION -->

  <section class="difference">

    <div class="container">


      <div class="section-heading">

        <h2>
          Why consider Shoutly AI instead of Canva?
        </h2>

        <p>
          Canva is an excellent choice when you need a powerful visual
          creation platform. Shoutly AI becomes relevant when your main
          problem is maintaining a consistent social media publishing
          pipeline.
        </p>

      </div>


      <div class="difference-grid">


        <div class="difference-card">

          <div class="difference-number">
            01
          </div>

          <h3>
            Social-first workflow
          </h3>

          <p>
            Shoutly AI is built specifically around social media content,
            rather than asking users to begin with a general-purpose
            design canvas.
          </p>

        </div>


        <div class="difference-card">

          <div class="difference-number">
            02
          </div>

          <h3>
            Content generation first
          </h3>

          <p>
            The Shoutly AI workflow begins with business context and AI
            content generation, then moves into calendar planning and
            publishing.
          </p>

        </div>


        <div class="difference-card">

          <div class="difference-number">
            03
          </div>

          <h3>
            Built around publishing consistency
          </h3>

          <p>
            Shoutly AI is designed to reduce the repetitive work involved
            in continually producing and scheduling social media posts.
          </p>

        </div>


      </div>

    </div>

  </section>


  <!-- CANVA STRENGTHS -->

  <section>

    <div class="container">


      <div class="section-heading">

        <h2>
          Where Canva has a clear advantage
        </h2>

        <p>
          A credible Canva alternative page should acknowledge the areas
          where Canva is genuinely stronger.
        </p>

      </div>


      <div class="two-column">


        <div class="info-card">

          <h3>
            Visual design
          </h3>

          <p>
            Canva is fundamentally a visual communication platform.
            Users can create social graphics, presentations, videos,
            documents, marketing assets and many other formats.
          </p>

        </div>


        <div class="info-card">

          <h3>
            Templates
          </h3>

          <p>
            Canva provides a large library of templates and design
            starting points across many categories and formats.
          </p>

        </div>


        <div class="info-card">

          <h3>
            Brand management
          </h3>

          <p>
            Canva provides Brand Kit and business-focused brand
            management capabilities for maintaining consistent visual
            identity.
          </p>

        </div>


        <div class="info-card">

          <h3>
            Collaboration
          </h3>

          <p>
            Canva supports team collaboration, comments, approvals,
            shared workspaces and content workflows.
          </p>

        </div>


        <div class="info-card">

          <h3>
            AI creation
          </h3>

          <p>
            Canva has invested heavily in AI and introduced Canva AI 2.0
            with conversational creation and additional intelligent
            workflows.
          </p>

        </div>


        <div class="info-card">

          <h3>
            Marketing tools
          </h3>

          <p>
            Canva Business combines creation with brand management,
            marketing insights, advertising-related capabilities and
            collaboration for businesses.
          </p>

        </div>


      </div>

    </div>

  </section>


  <!-- SHOUTLY DIFFERENCE -->

  <section class="soft-section">

    <div class="container">


      <div class="section-heading">

        <h2>
          Where Shoutly AI focuses
        </h2>

        <p>
          Shoutly AI is not trying to replace every design function
          Canva provides. Its focus is the social media content
          production and publishing workflow.
        </p>

      </div>


      <div class="workflow">


        <div class="workflow-step">

          <div class="step-number">
            01
          </div>

          <h3>
            Business context
          </h3>

          <p>
            Start with information about the business, services,
            industry and audience.
          </p>

        </div>


        <div class="workflow-step">

          <div class="step-number">
            02
          </div>

          <h3>
            AI generation
          </h3>

          <p>
            Generate social posts, captions, hashtags and visual
            content.
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
            Organize generated content into a social media publishing
            calendar.
          </p>

        </div>


        <div class="workflow-step">

          <div class="step-number">
            04
          </div>

          <h3>
            Publish
          </h3>

          <p>
            Schedule and publish across connected social platforms from
            one dashboard.
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
          Canva pricing vs Shoutly AI pricing
        </h2>

        <p>
          Both products have different scopes, so price should be
          evaluated alongside the features and workflow you actually
          need.
        </p>

      </div>


      <div class="two-column">


        <div class="info-card">

          <h3>
            Canva
          </h3>

          <p>
            Canva currently offers Free, Pro, Business and Enterprise
            plans, with separate education and nonprofit offerings.
          </p>

          <p>
            Canva Free is available at no cost for individuals.
            Canva's current global pricing page lists Canva Pro at
            US$144/year for one person when billed annually.
          </p>

          <p>
            Canva Business is designed for individuals, marketers and
            small teams and adds higher AI access, marketing insights,
            enhanced brand management and collaboration capabilities.
          </p>

          <a
            href="https://www.canva.com/pricing/"
            target="_blank"
            rel="noopener"
            class="btn btn-secondary"
          >
            View Canva Pricing
          </a>

        </div>


        <div class="info-card">

          <h3>
            Shoutly AI
          </h3>

          <p>
            Shoutly AI currently presents an all-in-one social media
            automation plan rather than positioning itself as a general
            visual design subscription.
          </p>

          <p>
            The current Shoutly AI website lists the monthly plan at
            ₹10,000/month and includes 10 social platforms, unlimited
            posting and scheduling, analytics and reporting, a media
            library, comments inbox, priority support and API access.
          </p>

          <p>
            Shoutly AI also currently advertises yearly billing with a
            stated 20% saving.
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

  <section class="soft-section">

    <div class="container">


      <div class="section-heading">

        <h2>
          Canva or Shoutly AI?
        </h2>

        <p>
          The better choice depends on whether your primary requirement
          is visual creation or automated social media publishing.
        </p>

      </div>


      <div class="two-column">


        <div class="info-card">

          <h3>
            Choose Canva if...
          </h3>

          <p>
            You need a broad visual communication platform.
          </p>

          <ul>

            <li>
              ✓ You create graphics regularly
            </li>

            <li>
              ✓ You need presentations and documents
            </li>

            <li>
              ✓ You need video creation and editing
            </li>

            <li>
              ✓ You want a large template library
            </li>

            <li>
              ✓ You need advanced brand management
            </li>

            <li>
              ✓ You need collaborative design workflows
            </li>

            <li>
              ✓ You need a broad visual asset library
            </li>

            <li>
              ✓ You want AI-powered design tools
            </li>

          </ul>

        </div>


        <div class="info-card">

          <h3>
            Consider Shoutly AI if...
          </h3>

          <p>
            Your main objective is to automate social media content
            production and publishing.
          </p>

          <ul>

            <li>
              ✓ Your priority is social media automation
            </li>

            <li>
              ✓ You want AI-generated social posts
            </li>

            <li>
              ✓ You want business-specific content
            </li>

            <li>
              ✓ You want captions and hashtags generated with posts
            </li>

            <li>
              ✓ You want a social media content calendar
            </li>

            <li>
              ✓ You want scheduling and publishing in the same workflow
            </li>

            <li>
              ✓ You want unified social media analytics
            </li>

            <li>
              ✓ You want one dashboard focused on social media
            </li>

          </ul>

        </div>


      </div>

    </div>

  </section>


  <!-- USE CASES -->

  <section>

    <div class="container">


      <div class="section-heading">

        <h2>
          Who is Shoutly AI a Canva alternative for?
        </h2>

        <p>
          Shoutly AI is particularly relevant for users who already know
          what their business does but don't want to manually create and
          schedule every social media post.
        </p>

      </div>


      <div class="use-cases">


        <div class="use-case">

          <h3>
            Small Businesses
          </h3>

          <p>
            Maintain a consistent social presence without having to
            manually prepare every post.
          </p>

        </div>


        <div class="use-case">

          <h3>
            Founders
          </h3>

          <p>
            Turn business updates, expertise and announcements into
            repeatable social content.
          </p>

        </div>


        <div class="use-case">

          <h3>
            Local Businesses
          </h3>

          <p>
            Create content around services, promotions, events,
            occasions and business updates.
          </p>

        </div>


        <div class="use-case">

          <h3>
            Agencies
          </h3>

          <p>
            Reduce repetitive social content production work across
            multiple client accounts.
          </p>

        </div>


        <div class="use-case">

          <h3>
            Lean Marketing Teams
          </h3>

          <p>
            Automate more of the process between content ideation and
            scheduled publishing.
          </p>

        </div>


        <div class="use-case">

          <h3>
            Creators
          </h3>

          <p>
            Maintain a consistent publishing pipeline without manually
            preparing every post from scratch.
          </p>

        </div>


      </div>

    </div>

  </section>


  <!-- FEATURE DECISION TABLE -->

  <section>

    <div class="container">


      <div class="section-heading">

        <h2>
          Which platform fits your workflow?
        </h2>

        <p>
          Use this quick comparison to decide which type of platform
          better matches your requirements.
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
                Better fit
              </th>

              <th>
                Reason
              </th>

            </tr>

          </thead>


          <tbody>


            <tr>

              <td>
                Graphic design
              </td>

              <td>
                Canva
              </td>

              <td>
                Canva is a dedicated visual communication and design
                platform.
              </td>

            </tr>


            <tr>

              <td>
                Templates
              </td>

              <td>
                Canva
              </td>

              <td>
                Canva has a large template ecosystem across many design
                categories.
              </td>

            </tr>


            <tr>

              <td>
                Presentations
              </td>

              <td>
                Canva
              </td>

              <td>
                Presentations are a core Canva content type.
              </td>

            </tr>


            <tr>

              <td>
                Brand asset management
              </td>

              <td>
                Canva
              </td>

              <td>
                Canva provides Brand Kit and broader brand management
                functionality.
              </td>

            </tr>


            <tr>

              <td>
                Social scheduling
              </td>

              <td>
                Both
              </td>

              <td>
                Both Canva and Shoutly AI provide social media
                scheduling.
              </td>

            </tr>


            <tr>

              <td>
                Social analytics
              </td>

              <td>
                Both
              </td>

              <td>
                Both platforms provide social performance insights.
              </td>

            </tr>


            <tr>

              <td>
                AI design
              </td>

              <td>
                Canva
              </td>

              <td>
                Canva's AI capabilities are deeply integrated into its
                broader design platform.
              </td>

            </tr>


            <tr>

              <td>
                AI social content generation
              </td>

              <td>
                Shoutly AI
              </td>

              <td>
                Shoutly AI is specifically focused on AI-generated social
                media content.
              </td>

            </tr>


            <tr>

              <td>
                Content generation → calendar → publishing
              </td>

              <td>
                Shoutly AI
              </td>

              <td>
                Shoutly AI's workflow is centered on this social media
                automation sequence.
              </td>

            </tr>


            <tr>

              <td>
                Broad visual communication
              </td>

              <td>
                Canva
              </td>

              <td>
                Canva supports many content types beyond social media.
              </td>

            </tr>


          </tbody>

        </table>

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
          Common questions about Canva and Shoutly AI.
        </p>

      </div>


      <div class="faq">


        <details>

          <summary>
            Is Shoutly AI a Canva alternative?
          </summary>

          <p>
            Yes. Shoutly AI can be considered a Canva alternative for
            businesses primarily looking for AI-powered social media
            content creation, planning, scheduling and publishing rather
            than a broad visual design platform.
          </p>

        </details>


        <details>

          <summary>
            Is Canva a social media scheduler?
          </summary>

          <p>
            Yes. Canva provides Content Planner, which lets users create,
            plan and schedule social media content and publish directly
            from Canva to supported platforms.
          </p>

        </details>


        <details>

          <summary>
            Does Canva have AI?
          </summary>

          <p>
            Yes. Canva provides multiple AI-powered tools and has
            introduced Canva AI 2.0, including conversational creation,
            AI editing, brand intelligence and other intelligent
            workflows.
          </p>

        </details>


        <details>

          <summary>
            Does Canva have social media analytics?
          </summary>

          <p>
            Yes. Canva's Content Planner provides social media performance
            analytics including impressions, clicks, likes and comments.
          </p>

        </details>


        <details>

          <summary>
            Does Canva have a free plan?
          </summary>

          <p>
            Yes. Canva Free is available at no cost for individuals and
            provides access to design tools, templates and free content.
          </p>

        </details>


        <details>

          <summary>
            What is the main difference between Canva and Shoutly AI?
          </summary>

          <p>
            Canva is a broad visual communication and design platform
            with templates, AI, brand management, collaboration and
            social scheduling. Shoutly AI is focused more specifically
            on AI-powered social media content generation, planning,
            scheduling and publishing.
          </p>

        </details>


        <details>

          <summary>
            Who should use Canva?
          </summary>

          <p>
            Canva is a strong fit for users who need graphic design,
            presentations, video, visual brand assets, templates,
            collaboration and a broad visual communication platform.
          </p>

        </details>


        <details>

          <summary>
            Who should consider Shoutly AI?
          </summary>

          <p>
            Businesses, founders, creators, local businesses and lean
            marketing teams may consider Shoutly AI when their main goal
            is to automate social media content creation and connect
            content generation with scheduling and publishing.
          </p>

        </details>


        <details>

          <summary>
            Is Canva better than Shoutly AI?
          </summary>

          <p>
            Neither platform is universally better. Canva may be the
            stronger choice for visual design, templates, presentations,
            brand assets and collaborative creative work. Shoutly AI may
            be a better fit for businesses primarily looking for
            automated AI social media content generation and publishing.
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
          Your social media calendar shouldn't start from a blank page.
        </h2>


        <p>
          Tell Shoutly AI about your business. Generate social content,
          organize it into a calendar, schedule posts and publish across
          your connected social platforms from one dashboard.
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

export default function CanvaAlternativePage() {
  return (
    <main className="bg-white text-slate-900">
      <style dangerouslySetInnerHTML={{ __html: PAGE_STYLES }} />
      <div className="canva-alternative-content" dangerouslySetInnerHTML={{ __html: PAGE_BODY }} />
    </main>
  );
}
