import { Enrollmenttype } from "@/lib/typs";
import { useAuthStore } from "@/store";
import AllDownloads from "@/components/studentdashboard/Downloads";

const Page = () => {
  const enrollment = useAuthStore().user as unknown as Enrollmenttype;

  return <AllDownloads enrollment={enrollment} />;
};

export default Page;
