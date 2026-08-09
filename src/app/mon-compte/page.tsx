import Breadcrumb from "@/components/layout/Breadcrumb";
import AccountForms from "@/components/account/AccountForms";

export default function AccountPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Mon compte" }]} />
      <div className="container-app py-10">
        <h1 className="mb-8 text-2xl font-bold text-brand-navy sm:text-3xl">Mon compte</h1>
        <AccountForms />
      </div>
    </>
  );
}
