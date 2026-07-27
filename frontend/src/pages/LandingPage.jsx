import {
  Upload,
  TrendingDown,
  PieChart,
  Shield,
  Zap,
} from "lucide-react";

import logo from "../assets/logo.png";
import ThemeToggle from "../components/ThemeToggle";

export default function LandingPage({
  onLoginClick,
  onSignupClick,
}) {

  return (

    <div className="min-h-screen bg-background text-foreground">

      {/* Navbar */}

      <nav className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur-md">

        <div className="flex w-full items-center justify-between px-6 py-3 md:px-12">

          <div className="flex items-center">

            <img
              src={logo}
              alt="Lekhankan Logo"
              className="h-16 object-contain md:h-20"
            />

          </div>

          <div className="flex items-center gap-3">

            <ThemeToggle />

            <button
              onClick={onLoginClick}
              className="rounded-lg px-5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              Log in
            </button>

            <button
              onClick={onSignupClick}
              className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
            >
              Sign up
            </button>

          </div>

        </div>

      </nav>

      {/* Hero Section */}

      <main>

        <section className="mx-auto max-w-6xl px-6 py-20 text-center">

          <div className="mb-6 inline-flex items-center rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-muted-foreground">

            Expense Management Platform

          </div>

          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight md:text-6xl">

            Track expenses with clarity and control

          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground">

            Upload bank statements or add expenses manually.
            Get clear insights into your spending with smart categorization.

          </p>

          <div className="flex items-center justify-center gap-4">

            <button
              onClick={onSignupClick}
              className="rounded-lg bg-primary px-8 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
            >
              Get started free
            </button>

            <button
              onClick={onLoginClick}
              className="rounded-lg border border-border bg-card px-8 py-3 text-base font-medium text-foreground transition-colors hover:bg-secondary"
            >
              Sign in
            </button>

          </div>

          {/* Feature Cards */}

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">

            <div className="rounded-xl border border-border bg-card p-6 text-left shadow-card transition-shadow hover:shadow-soft">

              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-accent">

                <Upload className="h-5 w-5 text-primary" />

              </div>

              <h3 className="mb-2 font-semibold">
                Upload Bank Statements
              </h3>

              <p className="text-sm text-muted-foreground">

                Import CSV files from your bank and automatically parse transactions.

              </p>

            </div>

            <div className="rounded-xl border border-border bg-card p-6 text-left shadow-card transition-shadow hover:shadow-soft">

              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-accent">

                <PieChart className="h-5 w-5 text-primary" />

              </div>

              <h3 className="mb-2 font-semibold">
                Visual Insights
              </h3>

              <p className="text-sm text-muted-foreground">

                Charts and summaries help you understand spending patterns at a glance.

              </p>

            </div>

            <div className="rounded-xl border border-border bg-card p-6 text-left shadow-card transition-shadow hover:shadow-soft">

              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-accent">

                <TrendingDown className="h-5 w-5 text-primary" />

              </div>

              <h3 className="mb-2 font-semibold">
                Smart Categorization
              </h3>

              <p className="text-sm text-muted-foreground">

                Expenses are categorized automatically and can be edited anytime.

              </p>

            </div>

          </div>

        </section>

        {/* Why Choose Section */}

        <section className="border-y border-border bg-muted/40 py-20">

          <div className="mx-auto max-w-6xl px-6">

            <h2 className="mb-12 text-center text-3xl font-semibold">

              Why choose Lekhankan?

            </h2>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

              <div className="flex gap-4">

                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-accent">

                  <Zap className="h-5 w-5 text-primary" />

                </div>

                <div>

                  <h4 className="mb-2 font-semibold">
                    Fast Processing
                  </h4>

                  <p className="text-sm text-muted-foreground">

                    Process large transaction lists quickly without manual entry.

                  </p>

                </div>

              </div>

              <div className="flex gap-4">

                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-accent">

                  <Shield className="h-5 w-5 text-primary" />

                </div>

                <div>

                  <h4 className="mb-2 font-semibold">
                    Secure & Private
                  </h4>

                  <p className="text-sm text-muted-foreground">

                    Your financial data stays protected with secure authentication.

                  </p>

                </div>

              </div>

              <div className="flex gap-4">

                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-accent">

                  <PieChart className="h-5 w-5 text-primary" />

                </div>

                <div>

                  <h4 className="mb-2 font-semibold">
                    Clear Reports
                  </h4>

                  <p className="text-sm text-muted-foreground">

                    Review spending by category, month, and time period.

                  </p>

                </div>

              </div>

              <div className="flex gap-4">

                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-accent">

                  <Upload className="h-5 w-5 text-primary" />

                </div>

                <div>

                  <h4 className="mb-2 font-semibold">
                    Flexible Imports
                  </h4>

                  <p className="text-sm text-muted-foreground">

                    Add expenses manually or import them from CSV files.

                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* CTA Section */}

        <section className="mx-auto max-w-6xl px-6 py-20 text-center">

          <h2 className="mb-4 text-3xl font-semibold">

            Ready to take control?

          </h2>

          <p className="mb-8 text-muted-foreground">

            Start managing your expenses with a clear, organized dashboard.

          </p>

          <button
            onClick={onSignupClick}
            className="rounded-lg bg-primary px-8 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
          >
            Start tracking for free
          </button>

        </section>

      </main>

      {/* Footer */}

      <footer className="border-t border-border bg-card">

        <div className="mx-auto max-w-6xl px-6 py-8 text-center text-sm text-muted-foreground">

          <p>
            © 2026 Lekhankan. Built for better financial management.
          </p>

        </div>

      </footer>

    </div>

  );
}
