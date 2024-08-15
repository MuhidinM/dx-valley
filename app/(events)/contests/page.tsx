import ContestsPage from "@/components/contest";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
const Page = () => {
  return (
    <>
      <Card className="contest-title">
        <CardHeader>
          <CardTitle>Events</CardTitle>
        </CardHeader>
      </Card>

      <ContestsPage />
    </>
  );
};

export default Page;
