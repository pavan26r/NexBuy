import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full bg-slate-50 dark:bg-slate-950">
      <div className="hidden lg:flex flex-col items-center justify-center relative w-1/2 overflow-hidden bg-indigo-700">
        <div className="absolute top-[-10%] left-[-10%] w-80 h-80 bg-indigo-500 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-30"></div>
        <div className="relative z-10 max-w-lg px-12 text-center">
          <h1 className="text-5xl font-black tracking-tighter text-white mb-4 leading-tight">
            Elevate Your <span className="text-indigo-200">Lifestyle.</span>
          </h1>
          <p className="text-indigo-100 text-lg font-light opacity-90">
            Discover a curated collection of premium products designed just for you. 
           
          </p>
        </div>
        <div className="absolute bottom-10 left-12 text-indigo-200 text-sm font-medium tracking-widest uppercase">
          © 2025 @Purchasing.co.in
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center px-6 py-12 lg:bg-white dark:lg:bg-slate-900 shadow-2xl z-20">
        <div className="w-full max-w-md space-y-8 bg-white dark:bg-slate-900 p-8 lg:p-0 rounded-2xl sm:shadow-none shadow-xl border border-slate-100 lg:border-none">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;