import { Event, columns } from "@/components/events/event-table-columns"
import { DataTable } from "@/components/events/events-data-table"

async function getData(): Promise<Event[]> {
  return [
    {
      id: "1",
      name: "Tech Expo 2024",
      description: "A tech event showcasing latest innovations",
      category: "tech-expo",
      targetDate: new Date(),
    },
    {
      id: "2",
      name: "Coding Contest",
      description: "A contest for competitive programming",
      category: "contest",
      targetDate: new Date(),
    },
    {
      id: "1",
      name: "Tech Expo 2024",
      description: "A tech event showcasing latest innovations",
      category: "tech-expo",
      targetDate: new Date(),
    },
    {
      id: "2",
      name: "Coding Contest",
      description: "A contest for competitive programming",
      category: "contest",
      targetDate: new Date(),
    },
    {
      id: "1",
      name: "Tech Expo 2024",
      description: "A tech event showcasing latest innovations",
      category: "tech-expo",
      targetDate: new Date(),
    },
    {
      id: "2",
      name: "Coding Contest",
      description: "A contest for competitive programming",
      category: "contest",
      targetDate: new Date(),
    },
    {
      id: "1",
      name: "Tech Expo 2024",
      description: "A tech event showcasing latest innovations",
      category: "tech-expo",
      targetDate: new Date(),
    },
    {
      id: "2",
      name: "Coding Contest",
      description: "A contest for competitive programming",
      category: "contest",
      targetDate: new Date(),
    },
    
    
  ];

}

export default async function EventPage() {
  const data = await getData()

  return (
    <div className="container mx-auto pt-0 ">
      <DataTable columns={columns} data={data} />
    </div>
  )
}

