/** @format */

"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { CheckCircle2, Plus, X, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Confetti from "react-confetti";
import SubmissionSuccess from "../submissionSuccess";
import { ChangeEvent, FormEvent, MouseEvent, useState, useRef } from "react";

import { toast } from "sonner"; // Import the toast function
import { Toaster } from "sonner";
import { RadioGroup } from "@radix-ui/react-dropdown-menu";
const steps = [
  { id: "startup", title: "Startup Info" },
  { id: "founder", title: "Founder Info" },
  { id: "idea", title: "Additional Info" },
];
//  const [data, setData] = useState<StartupsData[]>([]);

const startupNameSuggestions = [
  "TechNova",
  "InnoVenture",
  "FuturePulse",
  "QuantumLeap",
  "NexusWave",
  "ZenithSpark",
  "PixelPioneer",
  "EcoSphere",
  "CyberForge",
  "BioSync",
  "NexusWave",
  "ZenithSpark",
  "PixelPioneer",
  "EcoSphere",
  "CyberForge",
  "BioSync",
  "AlphaCore",
  "VortexLabs",
  "HorizonShift",
  "CodeCraft",
  "BlueShift",
  "AeroFlow",
  "DataDrift",
  "AquaTech",
  "CloudBound",
  "BrightVision",
  "GreenPulse",
  "NextGenX",
  "StarEdge",
  "PulseShift",
  "DeepCrest",
  "OmniTech",
  "StreamSync",
  "OrbitRise",
  "VoltWave",
  "LunaLogic",
  "QuantumGrid",
  "FusionNode",
  "AlphaBoost",
  "GridSpark",
  "SolarFlare",
  "VibeTech",
  "EcoVolt",
  "SmartPulse",
  "SkyLoop",
  "CloudRunner",
  "VisionaryHub",
  "BluePeak",
  "NexBridge",
  "TechSol",
  "LightTrail",
  "HexaCore",
  "EcoFusion",
  "CrestWave",
  "StarPath",
  "BlueNova",
  "InnoSync",
  "OmniShift",
  "QuantumCore",
  "AlphaVision",
  "BrightLabs",
  "SkyPulse",
  "NextVibe",
  "GreenCore",
  "TechRise",
  "VoltFusion",
  "DataWave",
  "AquaGrid",
  "StarBound",
  "InnoShift",
  "CloudCrest",
  "NovaPulse",
  "EcoStream",
  "BrightEdge",
  "CyberNova",
  "VisionGrid",
  "AeroCore",
  "AlphaTech",
  "GridFusion",
  "LunaWave",
  "BlueForge",
  "SkyGrid",
  "OmniVibe",
  "InnoCore",
  "StarSync",
  "TechStream",
  "GreenCrest",
  "BrightSync",
  "PulseLabs",
  "EcoEdge",
  "VoltSync",
  "DataPath",
  "AeroShift",
  "HorizonEdge",
  "NovaLabs",
  "QuantumStream",
  "VisionSync",
  "GridEdge",
  "AlphaPath",
  "TechCrest",
  "EcoLabs",
  "CyberEdge",
  "InnoLabs",
  "SkyNova",
  "PulseFusion",
  "GreenLabs",
  "VoltLabs",
  "DataEdge",
  "BrightWave",
  "StarCrest",
  "VisionCore",
  "EcoSync",
  "AlphaFusion",
  "BluePath",
  "TechSync",
  "AeroLabs",
  "SkySync",
  "GridLabs",
  "StarEdge",
  "QuantumPath",
  "VoltCore",
  "BrightNova",
  "VisionLabs",
  "DataFusion",
  "EcoPath",
  "PulseSync",
  "AlphaEdge",
  "GreenNova",
  "SkyLabs",
  "TechRise",
  "VoltFusion",
  "DataWave",
  "AquaGrid",
  "StarBound",
  "InnoShift",
  "CloudCrest",
  "NovaPulse",
  "EcoStream",
  "BrightEdge",
  "CyberNova",
  "VisionGrid",
  "AeroCore",
  "AlphaTech",
  "GridFusion",
  "LunaWave",
  "BlueForge",
  "SkyGrid",
  "OmniVibe",
  "InnoCore",
  "StarSync",
  "TechStream",
  "GreenCrest",
  "BrightSync",
  "PulseLabs",
  "EcoEdge",
  "VoltSync",
  "DataPath",
  "AeroShift",
  "HorizonEdge",
  "NovaLabs",
  "QuantumStream",
  "VisionSync",
  "GridEdge",
  "AlphaPath",
  "TechCrest",
  "EcoLabs",
  "CyberEdge",
  "InnoLabs",
  "SkyNova",
  "PulseFusion",
  "GreenLabs",
  "VoltLabs",
  "DataEdge",
  "BrightWave",
  "StarCrest",
  "VisionCore",
  "EcoSync",
  "AlphaFusion",
  "BluePath",
  "TechSync",
  "AeroLabs",
  "SkySync",
  "GridLabs",
  "StarEdge",
  "QuantumPath",
  "VoltCore",
  "BrightNova",
  "VisionLabs",
  "DataFusion",
  "EcoPath",
  "PulseSync",
  "AlphaEdge",
  "GreenNova",
  "SkyLabs",
  "TechRise",
  "VoltFusion",
  "DataWave",
  "AquaGrid",
  "StarBound",
  "InnoShift",
  "CloudCrest",
  "NovaPulse",
  "EcoStream",
  "BrightEdge",
  "CyberNova",
  "VisionGrid",
  "AeroCore",
  "AlphaTech",
  "GridFusion",
  "LunaWave",
  "BlueForge",
  "SkyGrid",
  "OmniVibe",
  "InnoCore",
  "StarSync",
  "TechStream",
  "GreenCrest",
  "BrightSync",
  "PulseLabs",
  "EcoEdge",
  "VoltSync",
  "DataPath",
  "AeroShift",
  "HorizonEdge",
  "NovaLabs",
  "QuantumStream",
  "VisionSync",
  "GridEdge",
  "AlphaPath",
  "TechCrest",
  "EcoLabs",
  "CyberEdge",
  "InnoLabs",
  "SkyNova",
  "PulseFusion",
  "GreenLabs",
  "VoltLabs",
  "DataEdge",
  "BrightWave",
  "StarCrest",
  "VisionCore",
  "EcoSync",
  "AlphaFusion",
  "BluePath",
  "TechSync",
  "AeroLabs",
  "SkySync",
  "GridLabs",
  "StarEdge",
  "QuantumPath",
  "VoltCore",
  "BrightNova",
  "VisionLabs",
  "DataFusion",
  "EcoPath",
  "PulseSync",
  "AlphaEdge",
  "GreenNova",
  "SkyLabs",
  "TechRise",
  "VoltFusion",
  "DataWave",
  "AquaGrid",
  "StarBound",
  "InnoShift",
  "CloudCrest",
  "NovaPulse",
  "EcoStream",
  "BrightEdge",
  "CyberNova",
  "VisionGrid",
  "AeroCore",
  "AlphaTech",
  "GridFusion",
  "LunaWave",
  "BlueForge",
  "SkyGrid",
  "OmniVibe",
  "InnoCore",
  "StarSync",
  "TechStream",
  "GreenCrest",
  "BrightSync",
  "PulseLabs",
  "EcoEdge",
  "VoltSync",
  "DataPath",
  "AeroShift",
  "HorizonEdge",
  "NovaLabs",
  "QuantumStream",
  "VisionSync",
  "GridEdge",
  "AlphaPath",
  "TechCrest",
  "EcoLabs",
  "CyberEdge",
  "InnoLabs",
  "SkyNova",
  "PulseFusion",
  "GreenLabs",
  "VoltLabs",
  "DataEdge",
  "BrightWave",
  "StarCrest",
  "VisionCore",
  "EcoSync",
  "AlphaFusion",
  "BluePath",
  "TechSync",
  "AeroLabs",
  "SkySync",
  "GridLabs",
  "StarEdge",
  "QuantumPath",
  "VoltCore",
  "BrightNova",
  "VisionLabs",
  "DataFusion",
  "EcoPath",
  "PulseSync",
  "AlphaEdge",
  "GreenNova",
  "SkyLabs",
  "TechRise",
  "VoltFusion",
  "DataWave",
  "AquaGrid",
  "StarBound",
  "InnoShift",
  "CloudCrest",
  "NovaPulse",
  "EcoStream",
  "BrightEdge",
  "CyberNova",
  "VisionGrid",
  "AeroCore",
  "AlphaTech",
  "AlphaCore",
  "VortexLabs",
  "HorizonShift",
  "CodeCraft",
  "BlueShift",
  "AeroFlow",
  "DataDrift",
  "AquaTech",
  "CloudBound",
  "BrightVision",
  "GreenPulse",
  "NextGenX",
  "StarEdge",
  "PulseShift",
  "DeepCrest",
  "OmniTech",
  "StreamSync",
  "OrbitRise",
  "VoltWave",
  "LunaLogic",
  "QuantumGrid",
  "FusionNode",
  "AlphaBoost",
  "GridSpark",
  "SolarFlare",
  "VibeTech",
  "EcoVolt",
  "SmartPulse",
  "SkyLoop",
  "CloudRunner",
  "VisionaryHub",
  "BluePeak",
  "NexBridge",
  "TechSol",
  "LightTrail",
  "HexaCore",
  "EcoFusion",
  "CrestWave",
  "StarPath",
  "BlueNova",
  "InnoSync",
  "OmniShift",
  "QuantumCore",
  "AlphaVision",
  "BrightLabs",
  "SkyPulse",
  "NextVibe",
  "GreenCore",
  "TechRise",
  "VoltFusion",
  "DataWave",
  "AquaGrid",
  "StarBound",
  "InnoShift",
  "CloudCrest",
  "NovaPulse",
  "EcoStream",
  "BrightEdge",
  "CyberNova",
  "VisionGrid",
  "AeroCore",
  "AlphaTech",
  "GridFusion",
  "LunaWave",
  "BlueForge",
  "SkyGrid",
  "OmniVibe",
  "InnoCore",
  "StarSync",
  "TechStream",
  "GreenCrest",
  "BrightSync",
  "PulseLabs",
  "EcoEdge",
  "VoltSync",
  "DataPath",
  "AeroShift",
  "HorizonEdge",
  "NovaLabs",
  "QuantumStream",
  "VisionSync",
  "GridEdge",
  "AlphaPath",

  "EcoLabs",
  "CyberEdge",
  "InnoLabs",
  "SkyNova",
  "PulseFusion",
  "GreenLabs",
  "VoltLabs",
  "DataEdge",
  "BrightWave",
  "StarCrest",
  "VisionCore",
  "EcoSync",
  "AlphaFusion",
  "BluePath",
  "TechSync",
  "AeroLabs",
  "SkySync",
  "GridLabs",
  "StarEdge",
  "QuantumPath",
  "VoltCore",
  "BrightNova",
  "VisionLabs",
  "DataFusion",
  "EcoPath",
  "PulseSync",
  "AlphaEdge",
  "GreenNova",
  "SkyLabs",
  "TechFusion",
  "BlueSync",
  "HorizonLabs",
  "VoltFusion",
  "CloudLabs",
  "StarLabs",
  "InnoPath",
  "QuantumLabs",
  "BrightPath",
  "VisionFusion",
  "EcoFusion",
  "DataLabs",
  "VoltLabs",
  "CyberSync",
  "AlphaLabs",
  "InnoWave",
  "GridLabs",
  "TechLabs",
  "CloudPath",
  "QuantumLabs",
  "SkyLabs",
  "PulseFusion",
  "VisionLabs",
  "VoltLabs",
  "AlphaLabs",
  "CyberLabs",
  "BrightLabs",
  "EcoLabs",
  "InnoFusion",
  "TechLabs",
  "VisionEdge",
  "BlueLabs",
  "HorizonLabs",
  "VoltLabs",
  "QuantumLabs",
  "GridLabs",
  "TechLabs",
  "CloudFusion",
  "StarLabs",

  "QuantumFusion",
  "BrightLabs",
  "VisionFusion",
  "EcoLabs",
  "DataLabs",
  "VoltLabs",

  "AlphaLabs",
  "InnoWave",
  "GridFusion",
  "TechLabs",
  "CloudLabs",
  "StarLabs",
  "InnoPath",
  "QuantumLabs",
  "BrightLabs",
  "VisionLabs",
  "VoltFusion",
  "EcoFusion",
  "TechLabs",
  "VisionEdge",
  "BlueLabs",
  "HorizonFusion",
  "VoltLabs",
  "QuantumFusion",
  "GridLabs",
  "TechLabs",
  "CloudFusion",
  "StarFusion",
  "InnoLabs",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",

  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
  "CloudFusion",
  "StarFusion",
  "QuantumFusion",
  "BrightFusion",
  "VisionFusion",
  "EcoFusion",
  "DataFusion",
  "VoltFusion",
  "CyberFusion",
  "AlphaFusion",
  "InnoFusion",
  "GridFusion",
  "TechFusion",
];

type FileType = "video" | "document";

interface Founder {
  firstName: string;
  lastName: string;
  age: number | null;
  levelOfEducation: string;
  gender: string;
}
interface FormData {
  startupName: string;
  stage: string;
  founderNames: Founder[];
  email: string;
  phone: string;
  idea: string;
  video: File | null;
  documents: File[];
  state: string;
}

interface FounderErrors {
  firstName?: string;
  lastName?: string;
  age?: string;
  levelOfEducation?: string;
  gender?: string;
}

interface Errors {
  startupName?: string;
  stage?: string;
  state?: string;
  founderNames?: FounderErrors[];
  email?: string;
  phone?: string;
  idea?: string;
  video?: string;
  documents?: string;
}

const ApplyForIncubation = () => {
  const [nameTaken, setNameTaken] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>({
    startupName: "",
    state: "",
    stage: "",
    founderNames: [
      {
        firstName: "",
        lastName: "",
        levelOfEducation: "",
        gender: "",
        age: null,
      },
    ],
    email: "",
    phone: "",
    idea: "",
    video: null,
    documents: [],
  });
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);
  const videoInputRef = useRef<HTMLInputElement | null>(null);
  const documentInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (
    name: keyof FormData, // Keep 'name' as a key of FormData
    value: string,
    index: number | null = null, // Index for handling founderNames
    subField: keyof Founder | null = null // Subfield for firstName/lastName within founderNames
  ) => {
    if (name === "founderNames" && index !== null && subField !== null) {
      // Handle change for founder firstName or lastName
      const newFounderNames = [...formData.founderNames];
      newFounderNames[index] = {
        ...newFounderNames[index],
        [subField]: value,
      };
      setFormData((prevState) => ({
        ...prevState,
        founderNames: newFounderNames,
      }));
    } else {
      // Handle change for other fields in FormData
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // const handleAddFounder = () => {
  //   setFormData({
  //     ...formData,
  //     founderNames: [...formData.founderNames, { firstName: "", lastName: "" }],
  //   });
  // };

  // const handleRemoveFounder = (index: number) => {
  //   const updatedFounders = formData.founderNames.filter((_, i) => i !== index);
  //   setFormData({
  //     ...formData,
  //     founderNames: updatedFounders,
  //   });
  // };

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>,
    type: FileType
  ) => {
    const files = Array.from(event.target.files || []);
    if (type === "video") {
      if (files[0] && files[0].size > 50 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          video: "Video file size must be less than 50MB",
        }));
        return;
      }
      setFormData((prev) => ({ ...prev, video: files[0] || null }));
    } else if (type === "document") {
      const validFiles = files.filter((file) => file.size <= 2 * 1024 * 1024);
      if (validFiles.length < files.length) {
        setErrors((prev) => ({
          ...prev,
          documents: "Some documents exceeded 2MB limit and were not added",
        }));
      }
      setFormData((prev) => ({
        ...prev,
        documents: [...prev.documents, ...validFiles],
      }));
    }
  };

  const handleRemoveVideo = () => {
    setFormData((prev) => ({ ...prev, video: null }));
    if (videoInputRef.current) {
      videoInputRef.current.value = "";
    }
  };

  const handleRemoveDocument = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index),
    }));
  };
  const validateStep = (step: number): Errors => {
    let stepErrors: Errors = {};

    switch (step) {
      case 0:
        if (!formData.startupName.trim()) {
          stepErrors.startupName = "Startup name is required";
        }
          if (nameTaken) {
            stepErrors.startupName = "Startup name is already taken";
          }
        if (!formData.stage) {
          stepErrors.stage = "Current stage is required";
        }
       
        break;

      case 1:
        const founderErrors: FounderErrors[] = formData.founderNames.map(
          (founder) => {
            let errors: FounderErrors = {};
            if (!founder.firstName.trim()) {
              errors.firstName = "First name is required";
            }
            if (!founder.lastName.trim()) {
              errors.lastName = "Last name is required";
            }
            if (!founder.gender.trim()) {
              errors.gender = "gender is required";
            }
            if (!founder.age || isNaN(Number(founder.age))) {
              errors.age = "Age is required and must be a valid number";
            } else if (founder.age < 18 || founder.age > 50) {
              errors.age = "Age must be between 18 and 50";
            }

            if (!founder.levelOfEducation.trim()) {
              errors.levelOfEducation = "level of education is required";
            }
            return errors;
          }
        );

        if (founderErrors.some((err) => Object.keys(err).length > 0)) {
          stepErrors.founderNames = founderErrors;
        }

        if (!formData.email.trim()) {
          stepErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          stepErrors.email = "Email is invalid";
        }

        if (!formData.phone.trim()) {
          stepErrors.phone = "Phone number is required";
        }
        if (!formData.state.trim()) {
          stepErrors.state = "stage is required";
        }
        break;

      case 2:
        if (!formData.idea.trim()) {
          stepErrors.idea = "Startup idea is required";
        }
        break;
    }
    return stepErrors;
  };

  const handleNext = () => {
    const stepErrors = validateStep(currentStep);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  // const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const stepErrors = validateStep(currentStep);
  //   if (Object.keys(stepErrors).length > 0) {
  //     setErrors(stepErrors);
  //     return;
  //   }
  //   setShowConfirmDialog(true);
  // };

  // const takenNames = ["TechNova", "QuantumLeap"]; // Example list of taken names

  // // Function to check if the startup name is already taken
  // const isNameTaken = (newName: string) => {
  //   return takenNames.includes(newName);
  // };

  const generateStartupName = () => {
    const randomIndex = Math.floor(
      Math.random() * startupNameSuggestions.length
    );
    const generatedName = startupNameSuggestions[randomIndex];

    // Use the external function to check if the name is taken
    // if (isNameTaken(generatedName)) {
    //   setNameTaken(true);
    // } else {
    //   //  setNameTaken(false);
    //   setFormData((prev) => ({
    //     ...prev,
    //     startupName: generatedName,
    //   }));
    // }
  };

   let isNameTaken = false; 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formValues = new FormData();
    formValues.append("startupName", formData.startupName);
    formValues.append("stage", formData.stage);
    formValues.append("email", formData.email);
    formValues.append("phone", formData.phone);

    formData.founderNames.forEach((member, index) => {
      formValues.append(`founderNames[${index}][firstName]`, member.firstName);
      formValues.append(`founderNames[${index}][lastName]`, member.lastName);
      formValues.append(`founderNames[${index}][gender]`, member.gender);
      formValues.append(
        `founderNames[${index}][levelOfEducation]`,
        member.levelOfEducation
      );
      // formValues.append(`founderNames[${index}][age]`, member.age);
      formValues.append(
        `founderNames[${index}][age]`,
        member.age !== null ? String(member.age) : ""
      );
    });

    formValues.append("idea", formData.idea);
    formValues.append("state", formData.state);

    if (formData.video) {
      formValues.append("video", formData.video);
    }

    formData.documents.forEach((doc, index) => {
      formValues.append(`documents[${index}]`, doc);
    });

       

    try {
      const response = await fetch("/newapi/callforproposal", {
        method: "POST",
        body: formValues, // No need to set Content-Type, the browser does it automatically
      });

      const result = await response.json();
        isNameTaken = result?.nameExists;
        
      if (isNameTaken) {
        setNameTaken(true);
        setErrors((prev) => ({
          ...prev,
          startupName: "Name already taken",
        }));
        return;
      }

      console.log("console log for nameExists check just the result", result);
      if (response.ok) {
        toast.success("Registration successful!", {
          description: "Your details have been submitted successfully.",
        });
        setSubmitSuccess(true);
        setShowConfetti(true);
        //   <SubmissionSuccess
        //     title={" Submission Successful!"}
        //     icon={<CheckCircle2 className='w-8 h-8 text-green' />}
        //     desc={
        //       "Application submitted successfully. Good luck! Stay tuned for our email. We will get back to you shortly."
        //     }
        //   />

        // setTimeout(() => {
        //   window.location.reload();
        // }, 100000);
      } else {
        toast.error("Registration failed", {
          description:
            result?.error || "An error occurred during registration.",
          });
              setErrors((prev) => ({
                ...prev,
                startupName: result?.error,
              }));
          
        // console.log("call for proposal error on submission");
      }
      // console.log(result);
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  const confirmSubmit = async () => {
    setShowConfirmDialog(false);
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setShowConfetti(true);
  };

  // const generateStartupName = () => {
  //   const randomIndex = Math.floor(
  //     Math.random() * startupNameSuggestions.length
  //   );
  //   setFormData((prev) => ({
  //     ...prev,
  //     startupName: startupNameSuggestions[randomIndex],
  //   }));
  // };

  if (submitSuccess) {
    return (
      <div className=" bg-gray-50 py-28  dark:bg-gray-900 px-4 sm:px-6 lg:px-8 ">
        <div>
          {showConfetti && <Confetti colors={["#00adef"]} />}
          <SubmissionSuccess
            title={" Submission Successful!"}
            icon={<CheckCircle2 className="w-8 h-8 text-green" />}
            desc={
              "Application submitted successfully. Good luck! Stay tuned for our email. We will get back to you shortly."
            }
          />
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-gray-50 py-12  dark:bg-gray-900 px-4 sm:px-6 lg:px-8 h-1/2">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">
            Apply for Startup Incubation
          </CardTitle>
          <CardDescription>
            Join Dx Valley&apos;s Incubation Program and turn your idea into
            reality!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-8">
            <div className="flex justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center">
                  <div
                    className={`rounded-full h-8 w-8 flex items-center justify-center ${
                      index <= currentStep
                        ? "bg-[#00adef] text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className="text-xs mt-2">{step.title}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 h-2 bg-gray-200 rounded-full">
              <div
                className="h-full bg-[#00adef] rounded-full transition-all duration-300 ease-in-out"
                style={{
                  width: `${((currentStep + 1) / steps.length) * 100}%`,
                }}
              ></div>
            </div>
            <form onSubmit={handleSubmit}>
              {currentStep === 0 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="startupName">Startup Name</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="startupName"
                        placeholder="Enter your startup name"
                        value={formData.startupName}
                        onChange={(e) => {
                          const newName = e.target.value;
                          handleChange("startupName", newName);

                          // Check if the new name is taken
                          // if (isNameTaken(newName)) {
                          //   setNameTaken(true);
                          // } 
                          // else {
                          //   setNameTaken(false);
                          // }
                            
                         }}
                      />
                      <Button type="button" onClick={generateStartupName}>
                        {"Generate"}
                      </Button>
                    </div>

                    {/* Show message if name is taken */}
                    <span className="text-sm text-red-500">
                      {nameTaken ? "Name is already taken" : null}
                    </span>

                    {/* Show any validation errors */}
                    {errors.startupName && (
                      <p className="text-sm text-red-500">
                        {errors.startupName}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stage">Current Stage</Label>
                    <Select
                      onValueChange={(value) => handleChange("stage", value)}
                      value={formData.stage}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your current stage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="idea">Idea</SelectItem>
                        <SelectItem value="prototype">Prototype</SelectItem>
                        <SelectItem value="mvp">MVP</SelectItem>
                        <SelectItem value="early-revenue">
                          Early Revenue
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.stage && (
                      <p className="text-sm text-red-500">{errors.stage}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="idea">Startup Idea</Label>
                    <Textarea
                      id="idea"
                      placeholder="Describe your startup idea"
                      value={formData.idea}
                      onChange={(e) => handleChange("idea", e.target.value)}
                      rows={5}
                    />
                    {errors.idea && (
                      <p className="text-sm text-red-500">{errors.idea}</p>
                    )}
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="space-y-4">
                  {formData.founderNames.map((founder, index) => (
                    <div key={index} className="space-y-2">
                      <Label htmlFor={`founderName-${index}`}>
                        Founder Name
                      </Label>
                      <div className="md:space-y-0 lg:space-y-4 space-y-2 ">
                        <div className="flex lg:flex lg:space-x-2 md:flex md:space-x-2 ">
                          <Input
                            id={`founderFirstName-${index}`}
                            placeholder="Enter first name"
                            value={founder.firstName}
                            onChange={
                              (e) =>
                                handleChange(
                                  "founderNames",
                                  e.target.value,
                                  index,
                                  "firstName"
                                ) // Pass "founderNames" as the name and "firstName" as subField
                            }
                          />

                          <Input
                            id={`founderLastName-${index}`}
                            placeholder="Enter last name"
                            value={founder.lastName}
                            onChange={
                              (e) =>
                                handleChange(
                                  "founderNames",
                                  e.target.value,
                                  index,
                                  "lastName"
                                ) // Pass "founderNames" as the name and "lastName" as subField
                            }
                          />
                        </div>
                        {errors?.founderNames && errors.founderNames[index] && (
                          <div className="flex space-x-20">
                            {errors.founderNames[index].firstName && (
                              <p className="text-sm text-red-500">
                                Founder first name:{" "}
                                {errors.founderNames[index].firstName}
                              </p>
                            )}
                            {errors.founderNames[index].lastName && (
                              <p className="text-sm text-red-500">
                                Founder last name:{" "}
                                {errors.founderNames[index].lastName}
                              </p>
                            )}
                          </div>
                        )}
                        <div className="lg:flex lg:space-x-2 md:flex md:space-x-2 flex gap-6 width-full justify-between  ">
                          <div className="space-y-2 w-full">
                            <Label htmlFor="stage">Age</Label>
                            <Input
                              id={`founderAge-${index}`}
                              placeholder="Enter age"
                              type="number"
                              min="20"
                              max="45"
                              value={founder.age ?? ""} // Ensure the value is not null
                              onChange={(e) =>
                                handleChange(
                                  "founderNames",
                                  e.target.value,
                                  index,
                                  "age"
                                )
                              }
                            />
                            {errors?.founderNames &&
                              errors.founderNames[index]?.age && (
                                <p className="text-sm text-red-500">
                                  Founder age: {errors.founderNames[index].age}
                                </p>
                              )}
                          </div>

                          {/* Gender */}
                          <div className="space-y-2 w-full">
                            <Label
                              htmlFor={`founderGender-${index}`}
                              className="font-medium text-gray-700"
                            >
                              Gender
                            </Label>
                            <Select
                              onValueChange={(value) =>
                                handleChange(
                                  "founderNames",
                                  value,
                                  index,
                                  "gender"
                                )
                              }
                              value={founder.gender}
                              // className="w-full"
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                              </SelectContent>
                            </Select>
                            {errors?.founderNames &&
                              errors.founderNames[index]?.gender && (
                                <p className="text-sm text-red-500">
                                  Founder Gender:{" "}
                                  {errors.founderNames[index].gender}
                                </p>
                              )}
                          </div>
                        </div>

                        {/* Education level dropdown */}
                        <div className="space-y-2">
                          <Label htmlFor="stage">Level of Education</Label>
                          <Select
                            onValueChange={(value) =>
                              handleChange(
                                "founderNames",
                                value,
                                index,
                                "levelOfEducation"
                              )
                            }
                            value={founder.levelOfEducation}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select your level of education" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="highschool">
                                High school or Diploma
                              </SelectItem>
                              <SelectItem value="degree">
                                Bachler degree
                              </SelectItem>
                              <SelectItem value="higher">Higher</SelectItem>
                            </SelectContent>
                          </Select>
                          {errors?.founderNames &&
                            errors.founderNames[index]?.levelOfEducation && (
                              <p className="text-sm text-red-500">
                                Founder level of education:{" "}
                                {errors.founderNames[index].levelOfEducation}
                              </p>
                            )}
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                      />
                      {errors?.email && (
                        <p className="text-sm text-red-500">{errors.email}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                      />
                      {errors.phone && (
                        <p className="text-sm text-red-500">{errors.phone}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state">Address</Label>
                      <Select
                        onValueChange={(value) => handleChange("state", value)}
                        value={formData.state}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Region" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="oromia">Oromia</SelectItem>
                          <SelectItem value="tigray">Tigray</SelectItem>
                          <SelectItem value="amhara">Amahara</SelectItem>
                          <SelectItem value="harar">Harar</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.state && (
                        <p className="text-sm text-red-500">{errors.state}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="video">
                      Video Pitch (Optional, Max 50MB)
                    </Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="video"
                        type="file"
                        accept="video/*"
                        onChange={(e) => handleFileChange(e, "video")}
                        ref={videoInputRef}
                      />
                      {formData.video && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleRemoveVideo}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    {formData.video && (
                      <p className="text-sm text-gray-500">
                        {formData.video.name}
                      </p>
                    )}
                    {errors.video && (
                      <p className="text-sm text-red-500">{errors.video}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="documents">
                      Documents (Optional, Max 2MB each)
                    </Label>
                    <Input
                      id="documents"
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileChange(e, "document")}
                      ref={documentInputRef}
                    />
                    {formData.documents.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <span>{doc.name}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => handleRemoveDocument(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => documentInputRef.current?.click()}
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add Document
                    </Button>
                    {errors.documents && (
                      <p className="text-sm text-red-500">{errors.documents}</p>
                    )}
                  </div>
                </div>
              )}
            </form>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          {currentStep < steps.length - 1 ? (
            <Button
              disabled={nameTaken === true || !formData.startupName}
              onClick={handleNext}
            >
              Next
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          )}
        </CardFooter>
      </Card>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Submission</DialogTitle>
            <DialogDescription>
              Are you sure you want to submit your application? Please review
              all information before confirming.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={confirmSubmit} disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {isSubmitting ? "Submitting..." : "Confirm Submission"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApplyForIncubation;
