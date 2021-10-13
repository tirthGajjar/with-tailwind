import React from "react";

interface Props {
  heading?: string;
}

const Layout: React.FC<Props> = ({ children, heading }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-10">
        {heading && (
          <header>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold leading-tight text-gray-900">
                {heading}
              </h1>
            </div>
          </header>
        )}
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
