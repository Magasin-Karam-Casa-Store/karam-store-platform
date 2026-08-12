import Breadcrumb from "@/components/layout/Breadcrumb";

export default function StaticPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <Breadcrumb items={[{ label: title }]} />
      <div className="container-app max-w-3xl py-10">
        <h1 className="mb-6 text-2xl font-bold text-brand-navy sm:text-3xl">{title}</h1>
        <div className="flex flex-col gap-4 text-sm leading-relaxed text-gray-600">{children}</div>
      </div>
    </>
  );
}
