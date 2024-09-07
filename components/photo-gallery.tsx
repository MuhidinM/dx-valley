import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample data for the gallery
const galleryItems = [
  {
    id: 1,
    title: "Innovation Project 1",
    description: "A cutting-edge innovation project",
    image: "/placeholder.svg?height=200&width=300",
    type: "innovation",
    link: "https://example.com/innovation1"
  },
  {
    id: 2,
    title: "Incubation Startup 1",
    description: "An exciting startup in our incubation program",
    image: "/placeholder.svg?height=200&width=300",
    type: "incubation",
    link: "https://example.com/incubation1"
  },
  {
    id: 3,
    title: "Innovation Project 2",
    description: "Another groundbreaking innovation",
    image: "/placeholder.svg?height=200&width=300",
    type: "innovation",
    link: "https://example.com/innovation2"
  },
  {
    id: 4,
    title: "Incubation Startup 2",
    description: "A promising startup we're nurturing",
    image: "/placeholder.svg?height=200&width=300",
    type: "incubation",
    link: "https://example.com/incubation2"
  },
  // Add more items as needed
]

export default function PhotoGallery() {
  const [filter, setFilter] = useState("all")

  const filteredItems = filter === "all" 
    ? galleryItems 
    : galleryItems.filter(item => item.type === filter)

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <Select onValueChange={setFilter} defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="innovation">Innovation Hub</SelectItem>
            <SelectItem value="incubation">Incubation</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <GalleryGrid items={filteredItems} />
    </div>
  )
}

function GalleryGrid({ items }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <Card key={item.id} className="overflow-hidden">
          <Link href={item.link} target="_blank" rel="noopener noreferrer">
            <CardContent className="p-0 relative group">
              <AspectRatio ratio={3/2}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-opacity group-hover:opacity-30"
                />
              </AspectRatio>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="text-center p-4">
                  <p className="text-sm text-white">{item.description}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4">
              <h3 className="text-lg font-semibold">{item.title}</h3>
            </CardFooter>
          </Link>
        </Card>
      ))}
    </div>
  )
}