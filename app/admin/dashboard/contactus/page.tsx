import { ContactUs, columns } from "@/components/constactus/contuctus-columns"
import { DataTable } from "@/components/constactus/contactus-data-table"

async function getData(): Promise<ContactUs[]> {
  return [
    {
      id: "1",
      fullName: "Tech Expo 2024",
      email: "test@gmail.com",
      message: "A tech event showcasing latest innovations"
    },
    {
      id: "2",
      fullName: "Startup Summit",
      email: "summit@startups.com",
      message: "An event for budding entrepreneurs"
    },
    {
      id: "3",
      fullName: "AI Conference 2024",
      email: "ai@conference.com",
      message: "Exploring advancements in Artificial Intelligence"
    },
    {
      id: "4",
      fullName: "Marketing World",
      email: "marketing@world.com",
      message: "A deep dive into modern marketing strategies"
    },
    {
      id: "5",
      fullName: "Healthcare Innovation Forum",
      email: "healthcare@forum.com",
      message: "Discussing the future of healthcare technologies"
    },
    {
      id: "6",
      fullName: "Fashion Forward",
      email: "fashion@forward.com",
      message: "The latest trends in the fashion industry"
    },
    {
      id: "7",
      fullName: "Green Energy Symposium",
      email: "greenenergy@symposium.com",
      message: "An event focused on sustainable energy solutions"
    },
    {
      id: "8",
      fullName: "Web Dev Bootcamp",
      email: "bootcamp@webdev.com",
      message: "Hands-on workshop for web development enthusiasts"
    },
    {
      id: "9",
      fullName: "E-commerce Innovators",
      email: "ecommerce@innovators.com",
      message: "How e-commerce is transforming retail"
    },
    {
      id: "10",
      fullName: "Blockchain Revolution",
      email: "blockchain@revolution.com",
      message: "Understanding the impact of blockchain on various industries"
    },
    {
      id: "11",
      fullName: "Cybersecurity Summit",
      email: "cybersecurity@summit.com",
      message: "Protecting digital assets in a connected world"
    },
    {
      id: "12",
      fullName: "Mobile App Expo",
      email: "app@expo.com",
      message: "Showcasing cutting-edge mobile applications"
    },
    {
      id: "13",
      fullName: "Cloud Computing Forum",
      email: "cloud@forum.com",
      message: "Exploring the power of cloud technologies"
    },
    {
      id: "14",
      fullName: "EdTech Conference",
      email: "edtech@conference.com",
      message: "Transforming education through technology"
    },
    {
      id: "15",
      fullName: "VR/AR Innovators Meetup",
      email: "vrar@innovators.com",
      message: "Networking"
    }
  ]
  
}

export default async function EventPage() {
  const data = await getData()

  return (
    <div className="container mx-auto pt-0 ">
      <DataTable columns={columns} data={data} />
    </div>
  )
}

