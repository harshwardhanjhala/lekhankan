import {
  Upload,
  TrendingDown,
  PieChart,
  Shield,
  Zap,
} from "lucide-react";

import logo from "../assets/logo.png";

export default function LandingPage({
  onLoginClick,
  onSignupClick,
}) {

  return (

    <div className="min-h-screen bg-gradient-to-br from-[#faf5ff] via-white to-[#fff1f7]">

      {/* Navbar */}

      <nav className="border-b border-[#f3e8ff] bg-white/70 backdrop-blur-xl sticky top-0 z-40">

        <div className="w-full px-10 md:px-16 py-2 flex items-center justify-between">

          <div className="flex items-center">
          
            <img
              src={logo}
              alt="Lekhankan Logo"
              className="h-24 md:h-28 object-contain"
            />
          
          </div>

          <div className="flex items-center gap-4">

            <button
              onClick={onLoginClick}
              className="px-6 py-2 text-[#4B1D74] hover:bg-[#f3e8ff] rounded-xl transition-all duration-300"
            >
              Log in
            </button>

            <button
              onClick={onSignupClick}
              className="px-6 py-2 bg-[#4B1D74] text-white rounded-xl hover:bg-[#5d278f] transition-all duration-300 shadow-lg shadow-purple-200"
            >
              Sign up
            </button>

          </div>

        </div>

      </nav>

      {/* Hero Section */}

      <main>

        <section className="max-w-7xl mx-auto px-6 py-20 text-center">

          <div className="inline-block mb-4 px-5 py-2 bg-pink-100 text-[#FF5C9A] rounded-full text-sm font-medium">

            Next-Gen Expense Management

          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-[#4B1D74] to-[#FF5C9A] bg-clip-text text-transparent leading-tight">

            Track expenses smarter,
            <br />
            not harder

          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">

            Upload your bank statements or add expenses manually.
            Get instant insights into your spending with AI-powered categorization.

          </p>

          <div className="flex items-center justify-center gap-4">

            <button
              onClick={onSignupClick}
              className="px-8 py-4 bg-[#4B1D74] text-white rounded-2xl hover:bg-[#5d278f] transition-all duration-300 text-lg shadow-xl shadow-purple-200"
            >
              Get started free
            </button>

            <button
              onClick={onLoginClick}
              className="px-8 py-4 border border-[#e9d5ff] bg-white/70 rounded-2xl hover:bg-[#faf5ff] transition-all duration-300 text-lg text-[#4B1D74]"
            >
              Watch demo
            </button>

          </div>

          {/* Feature Cards */}

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="p-6 bg-white/70 backdrop-blur-lg rounded-3xl shadow-lg border border-[#f3e8ff] hover:shadow-2xl transition-all duration-300">

              <div className="w-12 h-12 bg-[#f3e8ff] rounded-xl flex items-center justify-center mb-4 mx-auto">

                <Upload className="w-6 h-6 text-[#4B1D74]" />

              </div>

              <h3 className="mb-2 font-semibold">
                Upload Bank Statements
              </h3>

              <p className="text-gray-600 text-sm">

                Drag and drop CSV or PDF files from your bank.
                We'll automatically parse and categorize your transactions.

              </p>

            </div>

            <div className="p-6 bg-white/70 backdrop-blur-lg rounded-3xl shadow-lg border border-[#f3e8ff] hover:shadow-2xl transition-all duration-300">

              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4 mx-auto">

                <PieChart className="w-6 h-6 text-[#FF5C9A]" />

              </div>

              <h3 className="mb-2 font-semibold">
                Visual Insights
              </h3>

              <p className="text-gray-600 text-sm">

                Beautiful charts and graphs help you understand where your money goes at a glance.

              </p>

            </div>

            <div className="p-6 bg-white/70 backdrop-blur-lg rounded-3xl shadow-lg border border-[#f3e8ff] hover:shadow-2xl transition-all duration-300">

              <div className="w-12 h-12 bg-[#ffe4ef] rounded-xl flex items-center justify-center mb-4 mx-auto">

                <TrendingDown className="w-6 h-6 text-[#FF5C9A]" />

              </div>

              <h3 className="mb-2 font-semibold">
                Smart Categorization
              </h3>

              <p className="text-gray-600 text-sm">

                AI automatically categorizes your expenses.
                Edit categories with a single click.

              </p>

            </div>

          </div>

        </section>

        {/* Why Choose Section */}

        <section className="bg-white/50 backdrop-blur-lg py-20 border-y border-[#f3e8ff]">

          <div className="max-w-7xl mx-auto px-6">

            <h2 className="text-3xl font-semibold text-center mb-12">

              Why choose Lekhankan?

            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              <div className="flex gap-4">

                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">

                  <Zap className="w-5 h-5 text-blue-600" />

                </div>

                <div>

                  <h4 className="mb-2 font-semibold">
                    Lightning Fast
                  </h4>

                  <p className="text-gray-600 text-sm">

                    Process thousands of transactions in seconds.
                    No more manual data entry.

                  </p>

                </div>

              </div>

              <div className="flex gap-4">

                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">

                  <Shield className="w-5 h-5 text-green-600" />

                </div>

                <div>

                  <h4 className="mb-2 font-semibold">
                    Secure & Private
                  </h4>

                  <p className="text-gray-600 text-sm">

                    Bank-level encryption keeps your financial data safe and private.

                  </p>

                </div>

              </div>

              <div className="flex gap-4">

                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">

                  <PieChart className="w-5 h-5 text-purple-600" />

                </div>

                <div>

                  <h4 className="mb-2 font-semibold">
                    Beautiful Reports
                  </h4>

                  <p className="text-gray-600 text-sm">

                    Export professional reports for tax season or personal budgeting.

                  </p>

                </div>

              </div>

              <div className="flex gap-4">

                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">

                  <Upload className="w-5 h-5 text-orange-600" />

                </div>

                <div>

                  <h4 className="mb-2 font-semibold">
                    Multiple Formats
                  </h4>

                  <p className="text-gray-600 text-sm">

                    Support for CSV, PDF, and direct bank integrations coming soon.

                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* CTA Section */}

        <section className="max-w-7xl mx-auto px-6 py-20 text-center">

          <h2 className="text-3xl font-semibold mb-4">

            Ready to take control?

          </h2>

          <p className="text-gray-600 mb-8">

            Join thousands of users managing their expenses smarter

          </p>

          <button
            onClick={onSignupClick}
            className="px-8 py-4 bg-[#4B1D74] text-white rounded-2xl hover:bg-[#5d278f] transition-all duration-300 text-lg shadow-xl shadow-purple-200"
          >
            Start tracking for free
          </button>

        </section>

      </main>

      {/* Footer */}

      <footer className="border-t border-[#f3e8ff] bg-white/40 backdrop-blur-lg">

        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-sm text-gray-500">

          <p>
            © 2026 Lekhankan. Built with ❤️ for better financial management.
          </p>

        </div>

      </footer>

    </div>

  );
}