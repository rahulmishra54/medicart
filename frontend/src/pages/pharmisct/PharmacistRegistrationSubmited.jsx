import {
  Check,
  Hourglass,
  Mail,
  LogIn,
  CircleCheck,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const PharmacistRegistrationSubmitted = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto w-full max-w-4xl rounded-2xl bg-white px-5 py-8 shadow-lg sm:px-10 sm:py-10 lg:px-14">

        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-50 sm:h-28 sm:w-28">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 shadow-md sm:h-20 sm:w-20">
              <Check className="h-9 w-9 text-white sm:h-11 sm:w-11" />
            </div>
          </div>
        </div>

        {/* Heading */}
        <div className="mt-6 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Registration{" "}
            <span className="text-emerald-500">Submitted</span>
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-500 sm:text-base">
            Your pharmacist account has been created successfully.
          </p>
        </div>

        {/* Review Information */}
        <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-5 sm:flex-row sm:items-center sm:p-6">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-500 shadow-sm">
            <Hourglass size={25} />
          </div>

          <div>
            <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
              Your account is under review.
            </h2>

            <p className="mt-1 text-sm leading-6 text-slate-600 sm:text-base">
              The admin will verify your submitted details. Please allow up to{" "}
              <span className="font-semibold text-emerald-600">24 hours</span>{" "}
              for the review process.
            </p>
          </div>
        </div>

        {/* Next Steps */}
        <section className="mt-8">
          <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
            What happens next?
          </h2>

          <div className="mt-6 space-y-0">

            <Step
              icon={<Mail size={20} />}
              title="Wait for the review"
              description="Your submitted pharmacist details will be reviewed by our admin team within 24 hours."
            />

            <Step
              icon={<LogIn size={20} />}
              title="Login after 24 hours"
              description="Login again using your registered email and password to check whether your account has been approved."
            />

            <Step
              icon={<CircleCheck size={20} />}
              title="Access your pharmacist dashboard"
              description="If your account has been approved, you will be able to access your pharmacist dashboard and its features."
              last
            />

          </div>
        </section>

        {/* Extra Information */}
        <div className="mt-7 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-600">
          <span className="font-semibold text-slate-800">Please note:</span>{" "}
          Approval is subject to verification of the information you provided.
          If your account has not been approved yet, please try again later.
        </div>

        {/* Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => navigate("/login")}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 font-semibold text-white shadow-md transition duration-200 hover:bg-emerald-600 active:scale-[0.98] sm:w-auto sm:min-w-64"
          >
            Back to Login
            <ArrowRight size={19} />
          </button>
        </div>

      </div>
    </main>
  );
};

const Step = ({ icon, title, description, last = false }) => {
  return (
    <div className="flex gap-4">

      {/* Timeline */}
      <div className="flex flex-col items-center">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
          {icon}
        </div>

        {!last && (
          <div className="my-1 h-full min-h-10 w-px bg-emerald-200" />
        )}
      </div>

      {/* Content */}
      <div className={`${last ? "" : "pb-7"}`}>
        <h3 className="text-base font-semibold text-slate-900 sm:text-lg">
          {title}
        </h3>

        <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
          {description}
        </p>
      </div>

    </div>
  );
};

export default PharmacistRegistrationSubmitted;