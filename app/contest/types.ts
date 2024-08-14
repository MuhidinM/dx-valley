export interface Event {
  _id: string; // MongoDB document ID
  name: string; // Name of the event
  description: string; // Description of the event
  targetDate: Date; // Date when the event is targeted to occur
  category: string; // Category of the event (e.g., "contest", "Tech expo")
}
