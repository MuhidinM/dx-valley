import ContestsPage from "@/components/events/contest";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
const page = () => {
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

export default page;
