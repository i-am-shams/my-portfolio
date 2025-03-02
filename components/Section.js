export default function Section({ title, children }) {
    return (
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white border-b-2 border-blue-500 pb-2">
          {title}
        </h2>
        <div className="space-y-6">{children}</div>
      </section>
    );
  }